import { getPool } from "./db";
import { z, ZodError } from "zod";

const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const pool = getPool();

  try {
    console.log("[register] start", { method: req.method });
    console.log("[register] has DATABASE_URL", { hasDatabaseUrl: !!process.env.DATABASE_URL, len: process.env.DATABASE_URL?.length });
    const data = registrationSchema.parse(req.body);
    console.log("[register] validation passed", { name: data.name, email: data.email });

    // Check for existing email
    const existing = await pool.query(
      "SELECT id FROM registrations WHERE LOWER(email) = LOWER($1)",
      [data.email]
    );
    console.log("[register] existing query done", { rows: existing.rows.length });
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "This email is already registered. We'll be in touch soon!" });
    }

    // Insert registration
    const result = await pool.query(
      "INSERT INTO registrations (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone, created_at",
      [data.name, data.email, data.phone]
    );
    console.log("[register] insert done", { insertedId: result.rows[0]?.id });

    return res.status(201).json({
      message: "Registration successful! Check your email for next steps.",
      registration: result.rows[0],
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    console.error("Registration error:", error?.message ?? error);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
}

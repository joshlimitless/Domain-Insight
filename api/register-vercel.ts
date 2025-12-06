import { sql } from "@vercel/postgres";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email exists
    const existing = await sql`SELECT id FROM registrations WHERE LOWER(email) = LOWER(${email})`;
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: "This email is already registered. We'll be in touch soon!" });
    }

    // Insert registration
    const result = await sql`INSERT INTO registrations (name, email) VALUES (${name}, ${email}) RETURNING id, name, email`;

    return res.status(201).json({
      message: "Registration successful! Check your email for next steps.",
      registration: result.rows[0],
    });
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}

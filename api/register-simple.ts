const { Pool } = require("pg");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if email exists
    const checkRes = await pool.query(
      "SELECT id FROM registrations WHERE LOWER(email) = LOWER($1)",
      [email]
    );
    if (checkRes.rows.length > 0) {
      await pool.end();
      return res.status(400).json({ message: "This email is already registered. We'll be in touch soon!" });
    }

    // Insert registration
    const result = await pool.query(
      "INSERT INTO registrations (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );

    await pool.end();

    return res.status(201).json({
      message: "Registration successful! Check your email for next steps.",
      registration: result.rows[0],
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    await pool.end();
    return res.status(500).json({ message: error.message });
  }
}

import { getPool } from "./db";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      "SELECT id, name, email, phone, created_at FROM registrations ORDER BY created_at DESC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Error fetching registrations:", err);
    return res.status(500).json({ message: "Failed to fetch registrations" });
  }
}

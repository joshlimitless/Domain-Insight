import { getPool } from "./db";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const pool = getPool();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = await pool.query(
      "SELECT count(*)::int as count FROM registrations WHERE created_at >= $1 AND created_at < $2",
      [today.toISOString(), tomorrow.toISOString()]
    );

    return res.json({ count: result.rows[0]?.count || 0 });
  } catch (err) {
    console.error("Error fetching today's signup count:", err);
    return res.status(500).json({ message: "Failed to fetch count" });
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const { domain } = req.query;

    const ALLOWED_DOMAINS = [
      "afternic.com",
      "godaddy.com",
      "spaceship.com",
      "dynadot.com",
      "sedo.com",
      "parkingcrew.com",
    ];

    if (!ALLOWED_DOMAINS.includes(domain)) {
      return res.status(400).json({ message: "Invalid domain" });
    }

    const apiKey = process.env.LOGO_DEV_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "Logo API not configured" });
    }

    const logoUrl = `https://img.logo.dev/${domain}?token=${apiKey}&format=png`;
    const response = await fetch(logoUrl);
    if (!response.ok) {
      return res.status(response.status).json({ message: "Failed to fetch logo" });
    }

    const contentType = response.headers.get("content-type") || "image/png";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Error fetching logo:", error);
    return res.status(500).json({ message: "Failed to fetch logo" });
  }
}

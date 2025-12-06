export default function handler(req: any, res: any) {
  res.status(200).json({ 
    message: "API is working",
    env: {
      has_database_url: !!process.env.DATABASE_URL,
      database_url_length: process.env.DATABASE_URL?.length || 0
    }
  });
}

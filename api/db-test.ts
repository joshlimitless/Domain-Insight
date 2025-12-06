import { getDb } from "./db";

export default async function handler(req: any, res: any) {
  try {
    console.log("Attempting to connect to database...");
    const db = getDb();
    console.log("Database instance created successfully");
    
    res.json({ status: "Connected to database successfully" });
  } catch (error: any) {
    console.error("DB connection error:", error);
    res.status(500).json({ 
      error: error.message, 
      stack: error.stack 
    });
  }
}

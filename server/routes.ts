import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const ALLOWED_DOMAINS = [
  "afternic.com",
  "godaddy.com", 
  "spaceship.com",
  "dynadot.com",
  "sedo.com",
  "parkingcrew.com"
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/register", async (req, res) => {
    try {
      const data = insertRegistrationSchema.parse(req.body);
      
      const existingRegistration = await storage.getRegistrationByEmail(data.email);
      if (existingRegistration) {
        return res.status(400).json({ 
          message: "This email is already registered. We'll be in touch soon!" 
        });
      }
      
      const registration = await storage.createRegistration(data);
      
      return res.status(201).json({ 
        message: "Registration successful! Check your email for next steps.",
        registration: {
          id: registration.id,
          name: registration.name,
          email: registration.email
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  app.get("/api/registrations", async (req, res) => {
    try {
      const registrations = await storage.getAllRegistrations();
      return res.json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      return res.status(500).json({ message: "Failed to fetch registrations" });
    }
  });

  app.get("/api/logo/:domain", async (req, res) => {
    try {
      const { domain } = req.params;
      
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
  });

  return httpServer;
}

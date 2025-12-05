import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

  return httpServer;
}

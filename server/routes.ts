import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertIncidentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api

  // Incident reporting routes
  app.post('/api/incidents', async (req, res) => {
    try {
      // Parse and validate the incident data
      const validatedData = insertIncidentSchema.parse(req.body);
      
      // Create the incident in storage
      const incident = await storage.createIncident(validatedData);
      
      console.log('New incident created:', incident.id, incident.hazardType, incident.location);
      
      res.status(201).json({ 
        success: true, 
        incident: {
          id: incident.id,
          hazardType: incident.hazardType,
          location: incident.location,
          createdAt: incident.createdAt,
          status: incident.status
        }
      });
    } catch (error) {
      console.error('Error creating incident:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid data', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to create incident' });
      }
    }
  });

  // Get all incidents (for analytics)
  app.get('/api/incidents', async (req, res) => {
    try {
      const incidents = await storage.getIncidents();
      res.json({ success: true, incidents });
    } catch (error) {
      console.error('Error fetching incidents:', error);
      res.status(500).json({ error: 'Failed to fetch incidents' });
    }
  });

  // Get specific incident
  app.get('/api/incidents/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const incident = await storage.getIncident(id);
      
      if (!incident) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      
      res.json({ success: true, incident });
    } catch (error) {
      console.error('Error fetching incident:', error);
      res.status(500).json({ error: 'Failed to fetch incident' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

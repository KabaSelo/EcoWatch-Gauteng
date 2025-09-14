import { type User, type InsertUser, type Incident, type InsertIncident } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Incident methods
  createIncident(incident: InsertIncident): Promise<Incident>;
  getIncidents(): Promise<Incident[]>;
  getIncident(id: string): Promise<Incident | undefined>;
  updateIncidentStatus(id: string, status: string): Promise<void>;
  markEmailSent(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private incidents: Map<string, Incident>;

  constructor() {
    this.users = new Map();
    this.incidents = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = randomUUID();
    const incident: Incident = { 
      ...insertIncident,
      knownPlace: insertIncident.knownPlace || null,
      contactInfo: insertIncident.contactInfo || null,
      imageData: insertIncident.imageData || null,
      imageName: insertIncident.imageName || null,
      id,
      createdAt: new Date(),
      emailSent: null
    };
    this.incidents.set(id, incident);
    return incident;
  }

  async getIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getIncident(id: string): Promise<Incident | undefined> {
    return this.incidents.get(id);
  }

  async updateIncidentStatus(id: string, status: string): Promise<void> {
    const incident = this.incidents.get(id);
    if (incident) {
      this.incidents.set(id, { ...incident, status });
    }
  }

  async markEmailSent(id: string): Promise<void> {
    const incident = this.incidents.get(id);
    if (incident) {
      this.incidents.set(id, { ...incident, emailSent: new Date() });
    }
  }
}

export const storage = new MemStorage();
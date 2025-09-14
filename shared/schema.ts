import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const incidents = pgTable("incidents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hazardType: text("hazard_type").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  knownPlace: text("known_place"),
  contactInfo: text("contact_info"),
  imageData: text("image_data"), // Base64 encoded image
  imageName: text("image_name"),
  status: text("status").notNull().default("pending"), // pending, investigating, resolved
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  emailSent: timestamp("email_sent"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  createdAt: true,
  emailSent: true,
}).extend({
  hazardType: z.enum([
    'illegal-dumping',
    'animal-dumping', 
    'sewage-spill',
    'illegal-electricity',
    'chemical-spill',
    'air-pollution',
    'noise-pollution',
    'deforestation',
    'water-contamination',
    'wildlife-poaching',
    'other'
  ]),
  status: z.enum(['pending', 'investigating', 'resolved']).default('pending'),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type Incident = typeof incidents.$inferSelect;

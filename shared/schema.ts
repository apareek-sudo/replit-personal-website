import { pgTable, text, serial, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profile schema
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  email: text("email").notNull(),
  location: text("location"),
  phone: text("phone"),
  avatar: text("avatar"),
  resumeUrl: text("resume_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProfileSchema = createInsertSchema(profile).pick({
  name: true,
  title: true,
  bio: true,
  email: true,
  location: true,
  phone: true,
  avatar: true,
  resumeUrl: true,
  githubUrl: true,
  linkedinUrl: true,
  twitterUrl: true,
});

// Skills schema
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // e.g., "frontend", "backend", "tools"
  proficiency: text("proficiency").notNull(), // e.g., "beginner", "intermediate", "advanced"
  icon: text("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  category: true,
  proficiency: true,
  icon: true,
});

// Projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  technologies: json("technologies").notNull().$type<string[]>(), // Array of technologies used
  featured: text("featured").default("false"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  imageUrl: true,
  liveUrl: true,
  githubUrl: true,
  technologies: true,
  featured: true,
});

// Experiences schema (work history)
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  location: text("location"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null means current position
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertExperienceSchema = createInsertSchema(experiences).pick({
  company: true,
  position: true,
  location: true,
  startDate: true,
  endDate: true,
  description: true,
});

// Education schema
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  field: text("field").notNull(),
  location: text("location"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null means in progress
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEducationSchema = createInsertSchema(education).pick({
  institution: true,
  degree: true,
  field: true,
  location: true,
  startDate: true,
  endDate: true,
  description: true,
});

// Export types
export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Education = typeof education.$inferSelect;
export type InsertEducation = z.infer<typeof insertEducationSchema>;

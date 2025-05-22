import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Profile routes
  app.get("/api/profile", async (req: Request, res: Response) => {
    try {
      const profiles = await storage.getAllProfiles();
      // For a portfolio website, we typically only have one profile
      // So we return the first one if it exists
      const profile = profiles.length > 0 ? profiles[0] : null;
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.get("/api/profile/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const profile = await storage.getProfile(id);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // Skills routes
  app.get("/api/skills", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      let skills;
      
      if (category) {
        skills = await storage.getSkillsByCategory(category);
      } else {
        skills = await storage.getAllSkills();
      }
      
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.get("/api/skills/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const skill = await storage.getSkill(id);
      
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      
      res.json(skill);
    } catch (error) {
      console.error("Error fetching skill:", error);
      res.status(500).json({ error: "Failed to fetch skill" });
    }
  });

  // Projects routes
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const featured = req.query.featured as string;
      let projects;
      
      if (featured === 'true') {
        projects = await storage.getFeaturedProjects();
      } else {
        projects = await storage.getAllProjects();
      }
      
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Experiences routes
  app.get("/api/experiences", async (req: Request, res: Response) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ error: "Failed to fetch experiences" });
    }
  });

  app.get("/api/experiences/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const experience = await storage.getExperience(id);
      
      if (!experience) {
        return res.status(404).json({ error: "Experience not found" });
      }
      
      res.json(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ error: "Failed to fetch experience" });
    }
  });

  // Education routes
  app.get("/api/education", async (req: Request, res: Response) => {
    try {
      const education = await storage.getAllEducation();
      res.json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  app.get("/api/education/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const education = await storage.getEducation(id);
      
      if (!education) {
        return res.status(404).json({ error: "Education not found" });
      }
      
      res.json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ error: "Failed to fetch education" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

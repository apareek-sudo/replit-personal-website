import { 
  profile, skills, projects, experiences, education,
  type Profile, type InsertProfile, 
  type Skill, type InsertSkill,
  type Project, type InsertProject,
  type Experience, type InsertExperience,
  type Education, type InsertEducation
} from "@shared/schema";

export interface IStorage {
  // Profile methods
  getProfile(id: number): Promise<Profile | undefined>;
  getAllProfiles(): Promise<Profile[]>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(id: number, profile: Partial<InsertProfile>): Promise<Profile | undefined>;
  
  // Skills methods
  getSkill(id: number): Promise<Skill | undefined>;
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  // Projects methods
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Experience methods
  getExperience(id: number): Promise<Experience | undefined>;
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  // Education methods
  getEducation(id: number): Promise<Education | undefined>;
  getAllEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
}

export class MemStorage implements IStorage {
  private profiles: Map<number, Profile>;
  private skillsMap: Map<number, Skill>;
  private projectsMap: Map<number, Project>;
  private experiencesMap: Map<number, Experience>;
  private educationMap: Map<number, Education>;
  
  private profileId: number;
  private skillId: number;
  private projectId: number;
  private experienceId: number;
  private educationId: number;

  constructor() {
    this.profiles = new Map();
    this.skillsMap = new Map();
    this.projectsMap = new Map();
    this.experiencesMap = new Map();
    this.educationMap = new Map();
    
    this.profileId = 1;
    this.skillId = 1;
    this.projectId = 1;
    this.experienceId = 1;
    this.educationId = 1;

    // Create a demo profile
    this.createProfile({
      name: 'John Doe',
      title: 'Full-Stack Developer',
      bio: 'Passionate developer with expertise in React, Node.js, and cloud technologies. I love building user-friendly web applications with clean, maintainable code.',
      email: 'john.doe@example.com',
      location: 'New York, NY',
      phone: '(555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      resumeUrl: '/resume.pdf',
      githubUrl: 'https://github.com/johndoe',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      twitterUrl: 'https://twitter.com/johndoe'
    });

    // Create sample skills
    const sampleSkills = [
      { name: 'React', category: 'frontend', proficiency: 'expert', icon: 'react' },
      { name: 'TypeScript', category: 'languages', proficiency: 'advanced', icon: 'typescript' },
      { name: 'Node.js', category: 'backend', proficiency: 'advanced', icon: 'nodejs' },
      { name: 'AWS', category: 'devops', proficiency: 'intermediate', icon: 'aws' },
      { name: 'PostgreSQL', category: 'backend', proficiency: 'intermediate', icon: 'postgresql' },
      { name: 'Docker', category: 'devops', proficiency: 'intermediate', icon: 'docker' }
    ];
    
    sampleSkills.forEach(skill => {
      this.createSkill(skill as InsertSkill);
    });

    // Create sample projects
    const sampleProjects = [
      {
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment processing.',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        liveUrl: 'https://ecommerce.example.com',
        githubUrl: 'https://github.com/johndoe/ecommerce',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
        featured: 'true'
      },
      {
        title: 'Task Management App',
        description: 'A task management application with drag-and-drop interface, team collaboration features, and real-time updates.',
        imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        liveUrl: 'https://tasks.example.com',
        githubUrl: 'https://github.com/johndoe/task-manager',
        technologies: ['React', 'TypeScript', 'Firebase', 'Material UI'],
        featured: 'true'
      },
      {
        title: 'Weather Dashboard',
        description: 'A weather dashboard that displays current conditions and forecasts for multiple locations. Uses OpenWeatherMap API and React.',
        imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        githubUrl: 'https://github.com/johndoe/weather-app',
        technologies: ['React', 'CSS', 'OpenWeatherMap API'],
        featured: 'false'
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project as InsertProject);
    });

    // Create sample experiences
    const sampleExperiences = [
      {
        company: 'Tech Innovations Inc.',
        position: 'Senior Frontend Developer',
        location: 'New York, NY',
        startDate: '2021-03-01T00:00:00',
        description: 'Led the frontend development team in building a new e-commerce platform. Implemented modern React practices and improved performance by 40%.'
      },
      {
        company: 'Digital Solutions LLC',
        position: 'Full Stack Developer',
        location: 'Boston, MA',
        startDate: '2018-06-01T00:00:00',
        endDate: '2021-02-28T00:00:00',
        description: 'Developed and maintained multiple web applications using React, Node.js, and PostgreSQL. Collaborated with design team to implement UI/UX improvements.'
      },
      {
        company: 'Web Creators Co.',
        position: 'Junior Developer',
        location: 'San Francisco, CA',
        startDate: '2016-09-01T00:00:00',
        endDate: '2018-05-31T00:00:00',
        description: 'Built responsive websites for clients in various industries. Focused on front-end development with HTML, CSS, and JavaScript.'
      }
    ];
    
    sampleExperiences.forEach(experience => {
      this.createExperience(experience as InsertExperience);
    });

    // Create sample education
    const sampleEducationItems = [
      {
        institution: 'University of Technology',
        degree: 'Master of Science',
        field: 'Computer Science',
        location: 'New York, NY',
        startDate: '2014-09-01T00:00:00',
        endDate: '2016-05-31T00:00:00',
        description: 'Specialized in web technologies and distributed systems. Graduated with honors.'
      },
      {
        institution: 'State University',
        degree: 'Bachelor of Science',
        field: 'Computer Engineering',
        location: 'Chicago, IL',
        startDate: '2010-09-01T00:00:00',
        endDate: '2014-05-31T00:00:00',
        description: 'Completed coursework in programming, algorithms, and hardware design.'
      }
    ];
    
    sampleEducationItems.forEach(edu => {
      this.createEducation(edu as InsertEducation);
    });
  }

  // Profile methods
  async getProfile(id: number): Promise<Profile | undefined> {
    return this.profiles.get(id);
  }

  async getAllProfiles(): Promise<Profile[]> {
    return Array.from(this.profiles.values());
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const now = new Date();
    const id = this.profileId++;
    const profile: Profile = { 
      ...insertProfile, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.profiles.set(id, profile);
    return profile;
  }

  async updateProfile(id: number, profileUpdate: Partial<InsertProfile>): Promise<Profile | undefined> {
    const profile = this.profiles.get(id);
    if (!profile) return undefined;
    
    const updatedProfile = { 
      ...profile, 
      ...profileUpdate, 
      updatedAt: new Date() 
    };
    
    this.profiles.set(id, updatedProfile);
    return updatedProfile;
  }

  // Skills methods
  async getSkill(id: number): Promise<Skill | undefined> {
    return this.skillsMap.get(id);
  }

  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skillsMap.values());
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skillsMap.values()).filter(skill => skill.category === category);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.skillId++;
    const now = new Date();
    const skill: Skill = { ...insertSkill, id, createdAt: now };
    this.skillsMap.set(id, skill);
    return skill;
  }

  // Projects methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values());
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values()).filter(project => project.featured === 'true');
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const now = new Date();
    const project: Project = { ...insertProject, id, createdAt: now };
    this.projectsMap.set(id, project);
    return project;
  }

  // Experience methods
  async getExperience(id: number): Promise<Experience | undefined> {
    return this.experiencesMap.get(id);
  }

  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiencesMap.values())
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const id = this.experienceId++;
    const now = new Date();
    const experience: Experience = { ...insertExperience, id, createdAt: now };
    this.experiencesMap.set(id, experience);
    return experience;
  }

  // Education methods
  async getEducation(id: number): Promise<Education | undefined> {
    return this.educationMap.get(id);
  }

  async getAllEducation(): Promise<Education[]> {
    return Array.from(this.educationMap.values())
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const id = this.educationId++;
    const now = new Date();
    const education: Education = { ...insertEducation, id, createdAt: now };
    this.educationMap.set(id, education);
    return education;
  }
}

export const storage = new MemStorage();

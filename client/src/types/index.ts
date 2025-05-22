export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  location?: string;
  phone?: string;
  avatar?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'tools' | 'languages' | 'frameworks';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  icon?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface StatCard {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

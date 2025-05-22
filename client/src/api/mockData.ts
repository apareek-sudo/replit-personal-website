// This file provides data for GitHub Pages deployment
// For a real production site, you would replace this with actual API calls

import { Profile, Project, Skill, Experience, Education } from "../types";

export const profile: Profile = {
  id: 1,
  name: "John Doe",
  title: "Full-Stack Developer",
  bio: "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building user-friendly web applications with clean, maintainable code.",
  email: "john.doe@example.com",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  resumeUrl: "https://example.com/resume.pdf",
  githubUrl: "https://github.com/johndoe",
  linkedinUrl: "https://linkedin.com/in/johndoe",
  twitterUrl: "https://twitter.com/johndoe"
};

export const skills: Skill[] = [
  {
    id: 1,
    name: "React",
    category: "frontend",
    proficiency: "expert",
    icon: "react-icon.svg",
  },
  {
    id: 2,
    name: "TypeScript",
    category: "languages",
    proficiency: "advanced",
    icon: "typescript-icon.svg",
  },
  {
    id: 3,
    name: "Node.js",
    category: "backend",
    proficiency: "expert",
    icon: "nodejs-icon.svg",
  },
  {
    id: 4,
    name: "Express",
    category: "backend",
    proficiency: "advanced",
    icon: "express-icon.svg",
  },
  {
    id: 5,
    name: "MongoDB",
    category: "backend",
    proficiency: "intermediate",
    icon: "mongodb-icon.svg",
  },
  {
    id: 6,
    name: "PostgreSQL",
    category: "backend",
    proficiency: "advanced",
    icon: "postgresql-icon.svg",
  },
  {
    id: 7,
    name: "Docker",
    category: "devops",
    proficiency: "intermediate",
    icon: "docker-icon.svg",
  },
  {
    id: 8,
    name: "AWS",
    category: "devops",
    proficiency: "intermediate",
    icon: "aws-icon.svg",
  },
  {
    id: 9,
    name: "Git",
    category: "tools",
    proficiency: "expert",
    icon: "git-icon.svg",
  },
  {
    id: 10,
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: "expert",
    icon: "tailwind-icon.svg",
  },
  {
    id: 11,
    name: "Python",
    category: "languages",
    proficiency: "intermediate",
    icon: "python-icon.svg",
  },
  {
    id: 12,
    name: "GraphQL",
    category: "backend",
    proficiency: "intermediate",
    icon: "graphql-icon.svg",
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product catalog, shopping cart, and payment processing with Stripe.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/johndoe/ecommerce",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Tailwind CSS"],
    featured: "true"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates using Socket.io. Features include task creation, assignment, status tracking, and team collaboration tools.",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/johndoe/taskmanager",
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Socket.io", "Redis"],
    featured: "true"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard that displays current weather conditions and forecasts for multiple locations. Uses the OpenWeatherMap API and features a clean, responsive design.",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/weather",
    githubUrl: "https://github.com/johndoe/weatherapp",
    technologies: ["JavaScript", "React", "Chart.js", "OpenWeatherMap API", "CSS Grid", "Geolocation API"],
    featured: "true"
  },
  {
    id: 4,
    title: "Blog Platform",
    description: "A full-stack blog platform with features for content creation, user comments, and content categorization. Includes an admin dashboard for content management.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/blog",
    githubUrl: "https://github.com/johndoe/blogplatform",
    technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AWS S3", "Auth0"],
    featured: "false"
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A responsive portfolio website built with React and Tailwind CSS. Features include a project showcase, skills section, and contact form.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/johndoe/portfolio",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    featured: "false"
  }
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    position: "Senior Full-Stack Developer",
    location: "San Francisco, CA",
    startDate: "2021-03-01",
    description: "Lead a team of developers in building scalable web applications. Implement best practices for code quality and performance optimization. Mentor junior developers and conduct code reviews."
  },
  {
    id: 2,
    company: "WebSolutions LLC",
    position: "Full-Stack Developer",
    location: "New York, NY",
    startDate: "2018-07-01",
    endDate: "2021-02-28",
    description: "Developed and maintained multiple client websites and web applications. Collaborated with UX/UI designers to implement responsive designs. Optimized application performance and improved code quality."
  },
  {
    id: 3,
    company: "Digital Creations",
    position: "Front-End Developer",
    location: "Chicago, IL",
    startDate: "2016-05-01",
    endDate: "2018-06-30",
    description: "Created responsive and accessible web interfaces for client projects. Collaborated with back-end developers to integrate front-end with APIs. Implemented and maintained CSS architecture."
  }
];

export const education: Education[] = [
  {
    id: 1,
    institution: "Stanford University",
    degree: "Master's Degree",
    field: "Computer Science",
    location: "Stanford, CA",
    startDate: "2014-09-01",
    endDate: "2016-06-30",
    description: "Specialized in Human-Computer Interaction and Web Technologies. Completed thesis on improving web accessibility for users with disabilities."
  },
  {
    id: 2,
    institution: "University of California, Berkeley",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    location: "Berkeley, CA",
    startDate: "2010-09-01",
    endDate: "2014-06-30",
    description: "Dean's List, Computer Science Student Association, Web Development Club. Participated in multiple hackathons and coding competitions."
  }
];
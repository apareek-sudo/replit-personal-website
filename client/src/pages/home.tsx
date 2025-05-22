import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, ExternalLink, Github, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Profile, Project, Skill } from "@/types";
import { getQueryFn } from "@/lib/queryClient";

export default function Home() {
  // Fetch profile data
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch featured projects
  const { data: featuredProjects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", { featured: true }],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch skills
  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const isLoading = profileLoading || projectsLoading || skillsLoading;

  return (
    <div className="container py-8 md:py-12 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              {isLoading ? (
                <div className="h-12 w-3/4 bg-muted animate-pulse rounded"></div>
              ) : (
                <>
                  Hi, I'm{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {profile?.name || "John Doe"}
                  </span>
                </>
              )}
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground">
              {isLoading ? (
                <div className="h-8 w-1/2 bg-muted animate-pulse rounded"></div>
              ) : (
                profile?.title || "Full-Stack Developer"
              )}
            </h2>
            <p className="text-lg text-muted-foreground max-w-prose">
              {isLoading ? (
                <>
                  <div className="h-6 w-full bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-6 w-5/6 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-6 w-4/6 bg-muted animate-pulse rounded"></div>
                </>
              ) : (
                profile?.bio ||
                "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building user-friendly web applications with clean, maintainable code."
              )}
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
            {isLoading ? (
              <div className="h-full w-full bg-muted animate-pulse"></div>
            ) : (
              <img
                src={profile?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                alt={profile?.name || "Profile"}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <CardContent className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
                      <div className="h-20 bg-muted animate-pulse rounded"></div>
                      <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                        <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                        <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            : featuredProjects?.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-muted-foreground flex-1">
                      {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3 mt-4">
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>
                      )}
                      <Button size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <FileCode className="mr-2 h-4 w-4" />
                          Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Skills</h2>
          <Button variant="ghost" asChild>
            <Link href="/about">
              More About Me <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array(12)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="flex items-center justify-center p-6 h-24">
                    <div className="h-8 w-full bg-muted animate-pulse rounded"></div>
                  </Card>
                ))
            : skills?.slice(0, 12).map((skill) => (
                <Card
                  key={skill.id}
                  className={`flex flex-col items-center justify-center p-6 h-24 border-2 ${
                    skill.proficiency === "expert"
                      ? "border-primary/50"
                      : skill.proficiency === "advanced"
                      ? "border-secondary/50"
                      : "border-transparent"
                  } hover:border-primary/50 transition-colors`}
                >
                  <span className="text-lg font-medium">{skill.name}</span>
                  <span className="text-xs text-muted-foreground mt-1 capitalize">
                    {skill.proficiency}
                  </span>
                </Card>
              ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Let's work together!</h2>
          <p className="text-lg text-muted-foreground">
            I'm currently available for freelance work or full-time positions.
            If you're interested in working together, let's get in touch.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href={profile?.resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
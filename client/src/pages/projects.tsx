import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, ExternalLink, Github, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Project } from "@/types";
import { getQueryFn } from "@/lib/queryClient";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch all projects
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Filter projects based on search query
  const filteredProjects = projects?.filter((project) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="container py-8 md:py-12 space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A collection of my projects, showcasing my skills and expertise in web development.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
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
          : filteredProjects?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any projects matching your search criteria. 
                  Try adjusting your search or view all projects.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  View All Projects
                </Button>
              </div>
            ) : (
              filteredProjects?.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl || "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.featured === "true" && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground flex-1">
                      {project.description.length > 120
                        ? `${project.description.substring(0, 120)}...`
                        : project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto">
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
              ))
            )}
      </div>
    </div>
  );
}
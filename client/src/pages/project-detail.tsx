import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar, 
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types";
import { getQueryFn } from "@/lib/queryClient";
import { useGitHubPagesData } from "../hooks/useGitHubPagesData";

export default function ProjectDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  
  // Check if we're running on GitHub Pages
  const { isGitHubPages, mockData } = useGitHubPagesData();
  
  // Redirect to projects page if id is not provided
  if (!id) {
    setLocation("/projects");
    return null;
  }
  
  // For GitHub Pages, get project directly from mock data
  const projectId = parseInt(id);
  const mockProject = isGitHubPages 
    ? mockData.projects.find(p => p.id === projectId) 
    : null;
  
  // Fetch project details from API when not on GitHub Pages
  const { data: apiProject, isLoading: apiLoading, error: apiError } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !isGitHubPages, // Don't run the query on GitHub Pages
  });
  
  // Fetch all projects for navigation from API when not on GitHub Pages
  const { data: apiAllProjects, isLoading: apiAllProjectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !isGitHubPages, // Don't run the query on GitHub Pages
  });
  
  // Use mock data on GitHub Pages, API data otherwise
  const project = isGitHubPages ? mockProject : apiProject;
  const allProjects = isGitHubPages ? mockData.projects : apiAllProjects;
  const isLoading = !isGitHubPages && (apiLoading || apiAllProjectsLoading);
  const error = !isGitHubPages ? apiError : (mockProject ? null : new Error("Project not found"));

  // Handle not found or error
  if (error) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  // Get previous and next project ids for navigation
  const getAdjacentProjects = () => {
    if (!allProjects || allProjects.length <= 1) return { prev: null, next: null };
    
    const currentIndex = allProjects.findIndex(p => p.id === Number(id));
    if (currentIndex === -1) return { prev: null, next: null };
    
    const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
    
    return { prev, next };
  };

  const { prev, next } = getAdjacentProjects();

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  return (
    <div className="container py-8 md:py-12 space-y-10">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      {isLoading ? (
        <div className="space-y-8">
          <div className="h-10 w-2/3 bg-muted animate-pulse rounded"></div>
          <div className="h-64 bg-muted animate-pulse rounded"></div>
          <div className="space-y-4">
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-full bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-2/3 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-4xl font-bold">{project?.title}</h1>
              <div className="flex flex-wrap gap-3">
                {project?.liveUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Live
                    </a>
                  </Button>
                )}
                {project?.githubUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project date information - createdAt might not be in the type */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Project Date</span>
            </div>

            {/* Project image */}
            {project?.imageUrl && (
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Technologies */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project?.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Project description */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Description</h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line">{project?.description}</p>
              </div>
            </div>
          </div>

          {/* Project navigation */}
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              {prev ? (
                <Button variant="outline" asChild>
                  <Link href={`/projects/${prev.id}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {prev.title}
                  </Link>
                </Button>
              ) : (
                <div></div>
              )}
              
              {next && (
                <Button variant="outline" asChild>
                  <Link href={`/projects/${next.id}`}>
                    {next.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
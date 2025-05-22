import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Download, DownloadCloud, MapPin, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Profile, Skill, Experience, Education } from "@/types";
import { getQueryFn } from "@/lib/queryClient";

export default function About() {
  // Fetch profile data
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch skills
  const { data: skills, isLoading: skillsLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch experiences
  const { data: experiences, isLoading: experiencesLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Fetch education
  const { data: education, isLoading: educationLoading } = useQuery<Education[]>({
    queryKey: ["/api/education"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const isLoading = profileLoading || skillsLoading || experiencesLoading || educationLoading;

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>) || {};

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="container py-8 md:py-12 space-y-16">
      {/* About Me Section */}
      <section className="space-y-8">
        <h1 className="text-4xl font-bold">About Me</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden mb-6">
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
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{profile?.name || "John Doe"}</h2>
                  <p className="text-muted-foreground">{profile?.title || "Full-Stack Developer"}</p>
                </div>
                
                {profile?.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                {profile?.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                      {profile.email}
                    </a>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button className="w-full" asChild>
                    <a href={profile?.resumeUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4 prose dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold">Bio</h3>
              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {profile?.bio || 
                "Passionate developer with expertise in React, Node.js, and cloud technologies. I love building user-friendly web applications with clean, maintainable code."}
              </p>
            </div>
            
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
              </TabsList>
              
              <TabsContent value="experience" className="space-y-4 pt-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="mb-4">
                      <CardContent className="p-6">
                        <div className="h-6 w-1/3 bg-muted animate-pulse rounded mb-4"></div>
                        <div className="h-4 w-1/4 bg-muted animate-pulse rounded mb-4"></div>
                        <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  experiences?.map((exp) => (
                    <Card key={exp.id} className="mb-4 border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold">{exp.position}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {exp.company}{exp.location ? `, ${exp.location}` : ""}
                        </p>
                        <p className="whitespace-pre-line">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="education" className="space-y-4 pt-6">
                {isLoading ? (
                  Array(2).fill(0).map((_, i) => (
                    <Card key={i} className="mb-4">
                      <CardContent className="p-6">
                        <div className="h-6 w-1/3 bg-muted animate-pulse rounded mb-4"></div>
                        <div className="h-4 w-1/4 bg-muted animate-pulse rounded mb-4"></div>
                        <div className="h-4 w-2/3 bg-muted animate-pulse rounded mb-2"></div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  education?.map((edu) => (
                    <Card key={edu.id} className="mb-4 border-l-4 border-l-secondary">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-semibold">{edu.degree} in {edu.field}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                        </p>
                        {edu.description && <p className="whitespace-pre-line">{edu.description}</p>}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="skills" className="pt-6">
                <div className="space-y-8">
                  {isLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {Array(12).fill(0).map((_, i) => (
                        <Card key={i} className="flex items-center justify-center p-6 h-24">
                          <div className="h-8 w-full bg-muted animate-pulse rounded"></div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                      <div key={category} className="space-y-4">
                        <h4 className="text-xl font-semibold capitalize">{category}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {categorySkills.map((skill) => (
                            <Card
                              key={skill.id}
                              className={`flex flex-col items-center justify-center p-6 h-24 border-2 ${
                                skill.proficiency === "expert"
                                  ? "border-primary/50"
                                  : skill.proficiency === "advanced"
                                  ? "border-secondary/50"
                                  : "border-transparent"
                              }`}
                            >
                              <span className="text-lg font-medium">{skill.name}</span>
                              <span className="text-xs text-muted-foreground mt-1 capitalize">
                                {skill.proficiency}
                              </span>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="pt-8">
              <Button asChild>
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Mail, MapPin, Phone, Github, Linkedin, Twitter, Send, Loader2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Profile } from "@/types";
import { getQueryFn } from "@/lib/queryClient";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Fetch profile data
  const { data: profile, isLoading } = useQuery<Profile>({
    queryKey: ["/api/profile"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Here you would normally send the form data to your backend
    // For this demo, we'll just simulate a successful submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  // Social media links
  const socialLinks = [
    {
      name: "GitHub",
      url: profile?.githubUrl || "https://github.com/johndoe",
      icon: <Github className="h-5 w-5" />,
    },
    {
      name: "LinkedIn",
      url: profile?.linkedinUrl || "https://linkedin.com/in/johndoe",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      name: "Twitter",
      url: profile?.twitterUrl || "https://twitter.com/johndoe",
      icon: <Twitter className="h-5 w-5" />,
    },
  ];

  return (
    <div className="container py-8 md:py-12 space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Contact Me</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          I'm always open to new opportunities and collaborations. 
          Feel free to reach out if you have any questions or just want to say hello!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              
              <div className="space-y-4">
                {profile?.email && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Email</h3>
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {profile?.location && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Location</h3>
                      <p className="text-sm text-muted-foreground">{profile.location}</p>
                    </div>
                  </div>
                )}
                
                {profile?.phone && (
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Phone</h3>
                      <a 
                        href={`tel:${profile.phone}`} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-medium mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
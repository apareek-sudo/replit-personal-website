import { useState, useEffect } from 'react';
import { profile, skills, projects, experiences, education } from '../api/mockData';

// This hook detects if we're running on GitHub Pages and returns mock data instead of making API calls
export function useGitHubPagesData() {
  const [isGitHubPages, setIsGitHubPages] = useState(false);

  useEffect(() => {
    // Check if we're running on GitHub Pages or in a local/development environment
    // In a real app, you might check this differently
    const hostname = window.location.hostname;
    const isGitHubPagesHost = hostname.includes('github.io');
    setIsGitHubPages(isGitHubPagesHost || process.env.NODE_ENV === 'production');
  }, []);

  return {
    isGitHubPages,
    mockData: {
      profile,
      skills,
      projects,
      experiences,
      education
    }
  };
}
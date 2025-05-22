# MeetScribe Application Guide

## Overview

MeetScribe is a fullstack web application for managing meetings, transcriptions, and action items. The application follows a client-server architecture with a React frontend and an Express backend. It uses Drizzle ORM for database operations and follows a modern component-based UI approach with Shadcn UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a standard web application architecture with the following components:

1. **Frontend**: React-based single-page application using modern React patterns and hooks
2. **Backend**: Express.js server handling API requests and business logic
3. **Database**: PostgreSQL database accessed via Drizzle ORM
4. **State Management**: React Query for server state management
5. **Styling**: Tailwind CSS with a component library based on Radix UI primitives

The application is organized with clear separation between client and server code:
- `/client`: Contains all frontend React code
- `/server`: Contains the Express backend
- `/shared`: Contains shared types and database schema definitions

## Key Components

### Frontend

1. **UI Components**
   - Based on Shadcn UI (built on Radix UI primitives)
   - Organized in `/client/src/components/ui`
   - Custom components built on these primitives in `/client/src/components`

2. **Page Components**
   - Dashboard (`/client/src/pages/dashboard.tsx`)
   - 404 Page (`/client/src/pages/not-found.tsx`)

3. **Layout Components**
   - Sidebar (`/client/src/components/layout/Sidebar.tsx`)
   - MobileHeader (`/client/src/components/layout/MobileHeader.tsx`)
   - DesktopHeader (`/client/src/components/layout/DesktopHeader.tsx`)

4. **Dashboard Components**
   - StatCard
   - RecentMeetings
   - UpcomingMeetings
   - TranscriptionsSection
   - ActionItemsSection

5. **Context Providers**
   - SidebarContext for managing sidebar state

6. **Custom Hooks**
   - `use-sidebar`: Hook for sidebar functionality
   - `use-mobile`: Hook for responsive design
   - `use-toast`: Hook for toast notifications

### Backend

1. **Server Entry Point**
   - `server/index.ts`: Main Express server setup

2. **API Routes**
   - `server/routes.ts`: API route definitions

3. **Data Storage**
   - `server/storage.ts`: Storage interface and implementation
   - Currently using a memory-based storage implementation

4. **Database Schema**
   - `shared/schema.ts`: Defines database tables and relationships
   - Uses Drizzle ORM with PostgreSQL

### Database Schema

1. **Users Table**
   - Primary entity for user accounts
   - Fields: id, username, password, email, fullName, avatar, createdAt

2. **Meetings Table**
   - Stores meeting information
   - Fields: id, title, date, duration, status, createdById, createdAt

3. **Transcriptions Table**
   - Stores meeting transcriptions
   - Related to meetings

4. **Status Enum**
   - Defines possible statuses: scheduled, completed, cancelled, in_progress, not_started

## Data Flow

1. **User Authentication**
   - User logs in via the frontend
   - Server validates credentials and provides authentication

2. **Meeting Management**
   - Users can create, view, and manage meetings
   - Meeting data is stored in the database
   - Frontend displays meetings in dashboard components

3. **Transcription Flow**
   - Meetings can have transcriptions
   - Transcriptions are associated with meetings
   - Frontend displays transcriptions with related metadata

4. **Action Items**
   - Action items can be created from meetings
   - Users can track and update action item status
   - Frontend displays action items with filtering and sorting capabilities

## External Dependencies

1. **UI Components**
   - Radix UI primitives (@radix-ui/react-*)
   - Tailwind CSS for styling
   - Shadcn UI component patterns

2. **Data Management**
   - Drizzle ORM for database operations
   - React Query for client-side data fetching and caching

3. **Routing**
   - Wouter for client-side routing

4. **Database**
   - PostgreSQL (referenced in configuration)
   - Neon Database serverless connection (@neondatabase/serverless)

5. **Development Tools**
   - Vite for frontend development
   - TypeScript for type safety
   - ESBuild for production builds

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**
   - `npm run build`: Builds both frontend and backend
   - Vite builds the React frontend into static assets
   - ESBuild bundles the server code

2. **Runtime Configuration**
   - Node.js server runs the bundled backend code
   - Serves static frontend assets

3. **Environment Variables**
   - DATABASE_URL for database connection
   - NODE_ENV for environment detection

4. **Development Mode**
   - Uses Vite's development server with HMR
   - Express backend with API routes

The deployment is configured to auto-scale through Replit's deployment target settings in the `.replit` file.
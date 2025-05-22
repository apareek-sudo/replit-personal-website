import { Calendar, ClipboardList, Target, CheckCircle } from 'lucide-react';
import DesktopHeader from '@/components/layout/DesktopHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentMeetings from '@/components/dashboard/RecentMeetings';
import UpcomingMeetings from '@/components/dashboard/UpcomingMeetings';
import TranscriptionsSection from '@/components/dashboard/TranscriptionsSection';
import ActionItemsSection from '@/components/dashboard/ActionItemsSection';
import { Meeting, Transcription, ActionItem, User } from '@/types';

// Sample data for demo
const mockUsers: User[] = [
  {
    id: 1,
    username: 'sara.wilson',
    email: 'sara.wilson@example.com',
    fullName: 'Sara Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100'
  },
  {
    id: 2,
    username: 'tom.johnson',
    email: 'tom.johnson@example.com',
    fullName: 'Tom Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100'
  },
  {
    id: 3,
    username: 'michael.brown',
    email: 'michael.brown@example.com',
    fullName: 'Michael Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100'
  },
  {
    id: 4,
    username: 'alex.miller',
    email: 'alex.miller@example.com',
    fullName: 'Alex Miller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100'
  }
];

const mockRecentMeetings: Meeting[] = [
  {
    id: 1,
    title: 'Weekly Marketing Sync',
    date: '2023-05-12T10:00:00',
    duration: 45,
    status: 'completed',
    createdById: 1
  },
  {
    id: 2,
    title: 'Project Kickoff - Mobile App',
    date: '2023-05-10T14:30:00',
    duration: 60,
    status: 'completed',
    createdById: 1
  },
  {
    id: 3,
    title: 'Product Roadmap Discussion',
    date: '2023-05-09T11:00:00',
    duration: 75,
    status: 'completed',
    createdById: 1
  }
];

const mockUpcomingMeetings: Meeting[] = [
  {
    id: 4,
    title: 'Weekly Marketing Sync',
    date: '2023-05-19T10:00:00',
    duration: 45,
    status: 'scheduled',
    createdById: 1
  },
  {
    id: 5,
    title: 'Q2 Planning Session',
    date: '2023-05-17T13:00:00',
    duration: 90,
    status: 'scheduled',
    createdById: 1
  },
  {
    id: 6,
    title: 'Client Demo - New Features',
    date: '2023-05-16T15:30:00',
    duration: 60,
    status: 'in_progress',
    createdById: 1
  }
];

const mockTranscriptions: Transcription[] = [
  {
    id: 1,
    meetingId: 1,
    content: 'Discussed new campaign launch for Q2. Social media strategy needs refinement. Email campaign performing well with 24% open rate.',
    createdAt: '2023-05-12T10:45:00',
    meeting: mockRecentMeetings[0],
    actionItemsCount: 6,
    duration: 45,
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]]
  },
  {
    id: 2,
    meetingId: 2,
    content: 'Defined project scope and timelines. Design team to create wireframes by next week. Development starts in two weeks.',
    createdAt: '2023-05-10T15:30:00',
    meeting: mockRecentMeetings[1],
    actionItemsCount: 12,
    duration: 60,
    participants: [mockUsers[1], mockUsers[2], mockUsers[3], mockUsers[0]]
  },
  {
    id: 3,
    meetingId: 3,
    content: 'Prioritized Q3 features based on customer feedback. Mobile enhancements moved to Q4. API improvements scheduled for June.',
    createdAt: '2023-05-09T12:15:00',
    meeting: mockRecentMeetings[2],
    actionItemsCount: 8,
    duration: 75,
    participants: [mockUsers[0], mockUsers[3]]
  }
];

const mockActionItems: ActionItem[] = [
  {
    id: 1,
    task: 'Finalize Q2 marketing campaign budget',
    description: 'Waiting for approval from finance team',
    meetingId: 1,
    meeting: mockRecentMeetings[0],
    assignedToId: 1,
    assignedTo: mockUsers[0],
    dueDate: '2023-05-19T00:00:00',
    status: 'in_progress',
    completed: false
  },
  {
    id: 2,
    task: 'Create wireframes for mobile app',
    description: 'Due next week, design team to review',
    meetingId: 2,
    meeting: mockRecentMeetings[1],
    assignedToId: 2,
    assignedTo: mockUsers[1],
    dueDate: '2023-05-17T00:00:00',
    status: 'completed',
    completed: true
  },
  {
    id: 3,
    task: 'Schedule API improvements for June',
    description: 'Coordinate with engineering team on timeline',
    meetingId: 3,
    meeting: mockRecentMeetings[2],
    assignedToId: 3,
    assignedTo: mockUsers[2],
    dueDate: '2023-05-23T00:00:00',
    status: 'not_started',
    completed: false
  }
];

export default function Dashboard() {
  const stats = [
    { 
      title: 'Meetings This Week', 
      value: 12,
      icon: <Calendar className="h-6 w-6" />,
      color: 'primary' as const
    },
    { 
      title: 'Notes Created', 
      value: 47,
      icon: <ClipboardList className="h-6 w-6" />,
      color: 'secondary' as const
    },
    { 
      title: 'Action Items', 
      value: 24,
      icon: <Target className="h-6 w-6" />,
      color: 'accent' as const
    },
    { 
      title: 'Completed Items', 
      value: 18,
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'success' as const
    }
  ];

  return (
    <>
      <DesktopHeader 
        title="Dashboard" 
        subtitle="Welcome back, Sara!"
      />
      
      <div className="px-4 py-6 md:px-6 md:py-8">
        {/* Dashboard Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* Recent Meetings and Upcoming Meetings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RecentMeetings meetings={mockRecentMeetings} />
          <UpcomingMeetings meetings={mockUpcomingMeetings} />
        </div>

        {/* Recent Transcriptions Section */}
        <div className="mb-8">
          <TranscriptionsSection transcriptions={mockTranscriptions} />
        </div>

        {/* Action Items Section */}
        <div>
          <ActionItemsSection actionItems={mockActionItems} totalCount={24} />
        </div>
      </div>
    </>
  );
}

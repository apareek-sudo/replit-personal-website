import { Link } from 'wouter';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { Meeting } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Users, Clock, Megaphone } from 'lucide-react';

interface UpcomingMeetingsProps {
  meetings: Meeting[];
}

const MeetingIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'scheduled':
      return <Clock className="h-6 w-6" />;
    case 'in_progress':
      return <Users className="h-6 w-6" />;
    default:
      return <Megaphone className="h-6 w-6" />;
  }
};

const getTimeBadgeInfo = (dateString: string) => {
  const meetingDate = new Date(dateString);
  const now = new Date();
  
  // Calculate days difference
  const diffTime = meetingDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return { text: 'Past', class: 'bg-gray-100 text-gray-800' };
  if (diffDays === 0) return { text: 'Today', class: 'bg-red-100 text-red-800' };
  if (diffDays === 1) return { text: 'Tomorrow', class: 'bg-green-100 text-green-800' };
  if (diffDays <= 3) return { text: `In ${diffDays} days`, class: 'bg-blue-100 text-blue-800' };
  return { text: `In ${diffDays} days`, class: 'bg-gray-100 text-gray-800' };
};

export default function UpcomingMeetings({ meetings }: UpcomingMeetingsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
      ' - ' + 
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800">Upcoming Meetings</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="divide-y divide-gray-200">
          {meetings.map((meeting) => {
            const timeBadge = getTimeBadgeInfo(meeting.date);
            
            return (
              <li key={meeting.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-md flex items-center justify-center text-primary">
                      <MeetingIcon status={meeting.status} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-800">{meeting.title}</h3>
                      <p className="text-sm text-gray-500">{formatDate(meeting.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${timeBadge.class}`}>
                      {timeBadge.text}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="ml-4 text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit meeting</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Link href="/calendar" className="text-primary font-medium text-sm flex items-center justify-center w-full">
          View calendar
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

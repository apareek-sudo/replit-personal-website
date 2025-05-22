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

interface RecentMeetingsProps {
  meetings: Meeting[];
}

const MeetingIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'completed':
      return <Users className="h-6 w-6" />;
    case 'scheduled':
      return <Clock className="h-6 w-6" />;
    default:
      return <Megaphone className="h-6 w-6" />;
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: 'bg-success/10 text-success',
    scheduled: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
  };

  const statusDisplay = status === 'completed' ? 'Completed' : 
    status === 'in_progress' ? 'In Progress' : 
    status === 'scheduled' ? 'Scheduled' : 
    'Cancelled';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
      {statusDisplay}
    </span>
  );
};

export default function RecentMeetings({ meetings }: RecentMeetingsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + 
      ' - ' + 
      date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Meetings</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="divide-y divide-gray-200">
          {meetings.map((meeting) => (
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
                  <StatusBadge status={meeting.status} />
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
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Link href="/meetings" className="text-primary font-medium text-sm flex items-center justify-center w-full">
          View all meetings
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

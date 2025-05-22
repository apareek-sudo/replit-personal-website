import { Link } from 'wouter';
import { ChevronRight, Share2, Copy, Clock, Target } from 'lucide-react';
import { Transcription, User } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';

interface TranscriptionsSectionProps {
  transcriptions: Transcription[];
}

export default function TranscriptionsSection({ transcriptions }: TranscriptionsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDuration = (minutes: number) => {
    return `${minutes} min`;
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">Recent Transcriptions</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
            Sort
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transcriptions.map((transcription) => (
            <div key={transcription.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-500">{formatDate(transcription.createdAt)}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Completed
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-800 mb-2">{transcription.meeting?.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {transcription.content.substring(0, 120)}...
                </p>
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDuration(transcription.duration || 0)}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    <span>{transcription.actionItemsCount || 0} action items</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {(transcription.participants || []).slice(0, 3).map((participant, index) => (
                      <UserAvatar
                        key={index}
                        src={participant.avatar}
                        name={participant.fullName}
                        size="sm"
                        className="border-2 border-white"
                      />
                    ))}
                  </div>
                  {(transcription.participants?.length || 0) > 3 && (
                    <span className="text-xs text-gray-500 ml-2">+{(transcription.participants?.length || 0) - 3} more</span>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between">
                <Link href={`/transcriptions/${transcription.id}`} className="text-primary text-sm font-medium flex items-center">
                  View details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <Link href="/transcriptions" className="text-primary font-medium text-sm flex items-center justify-center w-full">
          View all transcriptions
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

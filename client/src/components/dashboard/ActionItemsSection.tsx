import { Link } from 'wouter';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import { ActionItem } from '@/types';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';

interface ActionItemsSectionProps {
  actionItems: ActionItem[];
  totalCount: number;
}

export default function ActionItemsSection({ actionItems, totalCount }: ActionItemsSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      not_started: 'bg-blue-100 text-blue-800',
    };
    
    const statusDisplay = status === 'completed' ? 'Completed' : 
      status === 'in_progress' ? 'In Progress' : 'Not Started';

    return (
      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-medium rounded-full ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusDisplay}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">Action Items</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-7 px-3 text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 border-0">
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meeting
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actionItems.map((item) => (
                <tr 
                  key={item.id} 
                  className={`${
                    !checkedItems[item.id] && item.status === 'not_started' ? 'action-item' : ''
                  } ${
                    checkedItems[item.id] ? 'bg-gray-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Checkbox 
                        id={`task-${item.id}`}
                        className="h-4 w-4 text-primary mr-3"
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.task}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.meeting?.title}</div>
                    <div className="text-sm text-gray-500">{formatDate(item.meeting?.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.assignedTo && (
                      <div className="flex items-center">
                        <UserAvatar
                          src={item.assignedTo.avatar}
                          name={item.assignedTo.fullName}
                          size="sm"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{item.assignedTo.fullName}</div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(item.dueDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Reassign</DropdownMenuItem>
                        <DropdownMenuItem>Mark as completed</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex items-center justify-between">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button variant="outline" size="sm" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{actionItems.length}</span> of <span className="font-medium">{totalCount}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <Button variant="outline" size="sm" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="default" size="sm" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-primary text-white">
                1
              </Button>
              <Button variant="outline" size="sm" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </Button>
              <Button variant="outline" size="sm" className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </Button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <Button variant="outline" size="sm" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                8
              </Button>
              <Button variant="outline" size="sm" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </nav>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

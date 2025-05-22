import { useSidebar } from '@/hooks/use-sidebar';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Menu, Bell } from 'lucide-react';

export default function MobileHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="mr-2 p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-primary">MeetScribe</h1>
        </div>
        <div className="flex items-center">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-error text-white text-xs">3</span>
          </button>
          <div className="ml-2">
            <UserAvatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
              name="Sara Wilson"
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

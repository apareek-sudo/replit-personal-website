import { Link, useLocation } from 'wouter';
import { useSidebar } from '@/hooks/use-sidebar';
import { UserAvatar } from '@/components/ui/user-avatar';
import { 
  Home, 
  ClipboardList, 
  Target, 
  Users, 
  Calendar, 
  PlusCircle, 
  Settings, 
  X
} from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const NavLink = ({ href, icon, label, active }: NavLinkProps) => {
  const baseClasses = "group flex items-center px-3 py-2 text-sm font-medium rounded-md";
  const activeClasses = "bg-primary/10 text-primary";
  const inactiveClasses = "text-gray-700 hover:bg-gray-100";
  
  return (
    <Link href={href}>
      <a className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
        <span className={`mr-3 ${active ? '' : 'text-gray-500'}`}>{icon}</span>
        {label}
      </a>
    </Link>
  );
};

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const [location] = useLocation();
  const { closeSidebar } = useSidebar();

  const links = [
    { href: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { href: '/meetings', icon: <ClipboardList size={20} />, label: 'My Meetings' },
    { href: '/action-items', icon: <Target size={20} />, label: 'Action Items' },
    { href: '/teams', icon: <Users size={20} />, label: 'Teams' },
    { href: '/calendar', icon: <Calendar size={20} />, label: 'Calendar' },
  ];

  return (
    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="bg-primary rounded-md p-2 mr-3">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary">MeetScribe</h1>
        </div>
        {mobile && (
          <button 
            onClick={closeSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      <div className="mt-6 px-4">
        <button className="w-full flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors">
          <PlusCircle className="h-5 w-5 mr-2" />
          New Meeting
        </button>
      </div>
      <nav className="mt-6 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            active={location === link.href}
          />
        ))}
      </nav>
      <div className="flex-grow"></div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <UserAvatar
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
            name="Sara Wilson"
            size="md"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Sara Wilson</p>
            <p className="text-xs text-gray-500">sara.wilson@example.com</p>
          </div>
          <button className="ml-auto p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

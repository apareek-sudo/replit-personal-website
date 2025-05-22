import { Search, Bell, HelpCircle } from 'lucide-react';

interface DesktopHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DesktopHeader({ title, subtitle }: DesktopHeaderProps) {
  return (
    <header className="hidden md:flex bg-white shadow-sm z-10">
      <div className="flex-1 flex justify-between items-center px-6 py-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className="flex items-center ml-4">
          <div className="relative mr-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-64 bg-gray-100 border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-error text-white text-xs">3</span>
          </button>
          <button className="ml-3 p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

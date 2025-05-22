import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

export default function StatCard({ title, value, icon, color }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
      <div className={`p-3 rounded-full ${colorClasses[color]} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

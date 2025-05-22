import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({ src, name, size = 'md', className = '' }: UserAvatarProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Determine size class
  const sizeClass = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }[size];

  return (
    <Avatar className={`${sizeClass} ${className} border border-gray-200`}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-primary/10 text-primary">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}

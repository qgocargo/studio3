import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { teamMembers } from '@/lib/data';
import type { TeamMember } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const statusColors: Record<TeamMember['status'], string> = {
  Available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'On Job': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'On Leave': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const roleColors: Record<TeamMember['role'], string> = {
    Supervisor: 'bg-primary/10 text-primary',
    Carpenter: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Driver: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    Laborer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
}

export default function TeamPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
        <p className="text-muted-foreground">
          View and manage your warehouse and logistics team.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint={member.imageHint} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className={cn("text-sm font-medium px-2 py-0.5 rounded-full mt-1", roleColors[member.role])}>{member.role}</p>
              <div className="mt-4">
                <Badge className={cn("text-xs", statusColors[member.status])}>
                  {member.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

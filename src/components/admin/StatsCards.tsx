import { Users, UserCheck, GraduationCap, TrendingUp } from 'lucide-react';

interface Stats {
  total: number;
  byStatus: {
    new: number;
    contacted: number;
    enrolled: number;
  };
  byLevel: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  averageScore: number;
}

interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Candidates',
      value: stats.total,
      icon: <Users className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'New Leads',
      value: stats.byStatus.new,
      icon: <UserCheck className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Enrolled',
      value: stats.byStatus.enrolled,
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Avg. Score',
      value: stats.averageScore,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-card rounded-lg border border-border p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
              <p className="text-3xl font-bold text-foreground">{card.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import { useMemo } from 'react';
import { Candidate } from '@/types/test';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';
import { format, subDays, startOfDay, isAfter } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DashboardChartsProps {
  candidates: Candidate[];
}

const LEVEL_COLORS = {
  beginner: '#3B82F6',
  intermediate: '#F59E0B',
  advanced: '#22C55E',
};

const LEVEL_LABELS = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

export function DashboardCharts({ candidates }: DashboardChartsProps) {
  const levelData = useMemo(() => {
    const counts = {
      beginner: candidates.filter(c => c.level === 'beginner').length,
      intermediate: candidates.filter(c => c.level === 'intermediate').length,
      advanced: candidates.filter(c => c.level === 'advanced').length,
    };
    
    return Object.entries(counts).map(([level, count]) => ({
      name: LEVEL_LABELS[level as keyof typeof LEVEL_LABELS],
      value: count,
      color: LEVEL_COLORS[level as keyof typeof LEVEL_COLORS],
    }));
  }, [candidates]);

  const dailyData = useMemo(() => {
    const today = startOfDay(new Date());
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = subDays(today, 6 - i);
      return {
        date,
        label: format(date, 'EEE', { locale: fr }),
        fullLabel: format(date, 'd MMM', { locale: fr }),
        count: 0,
      };
    });

    candidates.forEach(candidate => {
      const candidateDate = startOfDay(new Date(candidate.created_at));
      const dayIndex = days.findIndex(d => 
        format(d.date, 'yyyy-MM-dd') === format(candidateDate, 'yyyy-MM-dd')
      );
      if (dayIndex !== -1) {
        days[dayIndex].count++;
      }
    });

    return days;
  }, [candidates]);

  const totalForPie = levelData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart - Level Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Répartition par Niveau</CardTitle>
        </CardHeader>
        <CardContent>
          {totalForPie === 0 ? (
            <div className="h-[250px] flex items-center justify-center text-muted-foreground">
              Aucune donnée disponible
            </div>
          ) : (
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value} candidats`, 'Total']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-4">
            {levelData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart - Daily Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-serif">Tests par Jour (7 derniers jours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis 
                  dataKey="label" 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value} tests`, 'Nombre']}
                  labelFormatter={(_, payload) => payload[0]?.payload?.fullLabel || ''}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
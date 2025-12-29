import { useMemo } from 'react';
import { Candidate } from '@/types/test';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, Calendar, TrendingUp } from 'lucide-react';
import { startOfDay, startOfWeek, isAfter, isEqual } from 'date-fns';

interface DashboardKPIsProps {
  candidates: Candidate[];
}

export function DashboardKPIs({ candidates }: DashboardKPIsProps) {
  const kpis = useMemo(() => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday

    const testsToday = candidates.filter(c => {
      const createdAt = new Date(c.created_at);
      return isAfter(createdAt, todayStart) || isEqual(startOfDay(createdAt), todayStart);
    }).length;

    const testsThisWeek = candidates.filter(c => {
      const createdAt = new Date(c.created_at);
      return isAfter(createdAt, weekStart) || isEqual(startOfDay(createdAt), weekStart);
    }).length;

    const totalLeads = candidates.length;
    const enrolledCount = candidates.filter(c => c.status === 'enrolled').length;

    const levelDistribution = {
      beginner: candidates.filter(c => c.level === 'beginner').length,
      intermediate: candidates.filter(c => c.level === 'intermediate').length,
      advanced: candidates.filter(c => c.level === 'advanced').length,
    };

    const levelPercentages = {
      beginner: totalLeads > 0 ? Math.round((levelDistribution.beginner / totalLeads) * 100) : 0,
      intermediate: totalLeads > 0 ? Math.round((levelDistribution.intermediate / totalLeads) * 100) : 0,
      advanced: totalLeads > 0 ? Math.round((levelDistribution.advanced / totalLeads) * 100) : 0,
    };

    return {
      testsToday,
      testsThisWeek,
      totalLeads,
      enrolledCount,
      levelDistribution,
      levelPercentages,
    };
  }, [candidates]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Tests Today */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tests Aujourd'hui</p>
              <p className="text-3xl font-bold text-foreground mt-1">{kpis.testsToday}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tests This Week */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tests Cette Semaine</p>
              <p className="text-3xl font-bold text-foreground mt-1">{kpis.testsThisWeek}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Leads */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
              <p className="text-3xl font-bold text-foreground mt-1">{kpis.totalLeads}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrolled */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inscrits</p>
              <p className="text-3xl font-bold text-foreground mt-1">{kpis.enrolledCount}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Distribution */}
      <Card className="sm:col-span-2 lg:col-span-4">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-muted-foreground mb-4">Distribution par Niveau</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                <span className="text-lg font-bold text-blue-600">{kpis.levelPercentages.beginner}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Débutant</p>
              <p className="text-xs text-muted-foreground">({kpis.levelDistribution.beginner})</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-2">
                <span className="text-lg font-bold text-amber-600">{kpis.levelPercentages.intermediate}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Intermédiaire</p>
              <p className="text-xs text-muted-foreground">({kpis.levelDistribution.intermediate})</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
                <span className="text-lg font-bold text-green-600">{kpis.levelPercentages.advanced}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Avancé</p>
              <p className="text-xs text-muted-foreground">({kpis.levelDistribution.advanced})</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
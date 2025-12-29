import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { LoginForm } from '@/components/admin/LoginForm';
import { CandidateTable } from '@/components/admin/CandidateTable';
import { DashboardKPIs } from '@/components/admin/DashboardKPIs';
import { DashboardCharts } from '@/components/admin/DashboardCharts';
import { CandidateFilters, CandidateFiltersState } from '@/components/admin/CandidateFilters';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw, Loader2, ShieldX } from 'lucide-react';
import { startOfDay, isEqual } from 'date-fns';

export default function Admin() {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const { candidates, isLoading, updateCandidateStatus, refetch } = useAdmin();
  
  const [filters, setFilters] = useState<CandidateFiltersState>({
    level: 'all',
    status: 'all',
    date: undefined,
  });

  // Filter candidates based on selected filters
  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      // Level filter
      if (filters.level !== 'all' && candidate.level !== filters.level) {
        return false;
      }
      // Status filter
      if (filters.status !== 'all' && candidate.status !== filters.status) {
        return false;
      }
      // Date filter
      if (filters.date) {
        const candidateDate = startOfDay(new Date(candidate.created_at));
        const filterDate = startOfDay(filters.date);
        if (!isEqual(candidateDate, filterDate)) {
          return false;
        }
      }
      return true;
    });
  }, [candidates, filters]);

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <LoginForm />;
  }

  // Not an admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-2">Accès Refusé</h1>
          <p className="text-muted-foreground mb-6">
            Vous n'avez pas les privilèges administrateur pour accéder à ce tableau de bord.
          </p>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Se Déconnecter
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-foreground">Tableau de Bord Admin</h1>
            <p className="text-sm text-muted-foreground">Gérer les candidats et suivre les conversions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={refetch} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <>
            {/* KPIs */}
            <section className="mb-8">
              <h2 className="font-serif text-xl text-foreground mb-4">Vue d'Ensemble</h2>
              <DashboardKPIs candidates={candidates} />
            </section>

            {/* Charts */}
            <section className="mb-8">
              <DashboardCharts candidates={candidates} />
            </section>

            {/* Candidates Table */}
            <section>
              <h2 className="font-serif text-xl text-foreground mb-4">
                Tous les Candidats
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredCandidates.length} sur {candidates.length})
                </span>
              </h2>
              <CandidateFilters 
                filters={filters} 
                onFiltersChange={setFilters} 
              />
              <CandidateTable 
                candidates={filteredCandidates} 
                onStatusChange={updateCandidateStatus}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
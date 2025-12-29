import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { LoginForm } from '@/components/admin/LoginForm';
import { CandidateTable } from '@/components/admin/CandidateTable';
import { StatsCards } from '@/components/admin/StatsCards';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCw, Loader2, ShieldX } from 'lucide-react';

export default function Admin() {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const { candidates, isLoading, updateCandidateStatus, getStatistics, refetch } = useAdmin();

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
          <h1 className="font-serif text-2xl text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges to access this dashboard.
          </p>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const stats = getStatistics();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage candidates and track conversions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={refetch} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <section className="mb-8">
          <StatsCards stats={stats} />
        </section>

        {/* Level Distribution */}
        <section className="mb-8">
          <h2 className="font-serif text-xl text-foreground mb-4">Level Distribution</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Beginner</span>
                <span className="text-2xl font-bold text-foreground">{stats.byLevel.beginner}</span>
              </div>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.byLevel.beginner / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Intermediate</span>
                <span className="text-2xl font-bold text-foreground">{stats.byLevel.intermediate}</span>
              </div>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.byLevel.intermediate / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Advanced</span>
                <span className="text-2xl font-bold text-foreground">{stats.byLevel.advanced}</span>
              </div>
              <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${stats.total > 0 ? (stats.byLevel.advanced / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Candidates Table */}
        <section>
          <h2 className="font-serif text-xl text-foreground mb-4">All Candidates</h2>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <CandidateTable 
              candidates={candidates} 
              onStatusChange={updateCandidateStatus}
            />
          )}
        </section>
      </main>
    </div>
  );
}

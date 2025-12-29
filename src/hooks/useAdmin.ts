import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Candidate, CandidateStatus, UserAnswer } from '@/types/test';
import { useToast } from '@/hooks/use-toast';

export function useAdmin() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCandidates = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const parsedCandidates: Candidate[] = (data || []).map(c => ({
        ...c,
        answers: c.answers as unknown as UserAnswer[] | null,
        notes: c.notes ?? null,
      }));

      setCandidates(parsedCandidates);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load candidates';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const updateCandidateStatus = useCallback(async (
    candidateId: string, 
    newStatus: CandidateStatus
  ) => {
    try {
      const { error } = await supabase
        .from('candidates')
        .update({ status: newStatus })
        .eq('id', candidateId);

      if (error) throw error;

      setCandidates(prev => 
        prev.map(c => 
          c.id === candidateId ? { ...c, status: newStatus } : c
        )
      );

      toast({
        title: 'Status updated',
        description: `Candidate status changed to ${newStatus}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update status';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }
  }, [toast]);

  const getStatistics = useCallback(() => {
    const total = candidates.length;
    const byStatus = {
      new: candidates.filter(c => c.status === 'new').length,
      contacted: candidates.filter(c => c.status === 'contacted').length,
      enrolled: candidates.filter(c => c.status === 'enrolled').length,
      rejected: candidates.filter(c => c.status === 'rejected').length,
    };
    const byLevel = {
      beginner: candidates.filter(c => c.level === 'beginner').length,
      intermediate: candidates.filter(c => c.level === 'intermediate').length,
      advanced: candidates.filter(c => c.level === 'advanced').length,
    };
    const averageScore = total > 0 
      ? Math.round(candidates.reduce((sum, c) => sum + c.score, 0) / total)
      : 0;

    return { total, byStatus, byLevel, averageScore };
  }, [candidates]);

  return {
    candidates,
    isLoading,
    error,
    updateCandidateStatus,
    getStatistics,
    refetch: fetchCandidates,
  };
}

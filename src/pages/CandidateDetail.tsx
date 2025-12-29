import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Candidate, CandidateStatus, LEVEL_LABELS, STATUS_LABELS, UserAnswer } from '@/types/test';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  GraduationCap,
  Save,
  CheckCircle,
  XCircle,
  MessageSquare,
  ShieldX
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export default function CandidateDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const { toast } = useToast();

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const fetchCandidate = useCallback(async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const parsedCandidate: Candidate = {
          ...data,
          answers: data.answers as unknown as UserAnswer[] | null,
        };
        setCandidate(parsedCandidate);
        setNotes(data.notes || '');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchCandidate();
    }
  }, [user, isAdmin, fetchCandidate]);

  const saveNotes = async () => {
    if (!candidate) return;

    try {
      setIsSavingNotes(true);
      const { error } = await supabase
        .from('candidates')
        .update({ notes })
        .eq('id', candidate.id);

      if (error) throw error;

      toast({
        title: 'Notes enregistrées',
        description: 'Les notes ont été mises à jour avec succès.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la sauvegarde';
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSavingNotes(false);
    }
  };

  const updateStatus = async (newStatus: CandidateStatus) => {
    if (!candidate) return;

    try {
      setIsUpdatingStatus(true);
      const { error } = await supabase
        .from('candidates')
        .update({ status: newStatus })
        .eq('id', candidate.id);

      if (error) throw error;

      setCandidate({ ...candidate, status: newStatus });
      toast({
        title: 'Statut mis à jour',
        description: `Le candidat est maintenant "${STATUS_LABELS[newStatus]}".`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la mise à jour';
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const statusColors: Record<CandidateStatus, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-amber-100 text-amber-700',
    enrolled: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const levelColors: Record<string, string> = {
    beginner: 'bg-blue-100 text-blue-700',
    intermediate: 'bg-amber-100 text-amber-700',
    advanced: 'bg-green-100 text-green-700',
  };

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Not logged in or not admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-serif text-2xl text-foreground mb-2">Accès Refusé</h1>
          <p className="text-muted-foreground mb-6">
            Vous n'avez pas les privilèges pour accéder à cette page.
          </p>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            Retour
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle px-4">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-foreground mb-2">Candidat non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Ce candidat n'existe pas ou a été supprimé.
          </p>
          <Button variant="outline" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <div className="flex-1">
            <h1 className="font-serif text-xl text-foreground">Fiche Candidat</h1>
          </div>
          <Badge className={cn('text-sm', statusColors[candidate.status])}>
            {STATUS_LABELS[candidate.status]}
          </Badge>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Informations Personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Nom complet</p>
                  <p className="font-medium">{candidate.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${candidate.email}`} className="font-medium text-primary hover:underline">
                    {candidate.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <a href={`tel:${candidate.phone}`} className="font-medium text-primary hover:underline">
                    {candidate.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Date du test</p>
                  <p className="font-medium">
                    {format(new Date(candidate.created_at), 'd MMMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Résultats du Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Score Total</p>
                <p className="text-4xl font-bold text-foreground">{candidate.score}</p>
                <p className="text-xs text-muted-foreground mt-1">points</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Niveau</p>
                <Badge className={cn('text-lg px-4 py-1', levelColors[candidate.level])}>
                  {LEVEL_LABELS[candidate.level]}
                </Badge>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Questions répondues</p>
                <p className="text-4xl font-bold text-foreground">
                  {candidate.answers?.length || 0}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Formation recommandée</p>
                <p className="font-medium text-foreground">{candidate.recommended_training}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Internal Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Notes Internes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Ajoutez vos notes de suivi ici... (visible uniquement par les administrateurs)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <Button onClick={saveNotes} disabled={isSavingNotes}>
              {isSavingNotes ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Enregistrer les notes
            </Button>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={candidate.status === 'contacted' ? 'default' : 'outline'}
                onClick={() => updateStatus('contacted')}
                disabled={isUpdatingStatus || candidate.status === 'contacted'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Marquer comme Contacté
              </Button>
              <Button
                variant={candidate.status === 'enrolled' ? 'default' : 'outline'}
                onClick={() => updateStatus('enrolled')}
                disabled={isUpdatingStatus || candidate.status === 'enrolled'}
                className={candidate.status !== 'enrolled' ? 'border-green-200 text-green-700 hover:bg-green-50' : ''}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Marquer comme Inscrit
              </Button>
              <Button
                variant={candidate.status === 'rejected' ? 'default' : 'outline'}
                onClick={() => updateStatus('rejected')}
                disabled={isUpdatingStatus || candidate.status === 'rejected'}
                className={candidate.status !== 'rejected' ? 'border-red-200 text-red-700 hover:bg-red-50' : ''}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Marquer comme Rejeté
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
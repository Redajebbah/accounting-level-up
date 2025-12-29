import { Candidate, CandidateStatus, CandidateLevel, STATUS_LABELS, LEVEL_LABELS } from '@/types/test';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CandidateTableProps {
  candidates: Candidate[];
  onStatusChange: (candidateId: string, status: CandidateStatus) => void;
}

export function CandidateTable({ candidates, onStatusChange }: CandidateTableProps) {
  const statusColors: Record<CandidateStatus, string> = {
    new: 'bg-blue-100 text-blue-700 border-blue-200',
    contacted: 'bg-amber-100 text-amber-700 border-amber-200',
    enrolled: 'bg-green-100 text-green-700 border-green-200',
  };

  const levelColors: Record<CandidateLevel, string> = {
    beginner: 'bg-secondary text-secondary-foreground',
    intermediate: 'bg-accent/20 text-accent-foreground',
    advanced: 'bg-primary/10 text-primary',
  };

  if (candidates.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <p className="text-muted-foreground">Aucun candidat pour le moment</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50">
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead>Niveau</TableHead>
            <TableHead>Formation</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} className="hover:bg-secondary/30">
              <TableCell className="font-medium">{candidate.full_name}</TableCell>
              <TableCell className="text-muted-foreground">{candidate.email}</TableCell>
              <TableCell className="text-muted-foreground">{candidate.phone}</TableCell>
              <TableCell className="text-center font-semibold">{candidate.score}</TableCell>
              <TableCell>
                <Badge className={cn('capitalize', levelColors[candidate.level])}>
                  {LEVEL_LABELS[candidate.level]}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                {candidate.recommended_training}
              </TableCell>
              <TableCell>
                <Select
                  value={candidate.status}
                  onValueChange={(value: CandidateStatus) => 
                    onStatusChange(candidate.id, value)
                  }
                >
                  <SelectTrigger className={cn(
                    'w-[120px] h-8 text-xs border',
                    statusColors[candidate.status]
                  )}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">{STATUS_LABELS.new}</SelectItem>
                    <SelectItem value="contacted">{STATUS_LABELS.contacted}</SelectItem>
                    <SelectItem value="enrolled">{STATUS_LABELS.enrolled}</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(candidate.created_at), 'd MMM yyyy', { locale: fr })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

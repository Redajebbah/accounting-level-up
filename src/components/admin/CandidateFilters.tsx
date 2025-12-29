import { CandidateLevel, CandidateStatus, LEVEL_LABELS, STATUS_LABELS } from '@/types/test';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export interface CandidateFiltersState {
  level: CandidateLevel | 'all';
  status: CandidateStatus | 'all';
  date: Date | undefined;
}

interface CandidateFiltersProps {
  filters: CandidateFiltersState;
  onFiltersChange: (filters: CandidateFiltersState) => void;
}

export function CandidateFilters({ filters, onFiltersChange }: CandidateFiltersProps) {
  const hasActiveFilters = filters.level !== 'all' || filters.status !== 'all' || filters.date;

  const clearFilters = () => {
    onFiltersChange({ level: 'all', status: 'all', date: undefined });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border border-border mb-4">
      <span className="text-sm font-medium text-muted-foreground">Filtres:</span>
      
      {/* Level Filter */}
      <Select
        value={filters.level}
        onValueChange={(value) => onFiltersChange({ ...filters, level: value as CandidateLevel | 'all' })}
      >
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Niveau" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les niveaux</SelectItem>
          <SelectItem value="beginner">{LEVEL_LABELS.beginner}</SelectItem>
          <SelectItem value="intermediate">{LEVEL_LABELS.intermediate}</SelectItem>
          <SelectItem value="advanced">{LEVEL_LABELS.advanced}</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={filters.status}
        onValueChange={(value) => onFiltersChange({ ...filters, status: value as CandidateStatus | 'all' })}
      >
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les statuts</SelectItem>
          <SelectItem value="new">{STATUS_LABELS.new}</SelectItem>
          <SelectItem value="contacted">{STATUS_LABELS.contacted}</SelectItem>
          <SelectItem value="enrolled">{STATUS_LABELS.enrolled}</SelectItem>
          <SelectItem value="rejected">{STATUS_LABELS.rejected}</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[180px] h-9 justify-start text-left font-normal',
              !filters.date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.date ? format(filters.date, 'd MMMM yyyy', { locale: fr }) : 'Date du test'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={filters.date}
            onSelect={(date) => onFiltersChange({ ...filters, date })}
            locale={fr}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9">
          <X className="w-4 h-4 mr-1" />
          Effacer
        </Button>
      )}
    </div>
  );
}
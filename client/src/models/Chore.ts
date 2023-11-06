export interface Chore {
  id: number;
  name: string;
  description?: string;
  points: number;
  daysOfWeek: number[];
}

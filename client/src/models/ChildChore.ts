import { Chore } from "./Chore";

export interface ChildChore {
  id: number;
  childId: number;
  chore?: Chore;
  status: string;
  date: Date;
  note?: string;
}

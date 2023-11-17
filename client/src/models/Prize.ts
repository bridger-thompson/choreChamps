export interface Prize {
  id: number;
  name: string;
  description?: string;
  cost: number;
  imageFilename?: string;
  url?: string;
  active: boolean;
  parentId: number;
}

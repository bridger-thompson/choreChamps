import { useQuery } from "@tanstack/react-query";
import { choreService } from "./choreService";

export const choreKeys = {
  choresForDate: (date: string, childId: number) => [
    "choresForDate",
    childId,
    date,
  ],
};

export const useGetChoresForDateQuery = (date: string, childId: number) =>
  useQuery({
    queryKey: choreKeys.choresForDate(date, childId),
    queryFn: async () => await choreService.getChoresForDate(date, childId),
  });

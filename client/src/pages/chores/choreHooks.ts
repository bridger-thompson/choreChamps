import { useQuery } from "@tanstack/react-query";
import { choreService } from "./choreService";

export const choreKeys = {
  healthKey: ["healthKey"] as const,
};

export const useGetChoresQuery = () =>
  useQuery({
    queryKey: ["health"],
    queryFn: async () => await choreService.getChores(),
  });

import { useQuery } from "@tanstack/react-query";
import { choreService } from "./choreService";

export const choreKeys = {
  healthKey: ["healthKey"] as const,
};

export const useHealthCheckQuery = () =>
  useQuery({
    queryKey: ["health"],
    queryFn: async () => await choreService.healthCheck(),
  });

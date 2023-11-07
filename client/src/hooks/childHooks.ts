import { useQuery } from "@tanstack/react-query";
import { childService } from "../services/childService";

export const childKeys = {
  childrenKey: ["childrenKey"] as const,
};

export const useGetChildrenQuery = () =>
  useQuery({
    queryKey: childKeys.childrenKey,
    queryFn: async () => await childService.getChildren(),
  });

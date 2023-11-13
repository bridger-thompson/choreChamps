import { useQuery } from "@tanstack/react-query";
import { childService } from "../services/childService";

export const childKeys = {
  childrenKey: ["childrenKey"] as const,
  pointsKey: (childId?: number) => ["pointsKey", childId] as const,
};

export const useGetChildrenQuery = () =>
  useQuery({
    queryKey: childKeys.childrenKey,
    queryFn: async () => await childService.getChildren(),
  });

export const useGetChildsPointsQuery = (id?: number) =>
  useQuery({
    queryKey: childKeys.pointsKey(id),
    queryFn: async () => {
      if (!id) return undefined;
      return await childService.getChildsPoints(id);
    },
  });

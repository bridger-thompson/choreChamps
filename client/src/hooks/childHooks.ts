import { useMutation, useQuery } from "@tanstack/react-query";
import { childService } from "../services/childService";
import { getQueryClient } from "../services/queryClient";
import { Child } from "../models/Child";

const queryClient = getQueryClient();

export const childKeys = {
  childrenKey: ["childrenKey"] as const,
  childKey: (childId?: number) => ["childKey", childId] as const,
  pointsKey: (childId?: number) => ["pointsKey", childId] as const,
};

export const useGetChildrenQuery = () =>
  useQuery({
    queryKey: childKeys.childrenKey,
    queryFn: async () => await childService.getChildren(),
  });

export const useGetChildQuery = (id?: number) =>
  useQuery({
    queryKey: childKeys.childKey(id),
    queryFn: async () => {
      if (!id) return null
      return await childService.getChild(id)
    },
  });

export const useGetChildsPointsQuery = (id?: number) =>
  useQuery({
    queryKey: childKeys.pointsKey(id),
    queryFn: async () => {
      if (!id) return null;
      return await childService.getChildsPoints(id);
    },
  });

export const useAddChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await childService.addChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
    },
  });

export const useUpdateChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await childService.updateChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
    },
  });

export const useDeleteChildMutation = () =>
  useMutation({
    mutationFn: async (id: number) => {
      return await childService.deleteChild(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
      queryClient.invalidateQueries({ queryKey: ["childrenWithChoreKey"] });
    },
  });

import { useMutation, useQuery } from "@tanstack/react-query";
import { peopleService } from "../services/peopleService";
import { getQueryClient } from "../services/queryClient";
import { Child } from "../models/Child";

const queryClient = getQueryClient();

export const peopleKeys = {
  childrenKey: ["childrenKey"] as const,
  childKey: (childId?: number) => ["childKey", childId] as const,
  pointsKey: (childId?: number) => ["pointsKey", childId] as const,
  authorizeKey: ["authorizeKey"] as const,
  childChoreMetadataKey: (childId: number) => ["childChoreMetadataKey", childId] as const
};

export const useGetChildrenQuery = () =>
  useQuery({
    queryKey: peopleKeys.childrenKey,
    queryFn: async () => await peopleService.getChildren(),
  });

export const useGetChildQuery = (id?: number) =>
  useQuery({
    queryKey: peopleKeys.childKey(id),
    queryFn: async () => {
      if (!id) return null
      return await peopleService.getChild(id)
    },
  });

export const useGetChildsPointsQuery = (id?: number) =>
  useQuery({
    queryKey: peopleKeys.pointsKey(id),
    queryFn: async () => {
      if (!id) return null;
      return await peopleService.getChildsPoints(id);
    },
  });

export const useAddChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await peopleService.addChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.childrenKey });
    },
  });

export const useUpdateChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await peopleService.updateChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.childrenKey });
    },
  });

export const useDeleteChildMutation = () =>
  useMutation({
    mutationFn: async (id: number) => {
      return await peopleService.deleteChild(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.childrenKey });
      queryClient.invalidateQueries({ queryKey: ["childrenWithChoreKey"] });
    },
  });


export const useAuthorizeUserMutation = () =>
  useMutation({
    mutationFn: async (pin: string) => {
      return await peopleService.userIsAuthorized(pin);
    },
  });


export const useGetChildsChoreMetadataQuery = (childId: number) =>
  useQuery({
    queryKey: peopleKeys.childChoreMetadataKey(childId),
    queryFn: async () => await peopleService.getChildsChoreMetadata(childId),
  });
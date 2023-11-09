import { useMutation, useQuery } from "@tanstack/react-query";
import { parentService } from "./parentService";
import { getQueryClient } from "../../services/queryClient";
import { Chore } from "../../models/Chore";
import { Child } from "../../models/Child";
import { childKeys } from "../../hooks/childHooks";

const queryClient = getQueryClient();

export const choreParentKeys = {
  choresKey: ["choresKey"] as const,
  childrenWithChoreKey: (choreId?: number) =>
    ["childrenWithChoreKey", choreId] as const,
};

export const useGetChoresQuery = () =>
  useQuery({
    queryKey: choreParentKeys.choresKey,
    queryFn: async () => await parentService.getChores(),
  });

export const useAddChoreMutation = () =>
  useMutation({
    mutationFn: async ({
      chore,
      assignedChildIds,
    }: {
      chore: Chore;
      assignedChildIds: number[];
    }) => {
      return await parentService.addChore(chore, assignedChildIds);
    },
    onSuccess: (_, args) => {
      queryClient.invalidateQueries({ queryKey: choreParentKeys.choresKey });
      queryClient.invalidateQueries({
        queryKey: choreParentKeys.childrenWithChoreKey(args.chore.id),
      });
    },
  });

export const useUpdateChoreMutation = () =>
  useMutation({
    mutationFn: async ({
      chore,
      assignedChildIds,
    }: {
      chore: Chore;
      assignedChildIds: number[];
    }) => {
      return await parentService.updateChore(chore, assignedChildIds);
    },
    onSuccess: (_, args) => {
      queryClient.invalidateQueries({ queryKey: choreParentKeys.choresKey });
      queryClient.invalidateQueries({
        queryKey: choreParentKeys.childrenWithChoreKey(args.chore.id),
      });
    },
  });

export const useDeleteChoreMutation = () =>
  useMutation({
    mutationFn: async (id: number) => {
      return await parentService.deleteChore(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: choreParentKeys.choresKey });
    },
  });

export const useGetChildrenWithChoreQuery = (choreId: number) =>
  useQuery({
    queryKey: choreParentKeys.childrenWithChoreKey(choreId),
    queryFn: async () => await parentService.getChildrenWithChore(choreId),
  });

export const useAddChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await parentService.addChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
    },
  });

export const useUpdateChildMutation = () =>
  useMutation({
    mutationFn: async (child: Child) => {
      return await parentService.updateChild(child);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
    },
  });

export const useDeleteChildMutation = () =>
  useMutation({
    mutationFn: async (id: number) => {
      return await parentService.deleteChild(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: childKeys.childrenKey });
      queryClient.invalidateQueries({ queryKey: ["childrenWithChoreKey"] });
    },
  });

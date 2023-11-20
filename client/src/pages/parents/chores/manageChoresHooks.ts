import { useMutation, useQuery } from "@tanstack/react-query";
import { manageChoresService } from "./manageChoresService";
import { getQueryClient } from "../../../services/queryClient";
import { Chore } from "../../../models/Chore";

const queryClient = getQueryClient();

export const choreParentKeys = {
  choresKey: ["choresKey"] as const,
  childrenWithChoreKey: (choreId?: number) =>
    ["childrenWithChoreKey", choreId] as const,
};

export const useGetChoresQuery = () =>
  useQuery({
    queryKey: choreParentKeys.choresKey,
    queryFn: async () => await manageChoresService.getChores(),
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
      return await manageChoresService.addChore(chore, assignedChildIds);
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
      return await manageChoresService.updateChore(chore, assignedChildIds);
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
      return await manageChoresService.deleteChore(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: choreParentKeys.choresKey });
    },
  });

export const useGetChildrenWithChoreQuery = (choreId: number) =>
  useQuery({
    queryKey: choreParentKeys.childrenWithChoreKey(choreId),
    queryFn: async () => await manageChoresService.getChildrenWithChore(choreId),
  });

import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../../services/queryClient";
import { prizeService } from "./managePrizesService";
import { Prize } from "../../../models/Prize";

const queryClient = getQueryClient();

export const prizeKeys = {
  prizesKey: ["prizesKey"] as const,
  childrenWithPrizeKey: (prizeId: number) =>
    ["childrenWithPrizeKey", prizeId] as const,
};

export const useGetParentsPrizesQuery = () =>
  useQuery({
    queryKey: prizeKeys.prizesKey,
    queryFn: async () => await prizeService.getParentsPrizes(),
  });

export const useGetChildrenWithPrizeQuery = (prizeId: number) =>
  useQuery({
    queryKey: prizeKeys.childrenWithPrizeKey(prizeId),
    queryFn: async () => await prizeService.getChildrenWithPrize(prizeId),
  });

export const useAddPrizeMutation = () =>
  useMutation({
    mutationFn: async ({
      prize,
      assignedChildIds,
    }: {
      prize: Prize;
      assignedChildIds: number[];
    }) => await prizeService.addPrize(prize, assignedChildIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prizeKeys.prizesKey });
    },
  });

export const useUpdatePrizeMutation = (prizeId: number) =>
  useMutation({
    mutationFn: async ({
      updatedPrize,
      assignedChildIds,
    }: {
      updatedPrize: Prize;
      assignedChildIds: number[];
    }) => await prizeService.updatePrize(updatedPrize, assignedChildIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prizeKeys.prizesKey });
      queryClient.invalidateQueries({
        queryKey: prizeKeys.childrenWithPrizeKey(prizeId),
      });
    },
  });

export const useDeletePrizeMutation = () =>
  useMutation({
    mutationFn: async (prizeId: number) =>
      await prizeService.deletePrize(prizeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: prizeKeys.prizesKey });
    },
  });

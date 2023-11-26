import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../services/queryClient";
import { prizeService } from "./prizeService";
import { childKeys } from "../../hooks/childHooks";

const queryClient = getQueryClient();

export const prizeKeys = {
  prizesKey: (childId: number) => ["prizesKey", childId] as const
}

export const useGetPrizesForChildQuery = (childId: number) => useQuery({
  queryKey: prizeKeys.prizesKey(childId),
  queryFn: async () => await prizeService.getPrizesForChild(childId)
})

export const usePurchasePrizeMutation = (childId: number) => useMutation({
  mutationFn: async (prizeId: number) => {
    return await prizeService.purchasePrize(childId, prizeId);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: childKeys.pointsKey(childId) })
    queryClient.invalidateQueries({ queryKey: childKeys.childKey(childId) })
  }
})
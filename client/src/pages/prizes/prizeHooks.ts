import { useMutation, useQuery } from "@tanstack/react-query";
import { getQueryClient } from "../../services/queryClient";
import { prizeService } from "./prizeService";
import { peopleKeys } from "../../hooks/peopleHooks";
import toast from "react-hot-toast";

const queryClient = getQueryClient();

export const prizeKeys = {
  prizesKey: (childId: number) => ["prizesKey", childId] as const,
  purchaseHistoryKey: (childId?: number) => ["purchaseHistoryKey", childId] as const
}

export const useGetPrizesForChildQuery = (childId: number) => useQuery({
  queryKey: prizeKeys.prizesKey(childId),
  queryFn: async () => await prizeService.getPrizesForChild(childId)
})

export const usePurchasePrizeMutation = (childId?: number) => useMutation({
  mutationFn: async (prizeId: number) => {
    if (!childId) {
      toast.error("Unable to undo purchase. Unknown child.")
      return
    }
    return await prizeService.purchasePrize(childId, prizeId);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: peopleKeys.pointsKey(childId) })
    queryClient.invalidateQueries({ queryKey: peopleKeys.childKey(childId) })
    queryClient.invalidateQueries({ queryKey: prizeKeys.purchaseHistoryKey(childId) })
  }
})

export const useGetPurchaseHistoryQuery = (childId?: number) => useQuery({
  queryKey: prizeKeys.purchaseHistoryKey(childId),
  queryFn: async () => {
    if (!childId) return []
    return await prizeService.getPurchaseHistory(childId)
  }
})

export const useUndoPurchaseMutation = (childId: number) => useMutation({
  mutationFn: async (purchaseId: number) => {
    return await prizeService.undoPurchase(childId, purchaseId);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: peopleKeys.pointsKey(childId) })
    queryClient.invalidateQueries({ queryKey: peopleKeys.childKey(childId) })
    queryClient.invalidateQueries({ queryKey: prizeKeys.purchaseHistoryKey(childId) })
  }
})
import { Prize } from "../../models/Prize";
import { PurchasedPrize } from "../../models/PurchasedPrize";
import { axiosClient } from "../../utils/axiosClient";

export const prizeService = {
  async getPrizesForChild(childId: number): Promise<Prize[]> {
    const url = `/api/prize/child/${childId}`
    const response = await axiosClient.get(url)
    return response.data;
  },
  async purchasePrize(childId: number, prizeId: number) {
    const url = `/api/prize/${prizeId}/purchase/${childId}`
    const response = await axiosClient.post(url)
    return response.data;
  },
  async getPurchaseHistory(childId: number): Promise<PurchasedPrize[]> {
    const url = `/api/prize/purchases/${childId}`
    const response = await axiosClient.get(url)
    return response.data;
  },
  async undoPurchase(childId: number, purchaseId: number) {
    const url = `/api/prize/${purchaseId}/undo/${childId}`
    const response = await axiosClient.post(url)
    return response.data;
  },
}
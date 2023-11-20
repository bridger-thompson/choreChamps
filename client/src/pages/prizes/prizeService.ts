import { Prize } from "../../models/Prize";
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
  }
}
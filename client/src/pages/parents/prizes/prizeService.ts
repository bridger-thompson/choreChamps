import { Child } from "../../../models/Child";
import { Prize } from "../../../models/Prize";
import { axiosClient } from "../../../utils/axiosClient";

export const prizeService = {
  async getParentsPrizes(): Promise<Prize[]> {
    const url = `/api/prize/parent/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async getChildrenWithPrize(prizeId: number): Promise<Child[]> {
    const url = `/api/prize/children/${prizeId}`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async addPrize(prize: Prize, assignedChildIds: number[]) {
    const url = `/api/prize`;
    const body = {
      id: prize.id,
      name: prize.name,
      description: prize.description,
      cost: prize.cost,
      image_filename: prize.imageFilename,
      url: prize.url,
      active: prize.active,
      parent_id: prize.parentId,
      assigned_child_ids: assignedChildIds,
    };
    const response = await axiosClient.post(url, body);
    return response.data;
  },
  async updatePrize(updatedPrize: Prize, assignedChildIds: number[]) {
    const url = `/api/prize`;
    const body = {
      id: updatedPrize.id,
      name: updatedPrize.name,
      description: updatedPrize.description,
      cost: updatedPrize.cost,
      image_filename: updatedPrize.imageFilename,
      url: updatedPrize.url,
      active: updatedPrize.active,
      parent_id: updatedPrize.parentId,
      assigned_child_ids: assignedChildIds,
    };
    const response = await axiosClient.put(url, body);
    return response.data;
  },
  async deletePrize(prizeId: number) {
    const url = `/api/prize/${prizeId}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },
};

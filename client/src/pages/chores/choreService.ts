import { ChildChore } from "../../models/ChildChore";
import { axiosClient } from "../../utils/axiosClient";

export const choreService = {
  async getChoresForDate(date: string, childId: number): Promise<ChildChore[]> {
    const url = `/api/chore/${date}/child/${childId}`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async updateChoreStatus(childChoreId: number, status: string): Promise<ChildChore[]> {
    const url = `/api/chore/${childChoreId}/${status}`;
    const response = await axiosClient.put(url);
    return response.data;
  },
};

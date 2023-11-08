import { ChildChore } from "../../models/ChildChore";
import { axiosClient } from "../../utils/axiosClient";

export const choreService = {
  async getChoresForDate(date: string, childId: number): Promise<ChildChore[]> {
    const url = `/api/chore/${date}/child/${childId}`;
    const response = await axiosClient.get(url);
    return response.data;
  },
};

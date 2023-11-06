import { Chore } from "../../models/Chore";
import { axiosClient } from "../../utils/axiosClient";

export const choreService = {
  async getChores(): Promise<Chore[]> {
    const url = `/api/chore/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
};

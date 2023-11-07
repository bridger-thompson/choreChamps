import { Child } from "../models/Child";
import { axiosClient } from "../utils/axiosClient";


export const childService = {
  async getChildren(): Promise<Child[]> {
    const url = `/api/child/all`;
    const response = await axiosClient.get(url);
    return response.data;
  }
}
import { Child } from "../../models/Child";
import { Chore } from "../../models/Chore";
import { axiosClient } from "../../utils/axiosClient";

export const parentService = {
  async getChores(): Promise<Chore[]> {
    const url = `/api/parent_chore/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async addChore(chore: Chore) {
    const url = `/api/parent_chore`;
    const body = { chore: chore };
    const response = await axiosClient.post(url, body);
    return response.data;
  },
  async updateChore(chore: Chore) {
    const url = `/api/parent_chore`;
    const body = { chore: chore };
    const response = await axiosClient.put(url, body);
    return response.data;
  },
  async deleteChore(id: number) {
    const url = `/api/parent_chore/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },
  async getChildrenWithChore(choreId: number): Promise<Child[]> {
    const url = `/api/parent_chore/${choreId}/children`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async assignChoreToChild(choreId: number, childId: number) {
    const url = `/api/parent_chore/${choreId}/child/${childId}`;
    const response = await axiosClient.post(url);
    return response.data;
  },
  async unassignChoreToChild(choreId: number, childId: number) {
    const url = `/api/parent_chore/${choreId}/child/${childId}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },
};

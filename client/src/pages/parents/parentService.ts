import { Child } from "../../models/Child";
import { Chore } from "../../models/Chore";
import { camel_to_snake } from "../../utils/apiMapper";
import { axiosClient } from "../../utils/axiosClient";

export const parentService = {
  async getChores(): Promise<Chore[]> {
    const url = `/api/parent_chore/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async addChore(chore: Chore, assignedChildIds: number[]) {
    const url = `/api/parent_chore`;
    const body = {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      points: chore.points,
      days_of_week: chore.daysOfWeek,
      assigned_child_ids: assignedChildIds,
    };
    const response = await axiosClient.post(url, body);
    return response.data;
  },
  async updateChore(chore: Chore, assignedChildIds: number[]) {
    const url = `/api/parent_chore`;
    const body = {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      points: chore.points,
      days_of_week: chore.daysOfWeek,
      assigned_child_ids: assignedChildIds,
    };
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
  async addChild(child: Child) {
    const url = `/api/child`;
    const body = camel_to_snake(child);
    const response = await axiosClient.post(url, body);
    return response.data;
  },
  async updateChild(child: Child) {
    const url = `/api/child`;
    const body = camel_to_snake(child);
    const response = await axiosClient.put(url, body);
    return response.data;
  },
  async deleteChild(id: number) {
    const url = `/api/child/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },
};

import { Child } from "../models/Child";
import { ChildChoreMetadata } from "../models/ChildChoreMetadata";
import { camel_to_snake } from "../utils/apiMapper";
import { axiosClient } from "../utils/axiosClient";

export const peopleService = {
  async getChildren(): Promise<Child[]> {
    const url = `/api/child/all`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async getChild(id: number): Promise<Child> {
    const url = `/api/child/${id}`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async getChildsPoints(id: number): Promise<number> {
    const url = `/api/child/points/${id}`;
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
  async userIsAuthorized(pin: string): Promise<boolean> {
    const url = `/api/parent/${pin}`;
    const response = await axiosClient.get(url);
    return response.data;
  },
  async getChildsChoreMetadata(childId: number): Promise<ChildChoreMetadata> {
    const url = `/api/child/${childId}/chore_metadata`;
    const response = await axiosClient.get(url);
    return response.data;
  },
};

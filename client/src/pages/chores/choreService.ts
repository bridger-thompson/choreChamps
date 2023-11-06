import axios from "axios";

export const choreService = {
  async healthCheck() {
    const url = `/api/health`;
    const response = await axios.get(url);
    return response.data;
  },
};

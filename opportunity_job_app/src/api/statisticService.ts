import API from "./baseApi";
import { Statistics } from "@/api/models/Statistics";


export const StatisticService = {
    getStatistics: async (): Promise<Statistics> => {
        const response = await API.getResourceList("statistics");
        return response.data
    },
};

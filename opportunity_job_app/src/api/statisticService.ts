import API from "./baseApi";
import { Statistics } from "@/api/models/Statistics";


export const StatisticService = {
    getStatistics: async (): Promise<Statistics> => {
        const response = await API.getOne("statistics");
        return response.data
    },
};

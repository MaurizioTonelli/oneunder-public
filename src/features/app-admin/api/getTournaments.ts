import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getTournaments = (): Promise<any[]> => {
  let url = `/catalog/tournaments?`;

  return axios.get(url);
};

export const useTournaments = (config = {}) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournaments"],
    queryFn: () => getTournaments(),
    refetchInterval: 60000,
    useErrorBoundary: false,
  });
};

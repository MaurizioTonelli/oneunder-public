import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getPublicTournaments = (): Promise<any[]> => {
  let url = `/catalog/public-tournaments?`;

  return axios.get(url);
};

export const usePublicTournaments = (config = {}) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournaments"],
    queryFn: () => getPublicTournaments(),
    refetchInterval: 60000,
    useErrorBoundary: false,
  });
};

import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getTournament = (id: string | null): Promise<any[]> => {
  let url = `/catalog/nassau-scores?`;
  if (id) {
    url += `id=${id}`;
  }

  return axios.get(url);
};

export const useTournament = (config = {}, id: string | null) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournament", id],
    queryFn: () => getTournament(id),
    enabled: !!id,
    refetchInterval: 60000,
  });
};

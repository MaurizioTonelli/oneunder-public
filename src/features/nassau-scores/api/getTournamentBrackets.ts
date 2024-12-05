import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getTourmamentBrackets = (id: string | null): Promise<any[]> => {
  let url = `/catalog/tournament-brackets?`;
  if (id) {
    url += `id=${id}`;
  }

  return axios.get(url);
};

export const useTournamentBrackets = (config = {}, id: string | null) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournament-brackets", id],
    queryFn: () => getTourmamentBrackets(id),
    enabled: !!id,
  });
};

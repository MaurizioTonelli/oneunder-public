import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getWomenTournamentBrackets = (
  id: string | null
): Promise<any[]> => {
  let url = `/catalog/women-tournament-brackets?`;
  if (id) {
    url += `id=${id}`;
  }

  return axios.get(url);
};

export const useWomenTournamentBrackets = (config = {}, id: string | null) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["women-tournament-brackets", id],
    queryFn: () => getWomenTournamentBrackets(id),
    enabled: !!id,
  });
};

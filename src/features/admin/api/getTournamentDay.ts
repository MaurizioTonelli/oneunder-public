import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getTournamentDay = (id): Promise<any[]> => {
  let url = `/catalog/tournament-day?id=${id}`;

  return axios.get(url);
};

export const useTournamentDay = (config = {}, id: string | undefined) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournament-day", id],
    queryFn: () => getTournamentDay(id),
    refetchInterval: 60000,
    useErrorBoundary: false,
    enabled: !!id && id != "",
    onError: (err) => {
      console.log(err);
    },
  });
};

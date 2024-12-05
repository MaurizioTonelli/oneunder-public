import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getTournament = (id): Promise<any[]> => {
  let url = `/catalog/tournament?id=${id}`;

  return axios.get(url);
};

export const useTournament = (config = {}, id: string | undefined) => {
  return useQuery<any, Error>({
    ...config,
    queryKey: ["tournament", id],
    queryFn: () => getTournament(id),
    refetchInterval: 60000,
    useErrorBoundary: false,
    enabled: !!id && id != "",
    onError: (err) => {
      console.log(err);
    },
  });
};

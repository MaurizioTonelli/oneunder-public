import { useQuery } from "react-query";
import { axios } from "@/lib/axios";

export const getRoundsWithScores = (ids: String[]): Promise<any[]> => {
  let url = `/catalog/rounds-with-scores?`;
  if (ids) {
    ids.forEach((id) => {
      url += `&id[]=${id}`;
    });
  }
  return axios.get(url);
};

export const useRoundsWithScores = (config = {}, ids: String[]) => {
  return useQuery<any[], Error>({
    ...config,
    queryKey: ["rounds-with-scores", ids],
    queryFn: () => getRoundsWithScores(ids),
    enabled: !!ids,
  });
};

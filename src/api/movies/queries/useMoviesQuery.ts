import { getS } from "@/api/Api";
import { processResponseQuery } from "@/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { GetMoviesResult, type RecordType } from "../../types";
import { movieKeys } from "../keys";

const useMoviesQuery = (searchText?: string, year?: number, type?: RecordType, page?: number) =>
  useQuery({
    queryKey: movieKeys.list(searchText, year, type, page),
    queryFn: searchText
      ? processResponseQuery(({ signal }) => getS(searchText, year, type, undefined, page, undefined, { signal }))
      : undefined,
    staleTime: 5 * 60 * 1000,
  });

export default useMoviesQuery;

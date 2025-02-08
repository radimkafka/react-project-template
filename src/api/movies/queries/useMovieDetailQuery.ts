import { processResponseQuery } from "@/api/apiUtils";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getI } from "../../Api";
import { movieKeys } from "../keys";

export const movieQueryOptions = (movieId?: string): UndefinedInitialDataOptions => ({
  queryKey: movieKeys.detail(movieId),
  queryFn: movieId
    ? processResponseQuery(({ signal }) => getI(movieId, undefined, undefined, undefined, { signal }))
    : undefined,
  staleTime: 5 * 60 * 1000,
});

const useMovieDetailQuery = (movieId?: string) => useQuery(movieQueryOptions(movieId));

export default useMovieDetailQuery;

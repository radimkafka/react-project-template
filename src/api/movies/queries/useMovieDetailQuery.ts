import { processResponseQuery } from "@/api/apiUtils";
import { useQuery } from "@tanstack/react-query";
import { getI } from "../../Api";
import type { Movie } from "../../types";
import { movieKeys } from "../keys";

const useMovieDetailQuery = (movieId?: string) =>
  useQuery({
    queryKey: movieKeys.detail(movieId),
    queryFn: movieId
      ? processResponseQuery(({ signal }) => getI(movieId, undefined, undefined, undefined, { signal }))
      : undefined,
    staleTime: 5 * 60 * 1000,
  });

export default useMovieDetailQuery;

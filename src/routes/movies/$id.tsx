import { movieQueryOptions } from "@/api/movies/queries/useMovieDetailQuery";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/$id")({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  context: ({ params }) => ({
    crumbs: params.id,
  }),
  loader: ({ context: { queryClient }, params: { id } }) => {
    return queryClient.ensureQueryData(movieQueryOptions(id));
  },
});

function ErrorComponent() {
  return <div>Movie not found</div>;
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useQuery(movieQueryOptions(id));
  console.log("data: ", data);

  return <div>{id}</div>;
}

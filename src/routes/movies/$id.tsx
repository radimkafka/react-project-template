import { movieQueryOptions } from "@/api/movies/queries/useMovieDetailQuery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryErrorResetBoundary, useSuspenseQuery } from "@tanstack/react-query";
import { type ErrorComponentProps, createFileRoute, useRouter } from "@tanstack/react-router";
import { Loader2, StarIcon } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/movies/$id")({
  component: RouteComponent,
  errorComponent: ErrorComponent,
  loader: async ({ context: { queryClient }, params: { id } }) => {
    const data = await queryClient.ensureQueryData(movieQueryOptions(id));
    return { data, crumb: data.Title };
  },
  pendingComponent: () => <Loader2 className="animate-spin" />,
});

export function ErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter();
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  return (
    <div>
      <Button
        onClick={() => {
          router.invalidate();
        }}
      >
        retry
      </Button>
      <ErrorComponent error={error} reset={router.invalidate} />
    </div>
  );
}

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: movie } = useSuspenseQuery(movieQueryOptions(id));

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <img
            src={movie.Poster || "/placeholder.svg"}
            alt={`${movie.Title} Poster`}
            width={300}
            height={450}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="mb-2 font-bold text-4xl">{movie.Title}</h1>
          <div className="mb-4 flex items-center space-x-2">
            <Badge variant="secondary">{movie.Year}</Badge>
            <Badge variant="secondary">{movie.Rated}</Badge>
            <Badge variant="secondary">{movie.Runtime}</Badge>
          </div>
          <p className="mb-4 text-lg">{movie.Plot}</p>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <h2 className="mb-2 font-semibold text-xl">Director</h2>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h2 className="mb-2 font-semibold text-xl">Writers</h2>
              <p>{movie.Writer}</p>
            </div>
            <div>
              <h2 className="mb-2 font-semibold text-xl">Actors</h2>
              <p>{movie.Actors}</p>
            </div>
            <div>
              <h2 className="mb-2 font-semibold text-xl">Genre</h2>
              <p>{movie.Genre}</p>
            </div>
          </div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {movie.Ratings.map((rating) => (
                  <div key={rating.Source} className="flex items-center justify-between">
                    <span>{rating.Source}</span>
                    <Badge variant="secondary">{rating.Value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Language</h3>
                  <p>{movie.Language}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Country</h3>
                  <p>{movie.Country}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Awards</h3>
                  <p>{movie.Awards}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Box Office</h3>
                  <p>{movie.BoxOffice}</p>
                </div>
                <div>
                  <h3 className="font-semibold">IMDb Rating</h3>
                  <div className="flex items-center">
                    <StarIcon className="mr-1 h-5 w-5 text-yellow-400" />
                    <span>{movie.imdbRating}/10</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">IMDb Votes</h3>
                  <p>{movie.imdbVotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

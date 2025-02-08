import useMoviesQuery from "@/api/movies/queries/useMoviesQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  context: () => ({
    crumb: "home",
  }),
});

function Index() {
  const { data } = useMoviesQuery("batman");
  console.log("data: ", data);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}

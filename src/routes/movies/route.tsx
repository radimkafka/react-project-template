import { createCrumbLoaderData } from "@/utils/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies")({
  loader: createCrumbLoaderData("Movies"),
});

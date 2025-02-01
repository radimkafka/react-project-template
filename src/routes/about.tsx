import { Button } from "@/components/ui/button";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  loader: () => ({
    crumb: "About",
  }),
});

function About() {
  return (
    <div className="p-2">
      <Button>Click me</Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { createCrumbsContext } from "@/utils/router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  context: createCrumbsContext("DarkTheme"),
});

function About() {
  return (
    <div className="p-2">
      <Button>Click me</Button>
    </div>
  );
}

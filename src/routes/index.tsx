import { Breadcrumb } from "@/components/ui/breadcrumb";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => ({
    crumb: "home",
  }),
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}

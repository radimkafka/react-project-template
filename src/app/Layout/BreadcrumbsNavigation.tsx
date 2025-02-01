import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Link, isMatch, useMatches } from "@tanstack/react-router";

const BreadcrumbsNavigation = () => {
  const matches = useMatches();
  if (matches.some((match) => match.status === "pending")) return null;
  const matchesWithCrumbs = matches.filter((match) => isMatch(match, "loaderData.crumb"));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match) => (
          <BreadcrumbItem key={match.fullPath}>
            <BreadcrumbLink asChild>
              <Link from={match.fullPath}>{match.loaderData?.crumb}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsNavigation;

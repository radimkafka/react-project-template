import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Link, isMatch, useMatches, useParentMatches } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const BreadcrumbsNavigation = () => {
  const { t } = useTranslation();
  const matches = useMatches();
  const aa = useParentMatches();
  console.log("aa: ", aa);
  console.log("matches: ", matches);
  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, "context.crumbs"));
  console.log("matchesWithCrumbs: ", matchesWithCrumbs);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <BreadcrumbItem key={match.fullPath}>
            <BreadcrumbLink asChild>
              <Link disabled={i === matchesWithCrumbs.length - 1} from={match.fullPath}>
                {t(match.context?.crumbs, { defaultValue: match.context?.crumbs })}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsNavigation;

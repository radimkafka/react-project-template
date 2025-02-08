import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, isMatch, useMatches } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

const BreadcrumbsNavigation = () => {
  const { t } = useTranslation();
  const matches = useMatches();

  if (matches.some((match) => match.status === "pending")) return null;

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, "loaderData.crumb"));
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) => (
          <Fragment key={match.fullPath}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link disabled={i === matchesWithCrumbs.length - 1} from={match.fullPath}>
                  {match.loaderData?.crumb && t(match.loaderData?.crumb, { defaultValue: match.loaderData?.crumb })}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {i !== matchesWithCrumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbsNavigation;

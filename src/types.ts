import { Link, type LinkProps } from "@tanstack/react-router";
import type { CustomTypeOptions } from "i18next";

export type LinkTo = LinkProps["to"];
export type Translations = keyof CustomTypeOptions["resources"]["default"];

export type RouterContext = {
  crumbs?: Translations;
};

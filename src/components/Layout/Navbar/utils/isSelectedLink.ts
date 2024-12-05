import { Link as LinkType } from "../types/Link";

export const isSelectedLink = (
  link: LinkType,
  routerPath: string,
  currentLink?: LinkType
) => {
  if (!currentLink) return false;
  const isChildLinkOf = (currentLink: LinkType, link?: string) => {
    const currentLinkParts = currentLink.slug?.split("/") ?? [];
    const linkParts = link?.split("/") ?? [];
    for (let i = 0; i < linkParts?.length; i++) {
      if (linkParts[i] !== currentLinkParts[i]) {
        return false;
      }
    }
    return true;
  };
  //Check for links that aren't dropdown
  if (!link.children) {
    return isChildLinkOf(currentLink!, link.slug) ? "page" : "false";
  }
  //If it's a dropdown link, it must be highlighted if one of its children represents the current path
  return link.children.find((child) => child.slug === routerPath)
    ? "page"
    : "false";
};

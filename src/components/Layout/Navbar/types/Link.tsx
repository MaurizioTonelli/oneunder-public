export type Link = {
  text: string;
  slug?: string;
  type?: "dropdown" | "default";
  children?: Link[];
  bottomNavbarLinks?: Link[];
};

export type MegaMenuKey = 'shop' | 'pihl-denim';

export interface NavLink {
  label: string;
  href: string;
  /** When set, hovering this link opens the corresponding mega menu sidebar. */
  megaMenu?: MegaMenuKey;
  highlight?: boolean;
}

export interface MegaMenuSection {
  /** Optional section title (e.g. "Shop"). */
  title?: string;
  links: { label: string; href: string; arrow?: boolean }[];
}

export interface MegaMenuContent {
  /** Visible heading at the top of the panel. */
  heading: string;
  sections: MegaMenuSection[];
  /** Optional editorial CTA at the bottom. */
  cta?: { label: string; href: string; image?: string };
}

import type { PortableTextBlock } from "@portabletext/types";

export interface ImageAsset {
  _ref: string;
  _type: string;
}

export interface SanityImage {
  _id?: string;
  _type: "image";
  alt?: string;
  asset: ImageAsset;
}

export interface NavLink {
  label: string;
  order: number;
  url: string;
}

export interface Tag {
  _id: string;
  description?: string;
  slug: string;
  title: string;
}

export interface SiteSettings {
  _id: string;
  analyticsId?: string;
  bluesky?: string;
  description: string;
  email?: string;
  footer?: PortableTextBlock[];
  github?: string;
  linkedin?: string;
  navLinks?: NavLink[];
  ogImage?: SanityImage;
  title: string;
}

export interface Writing {
  _id: string;
  body?: PortableTextBlock[];
  excerpt?: string;
  image?: SanityImage;
  publishedAt: string;
  slug: string;
  tags: Tag[];
  title: string;
  updatedAt?: string;
}

export interface Work {
  _id: string;
  body?: PortableTextBlock[];
  description: string;
  image?: SanityImage;
  order: number;
  slug: string;
  sourceUrl?: string;
  tags: Tag[];
  title: string;
  url: string;
}

export interface Page {
  _id: string;
  body: PortableTextBlock[];
  description: string;
  showInNav: boolean;
  slug: string;
  title: string;
}

import type { Site, Metadata, Socials, Stacks } from "@types";

export const SITE: Site = {
	NAME: "sepagian",
	EMAIL: "rizkydana14@gmail.com",
	CAPTION: "I build web systems, from idea to productions",
	DEFAULT_TITLE: "sepagian",
	DEFAULT_DESCRIPTION: "Personal website, writing, and selected work",
	NUM_POSTS_ON_HOMEPAGE: 3,
	NUM_WORKS_ON_HOMEPAGE: 2,
	NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
	TITLE: "Home",
	DESCRIPTION:
		"What I’m thinking about now, what I’m building, and why this space exists.",
};

export const BLOG: Metadata = {
	TITLE: "Notes",
	DESCRIPTION: "Writing across software, culture, and personal growth",
};

export const WORK: Metadata = {
	TITLE: "Work",
	DESCRIPTION: "Professional experience, skills, and roles.",
};

export const PROJECTS: Metadata = {
	TITLE: "Projects",
	DESCRIPTION: "Things I’m building, breaking, and shipping.",
};

export const SOCIALS: Socials = [
	{
		NAME: "twitter-x",
		HREF: "https://twitter.com/sepagian",
	},
	{
		NAME: "github",
		HREF: "https://github.com/sepagian",
	},
	{
		NAME: "linkedin",
		HREF: "https://www.linkedin.com/in/sepagian",
	},
];

export const STACKS: Stacks = [
	{
		NAME: "Astro",
		HREF: "https://astro.build/",
	},
	{
		NAME: "Bun",
		HREF: "https://bun.sh/",
	},
	{
		NAME: "Cloudflare",
		HREF: "https://workers.cloudflare.com/",
	},
	{
		NAME: "PostgreSQL",
		HREF: "https://www.postgresql.org/",
	},
	{
		NAME: "SQLite",
		HREF: "https://www.sqlite.org/",
	},
	{
		NAME: "Svelte",
		HREF: "https://www.svelte.dev",
	},
	{
		NAME: "TypeScript",
		HREF: "https://www.typescriptlang.org/",
	},
];

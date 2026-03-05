import { getCollection } from "astro:content";
import { themeConfig } from "../../config";

export const prerender = true;

const entries = (await getCollection("posts")).filter(
  (post) => !post.id.startsWith("_"),
);

export async function getStaticPaths() {
  return entries.map((post) => {
    const slug = post.id.replace(/\.(md|mdx)$/, "");
    return {
      params: { route: `${slug}.svg` },
      props: {
        title: post.data.title,
        description: themeConfig.site.title,
      },
    };
  });
}

export const GET = async ({
  props,
}: {
  props: { title: string; description: string };
}) => {
  const { title, description } = props;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#1a1a2e"/>
  <rect x="60" y="60" width="1080" height="510" rx="20" fill="#16213e"/>
  <text x="100" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="white">
    <tspan x="100" dy="0">${escapeXml(title)}</tspan>
  </text>
  <text x="100" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="32" fill="#a0a0b0">
    ${escapeXml(description)}
  </text>
  <rect x="100" y="460" width="200" height="8" rx="4" fill="#6366f1"/>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

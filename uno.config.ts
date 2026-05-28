import {
  defineConfig,
  presetAttributify,
  presetTagify,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
      dark: "class",
    }),
    presetAttributify(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: ["Geist:400,500,600,700,800"],
      },
    }),
    presetTagify(),
    presetShadcn(),
    presetAnimations(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "(components|src)/**/*.{js,ts}",
      ],
    },
  },
  transformers: [transformerVariantGroup(), transformerDirectives()],
});

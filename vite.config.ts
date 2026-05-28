import { paraglideVitePlugin } from "@inlang/paraglide-js";
import svg from "@poppanator/sveltekit-svg";
import { sveltekit } from "@sveltejs/kit/vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: { host: true, port: 5432 },
  plugins: [
    UnoCSS(),
    svg({
      includePaths: ["./src/lib/assets/"],
      svgoOptions: {
        multipass: true,
      },
    }),
    sveltekit(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/lib/paraglide",
    }),
  ],
});

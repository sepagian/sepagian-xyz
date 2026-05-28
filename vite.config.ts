import svg from "@poppanator/sveltekit-svg";
import { sveltekit } from "@sveltejs/kit/vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
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
  ],
});

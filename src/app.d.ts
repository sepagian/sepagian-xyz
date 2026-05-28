// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  // biome-ignore lint/style/noNamespace: SvelteKit convention
  namespace App {
    interface Platform {
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
      ctx: ExecutionContext;
      env: Env;
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
  }
}

import "@poppanator/sveltekit-svg/dist/svg.d.ts";

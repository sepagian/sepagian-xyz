import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "1kqlzeoj",
    dataset: "production",
  },
  deployment: {
    appId: "xeptmd9bjtal3hipxhr6wulg",
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
});

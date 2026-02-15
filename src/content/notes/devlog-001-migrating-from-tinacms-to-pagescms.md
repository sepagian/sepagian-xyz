---
title: "Devlog #001: Migrating from TinaCMS to PagesCMS"
description: Sometimes the simpler tool is the right tool.
date: 2026-02-15
draft: true
---
# Backstory

Been running my personal portfolio on [Astro](https://astro.build) with static Markdown files for a while. Content management meant manually editing files and pushing commits—not ideal for quick updates. Time to add a proper CMS.

## Attempt 1: [TinaCMS](https://tina.io)

Started with TinaCMS since it promised tight Astro integration and visual editing. Set up was... complicated (or, it just skill issue):

*   **Build issues**: Running `tinacms build` during Cloudflare Workers deployment kept failing because Tina expects environment variables at build time, but Workers only provides them at runtime
    
*   **Cloud complexity**: Required Tina Cloud account, client IDs, tokens—the whole nine yards
    
*   **Configuration overhead**: Lots of boilerplate for what should be simple content editing
    
*   **Generated files**: The `tina/__generated__/` directory felt like magic I didn't fully control and understand.
    

The final straw: couldn't get it to deploy properly on Cloudflare Workers without exposing secrets or restructuring the entire build process.

## Attempt 2: [Pages CMS](https://pagescms.org)

Found PagesCMS after spent a couple minutes looking for CMS solutions. This is the discussion [link](https://www.reddit.com/r/astrojs/comments/1l9u8xc/is_there_a_simple_cms_solution/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button):

What worked immediately:

*   Zero config headaches: No client IDs, no tokens, no generated files. Just a `.pages.yml` file in the repo
    
*   Git-native: Changes commit directly to the repo, it means no external database or service to manage
    
*   Astro-friendly: Uses standard Markdown frontmatter that works perfectly with Astro Content Collections
    
*   Visual editor: Clean UI for editing without touching code. As a matter of fact, I wrote this post in PagesCMS
    

The setup process:

1.  Create `.pages.yml` with collection definitions matching Astro schema. [View Docs](https://pagescms.org/docs)
    
2.  Connect GitHub repo to PagesCMS
    
3.  Done. Seriously, that was it.
    

> Bottom line: Sometimes the simpler tool is the right tool. PagesCMS gets out of the way and lets me focus on content, not configuration.
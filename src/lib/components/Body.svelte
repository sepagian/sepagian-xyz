<script lang="ts">
  import type { PortableTextComponents } from "@portabletext/svelte";
  import { PortableText } from "@portabletext/svelte";
  import type { PortableTextBlock } from "@portabletext/types";
  import Blockquote from "./portabletext/Blockquote.svelte";
  import Callout from "./portabletext/Callout.svelte";
  import Code from "./portabletext/Code.svelte";
  import CodeBlock from "./portabletext/CodeBlock.svelte";
  import Divider from "./portabletext/Divider.svelte";
  import Embed from "./portabletext/Embed.svelte";
  import File from "./portabletext/File.svelte";
  import Heading from "./portabletext/Heading.svelte";
  import Image from "./portabletext/Image.svelte";
  import ImageGallery from "./portabletext/ImageGallery.svelte";
  import Instagram from "./portabletext/Instagram.svelte";
  import List from "./portabletext/List.svelte";
  import Mermaid from "./portabletext/Mermaid.svelte";
  import Paragraph from "./portabletext/Paragraph.svelte";
  import Table from "./portabletext/Table.svelte";
  import Toc from "./portabletext/Toc.svelte";
  import Twitter from "./portabletext/Twitter.svelte";
  import Youtube from "./portabletext/Youtube.svelte";

  let { blocks }: { blocks: PortableTextBlock[] } = $props();
  const components: PortableTextComponents = {
    block: {
      normal: Paragraph,
      h2: Heading,
      h3: Heading,
      h4: Heading,
      h5: Heading,
      h6: Heading,
      blockquote: Blockquote,
    },
    list: {
      bullet: List,
      number: List,
    },
    marks: {
      code: Code,
    },
    types: {
      callout: Callout,
      code: CodeBlock,
      divider: Divider,
      embed: Embed,
      fileDownload: File,
      image: Image,
      imageGallery: ImageGallery,
      instagram: Instagram,
      mermaid: Mermaid,
      table: Table,
      toc: Toc,
      twitter: Twitter,
      youtube: Youtube,
    },
  };
</script>

<PortableText value={blocks} {components} />

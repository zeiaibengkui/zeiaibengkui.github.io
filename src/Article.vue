<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="md" class="heti"  v-html="text"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeStringify);

const text = ref("Markdown");
const route = useRoute();
const baseURL = ref("/articles/");
const precompiledURL = ref("/precompiled/");

const reload = async () => {
  const articleURL = route.params.articleURL as string;

  // Try precompiled HTML first
  const precompiledResponse = await fetch(precompiledURL.value + articleURL.replace('.md', '.html'));

  if (precompiledResponse.ok) {
    // Use precompiled HTML
    text.value = await precompiledResponse.text();
  } else {
    // Fall back to runtime markdown processing
    console.log('Precompiled HTML not found, using runtime processing:', articleURL);
    const mdResponse = await fetch(baseURL.value + articleURL);
    text.value = await mdResponse.text();
    document.title = text.value.split('\n').filter(a => a.startsWith("# ")).map(a => a.slice(2))[0] || "No Title"
    text.value = (await processor.process(text.value)).toString();
  }
};

await reload();
</script>

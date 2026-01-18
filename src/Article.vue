<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="md" v-html="text"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
const text = ref("Markdown");
const route = useRoute();
console.log(route.params);
const a = await fetch(("/public/articles/" + route.params.articleURL) as string);
text.value = await a.text();
import rehypeFormat from "rehype-format";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
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
  // .use(rehypeSanitize)
  .use(rehypeStringify);
text.value = (await processor.process(text.value)).toString();
</script>

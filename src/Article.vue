<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="md" v-html="text"></div>
  <BInput type="text" id="baseurl-input" v-model="baseURL" />
</template>

<style lang="scss">
#md {
  margin: 2em 0;
}

#baseurl-input {
  opacity: 0.2;
  transition: 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>

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
import { watch } from "vue";
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

const text = ref("Markdown");
const route = useRoute();
console.log(route.params);
const baseURL = ref("/articles/");
const reload = async () => {
  const a = await fetch((baseURL.value + route.params.articleURL) as string);
  text.value = await a.text();
  text.value = (await processor.process(text.value)).toString();
};
reload();
watch(baseURL, reload);
</script>

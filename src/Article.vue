<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="md" class="heti heti--serif" v-html="text"></div>
  <!-- <BInput type="text" id="baseurl-input" v-model="baseURL" /> -->
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
// import Heti from "heti/js/heti-addon.js"
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
  document.title = text.value.split('\n').filter(a => a.startsWith("# ")).map(a => a.slice(2))[0] || "No Title"

  text.value = (await processor.process(text.value)).toString();


  /*   const heti = new Heti('.heti');
    heti.autoSpacing(); // 自动进行中西文混排美化和标点挤压 */
};
await reload();
// watch(baseURL, reload);
</script>

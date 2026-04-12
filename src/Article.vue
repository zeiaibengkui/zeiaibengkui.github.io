<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="md" class="heti" v-html="text"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
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
  }
};

await reload();

onMounted(() => {
  document.querySelectorAll('a').forEach((el) => {
    if (el.href.match(/^#\/|(!^#)/)) return;
    el.addEventListener("click", (ev) => {
      ev.preventDefault();
      const href = decodeURI(el.href.match(/\#.*$/)![0]);
      console.log(href);
      document.querySelector(href)?.scrollIntoView({ behavior: "auto" })
    })
  })
})
</script>

<style lang="scss">
nav.toc {
  padding: .5rem 2rem;
  border-left: solid gray;

  &::before {
    content: "Table of Contents";
  }

  .toc-level-1 {
    list-style: cjk-decimal;
  }
}
</style>

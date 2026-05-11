<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="md" class="heti" v-html="html"></div>
  <hr class="mt-5">
  <BButtonGroup>
    <BButton variant="link" :href="baseURL + filename" :download="filename">Download Markdown</BButton>
    <BButton variant="link" @click="share()" v-if="isSupported">Share</BButton>
  </BButtonGroup>
</template>

<script setup lang="ts">
import { BButton } from "bootstrap-vue-next";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const html = ref("Markdown complied to html");
const md = ref("")
const route = useRoute();
const baseURL = ref("/articles/");
const precompiledURL = ref("/precompiled/");
const filename = route.params.articleURL as string;

import { useShare } from '@vueuse/core'

// Secure context: This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
const { share, isSupported } = useShare(ref({
  title: filename,
  text: md.value,
  url: location.href,
  files: [new File([md.value], filename, { type: "text/plain" })]
}))


const reload = async () => {

  // Try precompiled HTML first
  const precompiledResponse = await fetch(precompiledURL.value + filename.replace('.md', '.html'));

  if (precompiledResponse.ok) {
    // Use precompiled HTML
    html.value = await precompiledResponse.text();
    const mdResponse = await fetch(baseURL.value + filename);
    md.value = await mdResponse.text();
  } else {
    // Fall back to runtime markdown processing
    console.log('Precompiled HTML not found, using runtime processing:', filename);
    const mdResponse = await fetch(baseURL.value + filename);
    md.value = html.value = await mdResponse.text();
  }
};

await reload();

onMounted(() => {
  document.querySelectorAll('a').forEach((el) => {
    if (el.href.includes("#/")) return;
    if (!el.href.includes("#")) return
    console.log(el);
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

  .toc-level {
    list-style: none;
  }
}
</style>

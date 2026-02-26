<template>
  <BApp>
    <WallpaperBackground />

    <BNavbar id="nav" class="shadow mb-3">
      <BNavbarBrand>Blog2</BNavbarBrand>
      <ThemeToggle />
    </BNavbar>
    <main id="main">
      <BContainer>
        <RouteURLNav />

        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Transition mode="out-in" name="bounce" :key="$route.fullPath">
              <!-- <KeepAlive> -->
              <Suspense>
                <!-- main content -->
                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
              <!-- </KeepAlive> -->
            </Transition>
          </template>
        </RouterView>
      </BContainer>
      <BContainer>
        <Giscus repo="zeiaibengkui/zeiaibengkui.github.io" repo-id="R_kgDOQ8BJxQ" category="General"
          category-id="DIC_kwDOQ8BJxc4C3LNU" mapping="title" strict="0" reactions-enabled="1" emit-metadata="0"
          input-position="top" theme="" lang="en" loading="lazy" crossorigin="anonymous" async>
        </Giscus>
      </BContainer>
    </main>
    <footer id="footer">(c) Copyright Lichunlai 2025</footer>
  </BApp>
</template>
<script lang="ts" setup>
import { BContainer } from "bootstrap-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import { useArticleStore } from "./stores/article";
import { RouterView } from "vue-router";
import WallpaperBackground from "./WallpaperBackground.vue";
import { watch } from "vue";
import router from "./router";
import RouteURLNav from "./RouteURLNav.vue";
import Giscus from "@giscus/vue"

watch(
  () => useArticleStore().articleURL,
  (v) => {
    router.push(v);
  },
);
</script>
<style lang="scss">
#app {
  min-height: 100vh;
  flex-direction: column;

  #nav {
    position: sticky;
    bottom: 5em;
  }

  #footer {
    position: sticky;
    top: 100%;
    text-align: center;
  }
}
</style>

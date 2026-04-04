<template>
  <BApp>
    <WallpaperBackground />

    <BNavbar id="nav" class="shadow mb-3">
      <BNavbarBrand href="//chunl.ai">Blog2</BNavbarBrand>
      <ThemeToggle />
    </BNavbar>
    <main id="main">
      <BContainer>
        <RouteURLNav />

        <RouterView v-slot="{ Component, route }">
          <KeepAlive>
            <template v-if="Component">
              <Suspense>
                <template #default>
                  <Transition mode="out-in" name="bounce" :key="route.fullPath">
                    <component :is="Component"></component>
                  </Transition>
                </template>

                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </template>
          </KeepAlive>
        </RouterView>
      </BContainer>
      <BContainer>
        <Giscus :key="$route.fullPath" repo="zeiaibengkui/zeiaibengkui.github.io" repo-id="R_kgDOQ8BJxQ"
          category="General" category-id="DIC_kwDOQ8BJxc4C3LNU" mapping="title" strict="0" reactions-enabled="1"
          emit-metadata="0" input-position="top" theme="" lang="en">
        </Giscus>
      </BContainer>
    </main>
    <footer id="footer">(c) Lichunlai 2025 <br> Articles are shared under CC BY-SA license.</footer>
  </BApp>
</template>
<script lang="ts" setup>
import { BContainer } from "bootstrap-vue-next";
import ThemeToggle from "./ThemeToggle.vue";
import { RouterView } from "vue-router";
import WallpaperBackground from "./WallpaperBackground.vue";
import RouteURLNav from "./RouteURLNav.vue";
import Giscus from "@giscus/vue"

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
    margin: 2rem;
  }
}
</style>

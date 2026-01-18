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

                <Suspense>
                    <router-view v-slot="{ Component }">
                        <transition name="bounce" mode="out-in">
                            <component :is="Component" />
                        </transition>
                    </router-view>
                    <template #fallback> Loading </template>
                </Suspense>
            </BContainer>
        </main>
        <footer id="footer">(c) Copyright Lichunlai 2025</footer>
    </BApp>
</template>
<script lang="ts" setup>
import { BContainer } from 'bootstrap-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import { useArticleStore } from './stores/article'
import { RouterView } from 'vue-router'
import WallpaperBackground from './WallpaperBackground.vue'
import { watch } from 'vue'
import { routes } from 'vue-router/auto-routes'
import router from './router'
import RouteURLNav from './RouteURLNav.vue'

watch(
    () => useArticleStore().articleURL,
    (v) => {
        router.push(v)
    },
)
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

body[data-bs-theme='light'] {
    #app {
        background: #ccc;
    }
}



</style>

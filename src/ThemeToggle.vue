<template>
    <BNavbarNav>
        <BNavItem href="javascript:void(0)" @click="theme.toggleTheme()">{{ theme.themeStr }}</BNavItem>
    </BNavbarNav>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useThemeStore } from './stores/colorTheme'

const theme = useThemeStore()

watch(
    () => theme.themeStr,
    (themeStr) => {
        document.body.dataset.bsTheme = themeStr
    },
    { immediate: true }
)
</script>

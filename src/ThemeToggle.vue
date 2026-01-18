<template>
    <BNavbarNav>
        <BNavItem @click="isLight = !isLight">{{ isLight ? 'light' : 'dark' }}</BNavItem>
    </BNavbarNav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const isLight = ref(false)
function changeTheme() {
    document.body.dataset.bsTheme = isLight.value ? 'light' : 'dark'
}

isLight.value = !!localStorage.getItem('theme')
if (isLight.value) changeTheme()
watch(isLight, changeTheme)

window.addEventListener('beforeunload', () => {
    localStorage.setItem('theme', isLight.value ? 'true' : '')
})
</script>

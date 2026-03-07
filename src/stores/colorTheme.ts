import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useThemeStore = defineStore('useThemeStore', () => {
    const isLight = ref(false)
    const themeStr = computed(() => isLight.value ? 'light' : 'dark')
    const toggleTheme = () => {
        isLight.value = !isLight.value
    }

    return { themeStr, isLight, toggleTheme }
}, {
    persist: {
        key: 'theme',
        pick: ['isLight']
    }
})
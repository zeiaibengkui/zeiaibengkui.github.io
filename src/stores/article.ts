import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArticleStore = defineStore('useArticleStore', () => {
    const articleURL = ref('/article/test.md')
    return { articleURL }
})

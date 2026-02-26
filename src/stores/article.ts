import { defineStore } from 'pinia'
import type { Article, CategoryIndex, LabelIndex } from '@/articles'
import { ref, type Ref } from 'vue'

const a = await fetch("/articles/index.json")
const index = await a.json()
export const useArticleStore = defineStore('useArticleStore', () => {

    const articles = ref(index.articles! as Article[])
    const catoIndex = ref(index.categories! as { [key: string]: CategoryIndex })
    const labelIndex = ref(index.labels! as { [key: string]: LabelIndex })
    const mapFilenameToTitle = Object.fromEntries(articles.value.map(a => ([a.filename, a.title])))

    return { articles, catoIndex, labelIndex, mapFilenameToTitle }
})

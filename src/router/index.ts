import Article from "@/Article.vue";
import ArticleIndex from "@/ArticleIndex.vue";
import { useArticleStore } from "@/stores/article";
import MainView from "@/views/MainView.vue";
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: "/articles",
      name: "index",
      component: ArticleIndex,
    },
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: "/articles/:articleURL",
      name: "article",
      component: Article,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;

router.afterEach((to, from) => {
  console.log(to);
  document.title = getTitle() || "No Title";;

  function getTitle() {
    if (to.fullPath.includes("articles/")) {
      return useArticleStore().mapFilenameToTitle[to.params.articleURL as string];
    } else {
      return to.name?.toString()
    }
  }
})

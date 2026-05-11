import Article from "@/Article.vue";
import ArticleIndex from "@/ArticleIndex.vue";
import { useArticleStore } from "@/stores/article";
import MainView from "@/views/MainView.vue";
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
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
];

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createMemoryHistory(),
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 1. If there’s a saved position (e.g., back/forward navigation)
    if (savedPosition) return savedPosition;

    // 2. If the target route has a hash (e.g., /page#section-id)
    if (to.hash) {
      return {
        el: to.hash,          // CSS selector (e.g., '#section-id')
        behavior: 'smooth',   // optional: 'auto' or 'smooth'
        top: 80,              // offset (e.g., fixed header height)
      };
    }

    // 3. Otherwise scroll to top
    return { top: 0 };
  },
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

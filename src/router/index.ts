import Article from "@/Article.vue";
import ArticleIndex from "@/ArticleIndex.vue";
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

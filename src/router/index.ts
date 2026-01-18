import Article from "@/Article.vue";
import ArticleIndex from "@/ArticleIndex.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ArticleIndex,
    },
    // { path: '', redirect: '/' },
    {
      path: "/article/:articleURL",
      name: "article",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Article,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;

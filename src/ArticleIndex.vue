<script lang="ts" setup>
import { computed, ref } from 'vue';
import CatoLabel from './components/CatoLabel.vue'
import { useArticleStore } from './stores/article';
import { computedAsync } from '@vueuse/core';

const props = defineProps<{ num?: number }>()

const { articles, catoIndex, labelIndex } = useArticleStore()

const search = ref("^(Regular Expression|.*)$")

const processedArticles = computedAsync(() => (articles.filter((article) => {
  if (!search.value) return true
  let result = true
  try {
    result = !!JSON.stringify(article).match(search.value)
  } catch (_e: unknown) {
    console.log("Regexp err:", _e);
    result = JSON.stringify(article).includes(search.value)
  }
  return result
})))
</script>

<template>
  <ul class="list-unstyled">
    <BInputGroup class="bg-transparent border-0 border mb-3" v-if="!props.num">
      <BInputGroupText>Search</BInputGroupText>
      <BInput v-model="search" v-if="!props.num" placeholder="Regexp" />
    </BInputGroup>
    <!-- <TransitionGroup name="bounce"> -->
    <template v-for="(article, index) in processedArticles" :key="article.filename">
      <li v-if="!props.num || index < props.num" class="bg-transparent">
        <RouterLink :to="`/articles/${article.filename}`">
          <BCard no-body class="mb-3" :style="{ maxWidth: '540px', width: props.num ? 'max-content' : '100%' }">
            <BCardBody :title="article.title">
              <BCardText>
                <div class="labels mb-1">
                  <cato-label class="cato" :name="article.cato" :index="catoIndex" />
                  <cato-label class="label" :name="label" :index="labelIndex" v-for="label in article.labels"
                    :key="label" />
                </div>
                {{ article.brief }}<br>
                <small class="text-body-secondary">{{ article.time }}</small>
                <a class="continue">Continue -></a>
              </BCardText>
            </BCardBody>
          </BCard>
        </RouterLink>
      </li>
    </template>
    <!-- </TransitionGroup> -->
    <li v-if="num" class="bg-transparent">
      <RouterLink to="/articles">
        <BCard style="width: max-content;">
          <h3 class="d-flex align-items-center justify-content-center h-100">Explore More -></h3>
        </BCard>
      </RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  margin: auto;
  width: max-content;
}

.continue {
  float: right;
  opacity: 0;
  transition: .3s;
}

li:hover .continue {
  opacity: .5;

  &:hover {
    opacity: 1;
  }
}

.card {
  height: 100%;

  &:hover {
    background-color: #ffffff35;
  }
}

li>a {
  text-decoration: none !important;
}
</style>

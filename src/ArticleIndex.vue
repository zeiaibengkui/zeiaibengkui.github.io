<script lang="ts" setup>
import CatoLabel from './components/CatoLabel.vue'
import { useArticleStore } from './stores/article';
const props = defineProps<{ num?: number }>()

const { articles, catoIndex, labelIndex } = useArticleStore()
if (props.num) articles.splice(props.num)

</script>

<template>
  <ul class="list-unstyled">
    <li v-for="(article) in articles" :key="article.filename">
      <RouterLink :to="`/articles/${article.filename}`">
        <BCard no-body class="mb-3" style="max-width: 540px">
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
    <li v-if="num">
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

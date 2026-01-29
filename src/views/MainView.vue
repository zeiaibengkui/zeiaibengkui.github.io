<script lang="ts" setup>
import ArticleIndex from '@/ArticleIndex.vue';
import AboutView from './AboutView.vue';


</script>

<template>
    <div>
        <h2>Recent</h2>
        <Suspense>
            <ArticleIndex class="d-flex overflow-auto w-100 gap-3" style="height: min-content;" :num="3" />
        </Suspense>
        <br><br>
        <AboutView></AboutView>
        <br><br><br><br>
    </div>
</template>

<style lang="scss" scoped></style>

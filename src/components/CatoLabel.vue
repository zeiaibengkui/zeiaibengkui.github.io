<script setup lang="ts">
import type { CategoryIndex, LabelIndex } from '@/articles';

defineProps<{
    index: { [key: string]: CategoryIndex | LabelIndex; };
    name: string
}>()
</script>

<template>
    <span class="me-2 px-1 rounded" :style="{ '--color': index[name]?.color }">{{ name
        }}
    </span>
</template>

<style lang="scss" scoped>
span.cato {
    background-color: color-mix(in srgb, transparent, var(--color));
}

span.label {
    color: color-mix(in srgb, var(--bs-body-color), var(--color));
}

span {
    word-break: keep-all;
}
</style>

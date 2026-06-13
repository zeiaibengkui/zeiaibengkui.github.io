<!-- https://www.3blue1brown.com/lessons/zeta/#content -->


<script lang="ts" setup>
import { useWindowScroll, useWindowSize } from '@vueuse/core';
import { Mafs, Cartesian, OfX, Theme, Parametric, type XYFunc } from 'mafs-vue'
import 'mafs-vue/dist/core.css';
import { computed } from 'vue';
// import 'mafs-vue/dist/font.css'
const a = useWindowScroll({})
const k = computed(() => a.y.value / 100)

const formulas: XYFunc[] = [
    (t) => [Math.cos(k.value - t) * t * 0.1, Math.sin(k.value - t) * t * 0.1],// r=\rho

    // function zeta(t) {
    //     return [
    //         1,1
    //     ]
    // }
]

</script>

<template>
    <Mafs id="bgL" :height="useWindowSize().height.value" :style="{ background: 'var(--bs-body-bg)' }">
        <Cartesian :subdivisions="0" :x-axis="{ axis: false, label: false, lines: false }"
            :y-axis="{ axis: false, label: false, lines: false }" />
        <!-- <OfX :y="(x: number) => Math.sin(x * (Math.sin(k) + 0.5))" :stroked="{ color: Theme.violet }" /> -->
        <Parametric :t="[0, k]" :xy="formulas[Math.floor(Math.random() * formulas.length)]!"
            :stroked="{ color: '#eeefef', weight: 10 }" />
    </Mafs>
</template>

<style lang="scss" scoped>
#bgL {
    position: fixed;
    inset: 0 0 0 0;
    background: #000;
    z-index: -1;
}
</style>

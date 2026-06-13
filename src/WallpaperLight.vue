<!-- https://www.3blue1brown.com/lessons/zeta/#content -->


<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core';
import { Mafs, Parametric, type XYFunc } from 'mafs-vue'
import 'mafs-vue/dist/core.css';
import { computed, ref } from 'vue';
// import 'mafs-vue/dist/font.css'
const a = useWindowScroll({})
const time = ref(0)
setInterval(() => {
    time.value += 0.02
}, 33 /*30fps*/)
const k = computed(() => a.y.value / 100 + (time.value % 100))
const store: any = new Object()
function zetaCriticalLine(t: number, maxIter = 2000) {
    maxIter *= (1 - Math.log1p(Math.abs(t) * 0.001))
    const s_re = 0.5;
    const s_im = t;

    let sum_re = 0, sum_im = 0;

    for (let n = 1; n <= maxIter; n++) {
        const sign = (n % 2 === 1) ? 1 : -1;               // (-1)^(n-1)
        const angle = s_im * Math.log(n);                  // t * ln n
        const mag = Math.pow(n, -s_re);                    // n^{-0.5}

        const term_re = mag * Math.cos(angle);
        const term_im = mag * Math.sin(angle);

        sum_re += sign * term_re;
        sum_im += sign * (-term_im);                       // e^{-iθ} = cosθ - i sinθ
    }

    // sum=Σ (-1)^(n-1) n^{-s}
    // ζ(s) = sum / (1 - 2^{1-s})
    const two_pow_mag = Math.pow(2, 1 - s_re);             // 2^{1 - 0.5} = 2^{0.5}
    const two_angle = s_im * Math.log(2);                  // t * ln 2
    const two_re = two_pow_mag * Math.cos(two_angle);
    const two_im = -two_pow_mag * Math.sin(two_angle);

    const denom_re = 1 - two_re;
    const denom_im = 0 - two_im;                   // 1 - (a + i b) = (1-a) - i b
    const denom_sq = denom_re * denom_re + denom_im * denom_im;

    const zeta_re = (sum_re * denom_re + sum_im * denom_im) / denom_sq;
    const zeta_im = (sum_im * denom_re - sum_re * denom_im) / denom_sq;
    const scale = 1.2
    return [(zeta_re - 1) * scale, zeta_im * scale]; // shift
}
const formulas: XYFunc[] = [
    (t) => [Math.cos(k.value - t) * t * 0.1, Math.sin(k.value - t) * t * 0.1],// r=\rho

    /**
     * Compute ζ(1/2 + i t) using the Dirichlet eta series.
     * @param {number} t - real number (imaginary part)
     * @param {number} maxIter - number of terms 
     * @returns {[number, number]} - [real, imag] of ζ(1/2 + i t)
     */
    (t) => {
        t = Math.floor(t * 50) / 50

        if (!store[t]) {
            store[t] = zetaCriticalLine(t)
            // console.log(Object.keys(store).length);
        }
        return store[t]
    }
]
const selected = false ? Math.floor(Math.random() * formulas.length) : 1 // only zeta now

</script>

<template>
    <Mafs id="bgL" :height="300" :width="300" style="background-color: var(--bs-body-bg);">
        <!-- <Cartesian :subdivisions="0" :x-axis="{ axis: false, label: false, lines: false }"
            :y-axis="{ axis: false, label: false, lines: false }" /> -->
        <!-- <Polar :subdivisions="5" :lines="2" style="filter: contrast(0.2);" /> -->
        <!-- <OfX :y="(x: number) => Math.sin(x * (Math.sin(k) + 0.5))" :stroked="{ color: Theme.violet }" /> -->
        <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="red" />
                <stop offset="50%" stop-color="gold" />
                <stop offset="100%" stop-color="blue" />
            </linearGradient>
            <radialGradient id="radGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="white" />
                <stop offset="100%" stop-color="transparent" />
            </radialGradient>
        </defs>
        <Parametric :t="[k, k + 1]" :xy="formulas[selected]!"
            :stroked="{ color: '#f0f0f0'/* 'url(#radGrad)' */, weight: 10 }" />
    </Mafs>
</template>

<style lang="scss" scoped>
#bgL {
    position: fixed;
    inset: auto 0 0 auto;
    background: #000;
    z-index: -1;
}
</style>

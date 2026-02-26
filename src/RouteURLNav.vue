<template>
  <BBreadcrumb>
    <BBreadcrumbItem to="/">Home</BBreadcrumbItem>
    <transition-group name="bounce">
      <BBreadcrumbItem v-for="(value, idx) in $route.path.split('/').slice(1)" :key="value" :to="$route.path
          .split('/')
          .slice(0, idx + 2)
          .join('/')
        ">
        {{ decodeURI(value) }}
      </BBreadcrumbItem>
    </transition-group>
  </BBreadcrumb>
</template>

<script setup lang="ts"></script>

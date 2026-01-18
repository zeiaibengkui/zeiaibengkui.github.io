<script lang="ts" setup>
await new Promise((res) => {
  res(1);
});
</script>

<template>
  <BListGroup>
    <BListGroupItem to="/article/test.md">test.md</BListGroupItem>
    <BListGroupItem to="/article/1.md">1.md</BListGroupItem>
    <BListGroupItem to="/article/bili.md">bili.md</BListGroupItem>
    <BListGroupItem to="/article/kill-line.md">kill line.md</BListGroupItem>
  </BListGroup>
</template>

<style lang="scss" scoped></style>

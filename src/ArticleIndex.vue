<script lang="ts" setup>
await new Promise((res) => {
  res(1);
});
</script>

<template>
  <BListGroup class="list-unstyled">
    <BListGroupItem to="/articles/test.md">test.md</BListGroupItem>
    <BListGroupItem to="/articles/1.md">1.md</BListGroupItem>
    <BListGroupItem to="/articles/bili.md">bili.md</BListGroupItem>
    <BListGroupItem to="/articles/kill-line.md">kill line.md</BListGroupItem>
    <BListGroupItem to="/articles/TheWorldFunction.md">世界函数存在与否的哲学探讨.md</BListGroupItem>
  </BListGroup>
</template>

<style lang="scss" scoped></style>

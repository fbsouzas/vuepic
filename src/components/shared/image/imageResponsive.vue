<template>
  <img class="image-responsive" :src="url" :alt="title" />
</template>

<script>
export default {
  props: ['url', 'title'],
}
</script>

<style lang="scss" scoped>
.image-responsive {
  width: 100%;
}
</style>
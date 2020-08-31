<template>
  <nav>
    <ul>
      <li :key="route.path" v-for="route in routes">
        <router-link :to="route.path ? route.path : '/'">{{ route.name }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      required: true,
    }
  },
};
</script>

<style lang="scss" scoped>

</style>

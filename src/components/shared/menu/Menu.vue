<template>
  <nav>
    <ul>
      <li :key="route.path" v-for="route in routes" v-show="route.show">
        <router-link :to="{ name: route.name }">{{ route.label }}</router-link>
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

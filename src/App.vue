<template>
  <div class="container">
    <menu-component :routes="routes" />

    <transition name="page">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { routes } from './routes';

import Menu from './components/shared/menu/Menu.vue';

export default {
  components: {
    'menu-component': Menu,
  },

  data() {
    return {
      routes,
    };
  },
}
</script>

<style lang="scss" scoped>
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.page-enter,
.page-leave-active {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity .4s;
}
</style>

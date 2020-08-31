<template>
  <div class="image-card">
    <h2 class="image-card-title" @dblclick="visibled = !visibled">
      {{ title }}
    </h2>

    <transition name="fade-card">
      <div class="image-card-content" v-show="visibled">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      visibled: true,
    };
  },
}
</script>

<style lang="scss" scoped>
.image-card {
  padding: 0 auto;
  border: solid 2px grey;
  display: inline-block;
  margin: 5px;
  box-shadow: 5px 5px 10px grey;
  width: 200px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}

.image-card .image-card-title {
  text-align: center;
  border: solid 2px;
  background: lightblue;
  margin: 0 0 15px 0;
  padding: 10px;
  text-transform: uppercase;
}

.image-card-title {
  cursor: pointer;
}

* {
  box-shadow: 5px 5px 5px;
}

.fade-card-enter,
.fade-card-leave-active {
  opacity: 0;
}

.fade-card-enter-active,
.fade-card-leave-active {
  transition: opacity .4s;
}
</style>

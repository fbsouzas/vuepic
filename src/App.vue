<template>

  <div>
    <h1>{{ title }}</h1>

    <ul>
      <li :key="image.url" v-for="image of images">
        <img :src="image.url" :alt="image.titulo">
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  data() {
    return {
      title: 'Vuepic',
      images: [],
    };
  },

  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(images => this.images = images, err => console.error(err));
  },

}
</script>

<style lang="scss">

</style>

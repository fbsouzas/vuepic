<template>

  <div class="container">
    <h1 class="page-title">{{ title }}</h1>

    <input
      type="search"
      name="filter"
      class="btn-filter"
      @input="filter = $event.target.value"
      placeholder="Pesquise pelo nome da imagen"
    />

    <ul class="image-list">
      <li class="image-list-item" :key="image._id" v-for="image of filterImages">
        <image-card-component :title="image.titulo">
          <img class="image-responsive" :src="image.url" :alt="image.titulo" />
        </image-card-component>
      </li>
    </ul>
  </div>

</template>

<script>
import Card from './components/shared/image-card/Card.vue';

export default {
  components: {
    'image-card-component': Card,
  },

  data() {
    return {
      title: 'Vuepic',
      images: [],
      filter: '',
    };
  },

  computed: {
    filterImages() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');

        return this.images.filter(image => exp.test(image.titulo));
      }

      return this.images;
    },
  },

  created() {
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(res => res.json())
      .then(images => this.images = images, err => console.error(err));
  },

}
</script>

<style lang="scss">
.container {
  font-family: Arial, Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.page-title {
  text-align: center;
}

.image-list {
  list-style: none;
}

.image-list .image-list-item {
  display: inline-block;
}

.btn-filter {
  display: block;
  width: 100%;
  height: 30px;
}

.image-responsive {
  width: 100%;
}
</style>

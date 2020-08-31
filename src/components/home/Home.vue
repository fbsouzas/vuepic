<template>

  <div>
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
          <image-responsive-component :url="image.url" :title="image.titulo" />
        </image-card-component>
      </li>
    </ul>
  </div>

</template>

<script>
import Card from '../shared/image-card/Card.vue';
import ImageResponsive from '../shared/image/imageResponsive.vue';

export default {
  components: {
    'image-card-component': Card,
    'image-responsive-component': ImageResponsive,
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

<style lang="scss" scoped>
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
</style>

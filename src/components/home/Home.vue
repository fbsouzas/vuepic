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
        <my-image-card :title="image.titulo">
          <my-image-responsive v-my-transform:scale.animate="1.1" :url="image.url" :title="image.titulo" />

          <my-button
            label="Remover"
            :hasConfirm="true"
            confirmText="Deseja realmente remover esta foto?"
            buttonStyle="danger"
            @buttonClicked="remove(image)"
          />
        </my-image-card>
      </li>
    </ul>
  </div>

</template>

<script>
import Button from '../shared/button/Button.vue';
import Card from '../shared/image-card/Card.vue';
import ImageResponsive from '../shared/image/imageResponsive.vue';

export default {
  components: {
    'my-button': Button,
    'my-image-card': Card,
    'my-image-responsive': ImageResponsive,
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

  methods: {
    remove(image) {
      alert('Imagem ' + image.titulo + ' removida');
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

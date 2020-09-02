<template>

  <div>
    <h1 class="page-title">{{ title }}</h1>

    <p v-show="message" class="center">{{ message }}</p>

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
          <my-image-responsive v-my-transform:scale.animate="1.2" :url="image.url" :title="image.titulo" />

          <router-link :to="{ name: 'update', params: { id: image._id } }">
            <my-button type="button" label="Editar" />
          </router-link>

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
import transform from '../../directives/Transform';

import ImageService from '../../domain/image/ImageService';

export default {
  components: {
    'my-button': Button,
    'my-image-card': Card,
    'my-image-responsive': ImageResponsive,
  },

  directives: {
    'my-transform': transform,
  },

  data() {
    return {
      title: 'Vuepic',
      images: [],
      filter: '',
      message: '',
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
      this.service.delete(image._id)
        .then(() => {
          let index = this.images.indexOf(image);

          this.images.splice(index, 1);
          this.message = 'Imagem removida com sucesso!';
        }, err => {
          console.log(err);

          this.message = 'Algo não está certo. Não foi possível remover a imagem!';
        });
    },
  },

  created() {
    this.service = new ImageService(this.$resource);

    this.service
      .findAll()
      .then(images => this.images = images, err => console.error(err));
  },

}
</script>

<style lang="scss" scoped>
.page-title,
.center {
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

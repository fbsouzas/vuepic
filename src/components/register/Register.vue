<template>
  <div>
    <h1 class="center">Cadastro</h1>
    <h2 class="center">{{ image.title }}</h2>

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">Título</label>
        <input id="title" autocomplete="off" v-model.lazy="image.title" />
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input id="url" autocomplete="off" v-model.lazy="image.url" />
        <my-image-responsive v-show="image.url" :url="image.url" :title="image.title" />
      </div>

      <div class="control">
        <label for="description">Descrição</label>
        <textarea id="description" autocomplete="off" v-model="image.description" />
      </div>

      <div class="center">
        <my-button type="submit" label="Salvar" />

        <router-link to="/">
          <my-button type="button" label="Voltar" />
        </router-link>

        <my-button type="submit" label="Limpar" @click="clear()" />
      </div>
    </form>
  </div>
</template>

<script>
import Image from '../../domain/image/Image';
import ImageResposive from '../shared/image/imageResponsive.vue';
import Button from '../shared/button/Button.vue';

export default {
  components: {
    'my-image-responsive': ImageResposive,
    'my-button': Button,
  },

  data() {
    return {
      image: new Image(),
    };
  },

  methods: {
    save() {
      this.$http.post('http://localhost:3000/v1/fotos', {
        titulo: this.image.title,
        url: this.image.url,
        descricao: this.image.description,
      })
        .then(() => this.clear(), err => console.log(err));
    },

    clear() {
      this.image = new Image();
    },
  },
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}

.control {
  font-size: 1.2em;
  margin-bottom: 20px;

}
.control label {
  display: block;
  font-weight: bold;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px
}
</style>
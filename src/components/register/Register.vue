<template>
  <div>
    <h1 v-if="!image._id" class="center">Cadastro de imagem</h1>
    <h1 v-else class="center">Atualização de imagem</h1>

    <h2 class="center">{{ image.title }}</h2>

    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <ValidationProvider name="título" rules="required|min:5|max:60">
          <div class="control" slot-scope="{ errors }">
            <label for="title">Título</label>
            <input
              id="title"
              name="title"
              autocomplete="off"
              v-model.lazy="image.title"
            />
            <span class="validate-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name="url" rules="required">
          <div class="control" slot-scope="{ errors }">
            <label for="url">URL</label>
            <input id="url" autocomplete="off" v-model.lazy="image.url" />
            <my-image-responsive v-show="image.url" :url="image.url" :title="image.title" />
            <span class="validate-error">{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class="control">
          <label for="description">Descrição</label>
          <textarea id="description" autocomplete="off" v-model="image.description" />
        </div>

        <p class="center" v-show="message">{{ message }}</p>

        <div class="center">
          <my-button type="submit" :label="image._id ? 'Atualizar' : 'Salvar'" />

          <router-link :to="{ name: 'home' }">
            <my-button type="button" label="Voltar" />
          </router-link>

          <my-button type="button" label="Limpar" @click.native="clear()" />
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Button from '../shared/button/Button.vue';
import Image from '../../domain/image/Image';
import ImageService from '../../domain/image/ImageService';
import ImageResposive from '../shared/image/imageResponsive.vue';

export default {
  components: {
    'my-image-responsive': ImageResposive,
    'my-button': Button,
  },

  data() {
    return {
      image: new Image(),
      id: this.$route.params.id,
      message: '',
    };
  },

  created() {
    this.service = new ImageService(this.$resource);

    if (this.id) {
      this.service.find(this.id)
        .then(image => this.image = {
          _id: image._id,
          title: image.titulo,
          url: image.url,
          description: image.descricao,
        }, err => this.message = err.message);
    }
  },

  methods: {
    onSubmit() {
      if (this.image._id) {
        this.update();

        return;
      }

      this.save();
    },

    save() {
      this.service.create({
        titulo: this.image.title,
        url: this.image.url,
        descricao: this.image.description,
      })
        .then(() => this.$router.push({ name: 'home' }), err => this.message = err.message);
    },

    update() {
      this.service.update({
        _id: this.image._id,
        titulo: this.image.title,
        url: this.image.url,
        descricao: this.image.description,
      })
        .then(() => this.$router.push({ name: 'home' }), err => this.message = err.message);
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

.validate-error {
  color: red;
  font-size: 13px;
}
</style>
<template>
  <button
    :type="type"
    class="button"
    :class="buttonStyleHandler"
    @click="dispatchEvent()"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
    },
    label: {
      type: String,
      required: true,
    },
    hasConfirm: {
      type: Boolean,
      required: false,
      default: false,
    },
    confirmText: {
      type: String,
      required: false,
      default: 'Deseja mesmo remover este item?',
    },
    buttonStyle: {
      type: String,
      required: false,
      default: 'default',
    },
  },

  methods:{
    dispatchEvent() {
      if (!this.hasConfirm) {
        this.$emit('buttonClicked');

        return;
      }

      if (confirm(this.confirmText)) {
        this.$emit('buttonClicked');
      }
    },
  },

  computed: {
    buttonStyleHandler() {
      if (this.buttonStyle == 'danger') {
        return 'button-danger';
      }

      return 'button-default';
    },
  },
}
</script>

<style lang="sass" scoped>
  @import './Button.scss';
</style>

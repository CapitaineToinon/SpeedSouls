<template>
  <b-field>
    <b-radio-button
      :key="i"
      v-for="(option, i) in options"
      :native-value="i"
      @input="onInput"
    >
      <span>{{ option.label }}</span>
    </b-radio-button>
  </b-field>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    onInput(e) {
      console.log(e);
      this.$emit("input", e);
    }
  }
};
</script>

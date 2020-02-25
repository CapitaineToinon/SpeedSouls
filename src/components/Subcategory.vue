<template>
  <b-field>
    <b-radio-button
      :key="i"
      v-for="(option, i) in options"
      :native-value="i"
      v-model="radioButton"
      @input="onInput"
    >
      <span>{{ option.label }}</span>
    </b-radio-button>
    {{ radioButton }}
  </b-field>
</template>

<script>
export default {
  data: () => ({
    radioButton: ""
  }),
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    onInput() {
      this.$emit("change", this.radioButton);
    }
  }
};
</script>

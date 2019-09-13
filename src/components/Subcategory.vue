<template>
  <b-field>
    <b-radio-button
      v-model="radioButton"
      v-for="(v, i) in variable.values.values"
      :native-value="i"
      :key="i"
    >
      <span>{{ v.label }}</span>
    </b-radio-button>
  </b-field>
</template>

<script>
export default {
  props: {
    variable: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    radioButton: ""
  })
};
</script>

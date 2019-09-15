<template>
  <b-field>
    <b-radio-button
      v-model="subcategory.value"
      v-for="(v, i) in subcategory.values"
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
    subcategory: {
      type: Object,
      required: true
    }
  }
};
</script>

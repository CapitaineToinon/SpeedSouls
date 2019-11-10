<template>
  <div class="categories">
    <b-menu-list label="Categories">
      <b-menu-item
        v-for="(category, i) in categories"
        :key="i"
        icon="information-outline"
        :label="category.name"
        :active="category === active"
        @click="$emit('CategoryClick', category)"
      ></b-menu-item>
    </b-menu-list>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Object,
      default: undefined
    },
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

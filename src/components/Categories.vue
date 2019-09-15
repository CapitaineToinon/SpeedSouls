<template>
  <div class="categories">
    <b-menu-list label="Categories">
      <b-menu-item
        v-for="(category, i) in main"
        :key="i"
        icon="information-outline"
        :label="category.name"
        :active="category === active"
        @click="$emit('CategoryClick', category)"
      ></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Miscellaneous" v-if="misc.length">
      <b-menu-item
        v-for="(category, i) in misc"
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
  },
  computed: {
    main() {
      return this.categories.filter(c => !c.misc);
    },
    misc() {
      return this.categories.filter(c => c.misc);
    }
  }
};
</script>

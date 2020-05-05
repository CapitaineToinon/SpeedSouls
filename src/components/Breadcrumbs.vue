<template>
  <div class="breadcrumbs flex flex-row flex-wrap">
    <div
      class="item text-nord0 dark:text-nord6 flex flex-row flex-no-wrap items-center"
      v-for="(item, i) in items"
      :key="i"
    >
      <font-awesome-icon
        v-if="i !== 0"
        class="mr-3"
        :icon="['fas', 'chevron-right']"
      />
      <router-link
        class="mr-3 text-nord10"
        v-if="item.to && !item.active"
        :to="item.to"
        >{{ item.text }}</router-link
      >
      <span class="mr-3" v-else>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div class="breadcrumbs flex flex-row flex-wrap">
    <div
      v-for="(item, i) in acutalItems"
      :key="i"
      class="item flex flex-row flex-nowrap items-center text-nord0 dark:text-nord6"
    >
      <font-awesome-icon
        v-if="i !== 0"
        class="mr-3"
        :icon="['fas', 'chevron-right']"
      />
      <router-link
        v-if="item.to && !item.active"
        class="mr-3 text-nord10"
        :to="item.to"
        >{{ item.text }}</router-link
      >
      <span v-else class="text mr-3">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
  setup(props) {
    const acutalItems = computed(() => {
      if (props.loading)
        return [
          ...props.items,
          {
            active: true,
            text: '...',
          },
        ];
      else return props.items;
    });

    return {
      acutalItems,
    };
  },
};
</script>

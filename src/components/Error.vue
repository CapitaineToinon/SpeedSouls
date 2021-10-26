<template>
  <alert type="danger">
    <span v-if="message">{{ message }} </span>
    <a :href="$route.fullPath" class="underline">Click here to try again</a>.
  </alert>
</template>

<script>
import Alert from '@/components/Alert.vue';
import { computed } from '@vue/composition-api';

export default {
  components: { Alert },
  props: {
    error: {
      type: Error,
      required: true
    }
  },
  setup(props) {
    const message = computed(
      () =>
        props.error?.response?.message ||
        props.error?.message ||
        props.error ||
        'Unknown error.'
    );

    return {
      message
    };
  }
};
</script>

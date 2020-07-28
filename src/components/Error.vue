<template>
  <alert type="danger">
    Something broke 😨 <span v-if="message">({{ message }}) </span>
    <a :href="$route.fullPath" class="underline">Click here to try again</a>.
  </alert>
</template>

<script>
import Alert from '@/components/Alert';

export default {
  components: { Alert },
  props: {
    error: {
      type: Error,
      required: true
    }
  },
  computed: {
    message() {
      return (
        this.error?.response?.message ||
        this.error?.message ||
        this.error ||
        undefined
      );
    }
  }
};
</script>

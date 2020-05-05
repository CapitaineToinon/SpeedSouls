<template>
  <alert type="danger">
    {{ message }}
  </alert>
</template>

<script>
import Alert from "@/components/Alert";

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
        (this.error.response && this.error.response.message) ||
        (this.error && this.error.message) ||
        this.error ||
        "Something broke..."
      );
    }
  }
};
</script>

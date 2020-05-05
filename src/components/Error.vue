<template>
  <alert type="danger">{{
    (error.response && error.response.message) || error.message || error
  }}</alert>
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
  }
};
</script>

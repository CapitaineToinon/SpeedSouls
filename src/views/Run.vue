<template>
  <pre v-if="status.fulfilled">{{ run }}</pre>
</template>

<script>
import status from "@/mixins/status";
import { prepareGetRun } from "@/api/speedsouls";
const [getRun, cancel] = prepareGetRun();

export default {
  mixins: [status],
  data: () => ({
    run: null
  }),
  methods: {
    async fetchData() {
      this.status.pending = true;
      this.status.rejected = this.status.cancelled = this.status.fulfilled = false;

      try {
        this.run = await getRun(this.$route.params.id);
        this.status.fulfilled = true;
      } catch (e) {
        this.status.rejected = true;
        this.status.fulfilled = false;
      }

      this.status.pending = false;
    }
  },
  mounted() {
    this.fetchData();
  },
  unmounted: cancel,
  destroyed: cancel
};
</script>

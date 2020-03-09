<template>
  <div v-if="runError" class="rejected container has-fixed-navbar-top">
    <div class="section">
      <b-message
        title="Error"
        type="is-danger"
        aria-close-label="Close message"
        :closable="false"
        >{{ runError.message }}</b-message
      >
    </div>
  </div>
  <div v-else-if="!run" class="pending container has-fixed-navbar-top">
    <div class="section">
      <ss-loading :active="true" />
    </div>
  </div>
  <div v-else class="fulfilled container has-fixed-navbar-top">
    <pre>{{ run }}</pre>
  </div>
</template>

<script>
import { of } from "rxjs";
import { pluck, switchMap, catchError } from "rxjs/operators";
import { useRuns } from "../api/rx-souls";

export default {
  data: () => ({
    run: undefined,
    runError: null
  }),
  mounted() {
    this.$subscribeTo(
      this.$watchAsObservable("$route.params.id", { immediate: true }).pipe(
        pluck("newValue"),
        switchMap(id =>
          useRuns(id).pipe(
            catchError(error => {
              this.runError = error;
              return of(undefined);
            })
          )
        )
      ),
      run => (this.run = run)
    );
  }
};
</script>

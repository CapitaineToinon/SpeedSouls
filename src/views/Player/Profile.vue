<template>
  <Promised :promise="pbsPromise">
    <template #pending>
      <div class="progress h-2 flex flex-row" />
    </template>

    <template #default="pbs">
      <alert v-if="pbs.length === 0" type="info" class="w-full mb-6"
        >The are no runs.</alert
      >
      <div
        v-for="(group, i) in pbs"
        :key="i"
        class="flex flex-col w-full justify-center mb-4"
      >
        <breadcrumbs
          class="pb-3"
          :items="[
            {
              text: 'Leaderboards',
              to: { name: 'Games' }
            },
            {
              text: group.game.name,
              to: {
                name: 'Game',
                params: {
                  game: group.game.abbreviation
                }
              }
            }
          ]"
        />

        <div class="responsive-table rounded-none">
          <table class="text-center rounded-none">
            <thead>
              <tr>
                <th class="shrink">Rank</th>
                <th class="expand">Category</th>
                <th class="shrink">Time</th>
                <th class="shrink">Date</th>
                <th class="shrink hidden lg:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in group.runs"
                :key="row.id"
                @click="onRowClick(row)"
              >
                <td class="shrink" data-label="Rank">{{ row.place }}</td>
                <td class="expand" data-label="Category">
                  {{ row.category.name }}
                  <span
                    class="text-nord1 dark:text-nord4"
                    v-for="(value, varId) in row.values"
                    :key="varId"
                  >
                    ({{
                      getVariableName(row.category.variables, varId, value)
                    }})
                  </span>
                </td>
                <td class="shrink" data-label="Time">
                  {{ row.primary_t.time }}
                </td>

                <td v-if="relativeTime" class="shrink" data-label="Date">
                  {{ row.date | relativeDate }} ago
                </td>
                <td v-else class="shrink" data-label="Date">
                  {{ row.date | date }}
                </td>
                <td class="shrink hidden lg:table-cell">
                  <font-awesome-icon
                    v-if="row.showicon"
                    :icon="['fas', 'video']"
                  />
                  <font-awesome-icon
                    v-else
                    class="text-nord11"
                    :icon="['fas', 'video-slash']"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-col w-full">
        <by-speedrun-com class="text-center" />
      </div>
    </template>

    <template #rejected="error">
      <error :error="error" />
    </template>
  </Promised>
</template>

<script>
import Alert from '@/components/Alert';
import Error from '@/components/Error';
import Breadcrumbs from '@/components/Breadcrumbs';
import BySpeedrunCom from '@/components/BySpeedrunCom';
import relativeDate from '@/filters/relativeDate';
import date from '@/filters/date';
import { ref, computed } from '@vue/composition-api';
import { useUserPersonalBests, useUser } from '@/api/rx-souls';

export default {
  metaInfo() {
    return {
      title: this.metaTitle
    };
  },
  components: { Alert, Error, Breadcrumbs, BySpeedrunCom },
  filters: {
    date,
    relativeDate
  },
  setup(props, { root }) {
    const player = ref(undefined);
    const metaTitle = computed(() => player.value?.name || undefined);
    const relativeTime = computed(() => root.$store.getters.relativeTime);

    useUser(root.$route.params.id)
      .toPromise()
      .then(p => (player.value = p));

    const pbsPromise = computed(() =>
      useUserPersonalBests(root.$route.params.id).toPromise()
    );

    function getVariableName(variables, id, value) {
      return variables.find(v => v.id === id)?.values.values[value]?.label;
    }

    function onRowClick({ id }) {
      root.$router.push({
        name: 'Run',
        params: {
          id
        }
      });
    }

    return {
      relativeTime,
      metaTitle,
      pbsPromise,
      getVariableName,
      onRowClick
    };
  }
};
</script>

<template>
  <div v-if="youtubeID" class="speedsouls-video inverted">
    <iframe
      :src="`https://www.youtube.com/embed/${youtubeID}`"
      frameborder="0"
      scrolling="no"
      allowfullscreen="true"
    ></iframe>
  </div>
  <div v-else-if="twitchID" class="speedsouls-video bg-nord5 dark:bg-nord3">
    <iframe
      :src="`https://player.twitch.tv/?video=${twitchID}&autoplay=${autoPlay}&parent=${parent}`"
      frameborder="0"
      scrolling="no"
      allowfullscreen="true"
    ></iframe>
  </div>
  <div v-else class="p-4">
    <alert type="info">
      Watch at
      <external-link :href="url" target="_blank" rel="noopener">{{
        url
      }}</external-link>
    </alert>
  </div>
</template>

<script>
/* eslint-disable-next-line */
const TWITCH_REGEX =
  /(?:http(?:s)?:\/\/(?:www.)?)?twitch.tv\/(?:(?:.+?)\/v|videos)\/([0-9]+)/;
import getIdFromUrl from 'get-youtube-id';
import Alert from '@/components/Alert.vue';
import ExternalLink from '@/components/ExternalLink.vue';
import { computed } from '@vue/composition-api';

export default {
  components: {
    Alert,
    ExternalLink,
  },
  props: {
    autoPlay: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const youtubeID = computed(() => getIdFromUrl(props.url));
    const twitchID = computed(() => TWITCH_REGEX.exec(props.url)?.[1] || null);
    const parent = computed(() => window.location.hostname);

    return {
      youtubeID,
      twitchID,
      parent,
    };
  },
};
</script>

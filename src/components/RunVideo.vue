<template>
  <div v-if="youtubeID" class="speedsouls-video bg-nord4 dark:bg-nord3">
    <iframe
      :src="`https://www.youtube.com/embed/${youtubeID}`"
      frameborder="0"
      scrolling="no"
      allowfullscreen="true"
    ></iframe>
  </div>
  <div v-else-if="twitchID" class="speedsouls-video bg-nord4 dark:bg-nord3">
    <iframe
      :src="
        `https://player.twitch.tv/?video=${twitchID}&autoplay=${autoPlay}&parent=${parent}`
      "
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
const TWITCH_REGEX = /(?:http(?:s)?:\/\/(?:www.)?)?twitch.tv\/(?:(?:.+?)\/v|videos)\/([0-9]+)/;
import getIdFromUrl from 'get-youtube-id';
import Alert from '@/components/Alert';
import ExternalLink from '@/components/ExternalLink';

export default {
  components: {
    Alert,
    ExternalLink
  },
  data: () => ({
    youtubeID: null,
    twitchID: null,
    parent: window.location.hostname
  }),
  props: {
    autoPlay: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    getYouTubeID() {
      return getIdFromUrl(this.url);
    },
    getTwitchID() {
      const matches = TWITCH_REGEX.exec(this.url);
      return matches && matches[1] ? matches[1] : null;
    }
  },
  beforeMount() {
    this.youtubeID = this.getYouTubeID();
    this.twitchID = this.getTwitchID();
  }
};
</script>

<style lang="scss">
/**
 * Scoped CSS Doesn't work on dynamic content 
 * https://github.com/vuejs/vue-loader/issues/559
 */

:root.mode-dark {
  .speedsouls-video {
    --skeleton-color: #434c5e;
    @apply bg-nord1;
  }
}

:root:not(.mode-dark) {
  .speedsouls-video {
    --skeleton-color: #d8dee9;
    @apply bg-nord5;
  }
}

.speedsouls-video {
  width: 100%;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      var(--skeleton-color) 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;

    @keyframes load {
      from {
        left: -100%;
      }
      to {
        left: 100%;
      }
    }
  }
}
</style>

<template>
  <footer class="font-sans shadow-md bg-nord6 dark:bg-nord1 py-5 px-6">
    <div class="container">
      <div
        class="socials text-nord0 dark:text-nord6 py-12 grid grid-cols-4 gap-4 text-center"
      >
        <div class="discord">
          <font-awesome-icon
            class="mb-2"
            :icon="['fab', 'discord']"
            size="3x"
          />
          <p>Discord</p>
        </div>
        <div class="twitter">
          <font-awesome-icon
            class="mb-2"
            :icon="['fab', 'twitter']"
            size="3x"
          />
          <p>Twitter</p>
        </div>
        <div class="patreon">
          <font-awesome-icon
            class="mb-2"
            :icon="['fab', 'patreon']"
            size="3x"
          />
          <p>Patreon</p>
        </div>
        <div class="github">
          <font-awesome-icon class="mb-2" :icon="['fab', 'github']" size="3x" />
          <p>Github</p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-evenly pb-4">
        <theme-switcher />
      </div>
      <div
        class="pt-4 mt-4 text-nord0 dark:text-nord6 text-xs border-t border-nord5 dark:border-nord3 text-center"
      >
        ©2019 Hyperyolo. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script>
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default {
  components: { ThemeSwitcher }
};
</script>

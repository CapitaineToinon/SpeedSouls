import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const DARK_CLASS = 'dark';

/**
 * Get the current theme from the user prefers color scheme
 */
function getDarkFromPrefersColorScheme() {
  return !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;
}

// Update the dark mode on the DOM
function updateDocument(add) {
  add
    ? document.documentElement.classList.add(DARK_CLASS)
    : document.documentElement.classList.remove(DARK_CLASS);
}

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    dark: true,
    theme: 'DARK',
    relativeTime: true
  },
  mutations: {
    setTheme: (state, payload) => {
      switch (payload) {
        case 'DARK':
          state.theme = 'DARK';
          state.dark = true;
          break;
        case 'LIGHT':
          state.theme = 'LIGHT';
          state.dark = false;
          break;
        case 'AUTO':
          state.theme = 'AUTO';
          state.dark = getDarkFromPrefersColorScheme();
          break;
      }

      updateDocument(state.dark);
    },
    setRelativeTime: (state, payload) => {
      state.relativeTime = payload;
    }
  },
  actions: {
    enableDark({ commit }) {
      commit('setTheme', 'DARK');
    },
    enableLight({ commit }) {
      commit('setTheme', 'LIGHT');
    },
    enableAuto({ commit }) {
      commit('setTheme', 'AUTO');
    },
    enableRelativeTime({ commit }) {
      commit('setRelativeTime', true);
    },
    disableRelativeTime({ commit }) {
      commit('setRelativeTime', false);
    }
  },
  getters: {
    dark: state => state.dark,
    theme: state => state.theme,
    relativeTime: state => state.relativeTime
  }
});

// Update the document at the start
updateDocument(store.state.dark);

export default store;

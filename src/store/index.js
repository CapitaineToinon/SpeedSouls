import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const DARK_CLASS = "mode-dark";

/**
 * Get the current theme from the user prefers color scheme
 */
function getDarkFromPrefersColorScheme() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

/**
 * Returns if the user wants dark mode or not
 */
function getDark() {
  const isDark = lsDark();
  const theme = lsTheme();

  return theme === "AUTO" ? getDarkFromPrefersColorScheme() : isDark;
}

// Get current dark mode from local storage
function lsDark() {
  return localStorage.getItem("dark") === "true";
}

// Get current theme from local storage
function lsTheme() {
  return localStorage.getItem("theme") ?? "AUTO";
}

// Update the dark mode on the DOM
function updateDocument(add) {
  add
    ? document.documentElement.classList.add(DARK_CLASS)
    : document.documentElement.classList.remove(DARK_CLASS);
}

const store = new Vuex.Store({
  state: {
    dark: getDark() ?? true,
    theme: lsTheme() ?? "DARK"
  },
  mutations: {
    setTheme: (state, payload) => {
      switch (payload) {
        case "DARK":
          state.theme = "DARK";
          state.dark = true;
          localStorage.setItem("dark", "true");
          break;
        case "LIGHT":
          state.theme = "LIGHT";
          state.dark = false;
          localStorage.setItem("dark", "false");
          break;
        case "AUTO":
          state.theme = "AUTO";
          state.dark = getDarkFromPrefersColorScheme();
          localStorage.setItem("dark", state.dark);
          break;
      }

      localStorage.setItem("theme", state.theme);
      updateDocument(state.dark);
    }
  },
  actions: {
    enableDark({ commit }) {
      commit("setTheme", "DARK");
    },
    enableLight({ commit }) {
      commit("setTheme", "LIGHT");
    },
    enableAuto({ commit }) {
      commit("setTheme", "AUTO");
    }
  }
});

// Update the document at the start
updateDocument(getDark());

export default store;

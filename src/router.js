import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
// import speedsouls from "@/api/speedsouls";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "SpeedSouls"
      }
    },
    {
      // In case anyone links to the old wiki page
      path: "/Main_Page",
      redirect: {
        name: "home"
      }
    },
    {
      path: "/leaderboards",
      component: () => import("@/views/Leaderboards/Index.vue"),
      children: [
        {
          path: "",
          name: "games",
          component: () => import("@/views/Leaderboards/Games.vue")
        },
        {
          path: ":game/:category?",
          name: "game",
          component: () => import("@/views/Leaderboards/Game.vue")
        }
      ]
    },
    {
      path: "/submit",
      name: "submit",
      component: () => import("./views/Submit.vue"),
      meta: {
        title: "SpeedSouls - Submit a run"
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: {
        title: "SpeedSouls - About"
      }
    },
    {
      path: "**",
      name: "redirect",
      beforeEnter(/* to */) {
        alert("Todo: Redirect page?");
        // window.location.replace(`${speedsouls.WIKI_URL}${to.fullPath}`);
      }
    }
  ]
});

// from https://alligator.io/vuejs/vue-router-modify-head/
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  next();
});

/**
 * Scroll back on top of route change
 */
router.afterEach(() => {
  window.scrollTo({ top: 0 });
});

export default router;

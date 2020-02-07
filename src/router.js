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
      component: Home
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
          path: ":abbreviation",
          name: "game",
          component: () => import("@/views/Leaderboards/Game.vue")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
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

/**
 * Scroll back on top of route change
 */
router.afterEach((to, from, next) => {
  window.scrollTo({ top: 0 });
  next();
});

export default router;

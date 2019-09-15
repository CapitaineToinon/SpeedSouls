import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import speedsouls from "@/api/speedsouls";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "**",
      name: "redirect",
      beforeEnter(to) {
        window.location.replace(`${speedsouls.WIKI_URL}${to.fullPath}`);
      }
    }
  ]
});

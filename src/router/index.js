import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/leaderboards",
    component: () => import("@/views/Leaderboards/Index.vue"),
    children: [
      {
        path: "",
        name: "Games",
        component: () => import("@/views/Leaderboards/Games.vue")
      },
      {
        path: ":game/:category?",
        name: "Game",
        component: () => import("@/views/Leaderboards/Game.vue")
      }
    ]
  },
  {
    path: "/run/:id",
    name: "Run",
    component: () => import("@/views/Run.vue")
  },
  {
    path: "/player/:id",
    name: "Player",
    component: () => import("@/views/Player.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

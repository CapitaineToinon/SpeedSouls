import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // In case anyone links to the old wiki page
    path: '/Main_Page',
    redirect: {
      name: 'Home'
    }
  },
  {
    path: '/leaderboards',
    component: () =>
      import(
        /* webpackChunkName: "leaderboards" */ '@/views/Leaderboards/Index.vue'
      ),
    children: [
      {
        path: '',
        name: 'Games',
        component: () =>
          import(
            /* webpackChunkName: "games" */ '@/views/Leaderboards/Games.vue'
          )
      },
      {
        path: ':game/:category?',
        name: 'Game',
        component: () =>
          import(/* webpackChunkName: "game" */ '@/views/Leaderboards/Game.vue')
      }
    ]
  },
  {
    path: '/run/:id',
    component: () =>
      import(/* webpackChunkName: "user" */ '@/views/Player/Index.vue'),
    children: [
      {
        path: '',
        name: 'Run',
        component: () =>
          import(/* webpackChunkName: "run" */ '@/views/Player/Run.vue')
      }
    ]
  },
  {
    path: '/player/:id',
    component: () =>
      import(/* webpackChunkName: "user" */ '@/views/Player/Index.vue'),
    children: [
      {
        path: '',
        name: 'Player',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/views/Player/Profile.vue')
      }
    ]
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () =>
      import(/* webpackChunkName: "submit" */ '@/views/Submit.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '@/views/Settings.vue')
  },
  {
    path: '**',
    name: 'redirect',
    component: () =>
      import(/* webpackChunkName: "redirect" */ '@/views/Redirect.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
});

// Scroll back on top of route change
router.afterEach(() => {
  window.scrollTo({ top: 0 });
});

export default router;

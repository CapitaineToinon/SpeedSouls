import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'SpeedSouls'
    }
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
    component: () => import('@/views/Leaderboards/Index.vue'),
    children: [
      {
        path: '',
        name: 'Games',
        component: () => import('@/views/Leaderboards/Games.vue')
      },
      {
        path: ':game/:category?',
        name: 'Game',
        component: () => import('@/views/Leaderboards/Game.vue')
      }
    ]
  },
  {
    path: '/run/:id',
    component: () => import('@/views/Player/Index.vue'),
    children: [
      {
        path: '',
        name: 'Run',
        component: () => import('@/views/Player/Run.vue')
      }
    ]
  },
  {
    path: '/player/:id',
    component: () => import('@/views/Player/Index.vue'),
    children: [
      {
        path: '',
        name: 'Player',
        component: () => import('@/views/Player/Profile.vue')
      }
    ]
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('@/views/Submit.vue'),
    meta: {
      title: 'SpeedSouls - Submit a run'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: 'SpeedSouls - Settings'
    }
  },
  {
    path: '**',
    name: 'redirect',
    beforeEnter(to) {
      window.location.replace(`${process.env.VUE_APP_WIKI}${to.fullPath}`);
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
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

// Scroll back on top of route change
router.afterEach(() => {
  window.scrollTo({ top: 0 });
});

export default router;

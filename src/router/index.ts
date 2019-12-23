import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import ModalView from '../views/ModalView.vue';
import MapView from '../views/MapView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/modal',
    name: 'modalView',
    component: ModalView,
  },
  {
    path: '/map',
    name: 'mapView',
    component: MapView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

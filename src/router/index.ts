import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import ModalView from '../views/ModalView.vue';
import MapView from '../views/MapView.vue';
import SpinnerView from '../views/SpinnerView.vue';
import AlertView from '../views/AlertView.vue';
import PieChartView from '../views/PieChartView.vue';
import LineChartView from '../views/LineChartView.vue';
import PaginationView from '../views/PaginationView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/pieChart',
    name: 'pieChartView',
    component: PieChartView,
  },
  {
    path: '/pagination',
    name: 'paginationView',
    component: PaginationView,
  },
  {
    path: '/lineChart',
    name: 'lineChartView',
    component: LineChartView,
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
  {
    path: '/spinner',
    name: 'spinnerView',
    component: SpinnerView,
  },
  {
    path: '/alert',
    name: 'alertView',
    component: AlertView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

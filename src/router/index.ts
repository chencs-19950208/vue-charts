import Vue from 'vue';
import VueRouter from 'vue-router';
import PieChartView from '../views/PieChartView.vue';
import BarChart3D from '../components/BarChart3D.vue';
import DashboardView from '../views/DashboardView.vue';
import CollisionTaskView from '../views/CollisionTaskView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/collision'
  },
  {
    path: '/collision',
    name: 'CollisionTask',
    component: CollisionTaskView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/pie',
    name: 'PieChart',
    component: PieChartView
  },
  {
    path: '/bar',
    name: 'BarChart',
    component: BarChart3D
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router;

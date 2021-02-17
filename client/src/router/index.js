import Vue from 'vue';
import VueRouter from 'vue-router';
import List from '../views/List.vue';
import Card from '../views/Card.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/List',
    name: 'List',
    component: List,
  },
  {
    path: '/card',
    name: 'Card',
    component: Card,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
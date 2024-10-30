import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import Quiz from '../views/QuizPage.vue';
import Score from '../views/ScorePage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/quiz',
    name: 'QuizPage',
    component: Quiz,
  },
  {
    path: '/score',
    name: 'ScorePage',
    component: Score,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

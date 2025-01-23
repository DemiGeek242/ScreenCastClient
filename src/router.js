import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue'; // Votre composant actuel
import MainScreen from './components/MainScreen.vue'; // Le composant cible

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: { title: 'Accueil - ScreenCast' },
    },
    {
        path: '/main-screen',
        name: 'MainScreen',
        component: MainScreen,
        meta: { title: 'Osiane 2025 - ScreenCast' },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
// Mettre à jour dynamiquement le titre de la page
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export default router;

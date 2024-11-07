import Products from "./components/Products.vue";
import Connexion from "./components/Connexion.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/", component: () => import("./components/Connexion.vue") },

  { path: "/products", component: () => import("./components/Products.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Si une position enregistrée existe (ex: pour le bouton retour), utilise cette position
    if (savedPosition) {
      return savedPosition;
    } else {
      // Sinon, défile vers le haut de la page
      return { top: 0 };
    }
  },
});

export default router;

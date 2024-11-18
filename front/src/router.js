import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/login", component: () => import("./components/Login.vue") },

  { path: "/products", component: () => import("./components/Products.vue") },
  { path: "/", component: () => import("./components/bouton.vue") },
  { path: "/register", component: () => import("./components/Register.vue") },
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

import { createApp, createRouter } from "vue";
import "./style.css";
import App from "./App.vue";
import Products from "./components/Products.vue";
import router from "./router.js";

// const app = createApp(App);
// app.use(router); // Assurez-vous que le routeur est bien ajouté ici
// app.mount("#app");

createApp(App).use(router).mount("#app");

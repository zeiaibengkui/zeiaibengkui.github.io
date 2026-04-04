import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "heti/umd/heti.min.css"
import "./assets/main.scss";

// import $ from "jquery";
// import "jquery.ripples";
//
// (window as unknown as { $: JQueryStatic }).$ = $;
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount("#app");

document.querySelector("#loading").style.display="none";

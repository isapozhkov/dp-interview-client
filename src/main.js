import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import vuetify from "./plugins/vuetify";

Vue.prototype.$http = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8081"
});
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");

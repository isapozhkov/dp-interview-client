import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

Vue.prototype.$http = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8081"
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

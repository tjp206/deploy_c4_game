import Vue from 'vue'
import App from './App.vue'
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false;
export const eventBus = new Vue();
Vue.use(VueSimpleAlert);

new Vue({
  render: h => h(App),
}).$mount('#app')

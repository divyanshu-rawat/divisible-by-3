import Vue from 'vue'
import App from './App'
import router from './vue-router/router'
import store from '@/vuex-store/store';

/* VueFire makes it super easy to bind firestore collections and documents and keep your local data always up to date with their remote versions. */
import { rtdbPlugin } from 'vuefire';
Vue.use(rtdbPlugin);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
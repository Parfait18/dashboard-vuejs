import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import TheHeader from './components/TheHeader'
import TheFooter from './components/TheFooter'
import TheSideBar from './components/TheSideBar'
import FlagIcon from 'vue-flag-icon'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import axios from 'axios';


Vue.prototype.$http = axios;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = " http://localhost:8000/";
axios.defaults.withCredentials = true;



axios.interceptors.response.use(function (response) {
  store.commit('SET_GLOBAL_ERROR', false)
  return response;
}, function (error) {
  if (error.message === "Network Error" || (error.response && error.response.status >= 500)) {
    store.commit('SET_GLOBAL_ERROR', true)
  }
  return Promise.reject(error);
});


Vue.config.productionTip = false
Vue.use(FlagIcon);
Vue.use(VueViewer)

Vue.component('TheHeader', TheHeader)
Vue.component('TheFooter', TheFooter)
Vue.component('TheSideBar', TheSideBar)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

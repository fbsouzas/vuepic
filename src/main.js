import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { ValidationObserver, ValidationProvider, extend, localize } from 'vee-validate';
import pt_BR from 'vee-validate/dist/locale/pt_BR.json';
import * as rules from 'vee-validate/dist/rules';

import { routes } from './routes';

import 'bootstrap/dist/css/bootstrap.css';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.root = 'http://localhost:3000/';

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('pt_BR', pt_BR);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});

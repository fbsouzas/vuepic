import Home from './components/home/Home.vue';
import Register from './components/register/Register.vue';
import NotFound from './components/not-found/NotFound.vue';

export const routes = [
  { path: '', name: 'home', component: Home, label: 'Home', show: true, },
  { path: '/image/new', name: 'register', component: Register, label: 'Cadastro de imagens', show: true, },
  { path: '/image/edit/:id', name: 'update', component: Register, show: false, },
  { path: '*', component: NotFound, show: false, },
];

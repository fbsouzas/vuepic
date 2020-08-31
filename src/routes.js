import Home from './components/home/Home.vue';
import Register from './components/register/Register.vue';

export const routes = [
  { path: '', component: Home, name: 'Home' },
  { path: '/register', component: Register, name: 'Cadastro de imagens' },
];

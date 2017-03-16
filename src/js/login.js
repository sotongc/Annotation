import '../css/common.css';
import '../css/login.css';

import Vue from 'vue';

import login from './components/login.vue';

const $login=Vue.extend(login);

let __login=new $login({
	el:'#login'
});


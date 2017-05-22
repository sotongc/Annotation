import '../css/common.css';

import Vue from 'vue';
import api from './conf/API.json';

/**
 * @ import modules
*/
import gridbox from './components/gridbox.vue';

import seedIcon from '../img/seed.png';

const $gridbox=Vue.extend(gridbox);

let __gridbox=new $gridbox({
	el:'#gridbox',
	data:{
		items:[
			{name:'SEED MANAGEMENT',src:seedIcon,href:"./seed.html"},
			{name:'CORPUS MANAGEMENT',src:seedIcon,href:"./corpus.html"},
			{name:'XPATH TOOL',src:seedIcon,href:"./xpath.html"},
			{name:'ACCOUNTS',src:seedIcon,href:"./accounts.html"}
		]
	}
});
 
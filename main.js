import Vue from 'vue'
import App from './App'

import './styles/common.scss';

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

console.log(4)
console.log(2)
console.log(5)

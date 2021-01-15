import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import {
	$router,
	$storage,
	$message,
	setTitle
} from './utils/prototype/vue'
import $store from './store'
import '@/assets/font/iconfont.css';

Vue.use(uView);
Vue.config._mpTrace = true
$store.state.get = key => {
	return $store.getters[key]
}
$store.state.set = (key, value, isSave) => {
	$store.commit('set', {
		key,
		value,
		isSave
	})
}

// #ifdef XYTEST
const {
	domain,
	imgDomain,
	businessDomain
} = require('./config.xytest.json')
// #endif

// #ifdef FIRST-PARTY-TEST
const {
	domain,
	imgDomain,
	businessDomain
} = require('./config.test.json')
// #endif
// #ifdef STAR
const {
	domain,
	imgDomain,
	businessDomain
} = require('./config.star.json')
// #endif

$store.state.set('$domain', domain)
$store.state.set('$imgDomain', imgDomain)
$store.state.set('$businessDomain', businessDomain)
Vue.prototype.$store = $store
Object.defineProperties(Vue.prototype, {
	$domain: {
		value: domain
	},
	$imgDomain: {
		value: imgDomain
	},
	$businessDomain: {
		value: businessDomain
	},
	$router: {
		value: $router
	},
	$storage: {
		value: $storage
	},
	$message: {
		value: $message
	},
	$setTitle: {
		value: setTitle
	},
	$state: {
		value: $store.state
	}
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()

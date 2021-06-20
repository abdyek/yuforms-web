import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import store from './store'
import router from './router'
import contenteditable from 'vue-contenteditable'

Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(contenteditable)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

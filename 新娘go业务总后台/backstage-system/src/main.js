// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/sass/base.scss' // 基本样式
import './element-variables.scss'
import VueQuillEditor from 'vue-quill-editor'
import echarts from 'echarts'


import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// vuex
import store from './store'

Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store, // 使用store
    components: { App },
    template: '<App/>'
})

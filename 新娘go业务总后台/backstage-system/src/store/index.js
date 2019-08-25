import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'// 初始化定义数据
import * as getters from './getters'// 获取数据
import * as actions from './actions'// 处理数据
import mutations from './mutations'// 存储数据

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: debug
})

export default store

import vue from 'vue'
import vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装vuex
vue.use(vuex)

// 2.创建store实例
const state = {
  CartList: []
}
const store = new vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3.导出store 挂载到vue
export default store
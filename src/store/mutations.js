import {
  ADD_COUNT, 
  ADD_To_CART
} from './mutations-types'

export default {
  //mutations保持唯一的目的就是修改state的状态
  //mutations中的每个方法尽肯能完成的事件要单一
  //增加数量
  [ADD_COUNT](state,payload) {
    payload.count++
  },
  //增加商品
  [ADD_To_CART](state,payload) {
    //默认选中
    payload.checked = true
    state.CartList.push(payload)
  }
}
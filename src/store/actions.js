import {
  ADD_COUNT, 
  ADD_To_CART
} from './mutations-types'

export default {
  addCartList(context,payload) {
      return new Promise((resolve,rejccet) => {
      //find中的函数返回是Boolean值
      //1.查找数组中是否有该商品
      let oldProduct = context.state.CartList.find( item => item.iid === payload.iid )
      //2.判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNT,oldProduct)
        resolve('数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_To_CART,payload)
        resolve('加入购物车')
      }
    })
  }
}
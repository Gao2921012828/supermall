<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 列表 -->
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <cart-list/>
    </scroll>
    <!-- 结算 -->
    <cart-button-bar class="cart-button-bar"/>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import {mapGetters} from 'vuex'

import CartList from './childCpn/CartList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import CartButtonBar from './childCpn/CartButtonBar.vue'

export default {
  name: 'Cart',
  components: { 
    NavBar,
    CartList,
    Scroll,
    CartButtonBar 
   },
   computed: {
     ...mapGetters(['cartLength'])
   },
   //当再次处于活跃时要刷新
   activated() {
     this.$refs.scroll.refresh()
   }
}

</script>
<style scoped>
  #cart{
    height: 100vh;
  }
 .nav-bar{
   background-color: #ff8198;
   color: #fff;
   font-size: 20px;
 }
 .content {
   height: calc(100% - 44px - 49px);
   overflow: hidden;
 }
</style>
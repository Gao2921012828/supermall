<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="allClick" :is-checked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartCount}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'

export default {
   name: 'CartButtonBar',
   components: { 
     CheckButton 
    },
    computed: {
      ...mapGetters(['cartProductList']),
      totalPrice() {
        // this.$store.state.CartList.filter
        return this.cartProductList.filter( item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue+ item.price * item.count
        },0).toFixed(2)
      },
      cartCount() {
        return this.cartProductList.filter(item => item.checked).length
      },
      isSelectAll() {
        //购物车有数据 并且每个物品都是被选中状态
        return this.cartProductList.length >0 && this.cartProductList.every(item => item.checked)
      }
    },
    methods: {
      allClick() {
        if(this.isSelectAll) {
          this.cartProductList.forEach(item => item.checked = false)
        }else {
          this.cartProductList.forEach(item => item.checked = true)
        }
      }
    }
}

</script>
<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
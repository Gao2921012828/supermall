<template>
  <div>
    <cart-list-item v-for="(item,index) in cartProductList" :key="index" :product="item"/>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import {mapGetters} from 'vuex'

export default {
   name: 'CartList',
   components: { 
     CartListItem 
    },
    computed: {
      ...mapGetters(['cartProductList'])
    }
}

</script>
<style scoped>
</style>
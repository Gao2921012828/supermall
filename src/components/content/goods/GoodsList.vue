<template>
  <div class="goods">
    <goods-list-item v-for="item in list" :key="item.index" :list-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
   name: 'GoodsList',
   components: {
     GoodsListItem
   },
   props: {
     list: {
       type: Array,
       default() {
         return []
       }
     }
   }
}

</script>
<style scoped>
 .goods {
   display: flex;
   flex-wrap: wrap;
   /* 均等分 */
   justify-content: space-evenly;
 }
</style>
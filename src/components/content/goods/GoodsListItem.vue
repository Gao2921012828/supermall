<template>
  <div class="list-item" @click="itemClick">
    <!-- <img :src="listItem.show.img" alt=""> -->
    <img :src="showImage" alt="">
    <div class="goods-info">
      <p>{{listItem.title}}</p>
      <span class="price">{{listItem.price}}</span>
      <span class="collect">{{listItem.cfav}}</span>
    </div> 
  </div>
</template>

<script>
export default {
   name: 'GoodsListItem',
   props: {
     listItem: {
       type: Object,
       default() {
         return {}
       }
     }
   },
   methods: {
     itemClick() {
       //路由跳转 可返回
       this.$router.push('/detail/' + this.listItem.iid)
     }
   },
   computed: {
     showImage() {
       return this.listItem.image || this.listItem.show.img
     }
   }
}

</script>
<style scoped>
 .list-item {
   width: 48%;
   padding-bottom: 40px;
   position: relative;
 }
 .list-item img {
   width: 100%;
   border-radius: 5px;
 }
 .goods-info {
   position: absolute;
   font-size: 12px;
   bottom: 5px;
   left: 0;
   right: 0;
   overflow: hidden;
   text-align: center;
 }
 .goods-info p {
   overflow: hidden;
   text-overflow: ellipsis;
   white-space:nowrap;
   margin-bottom: 3px;
 }
 .goods-info .price {
   color: #ff5777;
   margin-right: 20px;
 }
 .goods-info .collect {
   position: relative;
 }
 .goods-info .collect::before {
   content: '';
   position: absolute;
   left: -15px;
   top: -1px;
   width: 14px;
   height: 14px;
   background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
 }
</style>
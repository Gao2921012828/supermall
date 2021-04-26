<template>
  <div class="shop-info">
    <div class="item-lo-na">
      <div class="logo">
        <img :src="shop.logo" alt="" class="logo-img">
      </div>
      <span class="shop-name">{{shop.name}}</span>
    </div>
    <div class="item-middle">
      <div class="middle-left">
        <div class="left">
          <div class="size">{{shop.sells}}</div>
          <div>总销量</div>
        </div>
        <div class="right">
          <div class="size">{{shop.goodsCount}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="middle-right">
        <div class="comment" v-for="(item,index) in shop.score" :key="index">
          <div>{{item.name}}</div>
          <div class="score" :class="{'score-better':item.isBetter}">{{item.score}}</div>
          <div class="better" :class="{'is-better':item.isBetter}">{{item.isBetter==false ? '低': '高'}}</div>
        </div>
      </div>
    </div>
    <div class="item-bottom">
      <div class="jdgg">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
   name: 'DetailShopInfo',
   props: {
     shop: {
       type: Object,
       default() {
         return {}
       }
     }
   }
}

</script>
<style scoped>
 .shop-info{
   padding: 30px 7px;
 }
 
 .item-lo-na .logo{
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 2px solid #ccc;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
 }
 .logo .logo-img{
   border-radius: 50%;
   width: 100%;
   height: 100%;
 }
 .item-lo-na .shop-name{
   font-size: 18px;
   vertical-align: middle;
 }

 .item-middle{
   height: 100px;
   display: flex;
   font-size: 14px;
 }
 .middle-left{
   display: flex;
   flex: 1;
   margin: 27px 0;
   border-right: 1px solid #ccc;
   text-align: center;
   justify-content: space-around;
 }
 .size{
   font-size: 18px;
   font-weight: 600;
   margin-bottom: 5px;
 }
 .middle-right{
   flex: 1;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   /* margin: 0 10px 0 15px; */
 }
 .middle-right .comment {
   display: flex;
   justify-content: space-around;
 }
 .middle-right .comment .score {
   color: #5ea732;
 }
 .middle-right .comment .score-bette {
   color: #f13e3a;
 }
 .middle-right .comment .better{
   color: #fff;
   background-color: #5ea732;
 }
 .middle-right .comment .is-better{
   color: #fff;
   background-color: #f13e3a;
 }
 
 .item-bottom {
   margin: 15px auto;
   width: 200px;
   line-height: 50px;
   border: 1px solid;
   text-align: center;
   border-radius: 15px;
   background-color: #f6f6f6;
 }
</style>
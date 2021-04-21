<template>
  <div class="base-info" v-if="Object.keys(goods).length !==0">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount-price" v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service" >
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
   name: 'DetailBaseInfo',
   props: { 
     goods: {
       type: Object
     }
   }
}

</script>
<style scoped>
   .base-info{
     padding: 0 7px;
     position: relative;
     
   }
   .info-title{
     font-size: 17px;
     font-weight: 200;
     padding: 7px 0;
     color: rgb(37, 24, 23);
   }
   .info-price .new-price{
     font-size: 24px;
     color: #ff5777;
     margin-right: 5px;
   }
   .info-price .old-price{
     padding: 0 3px;
     font-size: 15px;
     color: rgb(155, 153, 153);
     text-decoration-line: line-through;
   }
   .info-price .discount-price{
     position: absolute;
     font-size: 13px;
     color: #fff;
     background-color: #ff8198;
     padding: 2px 5px;
     border-radius: 8px;
   }
   .info-other{
     /*  */
     display: flex;
     justify-content: space-between;
     align-items: center;

     font-size: 14px;
     color: rgb(155,155,155);
     padding: 15px 0 5px 0;
     border-bottom: 1px solid rgb(235,229,229);
   }
   .info-service {
     padding: 22px 0;
     display: flex;
     justify-content: space-between;
     align-items: center;
     border-bottom: 7px solid rgb(241, 241, 243);
   }
   .info-service-item{
     font-size: 14px;
   }
    .info-service-item img{
     width: 12px;
     height: 12px;
   }
</style>
<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
import DetailNavBar from './childCpn/DetailNavBar'
import DetailSwiper from './childCpn/DetailSwiper'
import DetailBaseInfo from './childCpn/DetailBaseInfo'
import {getDetail,Goods} from 'network/detail'


export default {
   name: 'Detail',
   components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo
   },
   data() {
     return {
       iid: null,
       topImages: [],
       goods: {}
     }
   },
   created() {
     //1.获取iid
     //此处id 是在 动态传递时路由设置的id名  path: '/detail/:id',
     this.iid = this.$route.params.id
     //2.根据iid数据请求
     getDetail(this.iid).then(res => {
       console.log(res);
       const data = res.result
       this.topImages = data.itemInfo.topImages

       this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
     })
   },
}

</script>
<style scoped>
  
</style>
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" :pull-up-load="true" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :list="recommends"/>
    </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childCpn/DetailNavBar'
import DetailSwiper from './childCpn/DetailSwiper'
import DetailBaseInfo from './childCpn/DetailBaseInfo'
import DetailShopInfo from './childCpn/DetailShopInfo'
import DetailGoodsInfo from './childCpn/DetailGoodsInfo.vue'
import DetailParamInfo from './childCpn/DetailParamInfo.vue'
import DetailCommentInfo from './childCpn/DetailCommentInfo'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'






export default {
   name: 'Detail',
   components: {
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo,
     GoodsList
   },
   data() {
     return {
       iid: null,
       topImages: [],
       goods: {},
       shop: {},
       detailInfo: {},
       paramInfo: {},
       commentInfo: {},
       recommends: []
     }
   },
   methods: {
     imageLoad() {
       this.$refs.scroll.refresh()
     }
   },
   created() {
     //1.获取iid
     //此处id 是在 动态传递时路由设置的id名  path: '/detail/:id',
     this.iid = this.$route.params.id
     //2.根据iid数据请求
     getDetail(this.iid).then(res => {
      //  console.log(res);
       const data = res.result
       this.topImages = data.itemInfo.topImages

      //2.1.获取商品信息
       this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //2.2.获取店铺信息
       this.shop= new Shop(data.shopInfo)
      //2.3.获取详情图片信息
       this.detailInfo = data.detailInfo
      //2.4.获取商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //2.5.获取商品评论
      if (data.rate.cRate !=0) {
        this.commentInfo = data.rate.list[0]
      }   
     })
     //3.获取推荐数据
     getRecommend().then(res => {
       console.log(res)
       this.recommends = res.data.list
     })
   },
}

</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
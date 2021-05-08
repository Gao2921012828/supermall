<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" :pull-up-load="true" ref="scroll" @scrollPos="detailPosition" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" ref="param"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <goods-list :list="recommends" ref="recommends"/>
    </scroll>
    <detail-bottom @addToCart="addCart"/>
    <back-top v-show="isShowBckTop" @click.native="backClick"/>
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
import DetailBottom from './childCpn/DetailBottom.vue'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList.vue'
import { backTopMixin } from 'common/mixin'
// import BackTop from 'components/content/backTop/BackTop.vue'

import {mapActions} from 'vuex'

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
     GoodsList,
     DetailBottom,
     //应用mixin混入 抽取
    //  BackTop
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
       recommends: [],
       detailTopYs: [],
       currentIndex: 0,
       //应用mixin混入 抽取
      //  isShowBckTop: false,
     }
   },
   mixins: [backTopMixin],
   methods: {
     imageLoad() {
       this.$refs.scroll.refresh()
      //每次图片加载完成后回调
       this.detailTopYs = []
       this.detailTopYs.push(0)
       this.detailTopYs.push(this.$refs.param.$el.offsetTop)
       this.detailTopYs.push(this.$refs.comment.$el.offsetTop)
       this.detailTopYs.push(this.$refs.recommends.$el.offsetTop)
       //用于联动效果
       this.detailTopYs.push(Number.MAX_VALUE)
     },
     titleClick(index) {
      //在scroll多scrollTo进行封装了方法名为cpnScrollTo
      this.$refs.scroll.cpnScrollTo(0,-(this.detailTopYs[index]-44),200)  
     },
     detailPosition(position) {
      const positionY = -position.y + 44
      for(let i=0; i<this.detailTopYs.length -1; i++) {
        if(this.currentIndex!==i && (positionY >= this.detailTopYs[i] && positionY < this.detailTopYs[i+1])) {
          this.currentIndex = i 
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      //监听滚动
      this.isShowBckTop = -(position.y) > 1000
     },
     //映射actions
     ...mapActions(['addCartList']),
     addCart() { 
       //1.获取购物车需要的数据
       const product = {}
       product.image = this.topImages[0];
       product.title = this.goods.title;
       product.desc = this.goods.desc;
       product.price = this.goods.realPrice;
       product.iid = this.iid

       // 2.加入到购物车
       //mutations的提交方式
       //this.$store.commit('addCartList', product)
       //actions的提交方式  
      //  this.$store.dispatch('addCartList', product).then(res => {
      //    console.log(res);
      //  })
      this.addCartList(product).then(res => {
         console.log(res);
      })
     }
     //应用mixin混入 抽取
    //  backClick() {
    //     //通过ref 拿取到Scroll组件对象
    //   this.$refs.scroll.cpnScrollTo(0, 0 ,500)
    //  }

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
      //  console.log(res)
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
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
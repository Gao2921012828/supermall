<!--  -->
<template>
  <div id="home">
    <!-- 顶部标题 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="titles"
                  @tab-click="selectClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isFixed"/>
    <!-- 定义res 为了父组件直接获取子组件对象 -->
    <scroll class="content" 
            ref="scroll" 
            :pull-up-load="true"
            @pullUpLoadMore="loadMore"
            :probe-type="3" 
            @scrollPos="scrollBackTop">
      <!--轮播图 父组件给子组件传递数据 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles"
                  @tab-click="selectClick"
                  ref="tabControl2"/>
      <goods-list :list="showGoods"/>
    </scroll>
    <!-- backTop -->
    <back-top @click.native="backClick" v-show="isShowBckTop"/>
    <ul>
      <li>111</li>
      <li>112</li>
      <li>113</li>
      <li>114</li>
      <li>115</li>
      <li>116</li>
      <li>117</li>
      <li>118</li>
      <li>119</li>
      <li>1110</li>
      <li>111</li>
      <li>112</li>
      <li>113</li>
      <li>114</li>
      <li>115</li>
      <li>116</li>
      <li>117</li>
      <li>118</li>
      <li>119</li>
      <li>1110</li>
      <li>111</li>
      <li>112</li>
      <li>113</li>
      <li>114</li>
      <li>115</li>
      <li>116</li>
      <li>117</li>
      <li>118</li>
      <li>119</li>
      <li>1110</li>
      <li>111</li>
      <li>112</li>
      <li>113</li>
      <li>114</li>
      <li>115</li>
      <li>116</li>
      <li>117</li>
      <li>118</li>
      <li>119</li>
      <li>1110</li>
      <li>111</li>
      <li>112</li>
      <li>113</li>
      <li>114</li>
      <li>115</li>
      <li>116</li>
      <li>117</li>
      <li>118</li>
      <li>119</li>
      <li>1110</li>
    </ul>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childCpn/HomeSwiper'
import RecommendView from './childCpn/RecommendView'
import FeatureView from './childCpn/FeatureView.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners:[],
      recommends: [],
      titles: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBckTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0
    }
  },
  created() {
    //调用请求数据的方法
    this.getHomeMultidataMethod()
    
    this.getHomeGoodsMethod('pop')
    this.getHomeGoodsMethod('new')
    this.getHomeGoodsMethod('sell')
    
  },
  activated() {
    //再次处于活跃时 设置scroll的位置
    this.$refs.scroll.cpnScrollTo(0, this.saveY , 0)
    //再次处于活跃时 需要进行一次刷新
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    //组件处于不活跃状态时 保存当前的位置
    this.saveY = this.$refs.scroll.getSaveY()
    console.log(this.saveY);
  },
  mounted() {
     
  },
  computed: {
     showGoods() {
        return this.goods[this.currentType].list
     }
  },
  methods: {
    /**
     * 监听事件方法
     */
    selectClick(index) {
      // 获取对象的属性名  Object.keys(对象)[索引值]
      this.currentType = Object.keys(this.goods)[index]
      console.log(this.currentType);
      this.$refs.tabControl2.currentIndex = index  
      this.$refs.tabControl1.currentIndex = index  
    },
    loadMore() {
      this.getHomeGoodsMethod(this.currentType)
    },
    backClick() {
      //通过ref 拿取到Scroll组件对象
      this.$refs.scroll.cpnScrollTo(0, 0 ,500)
    },
    scrollBackTop(position) {
      //监听滚动
      this.isShowBckTop = -(position.y) > 1000
      // 
      this.isFixed = -(position.y) > this.tabOffsetTop
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求方法
     */
    //1.请求多个数据
    getHomeMultidataMethod() {
      getHomeMultidata().then(res => {
      // console.log(res);
      //单独取出每个数据中具体的值，存放到定义的变量中，因为有多个数据
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoodsMethod(type) {
      //要动态获取页数 所以定义page
      //默认是从第一页开始 所以要+1 
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        //将请求道的数据追加到定义好的空list数组中
        this.goods[type].list.push(...res.data.list)
        //当前页的数据请求后需要将默认页面 +1 
        this.goods[type].page = page
        // console.log(res);
        //解决只能进行一次上拉加载更多的情况
        this.$refs.scroll.finishPullUp()
      })
    }
  },
}

</script>
<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #ff8198;
    color: #fff;
    font-size: 23px;
  }
  /* BScroll滚动样式 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 10;
  }
</style>
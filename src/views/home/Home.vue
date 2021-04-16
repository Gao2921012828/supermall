<!--  -->
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播图 父组件给子组件传递数据 -->
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    <tab-control class="tab-control" 
                 :titles="titles"
                 @tab-click="selectClick"/>
    <goods-list :list="showGoods"/>
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
    FeatureView
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
      currentType: 'pop' 
    }
  },
  created() {
    //调用请求数据的方法
    this.getHomeMultidataMethod()
    this.getHomeGoodsMethod('pop')
    this.getHomeGoodsMethod('new')
    this.getHomeGoodsMethod('sell')
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
        this.goods[type].page = page + 1
        // console.log(res);
      })
    }
  },
}

</script>
<style scoped>
  #home {
    padding-top: 44px;
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
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  }
</style>
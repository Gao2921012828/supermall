<!--  -->
<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--轮播图 父组件给子组件传递数据 -->
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childCpn/HomeSwiper'
import RecommendView from './childCpn/RecommendView'
import {getHomeMultidata} from 'network/home'


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      banners:[],
      recommends: []
    }
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      //单独取出每个数据中具体的值，存放到定义的变量中，因为有多个数据
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
    })
  },
}

</script>
<style scoped>
  .home-nav {
    background-color: #ff8198;
    color: #fff;
    font-size: 23px;
  }
</style>
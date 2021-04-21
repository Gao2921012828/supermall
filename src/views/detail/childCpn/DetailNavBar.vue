<template>
  <div class="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div class="title" 
             v-for="(item,index) in titles" :key="index" 
             :class="{active:currentIndex === index}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
   name: 'DetailNavBar',
   components: {
     NavBar
   },
   data() {
     return {
       titles: ['商品','参数','详情','推荐'],
       currentIndex: 0
     }
   },
   methods: {
     titleClick(index) {
       this.currentIndex = index
     },
     back() {
       this.$router.back()
     }
   },
}

</script>
<style scoped>
  .titles{
    display: flex;
  }
  .titles .title{
    font-size: 14px;
    flex: 1;
  }
  .active{
    color: #ff5777;
  }
  .back img{
    vertical-align: middle;
  }
</style>
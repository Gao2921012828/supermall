<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
   name: 'RecommendView',
   props: {
     recommends: {
       type: Array,
       default() {
         return []
       }
     }
   }
}

</script>
<style scoped>
  .recommends {
    display: flex;
    font-size: 12px;
    text-align: center;
    padding: 15px 0 30px 0;
    border-bottom: 15px solid #eee;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
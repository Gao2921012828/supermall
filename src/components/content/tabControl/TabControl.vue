<template>
  <div class="tab-control">
    <div class="tab-control-item" 
         v-for="(item,index) in titles" :key="index"
         :class="{active : currentIndex===index}"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
   name: 'TabControl',
   props: {
     titles:{
       type: Array,
       default() {
         return []
       }
     }
   },
   data() {
     return {
       currentIndex: 0
     }
   },
   methods: {
     tabClick(index) {
      this.currentIndex = index,
      //子组件给父组件传递
      this.$emit('tab-click', index)
     }
   },
}

</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: #ff5777;
  }
  .active span {
    padding: 0 4px 6px 4px;
    border-bottom: 2px solid #ff5777;
  }
</style>
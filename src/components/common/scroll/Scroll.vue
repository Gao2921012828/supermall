<template>
  <!-- BScroll规定格式 class不固定 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from 'better-scroll'

export default {
   name: 'Scroll',
   props: {
     probeType: {
       type: Number,
       dedault: 0
     },
     pullUpLoad: {
       type: Boolean,
       default: false
     }
   },
   data() {
     return {
       scroll: null
     }
   },
   //组件挂载完成后执行
   mounted() {
     //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //当检测到图像被加载或加载失败时，自动刷新BetterScroll的大小
      observeDOM: true,
      observeImage: true,
      //鼠标默认点击
      click: true,
      //不是每个组件都需要 动态设置
      probeType: this.probeType,
      //上拉加载更多
      pullUpLoad: this.pullUpLoad
    })
    //2.监听滚动的位置
    this.scroll.on('scroll',(position) => {
     this.$emit('scrollPos',position)
    })
    //3.监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullUpLoadMore')
    })
   },
   methods: {
     cpnScrollTo(x, y, time) {
       this.scroll.scrollTo(x, y, time)
     },
     finishPullUp() {
       this.scroll.finishPullUp()
     },
     getSaveY() {
       return this.scroll ? this.scroll.y : 0
     }
   },
}

</script>
<style scoped>
</style>
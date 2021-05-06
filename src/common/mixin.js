import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBckTop: false,
    }
  },
  methods: {
    backClick() {
      //通过ref 拿取到Scroll组件对象
    this.$refs.scroll.cpnScrollTo(0, 0 ,500)
   }
  },
}
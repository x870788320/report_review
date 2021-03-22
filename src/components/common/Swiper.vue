<template>
  <div class="swiper">
    <transition  name="fade">
        <img src="@/assets/home/img3.jpg" alt v-show="isShow" />
    </transition>
    <transition  name="fade">
        <img src="@/assets/home/img4.jpg" alt  v-show="!isShow" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgResource: "@/assets/home/",
      isShow:true,
      timer:null
    };
  },
  props: ["config"],
  computed: {
      //待后续更改动态添加
    imgSrc() {
      const { dataArr } = this.config;
      return dataArr.map(item => `${this.imgResource}${item}`);
    },
  },
  created(){
  },
  mounted() {
      this.nuxt()
  },
  methods:{
      nuxt(){
        this.timer = setTimeout(() => {
            this.isShow = !this.isShow 
            this.nuxt()
        }, 5000)
      }
  }
};
</script>

<style>
.swiper {
    width: 100%;
    height: 100%;
    position: relative;
    text-align: left;
}
.swiper img{
    width: 100%;
    height: 100%;
    position: absolute;
}
.button{
    position: absolute;
    z-index: 100;
}
.fade-enter-active, .fade-leave-active{
  transition: all 1.5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
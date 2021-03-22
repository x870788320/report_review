<template>
  <div class="footer" ref = 'footer'>
    <p>赛飞特工程技术集团有限公司 版权所有</p>
    <a href="https://beian.miit.gov.cn/" style = 'cursor:pointer;color:#fff;' target="view_window" ref= 'footerA'>鲁ICP备11031804号</a>
    <!-- <p class = 'footerGo' @click="footerGo">鲁ICP备11031804号-5</p> -->
  </div>
</template>

<script>
export default {
  name:'footerComponent',
  props:['from'],
  mounted(){
    console.log(this.from)
    if( this.from != 'home' ){
      this.$refs.footer.style.color = '#000'
      this.$refs.footerA.style.color = '#000'
    }
  },
  methods:{
    footerGo(){
// windows.open('https://beian.miit.gov.cn/')
    }
  }
};
</script>

<style>
.footer {
  width: 100%;
  height: 80px;
  background: rgba(0, 0, 0, 0);
  padding: 20px 0;
  /* position: absolute;
  bottom: 30px;
  z-index: 100; */
  color:#fff;
}
.footerGo{
  cursor: pointer;
}
</style>
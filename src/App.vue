<template>
  <div id="app" style = 'font-size:10px'>
    <!-- <div class="header">
      header
      <NavComponent/>
    </div>
    <div class = "center">
      <router-view/>
    </div>
    <div class="footer">
      footer
    </div> -->
    
      <router-view/>
    <!-- <Header/>
    <div>
      <router-view/>
    </div>
    <Footer/> -->
  </div>
</template>

<script>
// import { getCSRFtoken } from './config/login'
// import { getCookie } from './config/utils'
// import { getCSRFToken } from '@/config/utils/interface'
export default {
  name: 'App',
  components: {
    // NavComponent: () => import("./components/NavComponent")
        // Header: () => import("@/components/HeaderComponent.vue"),
        // Footer: () => import("@/components/FooterComponent.vue"),
  },
  created() {
    //初始化token，存入缓存
    // getCSRFtoken().then(res => {
    //   console.log(res)
    //   console.log(this.$store.state)
    //   // this.$store.commit('setCSRFToken',res.data.token)
    // var DjangoCookie=getCookie('csrftoken');
    // console.log(DjangoCookie)
    // })
    // getCSRFToken().then( res => {
    //   console.log(res)
    //   console.log(getCookie('csrftoken'))
    //   this.$store.commit('setCSRFToken',res.token)
    //   // this.$store.commit('setCsrftokenCookie',res.token)
    //   console.log(this.$store.state)
    // })
  },
}
</script>

<style>
html,body{
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding:0; margin:0;
  height: 100%;
}
.center{
  height: 500px;
}
</style>

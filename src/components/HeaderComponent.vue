<template>
  <div class="header" ref='header' style='font-size:14px;'>
    <div class="headerLogo">
      <img src="@/assets/logo.png" alt class="logo" @click="$handleGo('home')"/>
      <span>安全 · 可靠 · 智能</span>
    </div>
    <div class="headerRight" v-if = 'logged'>
      <div v-if = 'userInfo' class="alignLeft" style="margin:0 10px;">欢迎您 ： {{userInfo.chinese_name || userInfo.username}}</div>
      <div v-if = 'userInfo' class="alignLeft">|</div>
      <div v-else class="headerLoginS alignLeft" @click="$handleGo('login')" >请登录</div>
      <div class="headerUser alignLeft">
        <span>用户中心</span>
        <div class="headerUserShow">
          <div @click="userInfo?$handleGo('person'):$handleGo('login')">个人中心</div>
          <div @click="quitLogin">退 出</div>
        </div>
      </div>
      <div class="alignLeft">|</div>
      <div class="alignLeft headerAbout">
        <span>关于我们</span>
        <div class="headerAboutUs">
          <div>联系方式</div>
          <div>人才招聘</div>
          <div>友情链接</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      logged: false,
    };
  },
  props:['from'],
  computed:{
    // ...mapState({
    //   userInfo:state => state.home.userInfo
    // }),
    ...mapGetters({
      userInfo:'home/UserInfo'
    }),
    
  },
  methods:{
    quitLogin(){
      this.$handleGo('login')
      this.$store.dispatch('home/logoutUser')
      this.$store.commit('changeIsLogin', false)
      // sessionStorage.removeItem('flag')
    },
  },
  mounted(){
    console.log(this.userinfo)
    console.log(this.$store)
    const { name } = this.$router.history.current
    if(name != 'home'){
      this.$refs.header.style.color = '#000'
    }
    if(name != 'login'){
      this.logged= true
    }
    console.log(this.from)
    
    //大屏todo
    // if(document.body.clientWidth > 1000){
    //   this.$refs.header.style.fontSize = '18px';
    // }
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  /* position: absolute; */
  /* z-index: 100; */
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color:#fff;
}
.headerLogo span {
  font-size: 24px;
  font-weight: 700;
}
.header .logo {
  margin: 30px 30px 20px 60px;
  cursor: pointer;
  width: 150px;
  height: 80px;
  vertical-align: middle;
}
.headerRight {
  height: 24px;
  margin: 40px 60px;
  position:relative;
  z-index: 1000;
}
.headerUser,
.headerAbout {
  width: 80px;
  cursor: pointer;
}
.headerUser:hover,
.headerAbout:hover {
  /* background: rgba(255, 255, 255, .2); */
  color: #409EFF;
}
.headerUserShow,
.headerAboutUs {
  line-height: 30px;
  margin-top: 8px;
  color: #666;
  border-radius: 10px;
  background: #fff;
  padding: 8px 0;
  display: none;
}
.headerUser:hover .headerUserShow {
  display: block;
}
.headerAbout:hover .headerAboutUs {
  display: block;
}
.headerUserShow div:hover,
.headerAboutUs div:hover {
  color: #409EFF;
}
.headerLoginS{
  cursor: pointer;
  margin-right:15px;
}

.headerLoginS:hover {
  /* background: rgba(255, 255, 255, .2); */
  color: #409EFF;
}
</style>
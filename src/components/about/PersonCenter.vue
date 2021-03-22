<template>
  <div class = 'personCenter'>
    <AboutMainTitle :title='$route.params.title || "基本信息"'/>
    <div class = 'personCenterContainer'>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>用 户 名：</div>
        <div>{{userInfo && userInfo.username}}</div>
      </div>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>是否员工：</div>
        <div>{{userInfo && userInfo.is_staff}}</div>
      </div>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>电子邮箱：</div>
        <div>{{userInfo && userInfo.email}}</div>
      </div>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>创建日期：</div>
        <div>{{userInfo && userInfo.date_joined}}</div>
      </div>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>登录日期：</div>
        <div>{{userInfo && userInfo.last_login}}</div>
      </div>
      <div class = 'personCenterItem'>
        <div class = 'personCenterItemLeft'>用户姓名：</div>
        <div>{{userInfo && userInfo.chinese_name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name:'personCenter',
  components:{
    AboutMainTitle: () => import("./AboutMainTitle.vue"),
  },
  computed:{
    ...mapState({
      // userInfo:state => state.home.userInfo
    }),
    ...mapGetters({
      userInfo:'home/UserInfo'
    }),
  },
  created(){
  }
}
</script>

<style scoped>
.personCenter{

}
.personCenterContainer{
  height: 100%;
  padding: 40px 80px;
}
.personCenterItem{
  display: flex;
  font-size:20px;
  margin:20px;
}
.personCenterItemLeft{
  width: 20%;
  min-width: 110px;
}
</style>
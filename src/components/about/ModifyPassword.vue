<template>
  <div class = 'modifyPassword'>
    <AboutMainTitle :title='$route.params.title || "更改密码"'/>
    <div class = 'modifyPasswordContainer'>
      <div class = 'modifyPasswordItem'>
        <div class = 'modifyPasswordLeft'>原密码：</div>
        <div>
          <el-input placeholder="请输入原密码" v-model="oldPassword" show-password></el-input>
        </div>
      </div>
      <div class = 'modifyPasswordItem'>
        <div class = 'modifyPasswordLeft'>新密码：</div>
        <div>
          <el-input placeholder="请输入原密码" v-model="newPassword1" show-password></el-input>
        </div>
      </div>
      <div class = 'modifyPasswordItem'>
        <div class = 'modifyPasswordLeft'>新密码确认：</div>
        <div>
          <el-input placeholder="请输入原密码" v-model="newPassword2" show-password></el-input>
        </div>
      </div>
      <div  class = 'passwordSubmit'>
        <el-button type="primary" round>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'personCenter',
  components:{
    AboutMainTitle: () => import("./AboutMainTitle.vue"),
  },
  data(){
    return {
      oldPassword:'',
      newPassword1:'',
      newPassword2:''
    }
  },
  created(){
    console.log(this.$route)
  }
}
</script>

<style>
.personCenter{

}
.modifyPasswordContainer{
  height: 100%;
  padding: 40px 80px;
}
.modifyPasswordItem{
  display: flex;
  font-size:20px;
  margin:20px;
}
.modifyPasswordLeft{
  width: 20%;
  min-width: 126px;
  line-height: 48px;
}
.passwordSubmit .el-button{
  width: 200px;
  background: rgba(0,0,96,.8);
  margin-top:40px;
}
.passwordSubmit .el-button:hover{
  background: rgba(0,0,96,.6);
}
</style>
<template>
    <div class = 'login'>
        <MyPopUps ref= "msg"/>
        <Header  :from='currentC'/>
        <div class = 'loginBody'>
            <input type="text" >
            <img src="@/assets/login/logBg.jpg" alt="">
            <div class = 'loginBodyMain'>
                <div class = 'loginMainTitle'>
                    用户登录
                </div>
                <hr>
                <div class = 'loginMainItem'>
                    <!-- <span>账号:</span> -->
                    <!-- <input type="text"> -->
                    <el-input
                        placeholder="请输入账号"
                        suffix-icon="el-icon-user"
                        v-model="userInfo.username">
                    </el-input>
                </div>
                <div  class = 'loginMainItem'>
                    <!-- <span>密码:</span>
                    <input type="text"> -->
                    <el-input
                        placeholder="请输入密码"
                        suffix-icon="el-icon-lock"
                        v-model="userInfo.password"
                        show-password>
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" round style= 'width:200px;margin-bottom:30px;' @click="loginIndex()">登录</el-button>
                </div>
                <div class = 'loginGoOn'>
                    <span @click = 'goLoginOn'>立即注册</span>
                    <i style= 'margin:0 12px;'>|</i>
                    <span>忘记密码</span>
                </div>
            </div>
        </div>
        <Footer :from='currentC'/>

    </div>
</template>

<script>
import {  mapActions } from 'vuex'
export default {
    name:"login",
    components:{ 
        Header: () => import("@/components/HeaderComponent.vue"),
        Footer: () => import("@/components/FooterComponent.vue"),
    },
    data(){
        return{
            currentC:'login',
            userInfo:{
                username:'',
                password:''
            },

        }
    },
    mounted(){
    },
    methods:{
        ...mapActions({
            userLogin: 'userLogin',
            getUserInfo: 'home/getUserInfo',
        }),
        loginIndex(){
            // let _this = this
            // let params = {
            //     username:'xuejiping',
            //     password:'12345678',
            //     csrfmiddlewaretoken:getCookie('csrftoken')
            // }   
            // this.userLogin(params).then(data => {
            this.userLogin(this.userInfo).then(data => {
                console.log(data)
                if( data.message == 'ok' ){
                    this.$handleGo('home')
                    this.getUserInfo()
                } else{
                    // let msg = data.data || "请输入正确的用户名和密码"
                    let msg = "请输入正确的用户名和密码"
                    this.$refs.msg.msgPlugin(msg, 2000)
                }
            }).catch(err =>{
                console.log(err)
                this.$nextTick(() => {
                    this.$refs.msg.msgPlugin("请输入正确的用户名和密码", 2000)
                })
            })
            // console.log(getCookie('csrftoken'))
            // getCSRFToken().then((res) => {
            //     this.$store.commit('setCSRFToken',res.token)
            //     // userLogin(this.userInfo).then(data => {
            //     userLogin(params).then(data => {
            //         console.log(data)
            //         this.$store.commit('changeIsLogin', true)
            //         this.$handleGo('home')
            //     }).catch(err =>{
            //         console.log(err)
            //         this.$nextTick(() => {
            //             this.$refs.msg.msgPlugin("请输入正确的用户名和密码", 2000)
            //             // this.$message("请输入正确的用户名和密码", 5000)
            //         })
            //     })
            // } )
        },
        goLoginOn(){
        }
    }
}
</script>

<style scoped>
.login{
    width: 100%;
    height: 100%;
    /* background: #aaa; */
    position: relative;
}
.loginBody{
    width: 100%;
    height: 70%;
    position:relative;
    bottom:0;
    top:0;
    margin: auto;
}
.loginBody img{
    width: 100%;
    height: 100%;
}
.loginBodyMain{
    width: 400px;
    height: 440px;
    padding: 20px 50px;
    background: #fff;
    border-radius: 20px;
    position:absolute;
    /* left: 0; */
    right: 200px;
    top:80px;
    margin: auto;
}
.loginMainTitle{
    font-size:20px;
    line-height: 60px;
    font-weight: 700;
}
.loginMainItem{
    margin: 40px 0;
    padding: 0 20px;
}

.loginGoOn span{
    cursor: pointer;
}
.loginGoOn span:hover{
    color:skyblue;
}
</style>
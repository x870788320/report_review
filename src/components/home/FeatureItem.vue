<template>
  <div class = 'featureItem' @click="handleGoItem()">
      {{module.title}}
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['module'],
    mounted(){
        // console.log(this.data)
    },
    methods:{
        handleGoItem(){
            if(!this.$store.getters['home/UserInfo']){
                this.$message('请先登录')
                this.$handleGo('login')
            } else{
                this.$handleGo(this.module.route, this.module)
            }
        }
    }
}
</script>

<style>
.featureItem{
    width: 500px;
    height: 80px;
    background:linear-gradient(to right, rgba(0,0,0,0), rgba(255,255,255,.8),rgba(0,0,0,0));
    font-size:30px;
    line-height: 80px;
    font-weight: 700;
    margin-bottom: 60px;
    cursor: pointer;
    border-radius: 40px;
    color:rgb(6, 6, 97);
}
.featureItem:hover{
    background:linear-gradient(to right, rgba(0,0,0,0), rgb(6, 6, 97),rgba(0,0,0,0));
    color:#fff;
}

</style>
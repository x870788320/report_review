<template>
      <div class="moduleTitle">
        <div>
          <span style="margin: 0 15px; font-size: 26px">|</span>
          <span>{{titleConfig.title}}</span>
        </div>
        <div class = 'moduleTitleBack' @click="moduleTitleBack()">
          <span >返回</span>
        </div>
      </div>
</template>

<script>
export default {
    name:"MyModuleTitle",
    props:{
        titleConfig:{
            type: Object,
            required: false,
            default: () =>{}
        }
    },
    data(){
        return {
          go:-1
        }
    },
    methods:{
      moduleTitleBack(){
        console.log(this.titleConfig.back)
        this.$router.go(this.titleConfig.back || this.go)
      }
    },
    mounted(){
    }
}
</script>

<style scoped>
.moduleTitle {
  line-height: 50px;
  background: rgba(0, 0, 96, 1);
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  padding: 0 60px;
  display: flex;
  justify-content:space-between;
}
.moduleTitleBack{
  cursor: pointer;
}
</style>
<template>
  <div class="addReport layoutContianer">
    <Header />
    <MyModuleTitle :titleConfig="moduleTitle" />
    <div class="addRepMain layoutMain">
      <div class="addRepMainSetp">
        <el-steps direction="vertical" :active="stepsActive-1">
          <el-step
            title="上传报告"
            description="请选择地区、模板，并上传报告"
          ></el-step>
          <el-step
            title="上传企业材料"
            description="请上传营业执照等企业信息"
          ></el-step>
          <el-step
            title="正在审核"
            description="正在审核报告，请稍后..."
          ></el-step>
          <el-step 
            title="审核完成"
            description="支付审核费用，查看结果！"></el-step>
        </el-steps>
      </div>
      <div class="addRepMainRight">
        <!-- <AddRep/> -->
        <router-view/>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { localremove } from '@/config/utils/storage'
export default {
  name: "reportReview",
  components: {
    Header: () => import("@/components/HeaderComponent.vue"),
    Footer: () => import("@/components/FooterComponent.vue"),
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      stepsActive:'review/StepsActive',
      HasReviewed:'review/HasReviewed',
    }),
    // backGrade: _ => _.$store.state.review.fromHome ? -1: 0-_.stepsActive,
    moduleTitle: _ => ({ 
      title: _.$route.params.title || "报 告 审 核", 
      back: _.backGrade()
    }),
  },
  methods:{
        ...mapMutations({
            changeStepsActive: 'review/changeStepsActive',
        }),
        backGrade(){
          const { fromHome } = this.$store.state.review
          console.log(fromHome)
          const aa = fromHome
          console.log(aa)
          return fromHome ? -1: 0-this.stepsActive
        }
      // stepsActive: val => this.stepsActive = val,
  },
  
  beforeRouteEnter(to, from, next) {
    console.log(from.name)
    console.log(from.name == 'report')
    if(from.name == 'report') {
      next({name: 'home'})
    }
    next()
  },
  created(){
    console.log(this.$store.state.review.fromHome)
    // console.log(this.stepsActive)
    // console.log(this.HasReviewed)
    // if(this.HasReviewed){
    //   console.log(333333)
    //   this.changeStepsActive(4)
    //   this.$handleRe('hasReview')

    // }
  },
  destroyed(){
    localremove('stepsActive')
    console.log(22222)
  }
};
</script>

<style scoped>
.addReport {
  background: #efefef;
}
.addRepMain {
  background: #fff;
  margin: 30px;
  min-height: calc(100% - 318px);
  border-radius: 10px;
  display: flex;
  padding: 20px;
}
.addRepMainSetp {
  padding: 30px;
  width: 300px;
}
.addRepMainRight {
  flex: 1;
  padding: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}


/* 大屏 */
#app .el-cascader .el-input .el-input__inner{
  font-size: 18px;
}
#app .el-step__title{
  font-size: 18px;

}
</style>
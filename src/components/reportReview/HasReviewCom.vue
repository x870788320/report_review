<template>
  <div class = 'hasReview'>
      <div class = 'hasRiviewTitle'>
          报告已审核完成，请支付后查看审核结果！
      </div>
      <div class = 'hasReviewPay'>
          <el-button type="primary" class = 'hasRiviewPayButton' @click="hasReviewPay()">支 付</el-button>
      </div>
      <div class = 'hasReviewCancle'>
          <el-button type="primary" class = 'hasRiviewCancleButton' @click="CancleReviewPay()">取消此次审核</el-button>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { localremove } from '@/config/utils/storage'
export default {
    name:'hasReview',
    computed:{
        back: _ => _.$route.params.fromHome? -1: -4
    },
    methods:{
        ...mapMutations({
            changeStepsActive: 'review/changeStepsActive',
            changeFromHome: 'review/changeFromHome',
            changeHasReviewed: 'review/changeHasReviewed',
        }),
        hasReviewPay(){
            console.log(this.back)
            this.changeHasReviewed(false)
            // this.changeStepsActive(null)
            localremove('hasReviewed')
            this.$handleGo('report')
        },
        CancleReviewPay(){
            this.changeHasReviewed(false)
            localremove('hasReviewed')
            this.$router.go(this.back)
        }
    },
    mounted(){
        console.log(this.$route.params.fromHome)
    },
    destroyed(){
        // this.$store.commit('review/changeFromHome', false)
        // this.changeStepsActive(null)
        this.changeFromHome(false)
    }


}
</script>

<style scoped>
.hasRiviewTitle{
  font-size: 20px;
  line-height: 80px;
}
.hasRiviewPayButton{
    width: 120px;
    height: 40px;
    font-size: 16px;
}
.hasReviewCancle{
    margin: 30px;
}
.hasRiviewCancleButton{
    width: 180px;
    height: 40px;
    font-size: 16px;
}

</style>
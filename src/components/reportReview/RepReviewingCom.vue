<template>
  <div class = 'reviewing'>
    <div class = 'reviewingWait'>
      正在审核报告，请稍后....
    </div>
      
    <el-progress type="circle" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
    name:"reviewing",
    data(){
      return{
        percentage:0,
        speet:5,
        timer: null
      }
    },
    computed:{
    ...mapState({
      parsingStatus: state => state.review.parsingStatus
    }),

    },
    watch:{
      parsingStatus(nval){
        console.log(nval)
        console.log(2222222)
        if(nval == true){
          console.log(333333)
        }
      }
    },
    methods:{
        ...mapMutations({
            changeStepsActive: 'review/changeStepsActive',
            changeHasReviewed: 'review/changeHasReviewed',
            changeParsingStatus: 'review/changeParsingStatus',
        }),
        computeSpeet(){
          let { fileSize } = this.$store.state.review
          console.log(fileSize)
        },
      changePercentage(){
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.changePercentage()
          if( this.parsingStatus ){
            this.speet = 10
          }
          if(this.percentage >= 80 && !this.parsingStatus){
            this.speet = 1
          }
          if(this.percentage >= 90 && !this.parsingStatus){
            this.speet = 0.1
          }
          if(this.percentage >= 98 && !this.parsingStatus){
            this.speet = 0.004
          }
          if(this.percentage >= 100 && !this.parsingStatus){
              this.percentage = 99.98
              this.$message({
                message: '请检查您的网络是否连接！',
                type: ''
              })
              clearTimeout(this.timer)
              this.changeParsingStatus(false)
          }
          if(this.percentage >= 100 && this.parsingStatus){
            clearTimeout(this.timer)
            this.changeParsingStatus(false)
            if(this.$route.name == 'reviewing'){
              this.$handleGo('hasReview')
            } else {
              this.$message({
                message: '报告已审核完成',
                type: 'success'
              })
            }
            this.changeStepsActive(4)
            this.changeHasReviewed(true)
          }
          //转number
          this.percentage = (this.percentage + this.speet).toFixed(1) - 0
          // this.changePercentage()
        }, 500)
        // let timer = setInterval(() => {
        //   this.percentage += this.speet
        //   if(this.percentage >= 100){
        //     clearInterval(timer)
        //     if(this.$route.name == 'reviewing'){
        //       this.$handleGo('hasReview')
        //     } else {
        //       this.$message({
        //         message: '报告已审核完成',
        //         type: 'success'
        //       })
        //     }
        //     this.changeStepsActive(4)
        //     this.changeHasReviewed(true)
        //   }
        // }, 500);
      }
    },
    mounted(){
      this.changePercentage()
      console.log(this.$route.name)
      console.log(this.$store.state.review.fileSize)
      console.log(this.parsingStatus)
    },
    destroyed(){
      clearTimeout(this.timer)
      this.timer = null
    }
}
</script>

<style scoped>
.reviewingWait{
  font-size: 20px;
  line-height: 70px;
}

</style>
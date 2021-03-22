<template>
  <el-collapse accordion v-model="activeNames" @change="handleChange">
    <el-collapse-item  v-for='(item, index) in collapseData.data'
       :key="item.name" 
       :title="item.name" 
       :name="index">
       <!-- 其它审核结果 -->
       <div v-if="typeof(item.data) == 'string'" class = 'collapseOtherInfo'>
         {{item.data}}
       </div>
       <div v-else>
        <div class = 'commonCollapse'
          v-for= 'obj in item.data'
          :key="obj.id">
          <span @click="collapseClick(obj.id, obj.length)">{{obj.cn}} (第{{currentTextNum(obj)}}个/共{{obj.length}}个)</span>
          <span v-if = 'collapseData.id == 1' style = 'margin-left:20px;' @click="handleIdentText(obj)">详情</span>
          <span style = 'margin-left:20px;' @click="handleIdentDetail(obj)">原文/修改</span>
          <!-- <span>更改 (2/ 1)</span> -->
        </div>
       </div>

    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
// import { toRawType } from '@/config/utils/index'
export default {
  name:'collapse',
  props:['collapseData', 'handleDetailShow', 'iframeScroll'],
  data() {
    return {
      activeNames: ["1"],
      iframeScrollInfo:{
        id:'',
        i:0
      },
      isComponey: 0
    };
  },
  computed:{
    ...mapState({
      // CurrentReport: state => state.correct.CurrentReport,
    }),
    
    ...mapGetters({
      CurrentReport:'correct/CurrentReport'
    }),
    //当前词条在所有词条的位数
    currentTextNum(){
      return obj =>{
        let index = 1;
        if(obj.id == this.iframeScrollInfo.id){
          index = this.iframeScrollInfo.i
        }
        return index
      }
    }
  },
  methods: {
    ...mapMutations({
      saveIdentOldText: 'correct/saveIdentOldText',
      changeDetailTitle: 'correct/changeDetailTitle',
    }),
    //不同下拉菜单打开时触发
    handleChange(val) {
      console.log(typeof val)
      console.log(val)
      if(typeof val == 'number'){
        this.isComponey = val
        this.$emit('getCollapseItem',val)
        this.changeDetailTitle(val)
      }
    },
    //法律或实体点击时,iframe触发高亮定位
    collapseClick(oId, counts){
      if( this.iframeScrollInfo.id != oId ){
        this.iframeScrollInfo.i = 0
        this.iframeScrollInfo.id = oId
      }
      if( this.iframeScrollInfo.i >= counts ){
        this.iframeScrollInfo.i = 0
      }
      // let lawId = i > 1? i - 1: 0;
      let divId = `${oId}_${this.iframeScrollInfo.i}`
      this.$nextTick().then(() => this.iframeScroll(divId))
      if( this.iframeScrollInfo.i < counts ){
        this.iframeScrollInfo.i++
      }
    },
    //显示详情
    handleIdentText(obj){
      this.saveIdentOldText(obj)
      this.handleDetailShow()
      return 
    },
    //显示上下文
    handleIdentDetail(lawInfo){
      console.log(this.CurrentReport)
      const { i } = this.iframeScrollInfo
      let lawId = i > 1? i - 1: 0;
      lawInfo.lawId = lawId
      let paylpad = {
        mark:lawInfo.id,
        index:lawId,
        mark_type: this.collapseData.id == 1? '法律法规':this.isComponey == 1? '公司名称':'地点名称',
        //公司名称  地点名称
        report_id:this.CurrentReport.id,
        lawInfo,
      }
      console.log(paylpad)
      this.$store.dispatch('correct/getMarkcontentst', paylpad)
      this.handleDetailShow()
    }, 
  },
  mounted(){
    console.log(this.collapseData)
    console.log(typeof('ssss'))
  }
};
</script>

<style>
.commonCollapse{
    font-size: 14px;
    text-align: left;
    padding: 10px;
}
.reportContent .el-collapse-item__header{
  font-size: 16px;
}
.commonCollapse span:hover{
    color:#409EFF;
    cursor: pointer;
}
.collapseOtherInfo{
    text-align: left;
    padding: 6px;
    word-break: break-all;
}
</style>
<template>
  <div class = 'identDetail'>
      <!-- 显示法律法规详情 -->
      <div class = 'IdentOldText' v-if = 'collapsePage == 1'>
          <div style = 'margin:10px;'>法规详情</div>
          <div v-for="(val, key) in detailTitle" :key="key" style = 'text-align:left'>
              <span>{{val}}</span>  
              <span>: </span>
              <span> {{IdentOldTextInfo[key]}}</span>
          </div>
          <el-button type="primary" round style= 'width:120px;margin:30px;' @click="modalClose">确定</el-button>
      </div>
        <!-- 显示原文/修改 -->
      <div v-if = 'collapsePage == 2'>
        <div class = 'identDetailText'>
            <span>{{MarkcontentstText.t1}}</span>
            <span style = 'color:#fff;background:#000;'>{{MarkcontentstText.t2}}</span>
            <span>{{MarkcontentstText.t3}}</span>
        </div>
        <div v-show = 'modifyShow'>
            <div class = 'identDetailModify'>
                <span class = 'identDetailModifyLeft'>原文：</span>
                <el-input show-password :disabled="true" :placeholder = 'MarkcontentstText.t2'></el-input>
            </div>
            <div  class = 'identDetailModify'>
                <span  class = 'identDetailModifyLeft'>修改为:</span>
                <el-input placeholder="请输修改法规" v-model="newValue"></el-input>
            </div>
        </div>
        <el-button type="primary" round style= 'width:120px;margin-bottom:30px;' @click="modalClose">返回</el-button>
        <el-button v-if = 'modifyShow' type="primary" round style= 'min-width:120px;margin-bottom:30px;' @click="addModifyList()">添加修改列表</el-button>
        <el-button v-else type="primary" round style= 'min-width:120px;margin-bottom:30px;' @click="modifyShow = true">修改</el-button>
      </div>
      <!-- 显示修改列表页 -->
      <div v-if = 'collapsePage == 3' class = 'modifyListContainer'>
          <div>修改列表</div>
          <div v-for = '(item, index) in lawModifyList'
            :key="item.id"
             class = 'modifyListItem'>
              <div class = 'modifyListItemBody'>
                <span style = 'width:80px'>原文：</span>
                <span>{{item.cn}}</span>
            </div>
            <div  class = 'modifyListItemBody'>
                <span style = 'width:80px'>修改为:</span>
                <span>{{item.newValue}}</span>
            </div>
            <div>
                
            <!-- <el-button type="text" round style= 'margin:0 10px;' size = "mini" @click="modalClose">打开</el-button> -->
            <el-button type="text" round style= 'margin:0 10px;' size = "mini" @click="deLawModifyItem(index)">撤销</el-button>
            </div>
          </div>
            <el-button type="primary" round style= 'width:120px;margin-top:30px;' @click="modalClose">返回</el-button>
            <el-button type="primary" round style= 'width:120px;margin-top:30px;' @click="submitModifyLaw">保存</el-button>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    name:'identDetail',
    data(){
        return {
            newValue:'',
            modifyShow:false,
            payloadObj:{},
            saveMsgInfo:{
                times:2000,
                msg:'网络原因稍后保存'
            }
        }
    },
    computed:{
        ...mapState({
            Markcontentst: state => state.correct.Markcontentst,
            IdentOldText: state => state.correct.IdentOldText,
            collapsePage: state => state.correct.collapsePage,
            detailTitle: state => state.correct.detailTitle,
            lawModifyList: state => state.correct.lawModifyList,
            CurrentReport: state => state.correct.CurrentReport,
        }),
        //法律法规详情渲染
        IdentOldTextInfo(){
            console.log(this.IdentOldText)
            let obj = ''
            if(this.IdentOldText){
                obj  = this.IdentOldText
            }
            return obj
        },
        //对显示的上下文进行高亮
        MarkcontentstText(){
            let textObj = {}
            if(this.Markcontentst){
                console.log(this.Markcontentst)
                let text1 = this.Markcontentst.contentst.data
                let text2 = this.Markcontentst.lawInfo.cn
                let txtArr = text1.split(text2);
                textObj = {
                    t1:txtArr[0],
                    t2:text2,
                    t3:txtArr[1],
                }
            }
            return textObj
        },
    },
    methods:{
        ...mapMutations({
            setLawModifyList: 'correct/setLawModifyList',
            deLawModifyItem: 'correct/deLawModifyItem',
            clearModifyList: 'correct/clearModifyList',
        }),
        ...mapActions({
            submitModifyList: 'correct/submitModifyList',
            getCorrectDetail: 'correct/getCorrectDetail'
        }),
        //关闭弹窗
        modalClose(){
            this.$parent.msgPlugin(false)
        },
        //把修改的内容添加到修改列表
        addModifyList(){
            if(this.newValue == ''){
                this.$parent.msgPlugin(false)
                return
            }
            const { newValue } = this
            this.payloadObj = { ...this.Markcontentst.lawInfo, newValue}
            this.setLawModifyList(this.payloadObj)
            this.$parent.msgPlugin(false)
            this.modifyShow = false
            this.newValue = ''
        },
        //修改列表页面的保存功能
        async submitModifyLaw(){
            if( !this.lawModifyList.length ) {
                this.$parent.msgPlugin(false)
                return
            }
            if(this.saving){
                let setTimeOut = 2000
                this.$refs.msg.msgPlugin("正在保存修改，请稍后再试", setTimeOut)
                setTimeout(() =>this.$parent.msgPlugin(false), setTimeOut+500)
                // this.$parent.msgPlugin(false)
                return
            }
            let content = this.lawModifyList.reduce((pre,item) => {
                pre[`${item.id}_${item.lawId}`] = item.newValue
                return pre
            },{})
            let payload = {
                report_id: this.CurrentReport.id,
                content
            }
            this.$parent.msgPlugin(false)
            this.saving = true
            let subState = await this.submitModifyList(payload)
            //如果保存成功，清空列表，重新得到内容
            this.saving = false

            switch( subState.code ){
                case '0':
                    this.clearModifyList()
                    this.getCorrectDetail({id:this.CurrentReport.id})
                    this.$parent.msgPlugin(false)
                    this.$store.commit('correct/changeBackroutes')
                    break;
                default:
                    this.$message(subState.message || "网络原因稍后保存", 2000)
            }
        },
    },
    mounted(){
        console.log(this.collapsePage)
    }


}
</script>

<style>
.identDetail{
    width: 500px;
    max-height: 650px;
    border-radius: 20px;
    background: #fff;
    padding: 30px;
    font-size: 16px;
    overflow: auto;
}
.identDetailText{
    min-height: 200px;
}
.IdentOldText{
    line-height: 26px;
}
.identDetailModify{
    display: flex;
    margin-bottom: 20px;
}
.identDetailModifyLeft{
    width: 100px;
    line-height: 40px;
}
.modifyListItem{
    border-bottom: 1px solid #ccc;
    padding-top: 6px;
}
.modifyListItemBody{
    display: flex;
    margin-bottom: 5px;
    font-size: 14px;
}
</style>
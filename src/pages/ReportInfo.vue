<template>
  <div class="report">
    <my-modal-box ref="msg">
      <IdentDetail />
    </my-modal-box>
    <Header />
    <div class="reportBody">
      <div class="reportBodyClose" @click="handleReportBack()">×</div>
      <div class="reportBodyMain">
        <div class="reportText">
          <div
            v-if="iframeHide"
            class="reportIframeLoading"
            v-loading="iframeHide"
            :element-loading-text="reportStatus.text"
            :element-loading-spinner="reportStatus.icon"
            element-loading-background="rgba(0, 0, 0, 0.2)"
            ref = 'iframeLoad'
          ></div>
          <div v-else class="reportIframeContainer">
            <div class="reportIframeTitle">{{ correctInfo.report_name }}</div>
            <iframe
              :src="iframeSrc + '?time=' + new Date().getTime()"
              class="reportIframeContent"
              ref="reportIframe"
              id="reportIframe"
            ></iframe>
          </div>
        </div>
        <div class="reportTextCon" style="border: 0">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            type="border-card"
            stretch
          >
            <el-tab-pane
              label="法规分析"
              name="first"
              style="margin-top: 0; padding-top: 0;font-size:18px"
            >
              <div class="reportContent">
                <Collapse
                  :handleDetailShow="handleDetailShow"
                  :collapseData="collapseData"
                  :iframeScroll="iframeScroll"
                   @getCollapseItem = getCollapseItem
                />
                <div style="margin: 20px">
                  <!-- <el-button
                    type="primary"
                    size="medium "
                    icon="el-icon-refresh"
                    @click="getCorrentInfo('all')"
                    >更新</el-button
                  > -->
                  <!-- <el-button
                    type="primary"
                    size="medium "
                    icon="el-icon-s-fold"
                    @click="SaveModifyList()"
                    >修改列表</el-button
                  > -->
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="实体识别" name="second">
              <div class="reportContent">
                <Collapse
                  :handleDetailShow="handleDetailShow"
                  :collapseData="collapseData"
                  :iframeScroll="iframeScroll"
                  @getCollapseItem = getCollapseItem
                />
                <div style="margin: 20px">
                  <!-- <el-button
                    type="primary"
                    size="medium "
                    icon="el-icon-refresh"
                    @click="getCorrentInfo('all')"
                    >更新</el-button
                  > -->
                  <el-button
                    type="primary"
                    size="medium "
                    icon="el-icon-s-fold"
                    @click="SaveModifyList()"
                    >修改列表</el-button
                  >
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="其他识别" name="third">
                <div class = 'reportContent'>
                  <Collapse
                    :handleDetailShow="handleDetailShow"
                    :collapseData="collapseData"
                    :iframeScroll="iframeScroll"
                    @getCollapseItem = getCollapseItem
                  />
                  <!-- <div style = 'margin: 20px;'>
                    <el-button size='small' icon="el-icon-refresh">更新</el-button>
                  </div> -->
                </div>
              </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="footerContainer">
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { SERVE_ADDRESS } from "@/config/utils/constants";
export default {
  name: "report",
  components: {
    Header: () => import("@/components/HeaderComponent.vue"),
    Footer: () => import("@/components/FooterComponent.vue"),
    Collapse: () => import("@/components/correctModify/Collapse.vue"),
    IdentDetail: () => import("@/components/correctModify/IdentDetail.vue"),
  },
  data() {
    return {
      activeName: "first",
      iframeHide: false,
      showNotNet: false,
      htmlUrl: "",
      lastId: "",
      CollapseItem:0,
      collapseData:{}
      // reportStatus: {
      //   text:'正在解析报告，请稍后！',
      //   icon:'el-icon-loading'
      // }
      // backroutes: -1,
    };
  },
  computed: {
    ...mapState({
      correctInfo: (state) => state.correct.correctInfo,
      correctDataArr: (state) => state.correct.correctDataArr,
      // CurrentReport: (state) => state.correct.CurrentReport,
      backroutes: state => state.correct.backroutes
    }),
    
    ...mapGetters({
      CurrentReport:'correct/CurrentReport'
    }),
    //iframe的路径，如果
    iframeSrc() {
      let url = "";
      if (this.correctInfo) {
        let html =
          this.activeName == "first"
            ? this.correctInfo.html_law
            :this.CollapseItem == 1? this.correctInfo.html_com: this.correctInfo.html_city;
            //this.CollapseItem
        url = `${SERVE_ADDRESS}/static/${html}`;
        console.log(url)
      }
      console.log(url);
      return url;
    },
    //判断是法律或者实体，返回不同的数据
    // collapseData() {
    //   // const {

    //   // } = this.correctInfo
    //   let data = {};
    //   if (this.correctInfo) {
    //     if (this.activeName == "first") {
    //       data = {
    //         id: 1,
    //         data: [
    //           this.correctInfo.law_stop_list,
    //           // this.correctInfo.law_run_list,
    //           this.correctInfo.law_reminder_list,
    //         ],
    //       };
    //     } else {
    //       data = {
    //         id: 2,
    //         data: [
    //           this.correctInfo.mark_address_list,
    //           this.correctInfo.mark_company_list,
    //           this.correctInfo.diff_provience_list,
    //         ],
    //       };
    //     }
    //   }
    //   return data;
    // },
    reportStatus(){
      let text = this.showNotNet? '网络原因请稍后再试！': '正在解析报告，请稍后！'
      let icon = this.showNotNet? 'el-icon-warning-outline': 'el-icon-loading'
      return {text, icon}
    }
  },
  watch: {
    //iframe路径改变后route不能返回上一页，记录iframe路由的变化次数
    iframeSrc() {
      // this.backroutes--;
      // localStorage.setItem('backroutes', this.backroutes)
      this.$store.commit('correct/changeBackroutes')
    },
    
    // showNotNet(val){
    //   if(val){
    //     console.log(val)
    //     let text = '网络原因请稍后再试！'
    //     let icon = 'el-icon-warning-outline'
    //     this.reportStatus = {text, icon}
    //   }
    //   return 
    // }
  },
  methods: {
    ...mapActions({
      getCorrectDetail: "correct/getCorrectDetail",
      getMarkcontentst: "correct/getMarkcontentst",
    }),
    //刚进入时触发的，选择的报告的信息
    async getCorrentInfo(clickStatus) {
      this.iframeHide = true;
      console.log(this.CurrentReport)
      let payload = {
        id: this.CurrentReport.id,
        clickStatus,
      };
      this.iframeHide  = this.showNotNet= await this.getCorrectDetail(payload);

      //得到报告数据先展示法律数据,如果没有值就赋值，有值就不操作
      !Object.keys(this.collapseData).length && this.changeItemData(0)
    },
    handleReportBack() {
      // localStorage.getItem('backroutes')
      // console.log(sessionStorage.getItem('backroutes'))
      // this.$router.go(sessionStorage.getItem('backroutes'));
      console.log(this.backroutes)
      //容易发生bug,暂时不考虑路由池
      // this.$router.go(this.backroutes);
      this.$handleGo('correct')
      this.$store.commit('correct/changeBackroutes', true)
    },
    //切选项卡
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.index);
      if(!this.correctInfo) return
      if (tab.index == 1) {
        if (this.correctInfo.analyze_com_status == "false") {
          // console.log(this.correctInfo);
          this.getCorrentInfo("city");
        }
      }
      this.lastId = "";
      this.changeItemData(tab.index)
    },
    //切选项卡改变数据
    changeItemData(index){
      let id = index - 0 + 1
      let data = this.correctDataArr[index]
      this.collapseData = { id, data }
      console.log(this.correctDataArr)
      console.log(this.collapseData)
    },
    //显示置灰页面
    handleDetailShow() {
      this.$nextTick(() => {
        this.$refs.msg.msgPlugin(true);
      });
    },
    //iframe页面的高亮显示
    iframeScroll(id) {
      console.log(id)
      this.$nextTick().then(() => {
        let iframeWin = this.$refs.reportIframe.contentWindow;
        let irrameDom = iframeWin.document;
        console.log(irrameDom)
        let oDiv = irrameDom.getElementById(id);
        if (this.lastId) {
          let oLastDiv = irrameDom.getElementById(this.lastId);
          if(oLastDiv){
            oLastDiv.style.background = "#fff";
            oLastDiv.style.color = "#000";
          }
        }
        console.log(oDiv)
        oDiv.style.background = "#000";
        oDiv.style.color = "#fff";
        oDiv.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        this.lastId = id;
      });
    },
    //修改列表页面显示
    SaveModifyList() {
      this.$store.commit("correct/openModifyPage");
      this.handleDetailShow();
    },
    getCollapseItem(val){
      if(val == 'undefined')return;
      this.CollapseItem = val
    }
  },
  created() {
    this.getCorrentInfo();
  },
  mounted() {
    //大屏todo        
    // if(document.body.clientWidth > 1000){
    //   console.log(4444444444)
    //   console.log(document.querySelector('.el-tab-pane'))
    //   console.log(document.querySelector('.el-collapse-item__header'))
    //   // document.querySelector('.el-tabs__item').style.fontSize = '18px';
    //   // document.querySelector('.el-tab-pane').style.fontSize = '18px';
    // }
  },
  destroyed(){
    console.log(32323232323)
  },
};
</script>

<style>
.report {
  width: 100%;
  height: 100%;
  background: #efefef;
}
.reportBody {
  width: 92%;
  height: 74%;
  background: #fff;
  margin: 10px auto;
  box-shadow: 2px 4px 14px #888888;
  position: relative;
}
.reportIframeLoading {
  width: 100%;
  height: 100%;
  font-size: 30px;
}
.reportIframeLoading .el-loading-spinner i {
  color: #fff;
}

.reportIframeLoading .el-loading-spinner .el-loading-text {
  color: #fff;
}
.reportIframeContainer {
  width: 100%;
  height: 100%;
}
.reportIframeTitle {
  line-height: 22px;
  font-size: 16px;
}
.reportIframeContent {
  width: 100%;
  height: calc(100% - 22px);
  border: 0;
}
.reportBodyClose {
  width: 30px;
  line-height: 30px;
  position: absolute;
  top: -10px;
  right: -10px;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  font-size: 20px;
  background: #fff;
  cursor: pointer;
}
.reportBodyMain {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.reportText {
  width: 50%;
  height: 94%;
  margin: 24px 10px;
  border: 1px solid #ccc;
  padding: 10px;
}

.reportTextCon {
  width: 46%;
  height: 98%;
  margin: 10px;
  padding: 20px 0;
}
.reportTextCon .el-tabs {
  height: 100%;
}
.reportTextCon .el-tabs__content {
  height: calc(100% - 40px);
  padding: 15px;
  padding-top: 0px;
  overflow: auto;
}


/* 大屏 */
/* .el-tabs__item.is-top{
  font-size: 18px;
}
#app .el-collapse-item .el-collapse-item__header{
  font-size: 18px;

}
#app .el-collapse-item__content .commonCollapse{
  font-size: 18px;
} */
</style>
<template>
  <div class="correct">
    <!-- <MyPopUps ref= "myPopUp"/>
    <my-modal-box ref= "msg">
        <AddRep />
        <router-view></router-view>
        <router-view/>
    </my-modal-box> -->
    <Header />
    <div class="correctTable">
      
      <MyModuleTitle :titleConfig = 'moduleTitle'/>
      <div class="correctBtn">
        <!-- <el-button @click="handleAddRep('addreport')"
          >新增报告<i class="el-icon-upload el-icon--right"></i
        ></el-button>
        <el-button @click="handleAddRep('addmeterial')"
          >材料上传<i class="el-icon-upload el-icon--right"></i
        ></el-button> -->
      </div>
      <div class="correctTabMain">
        <el-table
          :data="
            correctList.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          stripe
          style="width: 100%;font-size:14px;"
          ref = 'elTable'
        >
          <el-table-column
            prop="date"
            label="序号"
            min-width="8%"
            type="index"
            align="center"
          >
          </el-table-column>
          <!-- <el-table-column prop="date" label="序号" width="100">
          </el-table-column> -->
          <el-table-column prop="company_name" label="公司名称" min-width="50%">
          </el-table-column>
          <el-table-column prop="create_name" label="创建者" min-width="10%">
          </el-table-column>
          <el-table-column  label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="deleteReportClick(scope.row.id)"
                type="text"
                size="small"
                >删除</el-button
              >
              <el-button type="text" size="small" @click="lookCurrent(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="ReportDownLoad(scope.row.id, 'original')">原文下载</el-button>
              <el-button type="text" size="small" @click="ReportDownLoad(scope.row.id, 'mark')">标注版本下载</el-button>
              <!-- <a href=""></a> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="correctPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="correctList.length"
        >
        </el-pagination>
      </div>
    </div>
    <div class = 'footerContainer'>
      <Footer />
    </div>
  </div>
</template>

<script>
// import axios from "axios"
import { mapState, mapActions, mapMutations } from 'vuex'
import { SERVE_ADDRESS } from '@/config/utils/constants'
import { isCanUpload } from '@/config/interface'
// import { getCookie } from '@/config/utils'
export default {
  name: "correct",
  components: {
    Header: () => import("@/components/HeaderComponent.vue"),
    Footer: () => import("@/components/FooterComponent.vue"),
    // AddRep: () => import("@/components/correctModify/CorrectAddRep.vue"),
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
    };
  },
  computed:{
    ...mapState({
      correctList: state => state.correct.correctList
    }),
    moduleTitle: _ => ({'title': _.$route.params.title ||'报告中心'})
  },
  methods: {
    ...mapActions({
      getCottectList: 'correct/getCottectList',
      reportDelete: 'correct/reportDelete',
    }),
    ...mapMutations({
      saveCurrentReport: 'correct/saveCurrentReport',
    }),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleAddRep(route){
      console.log(route)
        // console.log(this.$refs)
        this.$nextTick(() => {
          this.$refs.msg.msgPlugin(true)
          this.$handleGo(route)
        })
    },
    lookCurrent( report ){
        this.saveCurrentReport(report)
        this.$handleGo('report')
    },
    correctBackBtn(){
      this.$router.back()
    },
    async deleteReportClick(id){
      let data = await this.reportDelete(id)
      console.log(data)
      if( data.code == 4001 ){
        // this.$message(data.message)
        this.$refs.myPopUp.msgPlugin(data.message, 2000)
      }
    },
    async ReportDownLoad(id, status){
      console.log(`${SERVE_ADDRESS}/downloadreport/${id}?filetype=${status}`)
      let isCan = await isCanUpload(`${id}?filetype=${status}`)
      console.log()
      if(isCan.message == '无') {
        this.$message('未生成标注版，请联系管理员！')
      } else {
        window.open(`${SERVE_ADDRESS}/downloadreport/${id}?filetype=${status}`);
      }
    }
  },
  created(){
    this.getCottectList()
  },
  mounted(){
    // console.log(this.$store.dispatch('correct/getCottectList'))
    // this.$store
    // console.log(this.getCottectList().then(() => console.log(this.$store.state)))
    // console.log(getCookie('csrftoken'))
    console.log(this.$route.params)
        
        //大屏todo
    // if(document.body.clientWidth > 1000){
    //   document.querySelector('.el-table').style.fontSize = '18px';
    //   document.querySelector('.el-button').style.fontSize = '18px';
    // }
  }
};

</script>

<style>
.correct {
  width: 100%;
  height: 100%;
  background: #efefef;
}
.correctTable{
  min-height: calc(100% - 130px - 60px);
}
.correctTitle {
  line-height: 50px;
  background: rgba(0, 0, 96, 1);
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  padding-left: 60px;
  display: flex;
  justify-content:space-between;
}
.correctBackBtn{
  cursor: pointer;
  margin-right:50px;
}
.correctBtn {
  margin: 15px;
  width: 300px;
}
.correctBtn .el-button{
    width: 120px;
    background: rgba(0,0,96,1);
    color:#fff;
    margin:0 10px;
}
.correctBtn .el-button:hover{
    width: 120px;
    background: rgba(0,0,96,.8);
    color:#fff;
}
.correctTabMain {
  width: 90%;
  /* height: 80%; */
  /* height: 500px; */
  margin: 0 auto;
  overflow: hidden;
}
.correctPage {
  padding: 40px;
}
.el-pagination__editor.el-input{
    vertical-align: bottom;
}
.footerContainer{
  height: 60px;
  position: relative;
}

/* 大屏 */
/* .el-button.el-button--text.el-button--small{
  font-size: 18px;
} */
</style>
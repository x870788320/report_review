<template>
  <div class="addReportCo">
    <div class="addSelectAdd">
      <div class = 'addReportProCity'>
        <el-select v-model="addressValue"   @change = provinceChange 
              class = 'addReportProCityInput'>
              <el-option
              v-for="(value, key) in address"
              :key="key"
              :label="key"
              :value="value">
              </el-option>
          </el-select>
        <el-select v-model="cityValue" 
              class = 'addReportProCityInput'>
              <el-option
              v-for="(value, key) in citys"
              :key="key"
              :label="key"
              :value="value">
              </el-option>
          </el-select>

      </div>
      <el-cascader
          v-model="currentClassValue"
          :options="currentClass"
          :props = 'props'
          @change="classChange"
          :show-all-levels="false"></el-cascader>

      <el-select v-model="currentLevel" 
            class = ''>
            <el-option
            v-for="item in levelData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
        </el-select>
    </div>

    <div class="AddRepTitle">请选择审核的报告</div>
    <div>
      <el-upload
        ref="uploadDocx"
        class="avatar-uploader"
        :action="location"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
        accept=".docx"
        :with-credentials="true"
        :on-change="selectShowImg"
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
        :before-upload="beforeupload"
      >
        <img v-if="fileInfo" src="@/assets/correct/docx.jpg" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="addRepMsg">只能上传docx文件</div>
    <div class="addRepSub">
      <el-button round @click="$router.back()">取消</el-button>
      <el-button round @click="handleUpdataReport()">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { baseURL } from "@/config/utils/constants";
import { getProvinces, getCitys } from '@/config/interface'
import { currentClass } from "@/resource/currentClass";
export default {
  name: "addReportCom",
  data() {
    return {
      imageUrl: "",
      fileInfo: null,
      // location: baseURL + "/mistake/uploadreport/",
      location: "",
      address: [],
      addressValue: 1375,
      citys:[],
      cityValue:1387,
      currentClassValue: [1,3,1],
      currentClass:currentClass,
      levelData:[
        {
          id:1,
          name:'现状评价'
        },
        {
          id:2,
          name:'安全预评价'
        },
        {
          id:3,
          name:'安全验收评价'
        }
      ],
      currentLevel:1,
      props:{
        label:'name',
        value:'id',
        children:'childClass'
      }
    };
  },
  computed: {
    ...mapState({
    }),
    // location(){
    //   console.log(this.citys)
    //   console.log(this.currentClass)
    //   console.log(this.cityValue)

    //   let pro = this.citys.filter(item =>item.value == this.cityValue)
    //   console.log(pro)
    //   let params = `?company_city_name="青岛"&company_type="加油站"`
    //   return baseURL + "/mistake/uploadreport/" + params
    // }
  },
  methods: {
    ...mapMutations({
      changeStepsActive: "review/changeStepsActive",
      changeFileSize: "review/changeFileSize",
      saveCurrentReport: 'correct/saveCurrentReport',
    }),
    ...mapActions({
      changeParsingStatus: "review/changeParsingStatus",
    }),
    handleAvatarSuccess(a) {
      console.log(a)
      const { report_id:id } = a.message
      this.saveCurrentReport({id})
      this.$message({
        message: "报告上传成功",
        type: "success",
      });
      console.log(id)
      // let status = analyzeword(id)
      this.changeParsingStatus(id)
      console.log(status)
      this.changeStepsActive(2);
      this.$handleGo("addmeterial");
      
      // this.$store.dispatch('correct/getCottectList').then((res) => {
      //   console.log(res)
      //   this.fileInfo = null
      //   this.$children[0].clearFiles()
      //   this.changeStepsActive(1)
      //   this.handleGo('addmeterial')
      // })
    },
    // 文件上传失败时的钩子
    handleError(err) {
      this.$message("上传失败，请稍后再试！");
      console.log("err: " + err);
    },
    selectShowImg(file) {
      console.log(file);
      this.fileInfo = file;
    },
    handleUpdataReport() {
      // let city = Object.entries(this.citys).filter(([, value]) => value == this.cityValue)[0][0]
      // let type = this.currentClassValue.reduce((pre, item) => pre[item-1].childClass || pre[item-1], this.currentClass)
      // console.log(city)
      // console.log(type.name)
      // let params = `?company_city_name=${city}&company_type=${type}`
      // this.location = `${baseURL}/mistake/uploadreport/${params}`
      this.$refs.uploadDocx.submit()
      // this.changeStepsActive(2);
      // this.$handleGo("addmeterial");
    },
    //改变省的事件
    provinceChange(value) {
      this.getCitysList(value)
    },
    async getProvincesList(){
      let provinces = await getProvinces()
      this.address = JSON.parse(provinces.message)
      console.log(this.address)
      // let provinceJson = Object.entries(obj).map(([label, value]) => ({ value, label }))
    },
    
    async getCitysList(proviceId){
      let Citys = await getCitys(proviceId)
      // let selectPro = this.address.filter(item => item.value == proviceId)[0]
      this.citys = JSON.parse(Citys.message)
      let isSD = proviceId == 1375
      this.cityValue = isSD? 1387: this.citys[Object.keys(this.citys)[0]]
    },
    classChange(){
      console.log(this.currentClassValue)
    },
    //改变upload的location
    //方法也可以放到mounted里面运行
    //https://github.com/ElemeFE/element/issues/9381
    beforeupload(file){
      console.log(file)
      console.log(file.size)
      const {levelData, currentLevel, currentClassValue, currentClass, citys, cityValue} = this
      this.changeFileSize(file.size)
      let city = Object.entries(citys).filter(([, value]) => value == cityValue)[0][0]
      let type = currentClassValue.reduce((pre, item) => pre[item-1].childClass || pre[item-1], currentClass)
      let report_stage = levelData[currentLevel-1].name
      console.log(city, type, report_stage)
      let params = `?company_city_name=${city}&company_type=${type.name}&report_stage=${report_stage}`
      return new Promise(resolve => {
        this.$nextTick(() => {
          this.location = `${baseURL}/mistake/uploadreport/${params}`     
          resolve()
        })
      })
    }
  },
  beforeCreate() {
    console.log(this.$store.getters["review/StepsActive"]);
    //实现点击开始审核跳转不同步骤
    // let steps = ['addreport', 'addmeterial', 'reviewing', 'hasReview']
    // let stepId = this.$store.getters['review/StepsActive']
    // if(stepId == null){
    //   this.$store.commit('review/changeStepsActive', 1)
    // }
    // if(stepId > 1) {
    //   this.$store.commit('review/changeStepsActive', stepId)
    //   this.$store.commit('review/changeFromHome', true)
    //   this.$handleRe(steps[stepId-1], {fromHome:true})
    // }

    if (this.$store.getters["review/HasReviewed"]) {
      // this.$store.commit('review/changeStepsActive', 4)
      // this.$store.commit('review/changeFromHome', true)
      // this.$handleRe('hasReview', {fromHome:true})
      this.$store.commit("review/changeStepsActive", 4);
      this.$store.commit("review/changeFromHome", true);
      this.$handleRe("hasReview", { fromHome: true });
    }
  },
  mounted() {
    !this.$store.getters["review/HasReviewed"] && this.changeStepsActive(1);
    this.getProvincesList()
    this.getCitysList(this.addressValue)
  },
};
</script>

<style>
.addReportCo {
  width: 100%;
}
.addSelectAdd {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
}
.addRepContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
.addReportProCity{
  display: flex;
  border:1px solid #ddd;
  border-radius: 5px;
}
.addReportProCity input{
  border: 0;
}
.addReportProCity .addReportProCityInput{
  width: 130px;
}
.AddRepTitle {
  font-size: 20px;
  line-height: 40px;
  font-weight: 600;
  margin-bottom: 20px;
}
.addRepMsg {
  margin: 20px 0 50px 0;
}
.addRepSub .el-button {
  width: 180px;
  background: rgba(0, 0, 96, 1);
  color: #fff;
  margin: 0 10px;
}
.addRepSub .el-button:hover {
  background: rgba(0, 0, 96, 0.8);
  color: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
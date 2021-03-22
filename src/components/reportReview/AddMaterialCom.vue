<template>
  <div class="addMaterial">
    <div class = 'AddRepTitle'>请上传企业材料</div>
    <div>
      <el-upload
        ref="uploadDocx"
        class="avatar-uploader"
        :action="location"
        :limit=1
        :auto-upload="false"
        :show-file-list='false'
        :with-credentials='true'
        :on-change = 'selectShowImg'
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
      >
        <img v-if="fileInfo" src="@/assets/correct/docx.jpg" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class = 'addRepMsg'>企业信息材料</div>
    <div class = 'addRepSub'>
        <el-button round @click=" lastStep()">上一步</el-button>
        <el-button v-show = '!uploading' round @click="handleUpdataMaterial()">提交</el-button>
        <el-button v-show = 'uploading' round>正在上传...</el-button>

    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { baseURL } from '@/config/utils/constants'
export default {
    name:'correctAddMat',
    data() {
      return {
        imageUrl: '',
        fileInfo:null,
        location: baseURL+'/analyzepictures/',
        uploading:false
      };
    },
    computed:{
    },
    methods: {
        ...mapMutations({
            changeStepsActive: 'review/changeStepsActive',
        }),
      handleAvatarSuccess() {
        this.uploading = false
        this.$message({
                message: '材料上传成功',
                type: 'success'
              })
          this.changeStepsActive(3)
          this.$handleGo('reviewing')
        // this.$store.dispatch('correct/getCottectList').then((res) => {
        //   console.log(res)
        //   this.$parent.msgPlugin(false)
        //   this.fileInfo = null
        //   this.$children[0].clearFiles()
        // })
      },
    // 文件上传失败时的钩子
    handleError(err) {
      this.uploading = false
      this.$message('上传失败，请稍后再试！')
      console.log('err: '+err)
    },
      selectShowImg(file) {
          console.log(file)
          this.fileInfo = file
      },
      handleUpdataMaterial(){
        // this.$store.dispatch('correct/handleUploadreport')
        this.uploading = true
        // this.$refs.uploadDocx.submit()
          this.changeStepsActive(3)
          this.$handleGo('reviewing')
      },
      lastStep(){
        this.$router.back()
        this.changeStepsActive(1)
      }
    },
    mounted(){
      console.log(this.location)
        console.log(this.$parent)
    }
};
</script>

<style>
.addSelectAdd{
    margin-bottom: 30px;
    display: flex;
    justify-content: space-evenly;
}
.addRepContainer{
    display: flex;
    justify-content: center;
    align-items: center;
}

.AddRepTitle{
    font-size: 20px;
    line-height: 40px;
    font-weight: 600;
    margin-bottom: 20px;
}
.addRepMsg{
    margin:20px;
}
.addRepSub .el-button{
    width: 180px;
    background: rgba(0,0,96,1);
    color:#fff;
    margin:0 10px;
}
.addRepSub .el-button:hover{
    background: rgba(0,0,96,.8);
    color:#fff;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
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
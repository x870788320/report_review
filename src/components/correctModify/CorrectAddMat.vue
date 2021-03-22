<template>
  <div class="CorrectAddRep">
    <div class = 'AddRepTitle'>请选择上传的报告</div>
    <!-- http://39.98.136.48:6006/mock/11/mistake/uploadreport/ -->
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
    <!-- <div class = 'addRepMsg'>{{fileInfo && fileInfo.name || '只能上传docx文件'}}</div> -->
    <div class = 'addRepMsg'>只能上传docx文件</div>
    <div class = 'addRepSub'>
        <el-button round @click="handleUpdataReport()">提交</el-button>
        <el-button round @click="correctAddCan()">取消</el-button>
    </div>
  </div>
</template>

<script>
import { baseURL } from '@/config/utils/constants'
// export default {
//     name:'correctAddMat',
//     data() {
//       return {
//         imageUrl: '',
//         fileInfo:null,
//         // location:SERVE_ADDRESS+'/mistake/uploadreport/'
//         location: baseURL+'/analyzepictures/',
//         address: [
//             {
//                 value: '1',
//                 label: '青岛'
//             }, 
//             {
//                 value: '2',
//                 label: '烟台'
//             }, 
//             {
//                 value: '3',
//                 label: '临沂'
//             }, 
//             {
//                 value: '4',
//                 label: '阿富汗'
//             }, 
//             {
//                 value: '5',
//                 label: '其它'
//             }
//         ],
//         addressValue: ''
//       };
//     },
//     methods: {
//       handleAvatarSuccess() {
//         this.$message('上传成功')
//         this.$store.dispatch('correct/getCottectList').then((res) => {
//           console.log(res)
//           this.$parent.msgPlugin(false)
//           this.fileInfo = null
//           this.$children[0].clearFiles()
//         })
//       },
//     // 文件上传失败时的钩子
//     handleError(err) {
//       console.log('err: '+err)
//     },
//       selectShowImg(file) {
//           console.log(file)
//           this.fileInfo = file
//       },
//       correctAddCan(){
//         this.$parent.msgPlugin(false)
//       },
//       handleUpdataReport(){
//         // this.$store.dispatch('correct/handleUploadreport')
//         this.$refs.uploadDocx.submit()
//       }
//     },
//     mounted(){
//       console.log(this.location)
//         console.log(this.$parent.$parent)
//     }
// };
</script>

<style>
.CorrectAddRep {
  width: 400px;
  height: 400px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
}
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
    width: 120px;
    background: rgba(0,0,96,1);
    color:#fff;
    margin:0 10px;
}
.addRepSub .el-button:hover{
    width: 120px;
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
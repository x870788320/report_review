<template>
<div>
  <!-- <el-form :model="form"> -->
    <!-- <el-form-item label="上传文件" :label-width="formLabelWidth"> -->
      <el-upload
        ref="uploadExcel"
        action="http://39.98.136.48:6006/mock/11/mistake/uploadreport/"
        :limit=limitNum
        :auto-upload="false"
        accept=".docx"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList">
        <el-button size="small" plain>选择文件</el-button>
        <div slot="tip" class="el-upload__tip">docx(Excel2007)文件，且不超过10M</div>
      </el-upload>
    <!-- </el-form-item> -->
    <!-- <el-form-item> -->
      <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
      <!-- <el-button size="small">取消</el-button> -->
    <!-- </el-form-item> -->
  <!-- </el-form> -->
  <!-- <div  class = 'test' :style="testStyle"></div> -->
  <div  class = 'test1' :style="styleVartest1" @click="() => {}"></div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      limitNum: 1,
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: [],
      testStyle:{
        width:'100px',
        height:'100px',
         '--backColor':'#000'
      },
      '--backColor':'#000'
    }
  },
  computed: {
    styleVar() {
      return {
        '--box-height': this.height + 'px',
        '--backColor':'#000'
      }
    },
    
    styleVartest1() {
      return `width:100px;height:100px;background:#f00;`
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change')
      console.log(file)
      this.form.file = file.raw
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
    //   let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      let size = file.size / 1024 / 1024
    //   if(extension !== 'xlsx') {
    //     this.$notify.warning({
    //       title: '警告',
    //       message: `只能上传Excel2017（即后缀是.xlsx）的文件`
    //     });
    //   }
      if(size > 10) {
        this.$notify.warning({
          title: '警告',
          message: `文件大小不得超过10M`
        });
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
        console.log(res)
        console.log(file)
    //   this.$notify.success({
    //     title: '成功',
    //     message: `文件上传成功`
    //   });
    },
    // 文件上传失败时的钩子
    handleError(err, file) {
        console.log(err)
        console.log(file)
    //   this.$notify.error({
    //     title: '错误',
    //     message: `文件上传失败`
    //   });
    },
    uploadFile() {
      this.$refs.uploadExcel.submit()
      /*
      let formData = new FormData()
      formData.append('file', this.form.file)
      axios.post('https://jsonplaceholder.typicode.com/posts/', 
        formData,
        { "Content-Type": "multipart/form-data" }
      )
      .then(res => {
        console.log('res')
        console.log(res)
      })
      .catch(err => {

      })
      */
    }
  }
}
</script>

<style scoped>
.test{
        width:100px;
        height:100px;
/* background: var(--backColor); */
}
</style>
<template>
  <div class = 'upload'>
    <div>
      <el-upload
        ref="uploadDocx"
        class="avatar-uploader"
        :action="location"
        :limit=1
        :auto-upload="false"
        :show-file-list='false'
        accept=".docx"
        :with-credentials='true'
        :on-change = 'selectShowImg'
        :on-success="handleAvatarSuccess"
        :on-error="handleError"
      >
        <img v-if="fileInfo" src="@/assets/correct/docx.jpg" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class = 'addRepMsg'>只能上传docx文件</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
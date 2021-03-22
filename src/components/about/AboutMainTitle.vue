<template>
    <div class="aboutTitle">
        <div>
          <span style="margin: 0 15px; font-size: 26px">|</span>
          <span>{{title}}</span>
        </div>
        <div class = 'aboutBackBtn' @click=" () => $router.back() ">
          <span >返回</span>
        </div>
      </div>
</template>

<script>
export default {
    name:'aboutMainTitle',
    props:['title']

}
</script>

<style scoped>
.aboutTitle {
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
.aboutBackBtn{
  cursor: pointer;
  margin-right:50px;
  font-size:16px;
}
</style>
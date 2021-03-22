<template>
  <div class="aboutSide">
    <div class="aboutSideHead">
        <div>个人中心</div>
    </div>
    <div style = 'margin-top:20px;font-size:18px'>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >

        <el-menu-item  v-for = "item in aboutData" 
            :key="item.id"
            :index="String(item.id)"
            :class = "{ aboutItemActive: item.id == activeId }">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'aboutSide',
    data(){
        return {
          activeId:1
        }
    },
    computed:{
        ...mapState({
            aboutData:state => state.about.aboutData
        })
    },
  methods: {
    handleSelect(key) {
      this.activeId = key - 0
      console.log(this.activeId)
      const { route, title } = this.aboutData[key-1]
      this.$handleRe(route, { title })
    },
  },
};
</script>

<style>
.aboutSide {
  width: 240px;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
}
.aboutSideHead {
  line-height: 140px;
  font-size: 22px;
  /* background: rgba(0,0,96,.8);linear-gradient(to right, rgba(0,0,0,0), rgb(6, 6, 97),rgba(0,0,0,0)); */
  background: linear-gradient(to bottom,rgb(6, 6, 97),rgba(0,0,0,0));
  color:#fff;
  /* border-bottom: 1px solid #eee; */
}
.aboutItemActive{
  background: #ecf5ff;
}
</style>
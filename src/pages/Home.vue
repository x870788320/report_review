<template>
    <div class = 'home'>
        <!-- homehome
        <button @click=" handleClick() "> 
            按钮
        </button>
        <MyPopUps ref= "msg"/>
        <input v-focus/>
        <button v-display-key = "'displayKey'">按钮1</button>
        <button v-display-key = "3">按钮2</button>
        <button v-display-key = "8">按钮3</button>
        <button>按钮4</button> -->
        <div class = 'headerCon'>
            <Header :from = 'fromData'/>
        </div>
        <div class = 'homeBkg'>
            <!-- <img src="../assets/img1.jpg" alt="">
            <img src="../assets/img2.jpg" alt=""> -->
            <div class = 'homeBkgFont'>
                <div>创 新 引 领 未 来</div>
                <div style = 'font-size:40px;'>{{'Innovation leads the future'.toUpperCase()}}</div>
            </div>
            <Swiper :config = "swiperData"/>
        </div>
        <div class = 'feature'>
            <FeatureItem v-for="item in featureData" :key="item.id" :module = 'item'/>
        </div>
        <Footer :from = 'fromData'/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "home",
    components:{ 
        Swiper: () => import("@/components/common/Swiper.vue"),
        FeatureItem: () => import("@/components/home/FeatureItem.vue"),
        Header: () => import("@/components/HeaderComponent.vue"),
        Footer: () => import("@/components/FooterComponent.vue"),
    },
    data(){
        return {
            swiperData:{
                dataArr:['img1.jpg', 'img2.jpg']
            },
            fromData:'home'
        }
    },
    computed:{
        ...mapState({
            featureData:state => state.home.featureData,
            userInfo:state => state.home.featureData
        })
    },
    methods:{
        handleClick(){
            this.$nextTick(() => {
                this.$refs.msg.msgPlugin("这个是测试弹窗", 5000)
            })
        },

    },
    beforeCreate(){
        this.$fromTo()
    },
    created(){
        console.log(this.featureData)
    },
    mounted(){
        // console.log(this.$store.state.isLogIn)
        // this.$store.dispatch('home/getUserInfo')
        
        // history.pushState(null, null, document.URL);
    }
}
</script>

<style scoped>
.headerCon{
    position: absolute;
    z-index: 100;
    width: 100%;
}
.home,.homeBkg{
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 800px;
}
.homeBkgFont{
    height: 80px;
    position: absolute;
    font-size:70px;
    font-weight: 800;
    color:#fff;
    top:30%;
    left: 16%;
    z-index: 100;
    transform: rotateY(45deg);
}
.feature{
    position:absolute;
    z-index: 100;
    right: 10%;
    top:33%;
}
</style>

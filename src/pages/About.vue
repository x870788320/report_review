<template>
  <div class = 'aboutPage'>
    <Header />
    <div class = 'aboutContainer'>
        <AboutSide/>
        <div class = 'aboutMain'>
          <!-- <AboutMainTitle :title='$route.params.title'/> -->
            <router-view></router-view>
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {
    Header: () => import("@/components/HeaderComponent.vue"),
    Footer: () => import("@/components/FooterComponent.vue"),
    AboutSide: () => import("@/components/about/AboutSide.vue"),
    // AboutMainTitle: () => import("@/components/about/AboutMainTitle.vue"),
  },
}
</script>
<style>
.aboutPage {
  width: 100%;
  height: 100%;
  background: #efefef;
}
.aboutContainer{
    width: 100%;
    height: 600px;
    padding: 30px 60px;
    display: flex;
}
.aboutMain{
    /* width: calc(); */
    margin:0 30px;
    flex: 1;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
}
</style>
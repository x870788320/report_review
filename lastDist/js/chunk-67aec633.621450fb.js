(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67aec633"],{"0c98":function(t,e,n){},b76f:function(t,e,n){"use strict";var a=n("0c98"),r=n.n(a);r.a},bc13:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"headerCon"},[n("Header",{attrs:{from:t.fromData}})],1),n("div",{staticClass:"homeBkg"},[n("div",{staticClass:"homeBkgFont"},[n("div",[t._v("创 新 引 领 未 来")]),n("div",{staticStyle:{"font-size":"40px"}},[t._v(t._s("Innovation leads the future".toUpperCase()))])]),n("Swiper",{attrs:{config:t.swiperData}})],1),n("div",{staticClass:"feature"},t._l(t.featureData,(function(t){return n("FeatureItem",{key:t.id,attrs:{data:t}})})),1),n("Footer",{attrs:{from:t.fromData}})],1)},r=[],o=(n("d3b7"),n("5530")),i=n("2f62"),s={name:"home",components:{Swiper:function(){return n.e("chunk-50599ec7").then(n.bind(null,"ea6f"))},FeatureItem:function(){return n.e("chunk-658932a5").then(n.bind(null,"934a"))},Header:function(){return n.e("chunk-235c122d").then(n.bind(null,"f983"))},Footer:function(){return n.e("chunk-6956fc38").then(n.bind(null,"e741"))}},data:function(){return{swiperData:{dataArr:["img1.jpg","img2.jpg"]},fromData:"home"}},computed:Object(o["a"])({},Object(i["d"])({featureData:function(t){return t.home.featureData},userInfo:function(t){return t.home.featureData}})),methods:{handleClick:function(){var t=this;this.$nextTick((function(){t.$refs.msg.msgPlugin("这个是测试弹窗",5e3)}))}},created:function(){console.log(this.$store.getters.aas),console.log(this.featureData)},mounted:function(){this.$store.dispatch("home/getUserInfo")}},u=s,c=(n("b76f"),n("2877")),f=Object(c["a"])(u,a,r,!1,null,"1123400c",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-67aec633.621450fb.js.map
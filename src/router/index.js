import Vue from "vue"
import Router from "vue-router"
import store from "../store"
import { canSeePage } from '@/config/utils/constants'
import { hasPermission, vGradeInfo } from "../config/utils/permissions"

console.log(vGradeInfo("v4"))

//点击路由后再次点击报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

//获取routes文件内的路由，解构到router里面
const requireRoutes = require.context('./routes', true, /\.route\.js/)
const routeList = requireRoutes.keys().reduce((pre, route) => pre.concat(requireRoutes(route).default), [])


Vue.use(Router);
const router = new Router({
    mode: 'hash',
    routes: [{
            path: "/",
            name: "home",
            component: () =>
                import ('../pages/Home.vue')
        },
        ...routeList,
        {
            path: "/nopermission",
            name: "nopermission",
            component: () =>
                import ('../pages/NoPermission.vue')
        },
        
        {
            path: "/test",
            name: "test",
            component: () =>
                import ('../pages/test.vue')
        },
        {
            path: "/login",
            name: "login",
            component: () =>
                import ('../pages/Login.vue')
        },
        {
            path: "*",
            name: "404",
            component: () =>
                import ('../pages/404.vue')
        },
    ]
})


router.beforeEach(async(to, from, next) => {
    let target = null
    // let getFlag = sessionStorage.getItem('flag')
    let getFlag = sessionStorage.getItem('flag')
    // let hasRoute = false
    // const { routes } = router.options
    // routes.map( item => {
    //     if( to.name == item.name ){
    //         hasRoute = true
    //     }
    // })
    // if( !hasRoute ){
    //     next({name:'404'})
    // }
    if (getFlag == 'isLogin') {
    // if (store.state.isLogin) {
        store.state.isLogin = true
        try {
            //可以拿到具体显示数组
            // await store.dispatch("getPowerList")
            //只能拿到用户信息vip
            await store.dispatch("getUserVipGrade")
            const { permissions } = to.meta
            target = permissions && !hasPermission(permissions) && { name: "nopermission" };
        } catch {
            console.log("Error:Can't get user permission !")
            target = !canSeePage.includes(to.name) && { name: "home" };
        }
    } else {
        // console.log(Vue.$message)
        // this.$message('请先登录')
        console.log(222222)
        target = !canSeePage.includes(to.name) && { name: "login" };
    }
    target ? next(target) : next();
})
router.afterEach(() => {
    window.scroll(0, 0)
})

export default router;
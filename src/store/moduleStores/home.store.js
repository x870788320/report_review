import { userInfo, userLogout } from '@/config/interface'
import { localset, localget, localremove } from '@/config/utils/storage'

export default {
    name:'home',
    namespaced: true,//使用命名空间，这样只在局部使用

    state: {
        userInfo:null,
        featureData:[
            {
                id:1,
                title:'报 告 审 核',
                route:'addreport'
            },
            {
                id:2,
                title:'报 告 中 心',
                route:'correct'
            }
        ]
    },

    mutations: {
        getUserInfo(state, userInfo){
            state.userInfo = userInfo
        }
    },
    actions: {
        async getUserInfo({ commit }){
            const userinfo = await userInfo()
            console.log(userinfo)
            if(userinfo.username){
                commit('getUserInfo',userinfo)
                localset('userinfo', userinfo)
            }
        },
        async logoutUser({state}){
            const userinfo = await userLogout()
            state.userInfo = null
            localremove('userinfo')
            console.log(userinfo)
            console.log(state.userInfo)
            console.log(localget('userinfo'))
        },

    },

    getters: {
        UserInfo: state => state.userInfo || localget('userinfo')
        // UserInfo: state => state.userInfo? { ...state.userInfo} : localget('userinfo')? {...localget('userinfo')}: null
        // UserInfo: state => {
        //     console.log(state.userInfo)
        //     console.log(localget('userinfo'))
        //     let re = state.userInfo? { ...state.userInfo} : {...localget('userinfo')}
        //     return state.userInfo || localget('userinfo')
        // }
    }

}
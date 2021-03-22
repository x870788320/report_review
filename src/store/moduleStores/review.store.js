import { userInfo, userLogout, analyzeword } from '@/config/interface'
import { localset, localget, localremove } from '@/config/utils/storage'

export default {
    name:'review',
    namespaced: true,//使用命名空间，这样只在局部使用
    state: {
        stepsActive:null,
        hasReviewed:false,
        fromHome:false,
        fileSize:1000000,
        parsingStatus: false
    },

    mutations: {
        changeStepsActive(state, val){
            console.log(val)
            state.stepsActive = val
            localset('stepsActive', val)
            console.log(localget('stepsActive'))
        },
        changeHasReviewed(state, val){
            console.log(val)
            state.hasReviewed = val
            localset('hasReviewed', val)
            console.log(state.hasReviewed)
            console.log(localget('hasReviewed'))
        },
        changeFileSize(state, val){
            console.log(val)
            state.fileSize = val
        },
        changeParsingStatus(state, val){
            console.log(val)
            state.parsingStatus = val
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
        
        async changeParsingStatus({ commit }, id){
            
            let { message } = await analyzeword(id)

            commit('changeParsingStatus',message == '成功')
        }


    },

    getters: {
        StepsActive: state =>  state.stepsActive || localget('stepsActive'),
        // HasReviewed: state =>  state.hasReviewed || localget('hasReviewed')
        HasReviewed: state =>  {
            console.log(1111111111111)
            console.log(state.hasReviewed)
            console.log(localget('hasReviewed'))
            return state.hasReviewed || localget('hasReviewed')
        }
        
        // UserInfo: state => state.userInfo? { ...state.userInfo} : localget('userinfo')? {...localget('userinfo')}: null
        // UserInfo: state => {
        //     console.log(state.userInfo)
        //     console.log(localget('userinfo'))
        //     let re = state.userInfo? { ...state.userInfo} : {...localget('userinfo')}
        //     return state.userInfo || localget('userinfo')
        // }
    }

}
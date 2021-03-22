import Vue from "vue"
import Vuex from 'vuex'
import { getTest1 } from "@/config/interface"
import {  userLogin, getCSRFToken } from '@/config/interface'
console.log(getCSRFToken)
console.log(userLogin)

Vue.use(Vuex)

//获取modules
const requireStores = require.context('./moduleStores', true, /\.store\.js/);
const modules = requireStores.keys().reduce((pre, store) => {
    const { name, ...rest } = requireStores(store).default;
    pre[name] = rest;
    return pre;
},{})

export default new Vuex.Store({
    state: {
        CSRFToken:'',
        csrftokenCookie:'',
        userVipGrade:"",
        displayKeys: [],
        isLogin: false,
        rejectTest: false
    },
    mutations: {
        changeIsLogin(state, isLogin){
            state.isLogin = isLogin
            console.log(isLogin)
        },
        updateDisplayKeys(state, payload) {
            state.displayKeys = payload
        },
        updateUserVipGrade(state, payload) {
            state.userVipGrade = payload
        },
        setCSRFToken(state, payload){
            state.CSRFToken = payload
        },
        setCsrftokenCookie(state, payload){
            state.csrftokenCookie = payload
        }
    },
    actions: {
        //登录
        async userLogin( {commit}, payload){
            console.log(payload)
            console.log(commit)
            // console.log(correctChangealll)
            // return 
            try{
                let userLoginState = await userLogin(payload)
                console.log(userLoginState)
                // if( userLoginState.status == 200 ){
                if( userLoginState.message == 'ok' ){
                    sessionStorage.setItem("flag", 'isLogin')
                    commit('changeIsLogin', true)
                }
                return userLoginState
            } catch ( err ){
                console.log(err)
                return err
            }
        },
        async getPowerList({ state, commit }) {
            if (state.displayKeys.length) return;

            //模拟异步拿到数据
            const list = await new Promise((resolve, reject) =>
                setTimeout(() => {
                    //这个判断是为了做异常测试
                    if (state.rejectTest) {
                        reject();
                    }
                    resolve([1, 2, 3, 4, 5])
                }, 10))

            commit("updateDisplayKeys", list)
        },
        async getUserVipGrade({ state, commit }) {
            if (state.userVipGrade) return;
            //模拟异步拿到数据
            const userVipGrade = await new Promise((resolve, reject) =>
                setTimeout(() => {
                    //这个判断是为了做异常测试
                    if (state.rejectTest) {
                        reject();
                    }
                    //模拟用户为vip3
                    resolve("v1")
                }, 10))
            commit("updateUserVipGrade", userVipGrade)
        },
        getTest({ state, commit }, userInfo){
            console.log(state)
            const { username, password } = userInfo
            return new Promise( (resolve, reject) => {
                // const tes = await getTest1({ accountName: username.trim(), accountPwd: password })
                getTest1({ accountName: username.trim(), accountPwd: password })
                .then(response => {
                    const { data } = response.data
                    // console.log('dd', data)
                    commit('SET_TOKEN', data.token)
                    commit('SET_ID', data.account.accountId)
                    // setToken(data.token)
                    // setAid(data.account.accountId)
                    resolve({roles:"TEST"})
                }).catch(error => {
                    reject(error)
                })
            })
        }
        //const { roles } = await store.dispatch('user/getTest')
    },
    getters: {
        isLogin: state => state.isLogin,
    },
    modules
})
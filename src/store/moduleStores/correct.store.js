import { correcList, correctShowmarks, correctLawpastpoint, correctMarkcontentst, correctDetail, correctChangealll, correctDelete } from '@/config/interface'
import { localset, localget } from '@/config/utils/storage'

export default {
    name:'correct',
    namespaced: true,//使用命名空间，这样只在局部使用
    state: {
        correctList:[],
        CurrentReport: null,//保存点击的报告信息
        currentPage:1, //列表当前页
        collapsePage:1,//详情1，原文/修改2
        correctInfo: null,  //详情页数据
        correctDataArr:[],
        lawModifyList:[],   //修改的列表
        Markcontentst:null, //原文的内容
        IdentOldText:null,
        backroutes: 0,
        detailTitle:{
            'name':'法规名称',
            'csres_num':'法规编号',
            'csres_date':'实施时间',
            'csres_department':'颁布部门',
            'csres_state':'废止状态'
        },
    },

    mutations: {
        getCottectList( state, list ){
            const { data, page_num } = list
            state.correctList = data
            state.currentPage = page_num
            console.log(data)
        },
        //处理关于当前报告的接口数据
        getCorrectDetail( state, payload ){
            const mark_company_list = {name:'公司实体', data:JSON.parse(payload.mark_company_list)}
            const mark_address_list = {name:'地点实体', data:JSON.parse(payload.mark_address_list)}
            const diff_provience_list = {name:'可疑城市', data:JSON.parse(payload.diff_provience_list)}
            const law_stop_list = {name:'法规过期', data:JSON.parse(payload.law_stop_list)}
            const law_run_list = {name:'法规编号错误', data:JSON.parse(payload.law_run_list)}
            const law_reminder_list = {name:'法规名称错误', data:JSON.parse(payload.law_reminder_list)}

            //法律
            const lawData = [ law_stop_list, law_run_list, law_reminder_list ]
            //实体 顺序不能放错
            const entityData = [  mark_address_list, mark_company_list, diff_provience_list ]
            //其它
            const otherInfoData = Object.entries(JSON.parse(payload.other_info)).reduce((pre, [key, val]) => {
                let obj = {}
                obj.name = key
                obj.data = val
                pre = [ ...pre, obj]
                return pre
            }, [])
            state.correctDataArr = [lawData, entityData, otherInfoData]
            state.correctInfo = { ...payload, law_stop_list, mark_address_list, law_run_list, mark_company_list, law_reminder_list, diff_provience_list}
        },
        getMarkcontentst( state, payload ){
            console.log(payload)
            state.Markcontentst= payload
        },
        saveCurrentReport(state, payload ){
            console.log(payload)
            state.CurrentReport = {...payload} 
            localset('currentReport', payload)
        },
        openModifyPage(state ){
            state.collapsePage = 3
        },
        saveIdentOldText(state, payload ){
            console.log(payload)
            state.collapsePage = 1
            state.IdentOldText = {...payload}
        },
        //获取点击的法规或实体下的某个项，在不同项下不同显示
        changeDetailTitle(state, payload ){
            let lawInfoObj = {'name':'法规名称','csres_num':'法规编号','csres_state':'废止状态'}
            let lawNumberErr = {'csres_num': '正确编号','name':'法规名称','csres_state':'错误原因'}
            let lawNameErr = {'name':'正确名称','csres_num':'法规编号','csres_state':'错误原因'}
            payload == 1? Object.assign(state.detailTitle, lawNumberErr):
                payload == 2? Object.assign(state.detailTitle, lawNameErr):
                Object.assign(state.detailTitle, lawInfoObj)

            console.log('detailTitle: ',state.detailTitle)
        },
        setLawModifyList(state, payload ){
            state.lawModifyList = [...state.lawModifyList, payload ] 
            console.log(state.lawModifyList)
        },
        deLawModifyItem(state, index ){
            // state.lawModifyList = [...state.lawModifyList, payload ] 
            console.log(index)
            state.lawModifyList.splice(index, 1)
        },
        clearModifyList(state){
            // state.lawModifyList = [...state.lawModifyList, payload ] 
            state.lawModifyList=[]
        },
        changeBackroutes(state, payload){
            if(payload){
                state.backroutes = 0
            }
            state.backroutes--;
            console.log(state.backroutes)
        }
    },
    actions:{
        /**
         * 
         *async function func() {
            try {
            const response = await getDataAsyncFromSomeApi()
            return response
            } catch (error) {
            return error
            }
            }
         */
        //获取报告列表
        async getCottectList({ commit }){
            // const list = await correcList()
            // commit('getCottectList',list)
            try {
                const list = await correcList()
                commit('getCottectList',list)
                return list
            } catch (error) {
                return error
            }
        },
        //报告查看详情
        async getCorrectDetail({ commit }, data){
            const { id, clickStatus } = data
            //先得到报告的状态，是否已经法律解析，是否已经实体解析
            //这里可以优化一下，correctDetail接口查看是否
            let payload = await correctDetail(id)
            console.log(payload)
            const { analyze_com_status, analyze_law_status } = payload

            if( analyze_law_status == 'false' ){
                console.log('法律解析')
                // const result = await correctLawpastpoint(id)
                try {
                    await correctLawpastpoint(id)
                }
                catch(err) {
                    console.log(err)
                    return true
                }
                payload = await correctDetail(id)
            }
            if( clickStatus == 'city' && analyze_com_status == 'false' ){
                try {
                    console.log(await correctShowmarks(id))
                }
                catch(err) {
                    console.log(err)
                    return true
                }
                // await correctShowmarks(id)
                payload = await correctDetail(id)
                console.log('实体解析')
            }
            if(clickStatus == 'all'){
                await correctLawpastpoint(id)
                await correctShowmarks(id)
                console.log('刷新')
            }
            console.log(232323)
            commit('getCorrectDetail',payload)
            return false
        },
        //获取法规详情
        async getMarkcontentst({ state, commit }, payload){
            const { lawInfo, ...rest } = payload
            state.collapsePage = 2
            const contentst = await correctMarkcontentst(rest)
            commit('getMarkcontentst',{ contentst, lawInfo })
        },
        //保存更改
        async submitModifyList( vuex, payload){
            console.log(payload)
            // console.log(correctChangealll)
            return await correctChangealll(payload)
        },
        async reportDelete( {dispatch}, id){
            console.log(id)
            // console.log(correctChangealll)
            // const aa = await correctDelete(id)
            // console.log(aa)
            // dispatch('getCottectList')
            try {
                const data = await correctDelete(id)
                // (data.code == 0) && dispatch('getCottectList')
                if( data.code == 0 ){
                    dispatch('getCottectList')
                }
                return data
            } catch (error) {
                return error
            }
        },
    },

    getters: {
        CurrentReport: state => state.CurrentReport || localget('currentReport')
    }

}
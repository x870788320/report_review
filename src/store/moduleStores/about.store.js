export default {
    name:'about',
    namespaced: true,//使用命名空间，这样只在局部使用

    state: {
        aboutData:[
            // {
            //     id:1,
            //     title:'首页',
            //     route:'home',
            //     icon:'el-icon-house'
            // },
            {
                id:1,
                title:'基本信息',
                route:'person',
                icon:'el-icon-user'
            },
            {
                id:2,
                title:'更改密码',
                route:'modifyPassword',
                icon:'el-icon-lock'
            }
        ]
    },

    mutations: {

    },

    getters: {

    }

}
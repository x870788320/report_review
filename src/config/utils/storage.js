// import { toRawType } from './index'
// const toRawType = require

// console.log(toRawType({a:1}))

export const localset = (key, val) => {
    // localData('clean', key);
    // let isObj = typeof obj == 'object'
    // let newval = isObj? JSON.stringify(val): val;
    // let newkey = isObj? `${key}_obj`: `${key}_str`;
    // localStorage.setItem(newkey, newval);
    localremove(key)
    localStorage.setItem(key, JSON.stringify(val))
    return true;
}

export const localget = key => JSON.parse(localStorage.getItem(key))
// {

    // if (localStorage.getItem(name + '_obj')) {
    //     return JSON.parse(localStorage.getItem(name + '_obj'));
    // } else if (localStorage.getItem(name + '_str')) {
    //     return localStorage.getItem(name + '_str');
    // } else {
    //     return null
    // }
//     JSON.parse(localStorage.getItem(key))
// }

export const localremove = key => localStorage.removeItem(key);



// export const local = function(role) {
//     try {
//         //如果new了，true,
//         return this instanceof vGradeInfo ? new this[role](): new vGradeInfo(role);
//     } catch {
//         //抛出错误
//         // throw new Error('参数错误, 可选参数:"v1","v2","v3","v4","v5"'); 

//         console.log('参数错误, 可选参数:"v1","v2","v3","v4","v5", 默认: "v1"')
//         return this instanceof vGradeInfo ? new this["v1"](): new vGradeInfo("v1"); 
//     }
// }

// vGradeInfo.prototype = {
//     v1: function(){
//         this.name = "VIP1",
//         this.viewPage = [1,2,3,4,5]
//     },
//     v2:function(){
//         this.name = "VIP2",
//         this.viewPage = [1,2,3,4,5,6,7]
//     },
//     v3:function(){
//         this.name = "VIP3",
//         this.viewPage = [1,2,3,4,5,6,7,8]
//     },
//     v4:function(){
//         this.name = "VIP4",
//         this.viewPage = [1,2,3,4,5,6,7,8,9]
//     },
//     v5:function(){
//         this.name = "VIP5",
//         this.viewPage = [1,2,3,4,5,6,7,8,9,10]
//     }
// }


// import constants from "@/config/utils/constants"
// const {ACTION_GO_LOGIN} = constants



//首字母大写
export const firstCharUpper = str => str.charAt(0).toUpperCase() + str.slice(1); 


//判断数据类型
const _toString = Object.prototype.toString;
export const toRawType = value => _toString.call(value).slice(8, -1)

//日期时间
const formatNum = n => n.toString()[1] ? n : '0' + n
export const formatDate = (date, type = 'YYYY-MM-DD HH:MM:SS') => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  console.log(type)
  return [year, month, day].map(formatNum).join('-') + ' ' + [hour, minute, second].map(formatNum).join(':')
}

//获取设备屏幕的实际宽度

export const deviceW = window.document.body.clientWidth



//节流防抖，一个是在滚完之后触发，一个是滚动时每隔一定时间触发
export const Throttle = (method, context) => {
	clearTimeout(method.tid);
	method.tid = setTimeout( () => {
        method.call(context)
    }, 100)
}

/**
 * Mounted(){
	This.$refs[‘aa’].onscroll = function () {
	That.throttle(() => {               //具体延迟的fun
		That.showScroll = this.scrollTop
    }, this)   }    }

 */


//事件订阅，可以在js里面调用vue mothods,需要在desdroyed 里面去掉监听
export const ObserverEvent = (function() {
    let clientList = {}
    const listen = function (key, fn) {
        clientList[key] = clientList[key] || []
        clientList[key] = [...clientList[key], fn]
    };
    const trigger = function(key, ...rest) {
        let fns = clientList[key]
        if (!fns || fns.length == 0) return ;
        fns.map(fn => fn.apply(this, rest))
    };

    // const trigger = function() {
    //     let key = Array.prototype.shift.call(arguments)
    //     let fns = clientList[key]
    //     if (!fns || fns.length == 0) return ;
    //     fns.map(fn => fn.apply(this, arguments))
    // };
    const remove = function (key, fn) {
        let fns = clientList[key]
        if (!fns ) return;
        !fn && ( fns.length = 0 );
        fns.map((item, index) => (item == fn) && fns.splice(index, 1))
    }
    return {
        listen, trigger, remove
    }
})() 

//解析url中的参数
export const param2Obj = url => {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
    )
  }

//根据cookie的key获取value
  export const getCookie = cookiename =>{
    let target, name = `${cookiename}=`;
    let cs = document.cookie.split(';');
    cs.map(item => item.trim().indexOf(name) == 0 && (target = item.substring(name.length,item.length)));
    return target;
  }

  //获取范围内随机数
  const randomNum = (start, end) => parseInt(Math.random() * (end - start + 1) + start);
  //生成数字字母随机
  export const getRandomNumCode =  (length = 6) => {
    let code = "";
    while(length--){
      let num = randomNum(1,3)
      code += num == 1 ? String.fromCodePoint(randomNum(48,57)): //数字
              num == 2 ? String.fromCodePoint(randomNum(65,90)): //大写字母
              String.fromCodePoint(randomNum(97,122));  //小写字母
    }
    return code;
  }

// 获取cookie
export function getCookie1(name) {
  let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
  return r ? r[1] : undefined;
}

// // 提取地址栏中的查询字符串
// function get_query_string(name) {
//   let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   let r = window.location.search.substr(1).match(reg);
//   if (r != null) {
//       return decodeURI(r[2]);
//   }
//   return null;
// }

// // 生成uuid
// function generateUUID() {
//   let d = new Date().getTime();
//   if(window.performance && typeof window.performance.now === "function"){
//       d += performance.now(); //use high-precision timer if available
//   }
//   let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//       let r = (d + Math.random()*16)%16 | 0;
//       d = Math.floor(d/16);
//       return (c=='x' ? r : (r&0x3|0x8)).toString(16);
//   });
//   return uuid;
// }

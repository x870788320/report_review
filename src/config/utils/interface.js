import { get, post } from "../plugin/globalMethod/http"
// import axios from '../plugin/globalMethod/http'

export function getCookie1(name) {
    let r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
  }

  //token
  export const getCSRFToken = params => get("/api/gettoken/", params)
//用户
//用户注册
export const userRegister = params => post("/api/user/register/", params)
//用户登录
// export const userLogin = params => post("/api/user/login/", params)
// export const userLogin = params => post("/api/login/", params)
// export const userLogin = parmas => { return post(`/api/user/login/`, parmas,{headers:{'X-CSRFToken': getCookie1("csrftoken")}}) }
export const userLogin = params => { 
    console.log(params)
    const formData = new FormData()
    formData.append("username", params.username)
    formData.append("password", params.password)
    return post("/api/login/",formData)
}
// export const userLogin = params => { 
//     // console.log(params)
//     // const formData = new FormData()
//     // formData.append("username", params.username)
//     // formData.append("password", params.password)
//     // return post1("/api/user/login/",formData)
//     console.log(axios.post)
//     // return axios.post({
//     //     url:/api/user/login/,
//     //     data:params,
//     //     success:function(res){
//     //         console.log(res)
//     //     }
//     // })
//     return axios.post("/api/login/", params,{})
// }


//用户退出
export const userLogout = params => get("/api/user/logout/", params)
//用户详情
// export const userInfo = params => get("/api/user/info/", params)
export const userInfo = params => get("/api/info/", params)

//纠错
//文档上传
export const correctUploadreport = params => post("/api/mistake/uploadreport/", params)
//材料上传
export const correctUploadMaterial = params => post("/api/analyzepictures/", params)
//报告列表
export const correcList = params => get("/api/mistake/mistakelist/", params)
//实体解析
export const correctShowmarks = params => get("/api/mistake/showmarks/", params)
//法律法规解析
export const correctLawpastpoint = params => get("/api/mistake/getlawpastpoint/", params)
//获取报告原文
export const correctMarkcontentst = params => post("/api/mistake/getmarkcontents/", params)
//报告查看详情
export const correctDetail = params => get("/api/mistake/show/", params)
//报告保存更改
export const correctChangealll = params => post("/api/mistake/changeall/", params)



//test
export const getTest1 = params => get("/api/user/info/", params)
export const getTest2 = params => get("", params)
export const getTest3 = params => {
    const formData = new FormData()
    formData.append("userName", params.userName)
    formData.append("passWord", params.passWord)
    return post("", formData)
}

export const post2 = (CSRFToken)=> {
    // this.dialog_operate = false;
    // console.log(this.data)
    return post("/api/login",
    {
            username:'xuejipppp',
            password:'12345678',
            remembered: 'on'
        },
          {
            headers: {'X-CSRFToken': CSRFToken,'Content-Type':'application/json'}
          }
  
      )
        }
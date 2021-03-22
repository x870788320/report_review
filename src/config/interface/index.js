import { get, post } from "../plugin/globalMethod/http"


export const getCSRFToken = params => get("/gettoken/", params)



//用户
//用户注册
export const userRegister = params => post("/api/user/register/", params)
//用户登录
export const userLogin = params => post("/login/", params)
//用户退出
export const userLogout = params => get("/user/logout/", params)
//用户详情
export const userInfo = params => get("/user/info/", params)



//纠错
//选择省市
export const getProvinces = params => get("/address/provinces/", params)
export const getCitys = params => get(`/address/citys/${params}`, params)
export const analyzeword = params => get(`/analyzeword/${params}`, params)

//文档上传
export const correctUploadreport = params => post("/mistake/uploadreport/", params)
//报告列表
export const correcList = params => get("/mistake/mistakelist/?format=json", params)
//判断是否可以下载
export const isCanUpload = params => get(`/reportexist/${params}`, params)
//实体解析
export const correctShowmarks = params => get(`/mistake/showmarks/${params}`, params)
//法律法规解析
export const correctLawpastpoint = params => get(`/mistake/getlawpastpoint/${params}`, params)
//获取法规详情
export const correctMarkcontentst = params => post("/mistake/getmarkcontents/", params)
//报告查看详情
export const correctDetail = params => get(`/mistake/show/${params}`, params)
//报告保存更改
export const correctChangealll = params => post("/mistake/changeall/", params)
//报告删除
export const correctDelete = params => get(`/delreport/${params}`)



//test
export const getTest1 = params => get("/api/user/info/", params)
export const getTest2 = params => get("", params)
export const getTest3 = params => {
    const formData = new FormData()
    formData.append("userName", params.userName)
    formData.append("passWord", params.passWord)
    return post("", formData)
}


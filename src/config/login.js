import {request} from './require';

export function getloginvalidate(username,password) {
    let params = new URLSearchParams();
    params.append('username',username);
    params.append('password',password);
    return request({
        url: '/getloginvalidate/',
        method:'POST',
        data:params,
    })
}


export function getCSRFtoken() {
    console.log(11)
    // return request({
    //     url: '/api/user/login/',
    //     method: 'post'
    // })
}
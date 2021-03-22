import axios from 'axios'
import store from '@/store';
axios.defaults.withCredentials = true; //跨域访问需要发送cookie时一定要加


export function request(config) {
    const instance = axios.create({
        // baseURL: 'http://39.98.136.48:6006/mock/11',
        // baseURL: 'http://10.40.4.8:8000',
        timeout: 5000
    });

    instance.interceptors.request.use(config => {
        if (config.method === 'post'){
            config.headers['X-CSRFToken'] = store.state.CSRFToken;
        }
        return config
    }, err => {
        return err
    });

    instance.interceptors.response.use(res => {
        return res
    }, err => {
        return err
    });

    return instance(config)
}
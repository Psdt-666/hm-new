import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
})

axios.interceptors.response.use((res) => {
    const { statusCode, message } = res.data
    statusCode == 401 && message == '用户信息验证失败' &&
        Toast('token已经失效请重新登录') && router.push({
            name: 'login',
            params: {
                back: true
            }
        })
    return res
})

export default axios

module.exports = {
    publicPath:process.env.NODE_ENV === 'production'?'./':'/',
    devServer: {
        proxy: {
            '/api':{
                // target: 'http://192.168.1.49:8003',
                // target: 'http://192.168.0.49:8003',
                // target: 'http://39.98.136.48:8002',
                // target: 'http://39.98.136.48:8003',
                // target: 'http://192.168.1.49:8051',
                // target: 'http://192.168.1.49:8052',
                target:'http://192.168.0.3:8002',
                changeOrigin: true,
                ws:true,                        //websocket
                // logLevel:'debug',                  
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
    
}
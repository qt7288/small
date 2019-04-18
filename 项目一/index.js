const express=require('express');
const bodyParser=require('body-parser');
const userRouter=require('./routes/long_user.js');
//const productRouter=require('./routes/product.js');
const demo=require('./routes/demo.js');
const myPro=require('./routes/myPro.js');
const rootR=require('./routes/rootR.js');
//1.1 引入模块 cors
const cors = require("cors");
//创建web该服务器，挂载监听端口
var server=express();
server.use(cors({
	// origin:[
	// ],
	credentials:true
  }));
server.listen(5050);
server.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
    },
}));
//托管静态文件
server.use(express.static('./myPro'));
server.use(express.static('./rootR'));

server.use(bodyParser.urlencoded({
	extended:false
}));
//use路由器管理路由
//把用户路由器挂载到/user下，访问形式/user/detail
server.use('/long_user',userRouter);
//server.use('/product',productRouter);
server.use('/demo',demo);
server.use('/myPro',myPro);
server.use('/rootR',rootR);
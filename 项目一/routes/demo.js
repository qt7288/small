const express=require('express');
//+链接池模块
const pool=require('../pool.js');
//const bodayParser=require('body-parser');
//创建空的；路由器对象
var router=express.Router();
//1.ajax-demo
/*router.get('/ajaxDemo',(req,res)=>{
	res.send("这是我的第一个ajax程序");
	
});
router.get('/ajaxHappy',(req,res)=>{
	res.send("报错了开始");
	
});*/
router.get('/getlogin',(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	if(!$uname){
		res.send("cc");
		return;
	}	
	if(!$upwd){
		res.send("密码错误");
		return;
	}
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("over");
		}else{
		res.send("用户名错误");
		}
		
	});
	//res.send($uname+"___"+$upwd);
});
//4.postlogin带参数，/demo/postlogin
router.post('/postlogin',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	
	if(!$uname){
		res.send("用户名不存在");
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//查询结果
	
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		//res.send("21");
		if(result.length>0){
			res.send("登录成功");	
		}else{
			res.send("用户名密码错误");
		}
	});
});
//查询
router.get('/postuser',(req,res)=>{
	/*var $uname=req.body.uname;
	console.log($uname);
	if(!$uname){
		res.send("用户名不存在");
		return;
	}*/
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
		/*if(result.length>0){
			res.send("666");
		}else{
			res.send("用户不存在");
		}*/
	});
});

	module.exports=router;
const express=require('express');
//+链接池模块
const pool=require('../pool.js');
const bodyParser=require('body-parser');
const url=require('url');
const mysql=require('mysql');
var router=express.Router();
//检索用户1
/*router.get('/detail',(req,res)=>{
	var obj=req.query;
	//console.log(obj);
	var $uid=obj.uid;
		//验证是否为空
		if($uid==''){
		res.send({code:401,msg:'uid required'});
	//如果验证失败，阻止继续往后执行
		return;
	}
	//验证的通过执行sql语句,查询对应的数据
	pool.query('select * from xz_user where uid=?',[$uid],(err,result)=>{
		if(err) throw err;
		//查询结果发送到浏览器
		res.send(result);
	});});*/
//注册用户2
router.post('/register',(req,res)=>{
		var obj=req.body;
		
		if(!obj.uname){
			res.send({code:401,msg:'uname required'});
			return;
		}
			if(!obj.upwd){
			res.send({code:402,msg:'upwd required'});
			return;
		}
			if(!obj.email){
			res.send({code:403,msg:'email required'});
			return;
		}
			if(!obj.phone){
			res.send({code:404,msg:'phone required'});
			return;
		}
			if(!obj.avatar){
			res.send({code:405,msg:'avatar required'});
			return;
		}
			if(!obj.gender){
			res.send({code:406,msg:'gender required'});
			return;
		}
		//执行语句吧数据obj插入数据库中
		pool.query('insert into xz_user set ?',[obj],(err,result)=>{
		if(err) throw err;
		//查询结果发送到浏览器
		if(result.affectedRows>0){
			res.send({code:200,msg:'reg suc'});
			}	
		});
	});
//登陆用户3
/*router.post('/login',(req,res)=>{
		var obj=req.body;
		console.log(obj);
		var $uname=obj.uname;
		var $upwd=obj.upwd;
	//验证数据是否为空
		if(!$uname){
			res.send({code:401,msg:'uname required'});
			return;
		}
		if(!$upwd){
			res.send({code:406,msg:'upwd required'});
			return;
		}

		//执行语句，以用户名和密码条件查询数据
		
	pool.query('select * from qr_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		//console.log(result);
	//判断是否登陆成功，根据数组长度
			if(result.length>0){
				res.send({code:200,msg:'login suc'});
				return;
			}else {res.send({code:301,msg:'login required'});
				}
		});
	});*/
	module.exports=router;
/*
delete from 表名 where表达式 
update 表name set 需要修改的表达式 where条件表达式
select 需查询的数据 from 表name
insert into 表name value 
*/
const express=require('express');
//+链接池模块
const bodyParser=require('body-parser');
const pool=require('../pool.js');
//创建空的；路由器对象
var router=express.Router();
/*功能*1
	:login
*/ 
router.post("/login",(req,res)=>{
	//2:获取二个参数 uname upwd
	// var qid=req.query.id;
	var u = req.body.uname;
	var p = req.body.upwd;
	//3:创建sql
	var sql = "SELECT id FROM qz_u_all";
	sql+=" WHERE uname = ? AND upwd = md5(?)";
	//4:执行sql
	pool.query(sql,[u,p],(err,result)=>{
		if(err)throw err;
		//5:获取数据库返回结果
		//6:返回客户数据
		if(result.length==0){
		  res.send({code:-1,msg:"用户名或密码有误"});
		}else{ 
		//   session存储uid对象
			
		  req.session.uid =result[0].id;
		  // res.send({code:1,msg:"登录成功",result:result[0].id});
		  res.send({code:1,msg:"登录成功",result:u});
		}
	})
  });
// 功能：用户注册
//用户get请求请求路径login
router.get("/reg",(req,res)=>{
	// 获取二个参数uname upwd
		var u=req.query.u;
		var p=req.query.p;
		var email=req.query.email;
		// var avatar=req.query.avatar;
		var gender=req.query.gender;
		var ctime=req.query.ctime;
	// 创建sql
		// var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
		var sql1="INSERT INTO qz_u_all VALUES(null,?,md5(?),?,?,now())";
	// 执行sql
  
		pool.query(sql1,[u,p,email,gender,ctime],(err,result)=>{
			if(err) throw err;
			// 判断返回客户端的数据
			// 获取数据库返回结果
			// 返回客户数据
			if(result.affectedRows>0){
				res.send({code:200,msg:"注册成功"});
			}
		})
	})  
  
  // 注释：验证用户名是否被注册
  router.get("/regU",(req,res)=>{
	  // 获取二个参数uname upwd
		  var u=req.query.uname;
	  // 创建sql
		  // var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
		  var sql1="SELECT * FROM qz_u_all WHERE uname = ?";
	  // 执行sql
	
		  pool.query(sql1,[u],(err,result)=>{
			  if(err) throw err;
			  if(result.length>0){
				  res.send({code:401,msg:"已被注册"});
				  return;
			  }else{
				res.send({code:25,msg:"可以注册"});
  
			  }
		  })
	  })  
	
  //验证邮箱是否被注册
  router.get("/regE",(req,res)=>{
		// 获取二个参数uname upwd
			var email=req.query.email;
		// 创建sql
			// var sql="INSERT INTO qz_u_all VALUES(null,u=?,p=md5(?),email=?,avatar=?,gender=?)";
			var sql1="SELECT * FROM qz_u_all WHERE email = ?";
		// 执行sql
	  
			pool.query(sql1,[email],(err,result)=>{
				if(err) throw err;
				if(result.length>0){
					res.send({code:16,msg:"已被注册"});
					return;
				}else{
				  res.send({code:25,msg:"可以注册"});
				  
				}
			})
		})  
/*功能*2
	:获取用户列表
*/ 
router.get('/list',(req,res)=>{

	var sql="select * from qz_u_all";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

/*功能*3
	：获取text文本资源
*/ 
router.get('/qz_text',(req,res)=>{
	var $pageNo=req.query.pageNo;
	var $pageSize=parseInt(req.query.pageSize);
	if(!$pageNo){$pageNo=1};
	if(!$pageSize){$pageSize=5};
	// console.log($pageNo);
	// console.log($pageSize);
	var start=($pageNo-1)*$pageSize;
	var sql="SELECT * FROM qz_text LIMIT ?,?";
	pool.query(sql,[start,$pageSize],(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})
/*功能*4
	:ROOT数据
*/ 
router.get('/qz_text_root',(req,res)=>{
	var sql="select * from qz_text order by tid desc";
	// 搜索qz_text内部所有的数据;
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
		// 输出card所有的文本数据；
	})
})
// **********************************************************************************************************删除用户表
/*功能*5
	:delete user
*/ 
router.get('/deleteUser',(req,res)=>{
	var $id=req.query.id;
	if(!$id){
		res.send("0");
		return;
	}
	var sql="delete from qz_u_all where id=?";
	pool.query(sql,[$id],(err,result)=>{
		if(err) throw err;
		if(result. affectedRows==1){res.send("1");}
		else{res.send("该编号用户不存在");}
	});
});

// **********************************************************************************************************删除文本表
/*功能*6
	:删除 文本表
*/ 
router.get('/deleteText',(req,res)=>{
	var $tid=req.query.tid;
	if(!$tid){
		res.send("0");
		return;
	}
	var sql="delete from qz_text where tid=?";
	pool.query(sql,[$tid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows==1){res.send("1");}
		else{res.send("该编号用户不存在");}
	});
});

/*功能*7
	:select 查询接口
*/ 
router.get('/query',(req,res)=>{
	var $id=req.query.id;
	if(!$id){
		res.send("0");
		return;
	}
	var sql="select * from qz_u_all where id=?";
	pool.query(sql,[$id],(err,result)=>{
		if(err) throw err;
		if(result.length>0){res.send(result);}
		else{res.send("1");}
	});
});

/*功能*8
	:update 修改接口
*/ 
router.post('/userUpdate',(req,res)=>{
	var $id=req.body.id;
	if(!$id){res.send('用户不存在');return;}
	var $uname=req.body.uname;
	if(!$uname){res.send('用户mingbu存在');return;}
	var $upwd=req.body.upwd;
	if(!$upwd){res.send('密码不存在');return;}
	var $email=req.body.email;
	if(!$email){res.send('邮箱不存在');return;}
	var $ctime=req.body.ctime;
	if(!$ctime){res.send('个性签名');return;}
	var $gender=req.body.gender;
	if(!$gender){res.send('性别不存在');return;}
	var sql="update qz_u_all set uname=?,upwd=?,email=?,ctime=?,gender=? where id=?";
	pool.query(sql,[$uname,$upwd,$email,$ctime,$gender,$id],(err,result)=>{
		if(err) throw err;
			res.send("1");
	});
});

/*功能*9
	:register 用户注册
*/ 
router.post('/register',(req,res)=>{
	var $id=req.body.id;
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $ctime=req.body.ctime;
	var $gender=req.body.gender;
	if(gender=="1" || gender=="0"){
		var sql="insert into qz_u_all values(null,?,?,?,?,?)";
		pool.query(sql,[$uname,$upwd,$email,$gender,$ctime],(err,result)=>{
			if(err) throw err;
			res.send("注册成功")
		});
	}else{
		var sql="insert into qz_u_all values(null,?,?,?,?,?)";
		pool.query(sql,[$uname,$upwd,$email,$gender,$ctime],(err,result)=>{
			$gender=="default";
			if(err) throw err;
			res.send("注册成功")
		});
	};
});

/*功能*10
	:select 主体图片 微信二维码
*/ 
router.get('/index',(req,res)=>{
	var $iid=req.query.iid;
	var sql="select mimg,wximg from qz_index where iid=?";
		pool.query(sql,[$iid],(err,result)=>{
			if(err) throw err;
			if(result.length>0){res.send(result);
			}
			else{res.send("1");}
		})
})	

/*功能*11
	:select all text card文本资源
*/ 
router.get('/qz_text',(req,res)=>{
	var sql="select * from qz_text";
		pool.query(sql,(err,result)=>{
			if(err) throw err;
			if(result.length>0){res.send(result);
			}
			else{res.send("1");}
		})
})	

/*功能*12
	:select button 标签值
*/ 
router.get('/qz_b_text',(req,res)=>{
	var sql="select * from qz_b_text";
		pool.query(sql,(err,result)=>{
			if(err) throw err;
			if(result.length>0){res.send(result);
			}
		})
})

/*功能*13！！！！！！！！！！！！
	:search select 站内查询、支持主页显示
*/ 	
router.get('/qz_texty',(req,res)=>{
	// var $tid=req.query.tid;
	var $sltext=req.query.sltext;
	// console.log($sltext);
	// console.log($sltext);
	// var sql="select * from qz_text where sltext like '%"+$sltext+"%'";
	var sql="select * from qz_text where sltext like concat('%',?,'%')";
	// "select areaname from chinastates where areaname like'%{$name}%
	// 有错误
		pool.query(sql,[$sltext],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				// console.log(result);获取到的模糊对象数据
				res.send(result);
			}else{
				res.send({code:404});
			}
		})
})

/*功能*14
	:select logo文本资源
*/ 
router.get('/qz_iht',(req,res)=>{
	var $hid=req.query.hid;
	var sql="select * from qz_iht where hid=?";
	pool.query(sql,[$hid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send(result);
		}else{
			res.send("1");
		}
	})
})
/*功能*15
	:select all nav 文本资源
*/ 
router.get('/qz_bq',(req,res)=>{
	var sql="select * from qz_bq";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
			res.send(result);
	})
})

/*功能*16
	:访问当前登录的用户
*/ 
router.get('/qz_u_all',(req,res)=>{
	var $uname=req.query.num; 
	var sql="select * from qz_u_all where uname=?";
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
// 获取当前登录用户头像
router.get('/qz_u_all_img',(req,res)=>{
	var uname=req.query.num; 
	if(uname=="Smith" || uname=="undefined" || uname==""){
		id=1;
		var sql="select timg from qz_u_all_img where id=?";
		pool.query(sql,[id],(err,result)=>{
			if(err) throw err;
			res.send(result);
		});
		return;
	}else{
			var sql1="select id from qz_u_all where uname=?";
			pool.query(sql1,[uname],(err,result1)=>{
				if(err) throw err;
				var id=result1[0].id;
				console.log(id);
				// 拿到用户id
				var sql="select timg from qz_u_all_img where id=?";
				pool.query(sql,[id],(err,result)=>{
					if(err) throw err;
					res.send(result);
				});
			})
	}


});

/*功能*17
	:链接跳转详情内容 *获取分页内容的全部数据操作
*/ 
router.get('/qz_text_fpage',(req,res)=>{
	var a=req.query.fum;
	var $tid=a;
	// console.log($tid);
	var sql="SELECT * FROM qz_text_fpage WHERE tid=?";
	pool.query(sql,[$tid],(err,result)=>{
		if(err) throw err;
		else{
			res.send(result);
		}
	})
})

/*功能*18
	:留言
*/ 
// 数据库添加数据：留言ban
router.get('/qz_lyan',(req,res)=>{
	var $txta=req.query.txta;
	var $lyname=req.query.num;
	var $now=req.query.now;
	// console.log(id+"1111")
	// 当地址后缀不发生变化则默认匿名发言
	// 获取发言用户的名称
	// var sql1="select uname from qz_u_all where id=?";
	// pool.query(sql1,[id],(err,result1)=>{
		// if(err) throw err;
		// else{
			// console.log(result1);
			// console.log(result1[0].uname);
			// var lyname=result1[0].uname;
			if($lyname=="Smith" || $lyname=="undefined"){
				$lyname="匿名"
			}
		// console.log($txta);
		// 获取传输过来的数据
		var sql="insert into qz_lyan values(null,?,?,now())";
		pool.query(sql,[$lyname,$txta],(err,result)=>{
			if(err) throw err;
			else{
			res.send({code:1,result:result});
		}
	// })
		// }

	})
})
/*功能*18 功能衔接 支持调用已存储数据
	:select 显示 
*/ 
// 数据库查留言板信息
router.get('/qz_lyans',(req,res)=>{
	var $pageSize=parseInt(req.query.pageSize);
	var sql="select * from qz_lyan limit 0,?";
	pool.query(sql,[$pageSize],(err,result)=>{
		if(err) throw err;
			res.send(result);
	})
})

/*功能*19
	:页脚内容
*/ 
router.get('/qz_foot',(req,res)=>{
	var sql="select * from qz_foot";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		else{
			res.send(result);
		}
})
})

/*功能*20
	:音乐接口
*/ 
router.get('/qz_sr',(req,res)=>{
	var sql="select loginU,regU,music from qz_sr";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		else{
			// console.log(result);
			res.send(result);
		}
})
})

/*功能*21
	:简介数据
*/ 
router.get('/qz_mine',(req,res)=>{
	var $minid=req.query.minid;
	var sql="select * from qz_mine where minid=?";
	pool.query(sql,[$minid],(err,result)=>{
		if(err) throw err;
		else{
			// console.log(result);
			res.send(result);
		}
	})
})

/*功能*22
	:链接分享
*/ 
/*
	注释：分享链接share
*/ 
router.get('/qz_Fchain',(req,res)=>{
	var sql="SELECT * FROM qz_Fchain";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		else{
			// console.log(result);
			res.send(result);
			// 然后取值没错返还数值给客户端
		}
	})
})

// 接收数据库返回数据
//导出路由
//获取数据库数据
router.get('/cc',(req,res)=>{
	var sql="select * from qz_u_all";
	pool.query(sql,(err,result)=>{
	if(err) throw err;
		res.send(result);
	});
});

// fpage_say
// 用户发言建议
router.post("/fpage_say",(req,res)=>{
	var fpageId = req.body.fum;
	var uname = req.body.num;
	var fpageSay = req.body.text;
	// var sql1 = "SELECT uname FROM qz_u_all WHERE id=?";
	// pool.query(sql1,[id],(err,result1)=>{
		// if(err) throw err;
		// else{
				// console.log(result1);
				// var uname=result1[0].uname;
				// console.log(uname);
				var sql2 = "INSERT INTO qz_fpage_say VALUES(null,?,?,?)";
				pool.query(sql2,[fpageId,uname,fpageSay],(err,result)=>{
					if(err) throw err;
					res.send({code:1,msg:"提交成功"});
					// console.log(result);
				// })
		// }
	})
})

	module.exports=router;

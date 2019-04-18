//引入两个模块 mysql express
const express=require('express');
const mysql=require('mysql');
////引入模块
//const cors=require('cors');
//创建连接池
var pool=mysql.createPool({
 host:'127.0.0.1',
 port:'3306',
 user:'root',
 password:'',
 database:'shop',
 connectionLimit:20
})
//3.创建express对象
 var server=express();
 //加载session 模块
const session=require('express-session');
//3.2配置静态目录
server.use(express.static('public'))
//3.3:配置第三方中间件
const bodyParser=require('body-parser');
//3.4:配置json是否自动转换
server.use(bodyParser.urlencoded({
    extended:false
}))
//配置模块信息
server.use(session({
    secret:'128位随机字符串',  //安全字符串
    resave:false,        //每次请求更新session值
    saveUninitialized:true,  //初始化保存数据
    cookie:{//cookie辅助session工作，保存时间
        maxAge:1000*60*60  
    }
}))
//4.为express对象绑定监听端口 
server.listen(3000);

//用户注册
server.post('/reg',(req,res)=>{
	var name=req.body.name;
	var avatar=req.body.avatar;
	//console.log(name)
	//console.log(avatar)
	var sql='select uid from user where uname=? and avatar=? ';
	pool.query(sql,[name,avatar],(err,result)=>{
		if(err) throw err;
		//console.log(result.length)
		if(result.length>0){
			 res.send({code:-1,msg:'用户名已存在'})
		}else{
	var sql='insert into user values(null,?,?)';
	pool.query(sql,[name,avatar],(err,result)=>{
		if(err) throw err;
		  if(result.affectedRows>0){ 
			res.send({code:1,msg:"注册成功"})
          }else{
            res.send({code:2,msg:"注册失败"})
          }	
	})
		}
	})
	
})
//用户登录
server.get("/login",(req,res)=>{
        var $uname=req.query.uname;
        //var $avatar=req.query.avatar; 
        var sql='select uid,uname,avatar  from user where uname=?';
            pool.query(sql,[$uname],(err,result)=>{
                if(err) throw err;
                if(result.length>0){  
                    var uid=result[0].uid
                    //console.log(uid)
                  //保存session对象中
                   session.uid=uid 
                    console.log(session.uid)
                    res.send({code:1,msg:"登录成功"})
                }else{
                    res.send({code:2,msg:"登录失败"}) 
                }				
            })	
    })
// 首页水果展示
server.get('/list',(req,res)=>{
    var clas=req.query.clas;
    var cla=req.query.clas;
 var sql='select * from goods where clas=?';
 pool.query(sql,[clas],(err,result)=>{
     if(err) throw err;
     if(result.length>0){
     res.send({code:1,data:result})
     }
 })
})
//商品 详情展示
server.get('/detail',(req,res)=>{
    var did=req.query.did;
    var sql='select * from goods_detail where did=?';
    pool.query(sql,[did],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})
//水果分类
server.get('/class1',(req,res)=>{
    // var cid=req.query.cid;
     var sql='select cid,cname from classify';
     pool.query(sql,(err,result)=>{
         if(err) throw err;
         if(result.length>0){
             res.send({code:1,data:result})
         }
     })
 })
 //水果分类1
server.get('/class',(req,res)=>{
   var clas1=req.query.clas1;
    var sql='select l.did,l.dname,l.price,l.src1,p.cname from classify p,goods_detail l where l.clas1=p.cid and l.clas1=? ';
    pool.query(sql,[clas1],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})
//右边所有商品展示
server.get('/listr',(req,res)=>{
 var sql='select * from goods';
 pool.query(sql,(err,result)=>{
     if(err) throw err;
     if(result.length>0){
     res.send({code:1,data:result})
     }
 })
})
//商品搜索
	server.get("/search",(req,res)=>{
    var pno=req.query.pno;
    var page_size=req.query.page_size;
    var key=req.query.key;
    if(!pno){pno=1;}
    if(!page_size){page_size=6;}
    var sql=`select * from goods where sname like ? limit ?,?`;
     var offset=(pno-1)*page_size;
     page_size=parseInt(page_size);
     pool.query(sql,['%'+key+'%',offset,page_size],(err,result)=>{
        if(err) throw err;
         if(result.length>0){
         res.send({code:1,data:result});
        }
       else{
         res.send({code:-1,data:'暂无此商品'});
     }
    })
})
//添加购物车
server.get('/add',(req,res)=>{
	var uid=session.uid;
	//console.log(uid);
	if(!uid){
		res.send({code:-2,msg:'请登录'});
		return;
	}
	var did=req.query.did;
	var dname=req.query.dname;
	var src=req.query.src;
	var price=req.query.price;
	var count=req.query.count;
    var cprice=req.query.cprice;
	var sql='select id from cart where uid=? and did=?';
	console.log(sql)
	pool.query(sql,[uid,did],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
		var sql=`insert into cart (id,uid,did,src,dname,price,count,cprice) values(null,${uid},${did},'${src}','${dname}',${price},${count},${cprice})`;
			}else{
			 
			var sql=`update cart set count=count+${count}, cprice=count*price where uid=${uid} and did=${did}`;
			}
			//console.log(sql)
			pool.query(sql,(err,result)=>{
				if(err) throw err;
				if(result.affectedRows>0){
					res.send({code:1,msg:'更新成功'})
				}else{
					res.send({code:-1,msg:'更新失败'})
					}
			})
	})
})
//查询购物车
server.get('/sel',(req,res)=>{
	var uid=session.uid;
	console.log(uid)
	var sql='select * from cart where uid=?'
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result})
		}
	})
})
//生成订单
server.post('/order',(req,res)=>{
  var uid=session.uid;
  var did=req.body.did;
  var dname=req.body.dname;
  var src=req.body.src;
  var price=req.body.price;
  var count=req.body.count;
  var cprice=req.body.cprice;
  var time=req.body.time;
  var tro=req.body.tro;
  var code=req.query.code;
  var sql='select did from user_order where uid=? and code=?';
  pool.query(sql,[uid,0],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
       var sql='delete from user_order where uid=? and code=?';
       pool.query(sql,[uid,0],(err,result)=>{
           if(err) throw err;
           if(result.affectedRows>0){
               res.send({code:1,msg:'删除成功'})
           }else{
               res.end({code:-1,msg:'删除失败'})
           }
       })   
      }else if(result.length==0){
        var sql1='insert into user_order(id,uid,did,dname,src,price,count,cprice,ctime,tro,code) values(null,?,?,?,?,?,?,?,now(),?,?)';
        	pool.query(sql1,[uid,did,dname,src,price,count,cprice,tro,0],(err,result)=>{
         	 if(err) throw err;
        	 if(result.affectedRows>0){
       	      res.send({code:1,msg:'添加成功'})
         	 }else{
         	   res.send({code:-1,msg:'添加失败'})
        	  }
        	}) 
      }else{
        res.send({code:-2,msg:'商品不存在'})
      }
  })
})
//查询未支付订单
server.get('/sel_rorderr',(req,res)=>{
    var uid=session.uid;
	var sql='select * from user_order where uid=? and code=?';
	pool.query(sql,[uid,0],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result})
		}else{
			res.send({code:-1,data:'查询失败'})
		}
	})
})
//查看已支付订单
server.get('/sel_rorderw',(req,res)=>{
    var uid=session.uid;
	var sql='select * from user_order where uid=? and code=?';
	pool.query(sql,[uid,1],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result})
		}else{
			res.send({code:-1,data:'查询失败'})
		}
	})
})
//对订单进行处理
 server.get('/up_order',(req,res)=>{
    var uid=session.uid;
     var code=req.query.code;
     var did=req.query.did;
     var sql='select did from user_order where uid=? and code=?';
     pool.query(sql,[uid,0],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql1='update  user_order set  code=? where uid=?';
            pool.query(sql1,[uid,1],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'更新成功'})
                }else{
                    res.send({code:-1,msg:'更新失败'})
                }
            })
        }else{
            res.send({code:-2,msg:'查询失败'})
        }
    })
 })
 //查看未完成订单
server.get('/sel_rorder',(req,res)=>{
    var uid=session.uid;
    var sql='select * from user_order where uid=? and code=?';
    pool.query(sql,[uid,0],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
    })
    //删除未完成订单
    server.get('/del_rorder',(req,res)=>{
        var did=req.query.did;
        var sql='delete from user_order where did=? and code=?';
        pool.query(sql,[did,0],(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.send({code:1,msg:'删除成功'})
            }else{
                res.send({code:-1,msg:'删除失败'})
            }
        })
        })
// })
//添加地址
server.post('/add_ress',(req,res)=>{
    var uid=session.uid;
    var uname=req.body.uname;
    var phone=req.body.phone;
    var addre=req.body.addre;
    var address=req.body.address;
    var status=0;
    var sql='insert into user_address(id,uid,uname,phone,addre,address) values(null,?,?,?,?,?)';
    pool.query(sql,[uid,uname,phone,addre,address,0],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'添加成功'})
        }else{
            res.send({code:-1,msg:'添加失败'})
        }
    })
})
//查询用户地址
server.get('/sel_add',(req,res)=>{
    var uid=1;
    var sql='select * from user_address where uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:'查询失败'})
        }
    })
})
//查询特定地址
server.get('/update_add',(req,res)=>{
    var id=req.query.id;
    var uname=req.query.uname;
    var phone=req.query.phone;
    var addre=req.query.addre;
    var address=req.query.address;
    var sql='select * from user_address where id=?';
    pool.query(sql,[id],(err,result)=>{
     if(err) throw err;      
     if(result.length>0){
      res.send({code:1,data:result})
  }
    })
})
//地址更新
server.get('/up_add',(req,res)=>{
    var id=req.query.id;
    var uname=req.query.uname;
    console.log(uname)
    var phone=req.query.phone;
    var addre=req.query.addre;
    var address=req.query.address;
    var sql1='update user_address set  uname=?,phone=?,addre=?,address=? where id=?';
    pool.query(sql1,[uname,phone,addre,address,id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'更新成功'})
        }else{
            res.send({code:-1,msg:'更新失败'})
        }
    })
})

//地址的获取
server.get('/sel_ad',(req,res)=>{
    var uid=session.uid;
    var status=req.query.status;
    var sql='select * from user_address where uid=? and status=?';
    pool.query(sql,[uid,status],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:'查询失败'})
        }
    })
})
//删除地址
server.get('/del_add',(req,res)=>{
    var id=req.query.id;
    var sql='delete from user_address where id=?';
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'删除成功'})
        }else{
            res.send({code:-1,msg:'删除失败'})
        }
    })
})
//默认地址的修改
server.get('/up_addr',(req,res)=>{
    var id =req.query.id;
    var sql='select * from user_address where id=?';
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            var sql1='update user_address set status=? where id=?';
            pool.query(sql,[id,1],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'设置成功'})
                }else{
                    res.send({code:-1,msg:'设置失败'})
                }
            })
        }else{
            res.send({code:-1,msg:'查询失败'})
        }
    })
})
//删除购物车
server.get('/del_order',(req,res)=>{
    var uid=session.uid;
    console.log(uid);
    var sql='delete from cart where uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'删除成功'})
        }else{
            res.send({code:-1,msg:'删除失败'})
        }
    })
})

//商品收藏
server.post('/store',(req,res)=>{
    var uid=session.uid;
    if(!uid){
        res.send({code:-2,msg:'请先登录'})
        return;
    }
    var did=req.body.did;
    var dname=req.body.dname;
    var src=req.body.src;
    var price=req.body.price;
    var sql='select * from user_store where did=? and uid=?';
    pool.query(sql,[did,uid],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            var sql='insert into user_store(id,uid,did,dname,src,price) values(null,?,?,?,?,?)';
            pool.query(sql,[uid,did,dname,src,price],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1,msg:'收藏成功'})
                }
            })
        }else{
            res.send({code:-1,msg:'商品已收藏'})
        }
    })
   
})
//查询商品收藏
server.get('/sel_store',(req,res)=>{
    var uid=session.uid;
    var sql='select * from user_store where uid=?';
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
    })

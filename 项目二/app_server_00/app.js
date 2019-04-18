// 启动JS
//共 <31>功能
/*
  好友栏，
  好友信息，
  好友聊天信息，
  好友状态，
  好友的增，删，查，
  加载聊天信息分页
  全部变量保存用户数据
  各页面，跳转传参
  社交圈发送所有信息
  个人发表
  用户登陆日志

*/ 
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"qzz",
    connectionLimit:100
});

//3:创建express对象
var server = express();
//3.1 配置允许访问列 脚手架8080
server.use(cors({
  origin:["http://127.0.0.1:8080",
  "http://localhost:8080"],
  credentials:true
}));
// 3.11加载 模块 express-session
const session = require("express-session");
server.use(session({
  secret:"128为随机数字符串",
  resava:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*60
  }
}))
//3.2 配置静态资源目录 public
server.use(express.static("public"));
//3.3：配置第三方中间件
//3.4: 配置json是否是自动转换 
server.use(bodyParser.urlencoded({extended:false}))

server.listen(3000);
// 3000端口


// 功能<1>
// 添加用户日志
// insertDay
// 客户端用户登录记忆登录时间，并存储与数据
// 可在此访问上线次数和时间
    server.post("/insertDay",(req,res)=>{
      //2:获取二个参数 uname upwd
      var user_name = req.body.u;
      var user_loginTime="";
      var sql = "insert into qz_day values(null,?,now())";
      //4:执行sql
      pool.query(sql,[user_name,user_loginTime],(err,result)=>{
          if(err)throw err;
          //5:获取数据库返回结果
          //6:返回客户数据
          //console.log(result);
          if(result.affectedRows>0){
            res.send({code:1});
          }else{

          }
      })
    });

// 功能<2>
// 查询日志接口
// 社交圈的内容，将所有发表内容展示，无论好友或者陌生人
    server.get("/selectDays",(req,res)=>{
      //2:获取二个参数 uname upwd
      var user_name = req.query.uname;
      var sql = "select user_loginTime from qz_day where user_name = ?";
      //4:执行sql
      pool.query(sql,[user_name],(err,result)=>{
          if(err)throw err;
          //5:获取数据库返回结果
          //6:返回客户数据
          //console.log(result);
          if(result.length>=1){
            res.send({code:200,data:result});
          }else{

          }
      })
    });

// 功能<3>
// 修改用户在线状态
// POST
// 客户端用户登录成功的时候，将uname用户名传入服务器
// post请求修改用户的在线状态
    server.post("/update",(req,res)=>{
      //2:获取二个参数 uname upwd
      var uname = req.body.uu;
      // ////console.log(uname);
      var sql = "update qz_u_all set stateU = true where uname = ?";
      //4:执行sql
      pool.query(sql,[uname],(err,result)=>{
          if(err)throw err;
          //5:获取数据库返回结果
          //6:返回客户数据
          //console.log(result);
          if(result.affectedRows>0){
            // ////console.log(result);
            res.send({code:1});
          }else{

          }
      })
    });

// 功能<4>
// 访问登录请求相同用户
// 客户端登陆用户时，访问当前输入用户名是否在线
// 如果在线，将返回code值199
// 如果不在线，将返回code值110
// 客户端判断服务器返回值执行是否走向下一步的内容
// 如果返回值为199，则表示，用户可以登陆，并修改用户当前的在线状态false>true
// 为下一次注销做铺垫
// 如果返回110，表示当前用户在线，客户端判断提示，是否修改密码
    server.get("/selectXt",(req,res)=>{
      //2:获取二个参数 uname upwd
      var u = req.query.uname;
      // var stateU=true
      // ////console.log(u);
      var sql = "select stateU from qz_u_all where uname = ?";
      //4:执行sql
      pool.query(sql,[u],(err,result)=>{
          if(err)throw err;
          //5:获取数据库返回结果
          //6:返回客户数据
          // //console.log(result[0].stateU);
          //console.log(result);
          if(result.length==0){
            //console.log("没查到")
          }else if(result[0].stateU==1){
            res.send({code:199});
            return;
          }else if(result[0].stateU==0){
            res.send({code:110});
            return;
          }
      })
    });

// 功能<5>
// 修改用户推出leave时的而状态
// updateLeave
// 当客户端用户点击注销按钮
// 向服务器发送请求，申请修改即将下线用户的stateU在线状态，
// 将true修改为fasle
    server.post("/updateLeave",(req,res)=>{
      var uname = req.body.uname;
      var sql = "update qz_u_all set stateU = false where uname = ?";
      //4:执行sql
      pool.query(sql,[uname],(err,result)=>{
          if(err)throw err;
          if(result.affectedRows>0){
            res.send({code:1});
          }else{
            res.send({code:-1})
          }
      })
    });

// 功能<6>
//检查用户好友的好友状态
// hyState
// 客户端点击好友之时，
// 判断用户id，uname，向服务器请求访问当前用户的内容
// 如果用户的在线状态为true则返回code值1，反之-1，客户端根据判断显示
// 页面表现为笑脸和红色的苦脸
    server.get("/hyState",(req,res)=>{
      var id=req.query.id;
      var sql = "SELECT stateU FROM qz_u_all where id = ?";
      pool.query(sql,[id],(err,result)=>{
          if(err)throw err;
          if(result.length>=1){
            res.send({code:1,data:result})
          }else{

          }
      })
    });
// 功能<7>
// 我的个人空间发表的言论
// selectMyhome
// 获取客户端当前登陆的用户
// 向服务器发送给请求get获取用户发表的言论时间和内容，如果有内容的话，返回一个数组result
// 如果没有内容返回code值-1，表示当前用户未发表任何内容
    server.get("/selectMyhome",(req,res)=>{
      var id=req.query.uid;
      // var sql = "SELECT id FROM xz_login";
      var sql = "SELECT sayto,saytoTime FROM qz_sayThing WHERE id = ? order by saytoTime desc";
      //4:执行sql
      pool.query(sql,[id],(err,result)=>{
          if(err)throw err;
          //5:获取数据库返回结果
          if(result.length>=1){
            res.send({code:1,data:result})
          }else{
            res.send({code:-1})
          }
      })
    });
// 功能<8>
//功能一:用户登录
//1:用户post 请求路径/login
// 客户端访问服务器，传递两个参数
// 用户名和密码。判断uname和upwd是否符合，若有返回值则返回code值为将全局变量交付与myself
// 若是不符合则返回code值-1，返回msg用户名或密码错误
    server.post("/login",(req,res)=>{
      //2:获取二个参数 uname upwd
      var u = req.body.u;
      var p = req.body.p;
      var sql = "SELECT id,uname,avatar,email,count,stateU,ctime FROM qz_u_all";
      sql+=" WHERE uname = ? AND upwd = md5(?)";
      pool.query(sql,[u,p],(err,result)=>{
          if(err)throw err;
          if(result.length==0){
            res.send({code:-1,msg:"用户名或密码有误"});
          }else{
            res.send({code:1,msg:"登录成功",data:result});
          }
      })
    });

// 功能<9>
// 修改密码
// 在失去焦点之时判断是否存在用户
// 获取客户端post发送的用户名和邮箱判断是否存在相符合的用户，若有则返回则向下传递
// 若是没有则返回邮箱有误
// 若是有返回值，则将密码修改为客户端发送的数值，修改当前用户在线状态为false
    server.post("/back",(req,res)=>{
      //2:获取二个参数 uname upwd
      var u = req.body.uname;
      var email = req.body.email;
      var p = req.body.upwd;
      // console.log(u+":"+p+":"+email);
      //3:创建sql
                var sql = "SELECT id FROM qz_u_all WHERE uname = ? AND email = ?";
                //4:执行sql
                pool.query(sql,[u,email],(err,result)=>{
                    if(err)throw err;
                  console.log(result[0].id);
                    //6:返回客户数据
                    if(result.length==0){
                      res.send({code:-1,msg:"邮箱有误"});
                    }else{
                      var uid=result[0].id;
                      var p = req.body.upwd;
                      // console.log(p);
                      var sql1="UPDATE qz_u_all SET upwd = md5(?),stateU = false WHERE id = ?"
                      pool.query(sql1,[p,uid],(err,result1)=>{
                        if(err) throw err;
                        res.send({code:1,msg:"修改成功",data:result1})
                      })
                    }
                })
            });

// 功能<10>
// 判断用户
server.get("/pDuan",(req,res)=>{
  var uname = req.query.uname;
  var sql="SELECT id FROM qz_u_all WHERE uname=?";
  pool.query(sql,[uname],(err,result)=>{
  if(err) throw err;
  console.log(result);
  console.log(result.length);
  if(result.length==0){
    res.send({code:3});
  }else if(result.length==1){
                      
  }
})
})

// 功能<11>
// 注册
// 功能：用户注册
//用户get请求请求路径login
server.post("/reg",(req,res)=>{
  // u,p,email,gender,avatar
      var u=req.body.u;
      var p=req.body.p;
      var email=req.body.email;
      var avatar=req.body.avatar;
      var gender=req.body.gender;
      var stateU=false;
      var count=0;
      var ctime="";
      var sql1="INSERT INTO qz_u_all VALUES(null,?,md5(?),?,?,?,now(),?,?)";
      pool.query(sql1,[u,p,email,gender,avatar,ctime,stateU,count],(err,result)=>{
          if(err) throw err;
          // 判断返回客户端的数据
          // 获取数据库返回结果
          // 返回客户数据
          if(result.affectedRows>0){
              res.send({code:200,msg:"注册成功"});
          }
      })
  })  

// 功能<12>
// 注释：验证用户名是否被注册
  server.get("/regU",(req,res)=>{
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
  
// 功能<13>
//验证邮箱是否被注册
    server.get("/regE",(req,res)=>{
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

// 功能<14>
// 用户查询收听数据
server.get("/searchLogin",(req,res)=>{
  //2:获取二个参数 uname upwd
  var id = req.query.id;
  ////console.log(id);
  //3:创建sql
  var sql = "SELECT uname FROM qz_u_all WHERE id=?";
  //4:执行sql
  pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      ////console.log(result[0].uname);
      //5:获取数据库返回结果
      //6:返回客户数据
      if(result.length>=1){
         res.send({code:1,data:result});
        return;
      }else{
        // res.send({code:-1,msg:"不存在的用户"})
        //  return;
      }
  })
});

// 功能<15>
// 添加好友信息
// 用户查询收听数据
server.get("/insertUname",(req,res)=>{
  //2:获取 参数
  var id=req.query.id;
  var uname=req.query.uname;
  var friendid = req.query.friendid;
  var friendname = req.query.frienduname;
  // ////console.log(friendname,friendid,uname,id);
  //3:创建sql
  var sql = "INSERT INTO qz_speak VALUES(null,?,?,?,?),(null,?,?,?,?);";
  //4:执行sql
  pool.query(sql,[id,uname,friendid,friendname,friendid,friendname,id,uname],(err,result)=>{
      if(err)throw err;
      ////console.log(result);
      res.send({code:1,msg:"添加成功"})
  })
});

// 功能<16>
// 查询好友信息
// 用户查询收听数据
// id查询
server.get("/selectUid",(req,res)=>{
  //2:获取 参数
  var id=req.query.id;
  var friendid = req.query.friendid;
  var uname = req.query.uname;
  // or uname like concat('%',?,'%')
  ////console.log(friendid);
      var sql = "select uname from qz_u_all where id = ?";
      //4:执行sql
      pool.query(sql,[friendid,uname],(err,result)=>{
          if(err)throw err;
          ////console.log(result);
            if(result.length>=1){
              var sql1="select frienduname from qz_speak where friendid = ? and id = ?";
              pool.query(sql1,[friendid,id,uname],(err,result1)=>{
                if(err) throw err;
                if(result1.length==0){
                  res.send({code:1,data:result})
                  ////console.log(result)
                  return;
                }
                else{
                  res.send({code:2})
                  return;
                }
              })
              return;
            }else if(result.length==0){
              res.send({code:-1});
              return;
            }
      })
});

// 功能<17>
// 修改
// 查询好友栏
server.get("/selectUname",(req,res)=>{
  var id=req.query.id;
  var sql = "select frienduname,friendid from qz_speak where id = ?";
  //4:执行sql
  pool.query(sql,[id],(err,result)=>{
      if(err)throw err;
      ////console.log(result);
      if(result.length>=1){
        res.send({code:1,result})
        return;
      }else{
        res.send({code:-1});
        return;
      } 
  })
});

// 功能<18>
// 用户聊天展示
    server.get("/speakBoth",(req,res)=>{
      var id=req.query.id;
      var uname=req.query.uname;
      var friendid = req.query.friendid;
      var friendname = req.query.frienduname;
      var say = req.query.say;
      var sayTime="";
      ////console.log(friendname,friendid,uname,id,say);
      var sql = "INSERT INTO qz_speak_s VALUES(null,?,?,?,?,?,now())";
      //4:执行sql
      pool.query(sql,[friendname,friendid,uname,id,say,sayTime],(err,result)=>{
          if(err)throw err;
          res.send({code:1,msg:"添加成功"})
      })
    })

// 功能<19>
// 用户聊天信息
//  统计聊天信息
// 判断用户聊天的信息，反馈客户端双方的用户
// 获取用户发送的编号，名字，传递的值
// 根据不同条件判断，反馈给不同用户的对应值
server.get("/speakShow",(req,res)=>{
  var uname=req.query.uname;
  var pageSize =parseInt(req.query.pageSize);
  // var friendid = req.query.friendid;
  var frienduname = req.query.frienduname;
  // 1.倒序查询在用户传递好友的数值，根据客户端传递的参数，判断反馈的值
  // var sql = "select say,sayTime from qz_speak_s where id = ? and frienduname = ? and uname = ?";
  var sql = "select id from qz_speak_s where frienduname = ? and uname = ? or frienduname = ? and uname = ? order by sayTime desc";
  // limit 0,5
  //4:执行sql
  pool.query(sql,[frienduname,uname,uname,frienduname],(err,result)=>{
      if(err) throw err;
      if(result.length>=pageSize){
  // 2.反馈给双方用户，假如双方聊天信息有数据，就继续执行下列操作
  //    如果没有数据条，则执行else，到顶了
        var sql1 = "select id,friendid,say,sayTime from qz_speak_s where frienduname = ? and uname = ? or frienduname = ? and uname = ? order by sayTime desc limit 0,?";
        pool.query(sql1,[frienduname,uname,uname,frienduname,pageSize],(err,result1)=>{
          if(err) throw err;
          res.send({code:1,data:result1})
        })
      }else if(result.length<pageSize){
        // 2.1判断数组信息长度
        // 2.1.1假如长度足够小，且有值，则执行下列操作
        if(result.length<=5 && result.length>=0){
          var sql2 = "select id,friendid,say,sayTime from qz_speak_s where frienduname = ? and uname = ? or frienduname = ? and uname = ? order by sayTime desc";
          pool.query(sql2,[frienduname,uname,uname,frienduname,pageSize],(err,result2)=>{
            if(err) throw err;
            res.send({code:1,data:result2})
          })
        }else if(result.length>5 && result.length<=pageSize){
          // 2.1.1假如长度足够大，且有值，且小于客户端滑动操作传递的量值，如果符合，则执行下列操作
          var sql3 = "select id,friendid,say,sayTime from qz_speak_s where frienduname = ? and uname = ? or frienduname = ? and uname = ? order by sayTime desc";
          pool.query(sql3,[frienduname,uname,uname,frienduname,pageSize],(err,result3)=>{
            if(err) throw err;
            res.send({code:1,data:result3})
          })
        }else{
          res.send({code:-1,msg:"到顶了"});
          return;
        }   
      }
  })
})

// 功能<20>
// 发表朋友圈
// qz_sayThing
// 获取客户端用户，uname sayto saytoThing
    server.post("/sayThings",(req,res)=>{
      var id=req.body.id;
      var uname=req.body.uname;
      var sayto=req.body.sayto;
      var sql="INSERT INTO qz_sayThing VALUES(null,?,?,?,now())";
      pool.query(sql,[id,uname,sayto],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
          res.send({code:1});
        }
      })
    })

// 功能<21>
// 查询友圈
// qz_sayThing
// 客户端获取当前登录用户在客户端，调用页面时，反馈数组给客户端
    server.get("/selectThings",(req,res)=>{
      // var uname=req.query.uname;
      // var id=req.query.id;
      // 全部渲染到朋友圈，不区分好友
      var sql="SELECT id,uname,sayto,saytoTime FROM qz_sayThing order by saytoTime desc";
      pool.query(sql,(err,result)=>{
        if(err) throw err;
        // 查询获取的朋友圈信息
        if(result.length>=0){
          res.send({code:1,data:result,length:result})
        }else{
          res.send({code:-1})
        }
      })
    })

// 功能<22>
// 客户端获取社区的所有信息，服务器查询所有用户传递的消息，反馈客户端
server.get("/selectThingss",(req,res)=>{
  // var uname=req.query.uname;
  // var id=req.query.id;
  // var pageSize=parseInt(req.query.pageSize);
  // 全部渲染到朋友圈，不区分好友
  // 将数据库全部添加
  var sql="SELECT id,uname,sayto,saytoTime,sayid FROM qz_sayThing order by saytoTime desc";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    // 查询获取的朋友圈信息
    ////console.log(result.length);
    if(result.length>=0){
          pageSize=result.length;
         res.send({code:1,data:result,length:result.length})
      }else{
      res.send({code:-1})
    }
  })
})

// 功能<23>
// 查询个人发言
// 客户端保存的id
// 向服务器申请获取属于当前用户发送的全部信息
server.get("/selectThingsMine",(req,res)=>{
  var id=req.query.id;
  var sql="SELECT id,uname,sayto FROM qz_sayThing WHERE id = ?";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.length>=0){
      res.send({code:1,data:result})
    }else{
      res.send({code:-1})
    }
  })
})

// 功能<24>
//好友点赞
  // inserToqzuall
  server.post("/inserToqzuall",(req,res)=>{
    var uname=req.body.uname;
    var id=req.query.id;
    var count=req.query.countU;
    var sql="update qz_u_all set count=? where id=?";
    pool.query(sql,[count,id],(err,result)=>{
      if(err) throw err;
      // 查询获取的朋友圈信息
      if(result.length>=0){
        res.send({code:1,data:result})
      }else{
        res.send({code:-1})
      }
    })
  })

// 功能<25>
// 注释>壁纸更新
// 客户端传递背景id
// 反馈页面
    server.get("/getPhoto",(req,res)=>{
      var photo=[
        {photoid:1,img:"http://127.0.0.1:3000/bg01.jpg",title:"雪地"},
        {photoid:2,img:"http://127.0.0.1:3000/bg02.jpg",title:"枫叶"},
        {photoid:3,img:"http://127.0.0.1:3000/bg03.jpg",title:"曦夜"},
        {photoid:4,img:"http://127.0.0.1:3000/bg04.jpg",title:"墙壁"},
        {photoid:5,img:"http://127.0.0.1:3000/bg05.jpg",title:"水漾"},
        {photoid:6,img:"http://127.0.0.1:3000/bg06.jpg",title:"紫色的夜"},
        {photoid:7,img:"http://127.0.0.1:3000/bg07.jpg",title:"海岸"},
        {photoid:8,img:"http://127.0.0.1:3000/bg08.jpg",title:"小城"},
        {photoid:9,img:"http://127.0.0.1:3000/bg09.jpg",title:"眺望"},
        {photoid:10,img:"http://127.0.0.1:3000/bg10.jpg",title:"三色"},
        {photoid:11,img:"http://127.0.0.1:3000/bg11.jpg",title:"柯兰"},
        {photoid:12,img:"http://127.0.0.1:3000/bg12.jpg",title:"抽象"},
        {photoid:13,img:"http://127.0.0.1:3000/bg13.jpg",title:"冰山"},
        {photoid:14,img:"http://127.0.0.1:3000/bg14.jpg",title:"深渊"},
        {photoid:15,img:"http://127.0.0.1:3000/bg15.jpg",title:"星空"},
        {photoid:16,img:"http://127.0.0.1:3000/bg16.jpg",title:"玺"},
        {photoid:17,img:"http://127.0.0.1:3000/bg17.jpg",title:"抽象"},
      ];
      res.send({code:1,data:photo})
    })

// 功能<26>
//  home页面轮播
    server.get("/imglist",(req,res)=>{
      var rows = [
        {id:1,img_url:"http://127.0.0.1:3000/bg12.jpg"},
        {id:2,img_url:"http://127.0.0.1:3000/bg13.jpg"},
        {id:3,img_url:"http://127.0.0.1:3000/bg06.jpg"},
        {id:4,img_url:"http://127.0.0.1:3000/bg05.jpg"},
      ];
      res.send({code:1,data:rows});
    });

// 功能<27>
//九宫格
// home 小功能
// 目标目录暂存本地
    server.get("/grid",(req,res)=>{
      var rows = [
        {id:1,title:"发表",img_url:"http://127.0.0.1:3000/img/grid/menu1.png"},
        {id:2,title:"时间",img_url:"http://127.0.0.1:3000/img/grid/menu2.png"},
        {id:3,title:"聊天",img_url:"http://127.0.0.1:3000/img/grid/menu3.png"},
        {id:4,title:"日志",img_url:"http://127.0.0.1:3000/img/grid/menu4.png"},
        {id:5,title:"我的空间",img_url:"http://127.0.0.1:3000/img/grid/menu5.png"},
        {id:6,title:"加好友",img_url:"http://127.0.0.1:3000/img/grid/menu6.png"},            
      ];
      res.send(rows);
    });

// 功能<28>
  const multer=require("multer");
  const fs=require("fs");
  var upload=multer({dest:"public/upload/"})
    // 接收post请求multer
  server.post("/uploadFile",upload.single("mypic"),(req,res)=>{
      // 时间
        var time=new Date().getTime();
        var rr=Math.floor(Math.random()*9999);
        var src=req.file.originalname;
        var i3=src.lastIndexOf(".");
        var suff=src.substring(i3);
        var newFile=__dirname+"/public/upload/"+time+rr+suff;
        fs.renameSync(req.file.path,newFile);
        res.send({code:1,msg:"上传成功"});
  })

// 功能<29>
// 关于
// selectAbout
// 客户端展示页面关于我的介绍
    server.get("/selectAbout",(req,res)=>{
        var sql="SELECT header,body,foot from qz_about";
        pool.query(sql,(err,result)=>{
          if(err) throw err;
          //console.log(result);
          if(result.length>0){
            res.send({code:1,data:result})
          }
        })
    })

// 功能<30>
// 删除发表言论
// DelP
server.post("/DelP",(req,res)=>{
  var uname=req.body.uname;
  var sayto=req.body.sayto;
  var saytoTime=req.body.saytoTime;
  var sql = "delete from  qz_sayThing where uname= ? and saytoTime = ? and sayto=?";
  //4:执行sql
  pool.query(sql,[uname,saytoTime,sayto],(err,result)=>{
      if(err)throw err;
      console.log(result.affectedRows);
      if(result.affectedRows>0){
        res.send({code:1,data:result.affectedRows});
      }
  })
});

// 功能<31>
// 删除好友&好友聊天记录
// DelFrienduname
server.post("/DelFrienduname",(req,res)=>{
  var id=req.body.id;
  var uname=req.body.uname;
  var friendid=req.body.friendid;
  var frienduname=req.body.frienduname;
  var sql = "delete from  qz_speak where uname= ? and friendid = ? and frienduname = ? or uname = ? and id = ? and frienduname = ?";
  //4:执行sql
  pool.query(sql,[uname,friendid,frienduname,frienduname,friendid,uname],(err,result)=>{
      if(err)throw err;
      // console.log(result);
      if(result.affectedRows>=1){
          res.send({code:1,data:result.affectedRows});
          console.log(result.affectedRows)
      }
      var sql1="delete from qz_speak_s where uname = ? and frienduname =? or uname = ? and frienduname = ?"
      pool.query(sql1,[uname,frienduname,frienduname,uname],(err,result1)=>{
        if(err) throw err;
      })      
      })
});




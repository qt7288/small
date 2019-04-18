const express=require('express');
const pool=require('../pool.js');
const bodyParser=require('body-parser');
var router=express.Router();
router.post('/qz_schuan',(req,res)=>{
    //获取参数
	var $sltext=req.body.name;
    var $srtext=req.body.Title;
    var $ftext=req.body.content;
    var $cimg=req.body.imagef;
	var sql="INSERT INTO qz_text VALUES(null,?,?,?,now(),?)";
	pool.query(sql,[$sltext,$srtext,$ftext,$cimg],(err,result)=>{
        if(err) throw err;
		if(result.affectedRows>0){
           res.send({code:200,msg:"上传成功"});
        }
	});
});

router.get('/qz_text_select',(req,res)=>{
    //获取参数
    var $tid=req.query.tid;
	var sql="SELECT sltext,srtext FROM qz_text_fpage WHERE tid=?";
	pool.query(sql,[$tid],(err,result)=>{
        if(err) throw err;
		if(result.length>0){
           res.send({code:200,msg:"上传成功",data:result});
        }
	});
});

// 修改
router.post('/qz_text_update',(req,res)=>{
    //获取参数
	var $sltext=req.body.sltext;
    var $srtext=req.body.srtext;
    var $tid=req.body.tid;
	var sql="UPDATE qz_text_fpage SET sltext=? , srtext=? WHERE tid=?";
	pool.query(sql,[$sltext,$srtext,$tid],(err,result)=>{
        if(err) throw err;
		if(result.affectedRows>0){
           res.send({code:200,msg:"上传成功"});
        }
	});
});

// 插入
router.post('/qz_text_ins',(req,res)=>{
    //获取参数
	var $sltext=req.body.sltext;
    var $srtext=req.body.srtext;
    var $tid=req.body.tid;
    // console.log($sltext+":"+$srtext+":"+$tid);
	var sql="INSERT INTO qz_text_fpage VALUES(tid=?,?,?) ";
	pool.query(sql,[$tid,$sltext,$srtext],(err,result)=>{
        if(err) throw err;
		if(result.affectedRows>0){
           res.send({code:200,msg:"上传成功"});
        }
	});
});
// 插入记录数据
router.post("/qz_timething",(req,res)=>{
    // 获取客户端
    var timeCt=req.body.timeCt;
    var thing=req.body.thing;
    var thighref="http://172.242.3.181";

    var sql = "INSERT INTO qz_timeThing VALUES(null,?,?,?,now())";
    pool.query(sql,[timeCt,thing,thighref],(err,result)=>{
        if(err) throw err;
        console.log(result);
        // 查询数据库传入的数据，返回客户端
        var sql1 = "SELECT thingId,timeCt,thing,thighref,qtimer FROM qz_timeThing";
        pool.query(sql1,(err,result1)=>{
            if(err) throw err;
            // console.log(result1);
            res.send({code:1,data:result1});
        })
    })
})
// 查询
router.get("/qz_timethings",(req,res)=>{
    var sql1 = "SELECT thingId,timeCt,thing,thighref,qtimer FROM qz_timeThing ORDER BY thingId desc";
    pool.query(sql1,(err,result1)=>{
        if(err) throw err;
        // console.log(result1);
        res.send({code:1,data:result1});
    })
})
module.exports=router
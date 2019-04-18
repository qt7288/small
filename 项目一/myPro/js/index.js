// 获取地址栏信息分段查询用户的id值
var h=window.location.href;
// 声明变量接收地址栏
// 控制台输出地址栏信息
var num=h.split("?")[1];
console.log(num);
// 控制台输出地址栏截取的用户id
/**********************************************************************蜂窝主体文字**********************************************************************/ 
$(function(){
    $.ajax({ 
        type: "GET",         
        data: "hid=1",
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_iht",
        success: function(data) {
           
            $('#header-b').html(`<h1>${data[0].btext}</h1><h2>${data[0].mtext}<h2>`);
            console.log(`
            ████████╗ █████╗  ██████╗ ████████╗ █████╗  ██████╗ 
            ╚══██╔══╝██╔══██╗██╔═══██╗╚══██╔══╝██╔══██╗██╔═══██╗
               ██║   ███████║██║   ██║   ██║   ███████║██║   ██║
               ██║   ██╔══██║██║   ██║   ██║   ██╔══██║██║   ██║
               ██║   ██║  ██║╚██████╔╝   ██║   ██║  ██║╚██████╔╝
               ╚═╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ 
            `)
            
        }
    });

    $.ajax({ 
        type: "GET",         
        data: "",
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_bq",
        success: function(data) {
            console.log(data);
                $("#header-h").html(`
                <ul>
                <img src="http://taotao2019.applinzi.com/img/mfeng.png" class="mfLogo" title="蓝蜂☁为您服务">
                    <li title="home"><a href="index.html?${num}">${data[0].smtext}</a></li>
                    <li class="dnone"><a href="myself.html?${num}" title="brief introduction">${data[1].smtext}</a> 
                    </li>
                    <li><a href="javascript:;" class="Reward">${data[3].smtext}</a></li> 
                    <li><a href="liuyan.html?user?${num}" title="Message Board">${data[4].smtext}</a></li>
                    <li class="dnone"><a href="Fchain.html?${num}">${data[5].smtext}</a>
                    </li>
                    <li><a href="reg.html" title="Honeybee registration is welcomed">${data[6].smtext}</a> </li>
                </ul>
                `)
                $('.mfLogo').click(function(){
                    if(num=="undefined"){
                            window.location.href=`index.html`;
                    }else{
                         window.location.href=`index.html?${num}`;
                    }
                })
        }
    });
  });

// 时间time
$(function(){
    setInterval(function(){
    var now = new Date();
    var hour =now.getHours();
    var minute =now.getMinutes();
    var second =now.getSeconds();
    // console.log(now+":"+hour+":"+minute+":"+second);
    var Percentage=parseInt(((hour*3600+minute*60+second)/86400)*100).toFixed(2)+"%";
    // console.log(Percentage);
    $(".song").html(`当前时间:${hour+":"+minute+":"+second}`);
    // 首页提示信息，链接首页动画产生浮动效果;
    // $("#homepage>h1").html(`当前时间:${hour+":"+minute+":"+second}`);
        if(hour>=24){
            $("#homepage>h1").html(`静`);
        }else if(hour>=18){
            $("#homepage>h1").html(`夜`);
        }else if(hour>=12){
            $("#homepage>h1").html(`午`);
        }else if(hour>=8){
            $("#homepage>h1").html(`晨`);
        }else if(hour>=4){
            $("#homepage>h1").html(`曦`);
        }
    $(".timeBox").mouseover(function(){
    //    $(".timeBox").css("background","black");
    })
    $(".timeBox").css("width",Percentage).attr("title",`时间已经过去了${Percentage}`);    
},1000);
})

$(function(){
    $("#header-b").mouseover(function(){
        $("#header-b>h1,#header-h>h2").css("color",function(){ 
            // return `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256},0.5)`
        });
    })
    
})

$(function(){
    $.ajax({ 
        type: "GET",         
        data:"",
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_sr",
        success: function(data){
            // console.log(result);
/****************************************************************************************/ 
// 右侧所有数据
$(".s-r").html(`
<div class="c-f-b">
<div class="cfr-h1">
    <div class="cfr-h1-h">
         <h1>用户您好请先登录…</h1>
    </div>
    <div class="cfr-h1-b">
    <button><a href="login.html">登录</a></button>
    <button><a href="reg.html">注册</a></button>                      
    </div>
</div>
<div class="cfr-b">
    <audio src="${data[0].music}" preload id="music" loop="loop"></audio>
    <span>音乐&时间</span><span class="song"></span>
    <!-- 音乐插件 -->
    <div class="music">
            <div class="barBox">
                <div class="timeBox" title="0"></div>
            </div>
        <div id="play"><p>播放</p></div>
        <div id="pause"><p>重置</p></div>
    </div>
</div>
<!-- 登录、注册 -->
<div class="cfr-h2">
    <div class="cfr-h2-h">
        <span>站内搜索</span><span class="search-msg"></span>
    </div>
    <div class="cfr-h2-b">
        <!-- <form action=""> -->
            <input type="text" name="sltext" placeholder="Search..." class="searchA">
            <button type="button" @click="btnsearch" class="search">站内查询<img src="img/search.png"></button>
        <!-- </form> -->
    </div> 
</div>
<!-- 站内搜索 -->
<div class="cfr-b1">
    <div class="cfr-b1-h">
        <span>微信公众号</span>
    </div>
    <div class="cfr-b1-b">
        <img src="" alt="">
    </div>
</div>
<!-- 二维码群 qq-->
<div class="cfr-b2">
    <div class="cfr-b2-h">
        <p>标签组</p>    
    </div>
    <div class="cfr-b2-b">
        <!-- <button></button> -->
    </div>
</div>
<!-- 标签 -->
<div class="cfr-f"></div>
<!-- 尾部站位 -->
</div>
</div>

`);
/***********************************************************************g歌曲功能**********************************************************************/ 
// 操作时间控制停止打开
  // 点击将时间归零;
  var musicObj=document.getElementById("music");
  $("#pause").click(function(){
      musicObj.currentTime=0;
  });
  // 
  $("#play").click(function(){
      if(musicObj!==null){
          if(musicObj.paused){
              musicObj.play();  
              $("#play").html("暂停");
              $(".barBox").css({
              "width":"90%"
              })
              // 播放速率
              musicObj.playbackRate=1;
              $(".t-xiang>img").css( "animation","tX 5s linear infinite");
              $(".song").html("循环播放中");
          }else{
              musicObj.pause();
              $(".song").html("已暂停");
              $("#play").html("播放");
              $(".barBox").css({"animation":"null"});
              $(".t-xiang>img").css( "animation","tX 0s linear");
          } 
      }

  })

//   用户头像
var h=window.location.href;
// 声明变量接收地址栏
// 控制台输出地址栏信息
var num=h.split("?")[1];
// 登录用户检测
  $.ajax({ 
    type: "GET",         
    data:{num},
    // dataType: "JSON", 
    async: true, 
    url: "myPro/qz_u_all",
    success: function(data) {
        if(data.length!=1){
            // 如果返回的值不符合则不执行
        }else{
            // 执行操作,渲染html
            // console.log(data);
            // 控制台输出返回的值
        $('.cfr-h1').html(`
                <div class="t-xiang denglu">
                    <img src="" alt="">
                </div>
                <div class="user-name denglu">
                        <h5>昵称:${data[0].uname}</h5>
                        <h5>签名:${data[0].ctime}</h5>
                        <h5>邮箱:${data[0].email}</h5>
                        <h5><a href="javascript:0;" class="zhuxiao">注销</a></h5>
                        
                </div>
                <div class="cfr-h1-h zhuce">
                            <h1>用户您好!请先登录...</h1>
                </div>
                <div class="cfr-h1-b zhuce">
                <button><a href="login.html">登录</a></button>
                <button><a href="reg.html">注册</a></button>                   
                 </div>
        `).addClass("disnone");
            $('.zhuxiao').click(function(){
                window.location.href="index.html";
            })
        $.ajax({ 
            type: "GET",         
            data:{num},
            // dataType: "JSON", 
            async: true, 
            url: "myPro/qz_u_all_img",
            success: function(data) {
            //    console.log(data);测试查询头像
                if(data.length!=1){
                }else{
                $('.t-xiang').html(`
                            <img src="${data[0].timg}" alt="">
                `).addClass("disnone");
             }
            }
        });

    }  
       }
});

//   button标签
$.ajax({ 
    type: "GET",         
    data: "",
    dataType: "JSON", 
    async: true, 
    url: "myPro/qz_b_text",
    success: function(data) {
          var btns="";
        for(var i=0;i<data.length;i++){
                btns+=`
                <button>${data[i].btext}</button>
                `;
            }
        $('.cfr-b2-b').html(btns).find("button").css({"background-color":
            function(){
                return `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`;
            }
        });
    }
});
// 微信
  $.ajax({ 
    type: "GET",         
    data: "iid=1",
    dataType: "JSON", 
    async: true, 
    url: "myPro/index",
    success: function(data) {
                        $('.bg-qjt').css({"background":`url(${data[0].mimg}) no-repeat fixed`,"background-size":"100%"});
                        $('.cfr-b1-b').html(`
                            <img src="${data[0].wximg}">
                        `);      
    }
});
  /***********************************************************************站内模糊查询功能**********************************************************************/ 
  // 模糊查询search根据提示标签查询站内资源文件
  var sltext = $(" input[ name='sltext' ] ").val();
    if(sltext==""){
        $(".search-msg").html(":当前可支持查询");
    }
$('.search').click(function(){
            var sltext = $(" input[ name='sltext' ] ").val();
            if(sltext==""){
                $(".search-msg").html(":当前查询为空、请输入想要搜索的标签");
            }else{
  var h=window.location.href;
    var pageNo=h.split("=")[1];
    var pageSize=5;
$.ajax({ 
    type: "GET",         
    data:{sltext,pageNo,pageSize},
    // dataType: "JSON", 
    async: true, 
    url: "myPro/qz_texty",
    success: function(result){
        if(result.code==404){
           $(".search-msg").html(":站内资源未查到该信息").css("color","red");
        }else{
            $(".search-msg").html(`:查询成功-本站内共${result.length}条数据`).css("color","white");
        //    console.log(result);
        var carda="";
        for(var i=0;i<result.length;i++){
            carda+=`
            <div class="card">
            <div class="card-img">
                <img src="${result[i].cimg}"></img>
            </div>
            <div class="card-r">
                <h3><span>${result[i].sltext}</span><a href="fpage.html?${result[i].tid}?${num}">${result[i].srtext}</a></h3>
                <h4>${result[i].ftext}</h4>
            </div>
            <div id="card-f">
                <div class="c-f-l">
                    <span>${result[i].time}</span>
                </div>
                <div class="c-f-r">
                    <!-- <span @click="zanr"><a href="javascript:;">点赞</a></span> -->
                    <span @click="timer"><a href="fpage.html?${result[i].tid}?${num}">阅读全文➷</a> </span>
                </div>   
            </div>           
        </div>
            `;
        }
    $('.s-l').html(carda).find(".card").css({"background":
    function(){
        // return `rgba(${Math.random()*140},${Math.random()*140},${Math.random()*140},1)`;
        // console.log(rgba);
        // 随机出色
}});}}})}});}})})
// Note: Do not delete
// 注释：误删

// Note: Insert Paging
// 注释：插入分页
$(function(){
    $(".f-page-l").html(`
            <button id="tye" class="page">▲</button>
            <button id="count" class="page">1</button>
            <button id="headerP" class="page">首页</button>
            <button id="hye" class="page">▼</button>
        `)
            //   js&数据库遍历数据添加html生成页面
            var h=window.location.href;
            // 获取地址栏信息
            // console.log(h);//输出地址
            var num=h.split("?")[1];
            console.log()
            // 获取当前登录用户的id值，存于地址栏
            // var pageNo=h.split("=")[1];
            var pageNo=0;
            // 声明变量pageNo默认初始值为0
            var pageSize=5;
            // 声明变量pageSize每页显示的个数
            if(pageNo==0){
            // 点击事件前触发默认操作
            // 当处于第一个首页的时候默认显示五条数据
                pageNo=1;
            // 页面设置为1默认页码
                $.ajax({ 
                    type: "GET",         
                    data:{pageNo,pageSize},
                    dataType: "JSON", 
                    async: true, 
                    url: "myPro/qz_text",
                    success: function(data) {
                        console.log(data.length);
                        var h=window.location.href;
                        // 声明变量接收地址栏
                        // 控制台输出地址栏信息
                        var num=h.split("?")[1];
                        console.log(num);
                        var carda="";
                        // 声明card变量装载所需承接的数据线
                        for(var i=0;i<data.length;i++){
                        // 获取数据库返回值的长度作为遍历的范围
                            carda+=`
                            <div class="card">
                            <div class="card-img">
                                <img src="${data[i].cimg}"></img>
                            </div>
                            <div class="card-r">
                                <h3><span>${data[i].sltext}</span><a href="fpage.html?${data[i].tid}?${num}">${data[i].srtext}</a></h3>
                                <h4>${data[i].ftext}</h4>
                            </div>
                            <div id="card-f">
                                <div class="c-f-l">
                                    <span>${data[i].time}</span>
                                </div>
                                <div class="c-f-r">
                                    <!-- <span @click="zanr"><a href="javascript:;">点赞</a></span> -->
                                    <span @click="timer"><a href="fpage.html?${data[i].tid}?${num}">阅读全文➷</a> </span>
                                </div>   
                               
                            </div>           
                        </div>
                            `;
                        }  

                    var num=h.split("?")[1];
                    $('#headerP').click(function(){
                        window.location.href=`index.html?${num}`;
                    })
                    $('.s-l').html(carda).find(".card").css({"background":function(){
                        // return `rgba(${Math.random()*140},${Math.random()*140},${Math.random()*140},0.8)`;
                        // console.log(rgba);
                }});
                var count=1;
                
                $('#hye').click(function(){
                    console.log(data.length);
                    $('#tye').html("▲");
                    count++
                    var counts=data.length%5+2;
                    if(count>=counts){
                        count=counts;
                        // $(this).attr("disabled","true");
                        $(this).css("display","none");
                    }else{
                    }
                    $("#count").html(`${count}`);
                    pageNo++
                    if(pageNo>=3){
                        pageNo=3;
                        $('#hye').html("▼");        
                    }
            // 获取跳转页码的数值，然后传递参数;
            // console.log(`"向myPro传递pageNo的值为:"${pageNo}`);
            // console.log(`"向myPro传递的用户id为:"num`);
                $.ajax({ 
                    type: "GET",         
                    data:{pageNo,pageSize},
                    dataType: "JSON", 
                    async: true, 
                    url: "myPro/qz_text",
                    success: function(data) {
                        var carda="";
                        for(var i=0;i<data.length;i++){
                            carda+=`
                            <div class="card">
                            <div class="card-img">
                                <img src="${data[i].cimg}"></img>
                            </div>
                            <div class="card-r">
                                <h3><span>${data[i].sltext}</span><a href="fpage.html?${data[i].tid}?${num}">${data[i].srtext}</a></h3>
                                <h4>${data[i].ftext}</h4>
                            </div>
                            <div id="card-f">
                                <div class="c-f-l">
                                    <span>${data[i].time}</span>
                                </div>
                                <div class="c-f-r">
                                    <!-- <span @click="zanr"><a href="javascript:;">点赞</a></span> -->
                                    <span @click="timer"><a href="fpage.html?${data[i].tid}?${num}">阅读全文➷</a> </span>
                                </div>   
                            </div>           
                        </div>
                            `;
                        }
                    $('.s-l').html(carda).find(".card").css({"background":function(){
                        // return `rgba(${Math.random()*140},${Math.random()*140},${Math.random()*140},0.8)`;
                }});
                    }
                });
            })
            /**********************************************************************换页操作*********************************************************************/ 
            $('#tye').click(function(){
                $("#hye").css("display","block");
                $('#hye').html("▼");
                    count--
                    if(count<1){
                        count=1;
                       
                    }
                    $("#count").html(`${count}`);
                pageNo--
                if(pageNo<=1){
                    pageNo=1;
                    $('#tye').html("▲");
                }
                
            /*********************************************************默认显示的页数和页面显示的大小*********************************************/ 
            // 获取跳转页码的数值，然后传递参数;
            // console.log(`"向myPro传递pageNo的值为:"${pageNo}`);
            // console.log(`"向myPro传递的用户id为:"num`);
            $.ajax({ 
                type: "GET",         
                data:{pageNo,pageSize},
                dataType: "JSON", 
                async: true, 
                url: "myPro/qz_text",
                success: function(data) {
                    var carda="";
                    for(var i=0;i<data.length;i++){
                        carda+=`
                        <div class="card">
                        <div class="card-img">
                            <img src="${data[i].cimg}"></img>
                        </div>
                        <div class="card-r">
                            <h3><span>${data[i].sltext}</span><a href="fpage.html?${data[i].tid}?${num}">${data[i].srtext}</a></h3>
                            <h4>${data[i].ftext}</h4>
                        </div>
                        <div id="card-f">
                            <div class="c-f-l">
                                <span>${data[i].time}</span>
                            </div>
                            <div class="c-f-r">
                                <!-- <span @click="zanr"><a href="javascript:;">点赞</a></span> -->
                                <span @click="timer"><a href="fpage.html?${data[i].tid}?${num}">阅读全文➷</a> </span>
                            </div>   
                        </div>           
                    </div>
                        `;
                    }
                $('.s-l').html(carda).find(".card").css({"background":function(){
                    // return `rgba(${Math.random()*140},${Math.random()*140},${Math.random()*140},0.8)`;  // console.log(rgba);
                            }
                        });
                    }
                });
            })         
                }
            });
            // 普通默认时的显示数据
            }

        })
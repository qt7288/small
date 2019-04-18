// 登录
var h=window.location.href;
console.log(h);//输出地址
var fum=h.split("?")[1];
var num=h.split("?")[2];
if(!num=="undefined"){
    num="Smith";
}
console.log(num);
console.log(fum);
$(function(){
    $.ajax({ 
        type: "GET",         
        data:{num},
        // dataType: "JSON", 
        async: true, 
        url: "myPro/qz_u_all",
        success: function(data) {
            if(data.length!=1){

            }else{
   
           console.log(data);
            $('.cfr-h1').html(`
                    <div class="t-xiang denglu">
                        <img src="" alt="">
                    </div>
                    <div class="user-name denglu">
                            <h5>用户:${data[0].uname}</h5>
                            <h5>个性签名:${data[0].ctime}</h5>
                            <h5>邮箱:${data[0].email}</h5>
                    </div>
                    <div class="cfr-h1-h zhuce">
                                <h1>用户您好!请先登录...</h1>
                    </div>
                    <div class="cfr-h1-b zhuce">
                    <button><a href="login.html">登录</a></button>
                    <button><a href="reg.html">注册</a></button>                   
                     </div>
            `).addClass("disnone");
        }  
           }
    });
  });
// 用户头像

// 大背景
// 调用
$(function(){

//   fpage-sl数据代入
    $.ajax({ 
        type: "GET",         
        data: {fum},
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_text_fpage",
        success: function(result) {
            console.log(result);
            console.log(fum);
            if(result==""){
                var h=window.location.href;
                var num=h.split("?")[2];
                alert(`第${fum}条数据为空\n点击跳转页面`);
                    window.location.href=`http://book688.applinzi.com/index.html?${num}`;
                    // 如果数据为空跳转原页面
            }else{
            $('.s-l').html(` 
            <div class="s-l-s"> 
                    <div class="fpsl-h">
                    <h1>${result[0].sltext}</h1>
                    </div>
                    <div class="fpsl-h-img">
                        <img src="${result[0].fimg}" alt="">
                    </div>
                    <div class="btnFpage">目录
                        <ul>
                            <li>1.标题一</li>
                            <li>2.标题2</li>
                            <li>3.标题3</li>
                        </ul>
                    </div>
                    <div class="fpsl-body">
                        <h2>${result[0].sltext}</h2>
                        <p>${result[0].srtext}</p>
                    </div>
                    <div class="fpsl-footer">

                    </div>     
            </div>
             `);  
                    var ist=true;
                 $(".btnFpage").click(function(){
                    
                     if(ist){
                     $(this).css("height","10rem");
                        ist=false;
                      } else{
                     $(this).css("height","2rem");
                        ist=true;
                    }
                    })
            }
        }
    });
  });
//   logo字体
$(function(){
    $.ajax({ 
        type: "GET",         
        data: "hid=1",
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_iht",
        success: function(data) {
            $('#header-b').html(`<h1>${data[0].btext}</h1><h2>${data[0].mtext}<h2>`)
        }
    });
  });
//   header-nav [头栏导航]
$(function(){
    $.ajax({ 
        type: "GET",         
        data: "",
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_bq",
        success: function(data) {
            $("#header-h").html(`
            <ul>
            <img src="http://taotao2019.applinzi.com/img/mfeng.png" class="mfLogo" title="蓝蜂☁为您服务">
                <li title="home"><a href="index.html?${num}">${data[0].smtext}</a></li>
                <li class="dnone"><a href="myself.html">${data[1].smtext}</a> 
                </li>
                <li><a href="javascript:;" class="Reward">${data[3].smtext}</a></li> 
                <li><a href="liuyan.html?user?${num}" title="Message Board">${data[4].smtext}</a></li>
                <li class="dnone"><a href="Fchain.html">${data[5].smtext}</a>

                </li>
                <li><a href="reg.html" title="Honeybee registration is welcomed">${data[6].smtext}</a> </li>
            </ul>
            `)
            $('.mfLogo').click(function(){
                // if(num=="undefined"){
                // }else{
                     window.location.href=`index.html?${num}`;
                // }
            })
        }
    });
  });
//  Note: Embedded JS page link jump root management interface at the bottom
// 注释：底部嵌入js网页链接跳转root管理界面
/***********************************************************************Root链接&展示时**********************************************************************/ 
// Note: The right main body contains five functions
// 注释：右侧主体
$(function(){
    $(".s-r").html(`
        <!-- 右侧主体 -->
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
                <audio src="img/music.mp3" preload id="music" loop="loop"></audio>
                <span>音乐&时间</span><span class="song"></span>
                <!-- 音乐插件 -->
                <div class="music">
                    
                    <!-- <div class="Progress-bar"> -->
                        <div class="barBox">
                            <div class="timeBox" title="0" loop="loop"></div>
                        </div>
                    <!-- </div> -->
                    <div id="play"><p>播放</p></div>
                    <div id="pause"><p>重置</p></div>
                </div>
            </div>

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
        `)
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
                console.log(data[0].timg);
             }
            }
        });

        /***********************************************************************g歌曲功能**********************************************************************/ 
    // 操作时间控制停止打开
        // 点击将时间归零;
        var musicObj=document.getElementById("music");
        $("#pause").click(function(){
            musicObj.currentTime=0;
            console.log(musicObj);
        })
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
                    $(".song").html("循环播放中……");
                }else{
                    musicObj.pause();
                    $(".song").html("已暂停");
                    $("#play").html("播放");
                    $(".barBox").css({"animation":"null"});
                    $(".t-xiang>img").css( "animation","tX 0s linear");
                } 
            }

        })
        $.ajax({ 
            type: "GET",         
            data: "",
            dataType: "JSON", 
            async: true, 
            url: "myPro/qz_b_text",
            // success: function(btns) {
            success: function(data) {
                  var btns="";
                for(var i=0;i<data.length;i++){
                        btns+=`
                        <button style="background:${data[i].color}">${data[i].btext}</button>
                        `;
                    }
                $('.cfr-b2-b').html(btns).find("button").css({"background-color":
                function(){
                    return `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`;
                }
            }
        )
            }
        });
    })

// Note: Call the big background
// 注释：调用大背景
        $(function(){
            $.ajax({ 
                type: "GET",         
                data: "iid=1",
                dataType: "JSON", 
                async: true, 
                url: "myPro/index",
                success: function(data) {
                    // $('.bg-qjt').css({"background":`url(${data[0].mimg}) no-repeat fixed`,"background-size":"100%"});
                    $('.cfr-b1-b').html(`
                        <img src="${data[0].wximg}">
                    `);     
                    }
                });
            });

// 注释：意见箱
$(function(){
    // 获取当前篇幅
    // 获取当前用户输入的值
    var fum=h.split("?")[1];
    var num=h.split("?")[2];
    // if(num==""){num="Smith"}
    if(num=="undefined"){
        num="Smith";
    }
    $(".fpage_btn").click(function(){
        if(num=="Smith" || num=="undefined"){
            alert("客官你好，请先在本店注册帐号，再可允许发言");
            return;
        }else{
            var text=$(".text").val();
            console.log('用户输入的建议'+text+"用户发言的面板"+fum);
                    $.ajax({
                        type:"POST",
                        data:{fum,text,num},
                        dataType:"JSON",
                        async:true,
                        url:"myPro/fpage_say",
                        success:function(data){           
                            if(data.code==1){
                                 $(".fpage_btn").css("background-color","green").val("提交成功");

                            }
                            $(".text").val("");
                            alert("感谢您的建议，蓝蜂☁会更加努力");
                            console.log('用户提交建议点击事件生效'+'提交成功');
                        }
                    })
        }
    })
})

$(function(){
    var isT=true;
   $(".fpage_say_nav").click(function(){
    if(isT){
        $(".fpage_say_header").css({"height":"20rem"});
        isT=false;
    }else{
        $(".fpage_say_header").css({"height":"0"});
        isT=true; 
    } 
}) 
})


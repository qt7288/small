// Note: Message Page Operation Page! Do not delete
// 注释：留言页操作页面！勿删
// Note: Login User
// 注释：登录用户
var h=window.location.href;
console.log(h);//输出地址
var fum=h.split("?")[1];
var num=h.split("?")[2];
if(!num>0 || num==""){
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


//  Note: User Avatar
// 注释：用户头像
  $(function(){
    $.ajax({ 
        type: "GET",         
        data:{num},
        // dataType: "JSON", 
        async: true, 
        url: "myPro/qz_u_all_img",
        success: function(data) {
            if(data.length!=1){
            }else{
            $('.t-xiang').html(`
                        <img src="${data[0].timg}" alt="">
            `).addClass("disnone");
         }
        }
    });
  });


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
                            $('.bg-qjt').css({"background":`url() no-repeat fixed`,"background-size":"100%"});
                            $('.cfr-b1-b').html(`
                                <img src="${data[0].wximg}">
                            `);     
                            }
                        });
                    });

// Note: Blog font logo
//   注释：博客字体logo
//   logo字体
                $(function(){
                    $.ajax({ 
                        type: "GET",         
                        data: "hid=2",
                        dataType: "JSON", 
                        async: true, 
                        url: "myPro/qz_iht",
                        success: function(data) {
                          
                            $('#header-b').html(`<h1>${data[0].btext}</h1><h2>${data[0].mtext}<h2>`)
                            
                        }
                    });
                });

// Note: Headbar Label Data
// 注释：头栏标签数据
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
                                <li class="dnone"><a href="myself.html?${num}">${data[1].smtext}</a> 
                                </li>
                                <li><a href="javascript:;" class="Reward">${data[3].smtext}</a></li> 
                                <li><a href="liuyan.html?user?${num}" title="Message Board">${data[4].smtext}</a></li>
                                <li class="dnone"><a href="Fchain.html?${num}" title="Friend chain">${data[5].smtext}</a>
            
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

//   Note: The value of the query tag
//  注释：查询标签的值
                $(function(){
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
                        })
                        }
                    });
                });
            $(function liuyan(){
                //   $(" input[ name='liuyan' ] ").val();
                // Note: Get the value of the input box
                // 注释：获取input框的值

                
                var pageSize=4;
                function abv(){
                    $.ajax({ 
                        type: "GET",         
                        data: {pageSize},
                        dataType: "JSON", 
                        async: true, 
                        url: "myPro/qz_lyans",
                        success: function(data) {
                        $(".s-l").html(`
                                <div id="lyb-title"><h2>短暂的瞬间，漫长的永远</h2></div>
                                <div class="lyb-subtitle"><p>Message Board</p></div>
                                <div class="lyb-img">
                                    <img src="img/wx/02.jpg" alt="">
                                </div>
                                <div class="pay">
                                    <button class="btn1">分享</button>
                                    <button>打赏</button>
                                </div>
                                <div id="liuyanban">
                                    
                                    </div>
                            <div id="ly-input">
                                <input type="text" name="liuyan" placeholder="I want to say……" maxlength="80">
                                <br>
                                <button type="button" class="ly-btn">我要留言</button>
                            </div>
                            <div class="ly-hy">
                                <button class="ly-bottom-btn">Load more</button>
                            </div>
                            `);
                            var isT=true;
                            $(".pay>.btn1").click(function(){
                                if(isT){
                                    //   $("#shareTo").show();
                                      $("#shareTo").css("transform","rotateX(0deg)");
                                      isT=false;
                                }else{
                                    // $("#shareTo").hide();
                                    $("#shareTo").css("transform","rotateX(90deg)");
                                    isT=true;
                                }
                            }) 
                            var ta="";
                            for(var i=0;i<data.length;i++){
                                ta+=`
                            <div class="lyb-header">
                            <p>${data[i].lytid}楼<span>${data[i].lyname}>${data[i].now}</psan></p></div>
                            <div class="lyb-body"><p>${data[i].txta}</p><span></span></div>
                                `;
                            }
                            $('#liuyanban').html(ta);



    // Note: I would like to make a statement.
    // 注释：点击我要发言
                $('.ly-btn').click(function(){
                        var txta=$(" input[ name='liuyan' ] ").val();
                        if(txta==""){
                            $('.ly-btn').html("我要留言");
                        }else{
                        $('.ly-btn').html("我要留言");
                    $.ajax({ 
                        type: "GET",         
                        data: {num,txta},
                        dataType: "JSON", 
                        async: true, 
                        url: "myPro/qz_lyan",
                        // 成功的时候操作
                        success: function(data) {
                            $("#Tips").css("display","block");
                                $(" input[ name='liuyan' ] ").val("");
                                setTimeout(() => {
                                    $("#Tips").css("display","none");
                                    abv(); 
                                    console.log(`发言成功`);
                                }, 1000);
                        } });}})

    // Note: Load more messages
    // 注释：加载更多留言
                        $('.ly-bottom-btn').click(function(){
                            pageSize+=5;
                            $.ajax({ 
                                type: "GET",         
                                data: {num,pageSize},
                                dataType: "JSON", 
                                async: true, 
                                url: "myPro/qz_lyans",
                                // 成功的时候操作
                                success: function(data) {
                                var ta="";
                                for(var i=0;i<data.length;i++){

                                        ta+=`
                                        <div class="lyb-header">

                                        <p>${data[i].lytid}楼<span>${data[i].lyname}>${data[i].now}</psan></p></div>
                                        <div class="lyb-body"><p>${data[i].txta}</p><span></span></div>
                                        `;
                                    }
                                $('#liuyanban').html(ta);
                                $('.lyb-body').css("background",function(){
                                    return `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256},0.5)`;
                                })
                                }
                            });
                        });
                                $('.lyb-body').css("background",function(){
                                    return `rgba(${Math.random()*256},${Math.random()*256},${Math.random()*256},0.5)`;
                                })
                                }
                            });
                    }abv();   

                    })
                    
// Note: Smooth Topping
// 注释：平滑过渡置顶
/* chrome ie8下均正常 */
                    $(function() {
                        $("a.topLink").click(function() {
                            $("html, body").animate({
                                scrollTop: $($(this).attr("href")).offset().top + "px"
                            }, {
                                duration:500,
                                easing: "swing"
                            });
                            return false;
                        });
                    })

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
                        /***********************************************************************g歌曲功能**********************************************************************/ 
                    // 操作时间控制停止打开
                    $(function(){
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
                    })
                })
//分享到QQ
            $(function(){
            $("#shareTo").html(`
            <ul>
                <li>微信</li>
                <li>
                    <a title="分享到QQ好友" href="javascript:void(0)" class="share_qq">QQ</a>
                </li>
                <li>
                </li>
            </ul>
                `)
            $('.share_qq').click(function(){
                                                            // event.preventDefault();
                var _url="http://book688.applinzi.com:5050";
                var _showcount=1;
                var _desc="Tao";
                var _summary="主页内容";
                var _title="第一个";
                var _site="111";
                var _pic="../image/rain.jpg";
                var _shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
                    _shareUrl += 'url=' + encodeURIComponent(_url||document.location);   //参数url设置分享的内容链接|默认当前页location
                    _shareUrl += '&showcount=' + _showcount||0;      //参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
                    _shareUrl += '&desc=' + encodeURIComponent(_desc||'分享的描述');    //参数desc设置分享的描述，可选参数
                    _shareUrl += '&summary=' + encodeURIComponent(_summary||'分享摘要');    //参数summary设置分享摘要，可选参数
                    _shareUrl += '&title=' + encodeURIComponent(_title||document.title);    //参数title设置分享标题，可选参数
                    _shareUrl += '&site=' + encodeURIComponent(_site||'');   //参数site设置分享来源，可选参数
                    _shareUrl += '&pics=' + encodeURIComponent(_pic||'');   //参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
                    window.open(_shareUrl,'_blank');
            })
        //   $('.share_qq_firends').click(function(){ 
        //       var _url="http://book688.applinzi.com:5050";
        //       var _title="我的主页";
        //         var _shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html?';
        //             _shareUrl += 'url=' + encodeURIComponent(_url||location.href);   //分享的链接
        //             _shareUrl += '&title=' + encodeURIComponent(_title||document.title);     //分享的标题
        //         window.open(_shareUrl,'_blank');
        //   })
            
            })


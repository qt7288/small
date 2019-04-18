        function postuser(){
        // *********************************************************
        //根据id查询一个用户
            var xhr=new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                    if(xhr.readyState==4 && xhr.status==200){
                        var result=xhr.responseText;
                        //保存的是json字符串
                        //转换成js对象数组
                        var arr=JSON.parse(result);
                        //可以使用js对象所有的api去操作
                        var c="";
                        console.log(arr);
                        for(var i=0;i<arr.length;i++){
                            c+="<tr>";
                            c+="<td>"+arr[i].id+"</td>";
                            c+="<td>"+arr[i].uname+"</td>";
                            c+="<td>"+arr[i].upwd+"</td>";
                            c+="<td>"+arr[i].email+"</td>";
                            // c+="<td>"+arr[i].gender+"</td>";
                            c+="<td>"+arr[i].ctime+"</td>";
                            var gender="";
                            if(arr[i].gender==0){gender="女";}else if(arr[i].gender==1){gender="男";}else{gender="不详";}
                            c+="<td>"+gender+"</td>";
                            c+="<td>"+"<a class='list' href='04_query.html?id="+arr[i].id+"'>修改</a>";
                            c+="<a class='list' href='javascript:deleteUser("+arr[i].id+")'>删除</a>"+"</td>";
                            c+="</tr>";
    
                        }		
                        dd.innerHTML=c;
                    }					
                }
                //a标签中添加修改代码
                
                //demo/postlogin
                var url="/myPro/list";
                //打开链接，创建请求
                xhr.open("get",url,true);
            //open-send之间由于默认请求是text/plain，无法传递特殊符号，&
                //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                //var formdata="uname="+uname.value;
                //console.log(formdata);
                //console.log(uname.value);
                xhr.send(null);
                //发送请求	
                    }
                    //删除
                function deleteUser(id){
                    var xhr=new XMLHttpRequest();
                    xhr.onreadystatechange=function(){
                        if(xhr.readyState==4 && xhr.status==200){
                            var result=xhr.responseText;
                            if(result=="1"){
                                // 数据库操作人员*操作是否删除数据
                                alert(`"谨慎操作.删除第"+${id}+"数据信息-----成功"`);
                                postuser();
                            }
                        }	
            };
            var url="/myPro/deleteUser?id="+id;
            xhr.open("get",url,true);
                xhr.send();
        }
        //查询跳转修改
                    function getInfo(id){
                    var xhr=new XMLHttpRequest();
                    xhr.onreadystatechange=function(){
                        if(xhr.readyState==4 && xhr.status==200){
                            var result=xhr.responseText;
                            console.log(result);
                }	
            };
            var url="/myPro/query?id="+id;
            xhr.open("get",url,true);
            xhr.send();
        }
/*****************************文本**************************************/ 
function postText(){
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var result=xhr.responseText;
            //保存的是json字符串
            //转换成js对象数组
            var arr=JSON.parse(result);
            //可以使用js对象所有的api去操作
            var a="";
            console.log(arr);
            for(var i=0;i<arr.length;i++){
                a+="<tr>";
                a+="<td>"+arr[i].tid+"</td>";
                a+="<td>"+arr[i].sltext+"</td>";
                a+="<td>"+arr[i].srtext+"</td>";
                a+="<td>"+arr[i].ftext+"</td>";
                a+="<td>"+arr[i].time+"</td>";
                // c+="<td>"+arr[i].gender+"</td>";
                a+="<td>"+arr[i].cimg+"</td>";
                a+="<td><a class='list' href='javascript:deleteText("+arr[i].tid+")'>删除</a>"+"</td>";
                a+="</tr>";

            }		
            aa.innerHTML=a;
        }					
    }
            //a标签中添加修改代码
            
            //demo/postlogin
            var url="/myPro/qz_text_root";
            //打开链接，创建请求
            xhr.open("get",url,true);
        //open-send之间由于默认请求是text/plain，无法传递特殊符号，&
            //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            //var formdata="uname="+uname.value;
            //console.log(formdata);
            //console.log(uname.value);
            xhr.send(null);
            //发送请求	
                }postText();
                //删除
            function deleteText(tid){
                var xhr=new XMLHttpRequest();
                xhr.onreadystatechange=function(){
                    if(xhr.readyState==4 && xhr.status==200){
                        var result=xhr.responseText;
                        if(result=="1"){
                            // 数据库操作人员*操作是否删除数据
                            alert(`"谨慎操作.删除第"+${tid}+"数据信息-----成功"`);
                            postText();
                            // window.location.href="http://book688.applinzi.com/02_list.html";
                        }
                    }	
        };
        var url="/myPro/deleteText?tid="+tid;
        xhr.open("get",url,true);
            xhr.send();

    
    }

    // 功能
$(function(){
    var isT=true;
    $('.insert_h').click(function(){
        if(isT){
             $('.Add').show();
             $('.insert_h').html(`<p>Add article：上传热门文件▼</p>`);
             isT=false;
        }else{
            $('.Add').hide();
            $('.insert_h').html(`<p>Add article：上传热门文件▲</p>`);
            isT=true;
        }      
    })
    var T=true;
    $('.upDate-h').click(function(){
        if(T){
             $('.modify').show();
             $('.upDate-h').html(`<p>Modify file：修改文件▼</p>`);
             T=false;   
        }else{
            $('.modify').hide();
            $('.upDate-h').html(`<p>Modify file：修改文件▲</p>`);
            T=true; 
        }
           
    })
    // 判断
    $('input[type=text]').blur(function(){
            var param = $(this);
            if(param.val()==""){
                param.css("background-color","rgb(243, 112, 112)");
            }else{
                param.css("background-color","white");
            }
    })
    var param3 = $("input[name='d']");
    var image=param3.val();
    $("#image-f").html(`
        <img src="${image}" alt="">
    `); 

    // 检测
    
var inputBox = document.getElementById("image-s");
var img = document.getElementById("image-f");
inputBox.addEventListener("change",function(){
  var reader = new FileReader();
  reader.readAsDataURL(inputBox.files[0]);//发起异步请求
  reader.onload = function(){
    //读取完成后，将结果赋值给img的src
    img.src = this.result
  }
})
    // console.log($("#image-f"));
    // console.log(image);
    $('.btn1').click(function(){
            var param0 = $("input[name='a']");
            var param1 = $("input[name='b']");
            var param2 = $("input[name='c']");
            var param3 = $("input[name='d']");
            var name=param0.val();
            var Title=param1.val();
            var content=param2.val();
            var imagef=param3.val();

            console.log(name+"."+Title+"."+content);
            $.ajax({ 
                type: "POST",         
                data: {name,Title,content,imagef},
                dataType: "JSON", 
                // async: false, 
                url: "rootR/qz_schuan",
                success: function(data) {
                    console.log(data);
                    if(data.code==200){
                                       $("input[name='a']").val("");
                                        $("input[name='b']").val("");
                                        $("input[name='c']").val("");
                                        $("input[name='d']").val("");
                                        $('.tp').html(`状态:上传成功`);  
                                        postText();             
                    }
                }
            });   
    })
    /*注释：次数简介为w543*/
    $('.btn2').click(function(){
        var param6 = $("input[name='tid']");
        var tid=param6.val();
        console.log(tid);
        $.ajax({ 
            type: "GET",         
            data: {tid},
            dataType: "JSON", 
            // async: false, 
            url: "rootR/qz_text_select",
            success: function(data){
                console.log(data);
                if(data.code==200){
                    $('.state-h').html(`状态:查询成功`);
                    $("input[name='sltext']").val(`${data.data[0].sltext}`);
                    // $("input[name='srtext']").val(`${data.result[0].srtext}`);
                    $("textarea[name='srtext']").val(`${data.data[0].srtext}`);
                }
            }
        });
}) 
    /*注释：此处简介为update*/ 
    $('.btn3').click(function(){
        var param4 = $("input[name='sltext']");
        var param5 = $("textarea[name='srtext']");
        var param6 = $("input[name='tid']");
        var sltext=param4.val();
        var srtext=param5.val();
        var tid=param6.val();
        if(param4==""){
            $.ajax({ 
                type: "POST",         
                data: {sltext,srtext,tid},
                dataType: "JSON", 
                // async: false, 
                url: "rootR/qz_text_ins",
                success: function(data) {
                    console.log(data);
                    if(data.code==200){
                                       $("input[name='sltext']").val("");
                                        // $("input[name='srtext']").val("");
                                        $("textarea[name='srtext']").val("");
                                        $('.state').html(`状态:上传成功`);  
                    }
    
                }
            });
        }else{

        // console.log(sltext+"."+srtext+":"+tid);
        $.ajax({ 
            type: "POST",         
            data: {sltext,srtext,tid},
            dataType: "JSON", 
            // async: false, 
            url: "rootR/qz_text_update",
            success: function(data) {
                console.log(data);
                if(data.code==200){
                                   $("input[name='sltext']").val("");
                                    // $("input[name='srtext']").val("");
                                    $("textarea[name='srtext']").val("");
                                    $('.state').html(`状态:上传成功`);  
                }

            }
        });
         }
})
    $(".middle-right").click(function(){
        $("#left").css({"width":"100%"})
        $("#left").show();
        $("#right").css("z-index","-1");
    })
    $(".middle-center").click(function(){
        $("#left").css({"width":"50%"});
        $("#right").css({"width":"50%"});
        $("#left").show();
        $("#right").show();
    })
})

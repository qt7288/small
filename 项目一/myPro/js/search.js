// 导航nav的标签信息
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
                    <li title="home"><a href="#">${data[0].smtext}</a></li>
                    <li class="dnone"><a href="javascript:;">${data[1].smtext}</a> 
                        <ul class="dul">
                            <li>${data[6].smtext}</li>
                            <li>${data[7].smtext}</li>
                            <li>${data[8].smtext}</li>
                            <li>${data[9].smtext}</li>
                        </ul>
                    </li>
                    <li><a href="javascript:;">${data[3].smtext}</a></li> 
                    <li><a href="javascript:;">${data[4].smtext}</a></li>
                    <li class="dnone"><a href="Fchain.html" title="Friend chain">${data[5].smtext}</a>
                        <ul class="dul">
                            <li class="gw">${data[10].smtext}</li>
                            <li class="sb">${data[11].smtext}</li>
                            <li class="about"><a href="http://172.242.3.181:5500/public/say.html">${data[12].smtext}</a></li>
                        </ul>
                    </li>
                    <li><a href="http://172.242.3.181:8080/#/reg">${data[6].smtext}</a> </li>
                </ul>
                `)
        }
    });


  });


    // card数据查询
  $(function(){
    // $('input.btn').click(function(){
    //     var $value = $('#el').val();  //获取input的值
    //     console.log($value);
    $.ajax({ 
        type: "GET",
        data:"",         
        dataType: "JSON", 
        async: true, 
        url: "myPro/qz_textt",
        success: function(data) {
           

            var carda="";
            // var xx=9;
            // var yy=data.length/2;
            for(var i=0;i>data.length;i--){
                carda+=`
                <div class="card">
                <div class="card-img">
                    <img src="${data[i].cimg}"></img>
                </div>
                <div class="card-r">
                    <h3><span>${data[i].sltext}</span>${data[i].srtext}</h3>
                    <h4>${data[i].ftext}</h4>
                </div>
                <div id="card-f">
                    <div class="c-f-l">
                        <span>${data[i].time}</span>
                    </div>
                    <div class="c-f-r">
                        <!-- <span @click="zanr"><a href="javascript:;">点赞</a></span> -->
                        <span @click="timer"><a href="javascript:;">阅读全文➷</a> </span>
                    </div>   
                    <div class="c-f-f"></div>
                </div>           
            </div>
                `;
           }
        $('.s-l').html(carda);
            // <span>${data[2].srtext}</span>${data[i].sltext}
        
    },
    error: function (errorMsg) {
        alert("request data failed!!!");
    }
    });
  });
// })
// console.log($('form input.btn'));

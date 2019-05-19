var root = window.player;
var nowIndex = 0;
var dataList,
    len;
var audio = root.audioManage;
var control;
var timer;

//获取数据
function getData(url) {
    $.ajax({
        type:"GET",
        url:url,
        success:function(data){
            len = data.length;
            control = new root.indexControl(len);
            dataList = data;
            root.render(data[0]);
            audio.getAudio(data[0].audio);
            root.pro.renderAllTime(data[0].duration);
            root.list.renderList(dataList);
            bindEvent();
            bindTouch();
        },
        error: function() {
            console.log("error");
        }
    })
}
getData('../mock/data.json');

function bindEvent (){
    $('body').on('playchang',function(e, index){
        audio.getAudio(dataList[index].audio);
        var deg =  $('.img-box').attr('data-deg');
        root.render(dataList[index]);    
        if(audio.status == 'play'){
            audio.play();
            root.pro.start();
            rotated(0);
            root.pro.start(0);
        }
        root.pro.renderAllTime(dataList[index].duration);
        root.list.liActive(index);
    })

    $('.prev').on('click',function(){
        var i = control.prev();   
        $('body').trigger('playchang',i); 
    })

    $('.next').on('click',function(){
        var i = control.next();
        $('body').trigger('playchang',i); 
    })

    $('.play').on('click',function() {
        if(audio.status == 'pause'){
            audio.play();
            root.pro.start();
            var deg =  $('.img-box').attr('data-deg');
            rotated(deg);
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })

    $('.list').on('click',function(e){
        e.stopPropagation();
        $('.listmenu').addClass('lock');
    })
    $('.wrapper').on('click',function(){
        $('.listmenu').removeClass('lock');
    })
    $('.close').on('click',function(){
        $('.listmenu').removeClass('lock');
    })
}

function rotated(deg){
    clearInterval(timer);
    deg = + deg;
    timer = setInterval(function() {
        deg += 1;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform': "rotateZ("+ deg +"deg)",
            'transition': 'all .1s ease-out'
        });
    },100);
}

function bindTouch () {
    var slider = $(".silder");
    var offset = $('.pro-bottom').offset();
    var left = offset.left;
    var width = offset.width;
    slider.on("touchstart",function(e) {
        root.pro.stop();
    }).on("touchmove",function(e){
        //进度条移动
        var x =  e.changedTouches[0].clientX;
        var pre = (x - left) / width;
        if(pre >=0 && pre <= 1 ){
            root.pro.updata(pre);
        }
    }).on("touchend", function(e){
        var x =  e.changedTouches[0].clientX;
        var pre = (x - left) / width;
        //播歌
        if(pre >=0 && pre <= 1 ){
            var curtime = pre * dataList[control.index].duration;
            audio.playTo(curtime);
            audio.play();
            root.pro.start(pre);
            $('.play').addClass('playing');
        }
    })
}
//点击按钮

//唱片旋转

//图片、信息渲染

//音乐的播放 暂停 切歌

//进度条的移动与拖拽

//目录切歌


(function($,root){
    function renderImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function (){
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform': "rotateZ(0deg)",
            'transition': 'none'
        });
    }

    function renderInfo(data){
        var str = '<div class="song-name">' + data.song + '</div>\
        <div class="singer-name">' + data.singer + '</div>\
        <div class="album-name">' + data.album + '</div>';
        $('.song-info').html(str);
    }

    function renderIslike(like){
        if(like){
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }

    function render(data) {
        renderImg(data.image);
        renderInfo(data);
        renderIslike(data.isLike)
    }
    root.render = render;
})(window.Zepto, window.player || (window.player = {}))
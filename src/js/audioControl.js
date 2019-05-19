(function ($, root) {
    //构造函数
    function AudioManage () {
        this.audio = new Audio();
        this.status = "pause";
    }
    AudioManage.prototype = {
        play:function(){
            this.audio.play();//播放音乐
            this.status = "play";
        },
        pause:function(){
            this.audio.pause();//暂停音乐
            this.status = "pause";
        },
        getAudio:function(src){
            this.audio.src = src;
            this.audio.load();//加载音乐
        },
        playTo:function(time) {
            this.audio.currentTime = time;
        }
    }

    root.audioManage = new AudioManage();
})(window.Zepto, window.player || (window.player = {}))
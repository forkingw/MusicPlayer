(function ($, root) {
    var dur;
    var frameId;
    var starttime;
    var lasttime = 0;
    function renderAllTime(time) {
        dur = time;
        var time = formatTime(time);
        $('.all-time').text(time);

    }
    function formatTime(time) {
        time = Math.round(time);
        var s = time % 60;
        var m = Math.floor(time / 60);
        s = s >= 10 ? s : "0" + s;
        m = m >= 10 ? m : "0" + m;
        return m + ":" + s;
    }

    function start(p) {
        lasttime = p == undefined ? lasttime : p;
        starttime = new Date().getTime();

        function frame() {
            var curtime = new Date().getTime();
            var pre = lasttime + (curtime - starttime) / (dur * 1000);
            if (pre < 1) {
                updata(pre);
            } else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function updata(pre) {
        //更新 当前播放到的时间 和 进度条
        var time = formatTime( pre * dur );
        var pre = (pre - 1) * 100 + '%';
        $('.cur-time').text(time);
        $('.pro-top').css({
            "transform": "translateX(" + pre +")"
        })
    }

    function stop () {
        var pausetime = new Date().getTime();
        lasttime = lasttime + pausetime - starttime;
        cancelAnimationFrame(frameId);
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop:stop,
        updata: updata
    }
})(window.Zepto, window.player || (window.player = {}));
(function($, root){
    function Control(len){
        this.index = 0;
        this.len = len;
    }  

    Control.prototype = {
        prev:function () {
            return this.getCurindex(-1);
        },
        next:function () {
            return this.getCurindex(1);
        },
        getCurindex: function (val) {
            var index = this.index;
            var len = this.len;
            var curindex = (index + val + len) % len;
            this.index = curindex;
            return curindex;
        }
    }

    root.indexControl = Control;
})(window.Zepto, window.player || (window.player = {}));
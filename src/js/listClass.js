(function ($, root) {
    function renderList(data) {
        var data = data;
        var len = data.length;
        var oclone = $('.cloneLi'),
            ulWrap = $('.listmenu ul');
        $('.listNum').text("(" + len + ")")
        for (var i = 0; i < len; i++) {
            var oLi = oclone.clone();
            oLi.removeClass('cloneLi')
                .attr('data-index', i)
                .find('.listsong')
                .text(data[i].song)

            oLi.find('.listsinger')
                .text(" - " + data[i].singer);
            bindEvent(oLi);
            ulWrap.append(oLi);

        }
        liActive(0);
    }
    function bindEvent(oDom) {
        oDom.on('click', function (e) {
            var targetP = $(e.target).parents('li')
            var tar = targetP.length == 1 ? targetP : $(e.target);
            var index = tar.attr('data-index');
            $('body').trigger('playchang', index);
            if(root.audioManage.status == 'pause'){
                $('.play').trigger('click');
            }
        })
    }
    function liActive(index) {
        $('.active').removeClass('active');
        var oLi = $("ul li");
        for (var i = 0; i < oLi.length; i++) {
            var num = $(oLi[i]).attr("data-index");
            if (num == index) {
                $(oLi[i]).addClass('active')
                         .find('.listsinger')
                         .addClass('active');
            }
        }
    }
    root.list = {
        renderList: renderList,
        liActive:liActive
    }
})(window.Zepto, window.player || (window.player = {}));
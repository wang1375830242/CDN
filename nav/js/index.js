layui.use(['laytpl', 'util', 'layer'], function () {
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    /*搜索框相关词加载*/
    var bdkeyword = "";
    $(".indexSearch input").keyup(function (e) {
        if (e.keyCode == 13) {
            window.open($(".indexSearch .btn").attr("href"), "_blank");
        } else {
            $(".indexSearch .btn").attr("href", "https://www.baidu.com/s?ie=utf-8&wd=" + $(this).val());
            loadKeyword($(this));
        }
    });
    $(".indexSearch input").click(function (e) {
        if ($(this).val()) {
            if (bdkeyword != $(this).val()) {
                loadKeyword($(this));
            } else {
                if ($(".selectul").html() != "") {
                    $(".selectul").show();
                }
            }
        }
        return false;
    });
    function loadKeyword(that) {
        $.get("https://www.daohangtx.com/test/bdkeyword.php?wd=" + that.val(), function (res) {
            if (res) {
                bdkeyword = that.val();
                res = eval("(" + res + ")");
                laytpl($("#keywordList").html()).render(res, function (html) {
                    if (html.trim() != "") {
                        $(".selectul").show().html(html);
                    } else {
                        $(".selectul").hide().html("");
                    }
                });
            } else {
                $(".selectul").hide().html("");
            }
        });
    }
  
    $(document).click(function (e) {
        $(".selectul").hide();
    }); /*首页推荐栏悬浮后展开下拉框*/
    $(".indexWebList li a .xl").hover(function () {
        $(this).parents("li").find(".info").show();
        $(this).parents("li").find(".xl").addClass("xlhover")
    });
    $(".indexWebList li").mouseleave(function () {
        $(this).find(".info").hide();
        $(this).find(".xl").removeClass("xlhover")
    });
    $(".indexWebList li a .xl").click(function (e) {
        e.preventDefault();
    });
});
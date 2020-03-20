/*导航栏目切换样式*/
$(".border-bottom").css({
    "transition": "0s all"
});
var navnow = $("header nav .hover").index();
if (navnow >= 0) {
    $(".border-bottom").css({
        "display": "block",
        "left": $("header nav div").eq(navnow).position().left + parseInt($("header nav div").eq(navnow).css("padding-left")),
        "width": $("header nav div").eq(navnow).width()
    });
} else {
    $(".border-bottom").hide();
}
$(".border-bottom").css({
    "transition": "0.2s all"
});
$("header nav div").hover(function (e) {
    $(".border-bottom").show();
    $("header nav .hover").removeClass("hover");
    $(this).addClass("hover");
    $(".border-bottom").css({
        "left": $(this).position().left + parseInt($("header nav div").eq(navnow).css("padding-left")),
        "width": $(this).width()
    });
}, function (e) {
    $("header nav .hover").removeClass("hover");
    if (navnow >= 0) {
        $("header nav div").eq(navnow).addClass("hover");
        $(".border-bottom").css({
            "left": $("header nav div").eq(navnow).position().left + parseInt($("header nav div").eq(navnow).css("padding-left")),
            "width": $("header nav div").eq(navnow).width()
        });
        return;
    }
    $(".border-bottom").hide();
});
/*数值转换*/
function castNum(num) {
    if (num < 100) {
        return num;
    } else if (num >= 1000 && num < 10000) {
        var newNum = (num / 1000).toFixed(1) + "K";
        return newNum;
    } else if (num >= 10000 && num < 100000000) {
        var newNum = (num / 100000000).toFixed(2) + "W";
        return newNum;
    } else if (num >= 100000000 && num < 10000000000000000) {
        var newNum = (num / 100000000).toFixed(2) + "E";
        return newNum;
    } else {
        var newNum = "亿亿以上+";
        return newNum;
    }
} 
/*返回顶部*/
if ($(".backtop").length > 0) {
    if ($(document).scrollTop() > 200) {
        $(".backtop").show();
    } else {
        $(".backtop").hide();
    }
    $(document).scroll(function (e) {
        if ($(this).scrollTop() > 200) {
            $(".backtop").show();
        } else {
            $(".backtop").hide();
        }
    });
    $(".backtop").click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 'slow');
    });
} /*是否今天*/
function isToday(date) {
    date = /\s*/.test(date) ? date.split(" ")[0] : date;
    var now = new Date();
    var seperator1 = "-";
    var month = now.getMonth() + 1;
    var strDate = now.getDate();
    var year = now.getFullYear();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate === date;
} /*加载当前时间*/
$(".time").html(getTimeHtml());
setInterval(function () {
    $(".time").html(getTimeHtml());
}, 1000); /*获取当前时间段*/
function getTimeHtml() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hh = now.getHours();
    var mm = now.getMinutes();
    var ss = now.getSeconds();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    if (ss < 10) ss = "0" + ss;
    return "<span>" + month + "</span> <small>月</small> <span>" + day + "</span> <small>" + hh + ":" + mm + ":" + ss + " 周" + "日一二三四五六".charAt(new Date().getDay()) + "</small>";
}

function request(option) {
    if (typeof (option) !== 'object') {
        console.warn("option is not a 'object'");
        return false;
    }
    if (typeof (layer) === 'undefined') {
        layui.use('layer', ajx(true));
    } else {
        ajx();
    }
    if (typeof (option.loading) !== 'boolean') {}

    function ajx(o) {
        if (o) {
            layer = layui.layer;
        }
        $.ajax({
            url: option.url || location.pathname,
            data: option.data || null,
            dataType: option.dataType || 'JSON',
            type: option.type || 'post',
            async: typeof (option.async) === 'boolean' ? option.async : true,
            success: option.success || function (res) {
                if (res.data) {
                    var delay = res.data.delay || 0;
                    delay && (delay *= 1000);
                    res.data.redirect && (setTimeout(function () {
                        location = res.data.redirect;
                    }, delay));
                    res.data.reload && (option.reload = parseFloat(res.data.reload));
                    if (res.data.alert) {
                        res.msg && layer.open({
                            type: 0,
                            shadeClose: true,
                            shade: ["0.6", "#7186a5"],
                            skin: 'atuikeLayerSkin1',
                            content: res.msg
                        });
                    }
                }
                if (!res.data || !res.data.alert) {
                    var cfg = typeof (res.data.icon) !== "boolean" ? {
                        icon: (res.code || 0),
                        offset: '20%'
                    } : {};
                    res.msg && layer.msg(res.msg, cfg);
                }
                option.done && option.done(res);
            },
            complete: function () {
                if (typeof (option.loading) !== 'boolean') {}
                setTimeout(function () {
                    var ret = option.reload || false;
                    if (ret) {
                        ret = (typeof (ret === 'number')) ? ret : 0;
                        setTimeout(function () {
                            location.reload();
                        }, ret * 1000);
                    }
                }, 10);
            },
            error: option.error || function (e) {
                layer.msg('网络异常:' + e.statusText || e.statusMessage);
            }
        });
    }
}
$.fn.field = function () {
    var arr_data = $(this).serializeArray();
    var formData = {};
    if (arr_data.length > 0) {
        arr_data.forEach(function (item) {
            formData[item.name] = item.value;
        });
    }
    return formData;
};

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null
    } else {
        begin += 2
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length
    }
    return unescape(dc.substring(begin + prefix.length, end))
}

function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString();
}

function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}
Array.prototype.ArrDelVal = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
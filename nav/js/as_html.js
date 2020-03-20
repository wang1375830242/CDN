var layer;
layui.use('layer', function(){
    layer = layui.layer;
});
/* 联系QQ弹出框 */
function lxzz(qq) {
    if (qq) {
        if (qq === "---") {
            layer.open({
                type: 0,
                shadeClose: true,
                skin: 'atuikeLayerSkin1',
                content: '该作者由于违反本站管理规范，已被管理员封禁账号。无法联系',
                btn: ['我知道了']
            });
            return;
        }

        layer.open({
            type: 0,
            shadeClose: true,
            skin: 'atuikeLayerSkin1',
            content: '请不要骚扰管理员<font color="red"> 商务合作 </font> 欢迎点击联系！',
            btn: ['继续联系', '取消'],
            yes: function () {
                window.open("http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes", "_blank");
                layer.closeAll();
            }
        });

    } else {
        layer.open({
            type: 0,
            shadeClose: true,
            skin: 'atuikeLayerSkin1',
            content: '该管理员没有填写QQ联系方式，无法联系~',
            btn: ['我知道了']
        });
    }
}
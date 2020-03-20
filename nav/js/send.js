layui.use(['layer','element','form'],function(){
    var form = layui.form;
    var layer = layui.layer;
    var element = layui.element;
    /**
     * 通用表单提交(AJAX方式)
     */
    form.on('submit(*)', function (data) {
        var loading = layer.load(0, {shade: false});
        $.ajax({
            url: data.form.action,
            type: data.form.method,
            data: $(data.form).serialize(),
            success: function (info) {
                layer.close(loading);

                if (info.code === 1) {
                    setTimeout(function () {
                        location.href = info.url;
                    }, 1000);
                        showSuccess(info.msg);
                } else {
                        showError(info.msg);
                }
            },
            complete:function(){
                if(data.field.verify){
                    $("#verify").click();
                }
            }
        });
        return false;
    });
  
    //成功提示
    function showSuccess(msg){
        layer.msg(msg,{
            icon:1,
            shade:0.3,
            anim:1
        });
    }
	
    //错误提示
    function showError(msg){
        layer.msg(msg,{
            icon:2,
            shade:0.3,
            anim:1
        });
    }

});
function tc_Open() { 
    $("#File").click();
};
$(document).ready(function() {
     $("input[type='file']").change(function(e) {
          file_upload(this.files)
     });
     var obj = $('body');
     obj.on('dragenter', function(e) {
          e.stopPropagation();
          e.preventDefault()
     });
     obj.on('dragover', function(e) {
          e.stopPropagation();
          e.preventDefault()
     });
     obj.on('drop', function(e) {
          e.preventDefault();
          file_upload(e.originalEvent.dataTransfer.files)
     });
});
function file_upload(files){
    if (files.length == 0) return msg('2','请选择图片文件！');
         for(var j = 0,len = files.length; j < len; j++){
                let imageData = new FormData();
                imageData.append("file", 'multipart');
                imageData.append("Filedata", files[j]);
                $.ajax({
                    url: "https://api.uomg.com/api/image.ali",
                    type: 'POST',
                    data: imageData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    success: function (result) {
                        if (result.code == 1){
                            $('input[name=thumb]').val(result.imgurl);
                            mgs('1','上传成功');
                        }else{
                            msg('2','第'+j+'个图片上传失败');
                        }
                    },
                    error: function () {
                        msg('2','图片上传失败');
                    }
                });
          }
}

function isNull(str) {
	if(str==undefined||str==null||str==""){
	    return false;
	}
	    return true;
}

function mgs(type,msg) {
	if(isNull(type) && isNull(msg)){
		return layer.msg(msg,{icon:type});
	}else{
		return layer.msg("参数错误!",{icon:2});
	}
}

layui.use(['flow', 'layer','laytpl'], function() {
	var flow = layui.flow;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var getTpl = $("#list").html();
    var view = $(".shop_li");
    loadData();

	function loadData(parm){
		$(".shop_li").html("");
		flow.load({
			elem: '.shop_li',
            isAuto:true,
            done: function(page, next){
				var lis = [];
				$.getJSON("/goods.html", function(res){
					if(res.code==0){
						$(".nodata").show();
                        $(".layui-flow-more").hide();
					}else{
						$(".nodata").hide();
                        $(".layui-flow-more").show();
					}
					laytpl(getTpl).render(res, function(html){
						lis.push(html);
					});
					next(lis.join(''), page < 9);
				});
			}
		});
	}
});
$("a").click(function () {
    var link = $(this).attr('href');
    if (!link) {
        return false;
    };
    $.ajax({
        type: "POST",
        url:  '/add-views-'+ web_id +'.html',
        dataType: "json",
        data: {
            
        },
        success: function (res) {
            console.log(link);
        }
    });
});
request({
    url: '/get-statistics-'+ web_id +'-1.html',
    success: function (res) {
        var data_json = [];
        res.date_a.forEach(function (v, i) {
            var json = {};
            json.value = v;
            if (i === 0) {
                json.textStyle = {
                    align: "left"
                };
            } else if (i === 6) {
                json.textStyle = {
                    align: "right"
                };
            } else {
                json.textStyle = {
                    align: "center"
                };
            }
            data_json.push(json);
        }); /*渲染图表*/
        var myChart = echarts.init(document.getElementById('sentiment'));
        var option = {
            color: ['#80e0d1'],
            tooltip: {
                trigger: 'axis',
                enterable: !1,
                extraCssText: "border-radius:0;padding:0;border:1px solid #20c4ab;background-color:rgba(255,255,255,.95);",
                formatter: function (e, t, n) {
                    var i = e[0];
                    return '<dl class="x-c-t-tooltip"><dt>日期：' + i.axisValue + "</dt><dd><div><strong>点击数量<span>：" + i.data + "</span></strong></div>" + [].join("") + "</dd></dl>";
                }
            },
            grid: {
                left: '0',
                top: '25px',
                right: '0',
                bottom: '0',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                axisLabel: {
                    show: true,
                    margin: 20,
                    textStyle: {
                        color: '#ababab',
                        'fontSize': 14,
                    }
                },
                boundaryGap: false,
                data: data_json,
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: ["#F8F8F8"]
                    }
                },
                axisLabel: {
                    show: !1,
                    inside: true
                },
                splitLine: {
                    lineStyle: {
                        color: ["#F8F8F8"]
                    }
                }
            }],
            series: [{
                name: '总共访问',
                type: 'line',
                stack: '总量',
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 2
                        }
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 1,
                        color: {
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            type: "linear",
                            global: !1,
                            colorStops: [{
                                offset: 0,
                                color: "#80e0d1"
                            }, {
                                offset: 1,
                                color: "#FFFFFF"
                            }]
                        }
                    }
                },
                data: res.date_b
            }]
        };
        myChart.setOption(option);
    }
});
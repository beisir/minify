/**
 * [p4p 图表配置 ]
 * [echarts,jQuery]
 * [-------------------------------------------------]
 */
$(document).ready(function (){
    /**
     * [p4pEchartsMicro 构造函数 初始化程序 ]
     * [options:{ null } ]
     * [-------------------------------------------------]
     */
    var p4pEchartsMicro = function (){
        var _this = this;
        var jsonpUrl = 'http://p4p.hc360.com/p4phome/report/contrastReport.html?callback=?';
        _this.getInitChartData(jsonpUrl,1);
        /**
         * [clcik: 点击事件  ]
         * [options:{ null } ]
         * [ps: 页面tab 切换时更改cur样式,同时请求不同数据源]
         * [-------------------------------------------------]
         */
        $('.dataTxt2').on('click', 'a', function (){
            $(this).addClass('on').siblings().removeClass('on');
            var index = $(this).index();
            // 请求数据并且处理数据Function
            _this.getInitChartData(jsonpUrl,index + 1);
        });
        // 存储echarts 实例列表Array;
        this.chartDom = [];
        this.initResize();

    };
    /**
     * [p4pEchartsMicro.prototype 构造函数原型对象 ]
     * [options:{ Object } ]
     * [-------------------------------------------------]
     */
    p4pEchartsMicro.prototype = {
        /**
         * [copyTxtArr 配置图表提示语 ]
         * [options:{ prompt: 条件大于50% 提示语, wellTxt: 条件小于50%提示语, link: 当条件小于50% 在提示语上添加链接地址} ]
         * [ps: 五个不同的图表根据不同状态，显示不同的提示语，并添加链接 ]
         * [-------------------------------------------------]
         */
        // copyTxtArr: [{
        //     prompt: '您当前总点击量排名占行业优质客户的50%，建议您 修改商机 增加总点击量',
        //     wellTxt: '您的账户良好，请继续保持。',
        //     link: 'http://p4p.hc360.com/p4phome/p4p/promotionmanage/promotioncommodity.html'
        // },{
        //     prompt: '您当前总展现量排名占行业优质客户的50%，建议您 新增关键词 增加总展现量',
        //     wellTxt: '您的账户的展现良好，请继续保持',
        //     link: 'http://p4p.hc360.com/p4phome/p4p/promotionmanage/addkeyword.html?planselect='
        // },{
        //     prompt: '您当前曝光关键词数排名占行业优质客户的50%，建议您 修改绑定关键词 快速增加曝光率',
        //     wellTxt: '您的账户内设置的关键词均获得曝光，请继续保持',
        //     link: 'http://p4p.hc360.com/p4phome/p4p/promotionmanage/promotionmanagekeyword.html'
        // },{
        //     prompt: '您当前的点击信息数数排名占行业优质客户的50%，建议您 添加商机 增加总点击量',
        //     wellTxt: '您的账户内绑定的信息均获得买家查看，请继续保持',
        //     link: 'http://p4p.hc360.com/p4phome/p4p/promotionmanage/addkeyword.html'
        // },{
        //     prompt: '预计错过展现量低于50%的用户，建议您 修改日预算 快速增加曝光率',
        //     wellTxt: '您的账户良好，请继续保持。',
        //     link: 'http://p4p.hc360.com/p4phome/p4p/homepage/p4phomepage.html'
        // }],
        copyTxtArr: [{
            prompt: '您当前总点击量排名占行业优质客户的<span style="color:#fc6621;">-50-%</span>，建议您<a target="_black" href="http://p4p.hc360.com/p4phome/p4p/promotionmanage/promotioncommodity.html"> 修改商机 </a>增加总点击量',
            wellTxt: '您的账户良好，请继续保持。'
        },{
            prompt: '您当前总展现量排名占行业优质客户的<span style="color:#fc6621;">-50-%</span>，建议您<a target="_black" href="http://p4p.hc360.com/p4phome/p4p/promotionmanage/addkeyword.html?planselect="> 新增关键词 </a>增加总展现量',
            wellTxt: '您的账户的展现良好，请继续保持'
        },{
            prompt: '您当前曝光关键词数排名占行业优质客户的<span style="color:#fc6621;">-50-%</span>，建议您<a target="_black" href="http://p4p.hc360.com/p4phome/p4p/promotionmanage/promotionmanagekeyword.html"> 修改绑定关键词 </a>快速增加曝光率',
            wellTxt: '您的账户内设置的关键词均获得曝光，请继续保持'
        },{
            prompt: '您当前的点击信息数数排名占行业优质客户的<span style="color:#fc6621;">-50-%</span>，建议您<a target="_black" href="http://p4p.hc360.com/p4phome/p4p/promotionmanage/addkeyword.html"> 添加商机 </a>增加总点击量',
            wellTxt: '您的账户内绑定的信息均获得买家查看，请继续保持'
        },{
            prompt: '预计错过展现量低于<span style="color:#fc6621;">-50-%</span>的用户，建议您<a target="_black" href="http://p4p.hc360.com/p4phome/p4p/homepage/p4phomepage.html"> 修改日预算 </a>快速增加曝光率',
            wellTxt: '您的账户良好，请继续保持。'
        }],
        /**
         * [pvOption 图表默认配置 ]
         * [options:{ Object} ]
         * [ps: echarts 图表配置，五个图表除数据之外其他配置相同， 所以五个图表共用一个配置 ]
         * [-------------------------------------------------]
         */
        pvOption: {
            color: ['#75ade4','#fecb2f','#fc6621'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: 5,
                right: 15,
                bottom: 0,
                top: 5,
                containLabel: true
            },
            toolbox: {
                show : false
                // feature : {
                //     mark : {show: true},
                //     dataView : {show: true, readOnly: false},
                //     magicType: {show: true, type: ['line', 'bar']},
                //     restore : {show: true},
                //     saveAsImage : {show: true}
                // }
            },
            xAxis:  {
                type: 'value',
                splitLine:{show: false}//去除网格线
            },
            yAxis: {
                splitLine:{show: false},//去除网格线
                type: 'category',
                axisLabel:{
                    interval: 0
                    // rotate:40
                },
                data: []
            },
            series: []
        },
        /**
         * [series: 数据默认配置 ]
         * [options: { Object} ]
         * [ps: echarts.series 数据配置 ]
         * [-------------------------------------------------]
         */
        series: {
            name: '直接访问',
            type: 'bar',
            stack: 'name',
            barWidth : 25,
            itemStyle:{
                normal:{
                    label : {
                       color: '#000000',
                       show: true,
                       position: ['101%', '20%']
                    }
                }
            },
            data: []
        },
        /**
         * [getInitChartData: 请求图表数据Function ]
         * [options: { params: 根据点击tab请求不同数据的参数} ]
         * [ps: echarts.series 数据配置 ]
         * [-------------------------------------------------]
         */
        getInitChartData: function (params,index){
            var _this = this;
            $.getJSON(params, {
                type: index
            }, function (result){
                if (!result.errno){
                    _this.initChartsFn(result.data,result.showFive);
                } else {
                    alert('数据请求失败');
                }
            });
        },
        /**
         * [initChartsFn: 处理图表数据, 更改echarts 配置，以及图表提示语设置 ]
         * [options: { dataList: 获取图表数据列表} ]
         * [ps:  ]
         * [-------------------------------------------------]
         */
        initChartsFn: function (dataList,showFive){

            var _this = this,
                pvOption = _this.pvOption,
                copyTxtArr = _this.copyTxtArr;
            var series = _this.series;
            // newOptions 转换为String 之后又转为Object为浅拷贝,因为5个图标共用一个数据同时，会有js作用域改变内存
            var newOptions = JSON.parse(JSON.stringify(pvOption)),
            // 获取图表防止标签
                chartDom = $('.chart'),
            // 获取提示语放置标签
                ps = $('.columnarBox').find('p'),
            // 存储5个echarts 实例
                domArr = [],
            // 正则匹配空格之间的文字
                reg = /.*\s(.*)\s.*/i;
                ps.parent().show();
            // 遍历数据Array
            $.each(dataList, function (index,item){
                var newArr = [];
                $.each(item.dataList, function (ind,val){
                    // 设置浅拷贝
                    var newSeries = JSON.parse(JSON.stringify(series));
                    // var newObj = Object.assign(newSeries, val);  // ie不支持此属性
                    // 将浅拷贝之后的对象合并
                    var newObj = $.extend( newSeries, val);
                    // 在数组添加合并之后的数据
                    newArr.push(newObj);
                });
                // 将数据y轴配置
                newOptions.yAxis.data = item.time;
                // 设置图表配置显示
                newOptions.series = newArr;
                // 条件设置提示语
                if (item.percent >= 100){
                    // 大于50设置 wellTxt 提示语
                    ps.eq(index).html(copyTxtArr[index].wellTxt);
                } else {
                    // 小于50设置 prompt 提示语
                    // 替换50%
                    /*var text = copyTxtArr[index].prompt.replace(/50\%/g,'<span style="color:#fc6621;">'+item.percent+'%</span>'),
                        newTxt = reg.exec(text)[1];
                    text = text.replace(newTxt,'<a target="_black" style="color:#0000ef;" href="'+ copyTxtArr[index].link +'">'+ newTxt +'</a>');
                    ps.eq(index).html(text);*/

                    var promptString = copyTxtArr[index].prompt;
                    var text = promptString.replace(/-50-/g, item.percent);
                    ps.eq(index).html(text);
                }
                // 初始化如果数组里面有值，实例已经放入数组，否则添加实例
                if (index === dataList.length - 1 && showFive === 1){
                    ps.eq(index).parent().hide();
                    return false;
                } else if (!_this.chartDom[index]){
                    // console.log(1231456)
                    var pvChart = echarts.init(chartDom[index]);
                    _this.chartDom.push(pvChart);
                };
                // 让当前实例清除配置数据,重新更新图表配置
                _this.chartDom[index].clear();
                _this.chartDom[index].setOption(newOptions);
            });

        },
        /**
         * [initResize: 适配图表大小resize 重置图表视图 ]
         * [options: { null} ]
         * [ps:  ]
         * [-------------------------------------------------]
         */
        initResize: function (){
            var chartDom = this.chartDom;
            $(window).on('resize', function (){
                $.each(chartDom, function (index,item){
                    item.resize();
                });
            });
        }
    }
    /**
     * [new p4pEchartsMicro(): 实例化 p4pEchartsMicro 函数]
     * [options: { null} ]
     * [ps:  ]
     * [-------------------------------------------------]
     */
    new p4pEchartsMicro();
});


// option =  {
//     title : {
//         text: '',
//         subtext: ''
//     },
//     color: [],
//     tooltip : {
//         trigger: 'axis'
//     },
//     toolbox: {
//         show : false,
//         feature : {
//             mark : {show: true},
//             dataView : {show: true, readOnly: false},
//             magicType: {show: true, type: ['line', 'bar']},
//             restore : {show: true},
//             saveAsImage : {show: true}
//         }
//     },
//     calculable : true,
//     xAxis : [
//         {
//             type : 'value',
//             boundaryGap : [0, 1]
//         }
//     ],
//     yAxis : [
//         {
//             type : 'category',
//             data : ['总展现量']
//         }
//     ],
//     series : [
//         {
//             name:'行业优质客户平均值',
//             type:'bar',
//             barWidth:30,
//             itemStyle:{
//                 normal:{
//                     color:'#476cba',
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//              },
//             data:[5953]
//         },
//         {
//             name:'个人数据',
//             type:'bar',
//             barWidth:30,
//             stack: 'back',
//             itemStyle:{
//                 normal:{
//                     color:'#ff8532',
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//              },
//             data:[1391]
//         },
//         {
//             name:'其他',
//             type:'bar',
//             barWidth:30,
//             stack: 'back',
//             itemStyle:{
//                 normal:{
//                     color:'#fecb2f',
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//              },
//             data:[1391]
//         }
//     ]
// };

// app.title = '堆叠条形图';
//
// option = {
//     color: ['#476cba','#ff8532','#fecb2f'],
//     tooltip : {
//         trigger: 'axis',
//         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//         }
//     },
//     toolbox: {
//         show : false,
//         feature : {
//             mark : {show: true},
//             dataView : {show: true, readOnly: false},
//             magicType: {show: true, type: ['line', 'bar']},
//             restore : {show: true},
//             saveAsImage : {show: true}
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis:  {
//         type: 'value'
//     },
//     yAxis: {
//         type: 'category',
//         data: ['周一','周二']
//     },
//     series: [
//         {
//             name: '直接访问',
//             type: 'bar',
//             stack: 'name',
//             itemStyle:{
//                 normal:{
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//             },
//             data: [320, 302]
//         },
//         {
//             name: '邮件营销',
//             type: 'bar',
//             stack: 'name',
//             itemStyle:{
//                 normal:{
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//             },
//             data: [120, 132]
//         },
//         {
//             name: '联盟广告',
//             type: 'bar',
//             stack: '总量',
//             itemStyle:{
//                 normal:{
//                     label : {
//                  	   show: true,
//                  	   position: 'right'
//                  	}
//                 }
//             },
//             data: [220, 182]
//         }
//     ]
// };

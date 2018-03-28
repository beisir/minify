$(window).on('load', function (){
    var WjzObj = new Wjzfunc();
});
/**
 *  实例化函数
**/
function Wjzfunc(){
    this.username = this.getQueryString('username');
    this.links = 'https://b2b.hc360.com/h5/index.html?u=' + this.username;
    this.getData(this.username);
    $('.topAlertNew a').css({'background':'none','padding-left':'0'});
};
/**
 *  把所有功能都定义在函数原型上
**/
Wjzfunc.prototype = {
    /**
     *  获取数据字段
    **/
    getData: function (username) {
        var _this = this;
        $.getJSON('//my.b2b.hc360.com/my/turbine/action/microstation.MicroStationAction/eventsubmit_doBasicinfo/doBasicinfo?jsoncallback=?',{
        // $.getJSON('http://192.168.34.65:3366/flag/flag?callback=?',{
            username: username
        },function (res){
            _this.isVip(res);
            _this.titleClick(res,username);
        },function (err){
            _this.errorImg();
        });
    },
    isVip: function (result) {
        var _this = this;
        this.tollUser = result.tollUser;
        var data = result.template;
        var browse = $('.browse');
        // browse.each(function (ind) {
        //     $(this).parents('.formworkList').attr('index',ind);
        // });
        if (result && result.tollUser) {
            var even = browse.children('p:even'),
                odd = browse.children('p:odd');
            if (result.PV == 0 && result.UV == 0){
                even.text('暂无数据');
                odd.hide();
            } else {
                even.text('浏览量：' + result.PV);
                odd.text('浏览人数：' + result.UV);
            }
        };
        if (result && result.tollUser) {
            $('.vip-hide').hide();
            $('.vip-show').show();
            this.vipAddClass(result.tempCode-1);
            this.clickFn();
        } else {
            $('.vip-hide').show();
            $('.vip-show').hide();
            this.openVip(result.beOverdue);
            if (result.beOverdue <= 0 ){
                $('.listBot').eq(0).hide();
                $('#prompt').hide();
                if (result.providerId !==0 ){
                    $('.mmtPrompt2').eq(0).show().next().hide();
                }else {
                    $('.mmtPrompt2').eq(1).text('限时使用30天 、请先激活试用期');
                }
            } else {
                $('.previewBtn').eq(0).hide();
            }
        }
            this.shareFn(result);
            $('#loading').hide();
            $('.container').show();
    },
    /**
     *  当前为付费会员用户，设置默认模板
    **/
    clickFn: function () {
        var _this = this;
        $('.default-card').on('click', function () {
            var index = $(this).parents('.formworkList').attr('index');
            console.log(index)
            $('#alertFixed').attr('index',index).show();
        });
        $('#aletBtnBox').on('click', 'a', function () {
            var dialogIndex = $(this).index();
            if (!dialogIndex) {
                var eleIndex = Number($('#alertFixed').attr('index'));
                $.getJSON('//my.b2b.hc360.com/my/turbine/action/microstation.MicroStationAction/eventsubmit_doUpdatetemp/doUpdatetemp?jsoncallback=?',{
                    username: _this.username,
                    tempcode: (eleIndex + 1)
                },function (opt){
                    if (opt.state==="success") {
                        _this.vipAddClass(eleIndex);
                    } else {
                        alert('设置失败');
                    };
                });
            };
            $('#alertFixed').hide();
        });
    },
    /**
     *  设置当前默认模板样式以及文字
    **/
    vipAddClass: function (ind) {
        console.log(ind);
        var formworkImg = $('.formworkImg'),
            defaultCard = $('.default-card');
        // console.log($('[index="'+ind+'"]'))
        formworkImg.removeClass('formworkCur');
        // console.log($('[index="'+ind+'"]').find('.formworkImg'));
        var indexEle = $('[index="'+ind+'"]')
        indexEle.find('.formworkImg').addClass('formworkCur');
        // console.log($('[index="'+ind+'"]').index())
        // formworkImg.eq(ind).addClass('formworkCur');
        defaultCard.text('设置默认');
        indexEle.find('.default-card').text('默认名片');
        // console.log();
        // $('.default-card').eq(ind).text('默认名片');
    },
    /**
     *  分享，缩略图，浏览，模板预览事件
    **/
    shareFn: function (result) {
        var _this = this;
        $('.share-btn,.browse-btn,.previewBtn,.formworkImg').on('click', function () {
            var links = _this.links;
            var eleIndex = $(this).parents('.formworkList').attr('index');
            links += '&t='+ (Number(eleIndex) + 1);
            if ( result.tollUser ) {
                links += '&d=1';
                if ($(this).hasClass('share-btn') && _this.isWeiXin()){
                    links += '&others=others';
                };
            } else {
                if (eleIndex === '0' && result.beOverdue > 0 ){
                    links += '&d=1';
                } else {
                    links += '&d=0';
                }
            };
            // console.log(links);
            window.location.href = links;
        });
    },
    /**
     *  get当前页面地址栏参数
    **/
    getQueryString: function (key) {
        var search = window.location.search;
        var regExp = new RegExp('[\\?\\&]([^\\?\\&]+)=([^\\?\\&]+)', 'ig');
        var queryStringList = {};
        var parttern;
        while ((parttern = regExp.exec(search))) {
            if (!queryStringList[parttern[1].toLowerCase()]) {
                queryStringList[parttern[1].toLowerCase()] = parttern[2];
            };
        };
        if (key) {
            return queryStringList[key.toLowerCase()] || '';
        };
        return queryStringList;
    },

    /**
     *  非会员用户，剩余多少天时间体验时间
    **/
    openVip: function (numday){
        var _this = this;
        $('.numDay').text(numday);
        var mmt988Box = $('.mmt988Box');
        var clearTimer = null;
        clearTimer = setTimeout(function (){
            mmt988Box.slideUp(600);
            clearTimeout(clearTimer);
            $('.arrowBox').on('click','em',function (){
                var _this = $(this);
                _this.hide().siblings().show();
                if(_this.hasClass('downArrow')){
                    mmt988Box.slideDown(600);
                }else{
                    mmt988Box.slideUp(600);
                };
            });
        },5000);
        mmt988Box.find('.mmtpurchase').on('click',function (){
          var hrefString;
          _this.isWeiXin() ? hrefString = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ccf8a383b019c15&redirect_uri=http://style.org.hc360.com/weixin/build/personal/redirect.html&response_type=code&scope=snsapi_base&state=30#wechat_redirect': hrefString = '//mlogin.hc360.com/manager/zymmtbuy.html?source=2&stype=2';
          window.location.href = hrefString;
        });
    },
    /**
     *  判断当前浏览器是否是微信浏览器
    **/
    isWeiXin: function (){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        };
    },
    errorImg: function (){
    	var errMsg = $('<img src="//style.org.hc360.com/images/my/images/corcenter/mmt4/new/wjz/404.png"/>').css({
    		'position':'absolute',
    		'width':'100%',
    		'top':'30%'
    	});
    	$('body').html(errMsg);
    },
    /**
     *  设置头部...点击
     *
    **/
    titleClick: function (options,username){
        $('.leftArrow').on('click', function (){
            if (options.providerId !== 0){
                window.history.go(-2);
            } else {
                window.history.go(-1);
            };
        });
        $(".topMoreNew").click(function(){
    		$(".topAlertNew").toggle();
    	});
    	$(".topAlertNew a").not("#kefu").click(function(){
            if ($(this).hasClass('shtml')){
                window.location.href = '//b2b.hc360.com/wmp/wmp_m.shtml?u=' + username + '&others=others';
            }
            $(".topAlertNew").hide();
    	})
    	$(document).on('click touchend',function(event){
    		if($(event.target).hasClass("topMoreNew")||$(event.target).closest("div").hasClass("topAlertNew")){
    			return;
    		}
    		$(".topAlertNew").hide();
    	});
        var alertFixed = $('#alertFixed2');
        $('#kefu').on('click', function (){
            alertFixed.show();
        })
        $('#aletBtnBox2 a').on('click', function (){
            var index = $(this).index();
            if (index ){
                window.location.href = 'tel:010-61723396'
            }
            alertFixed.hide();
        });
    }
};

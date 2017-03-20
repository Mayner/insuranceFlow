$(function () {
    //判斷显示微信支付还是支付宝支付方式
    if (checkPlatform() == 0) {
        $(".WXPay").show();
        $(".Alipay").hide();
    } else if (checkPlatform() == 1) {
        $(".WXPay").hide();
        $(".Alipay").show();
    }
    //显示隐藏订单详情
    $(".order").on("click", function () {
        if ($(this).find("span").hasClass("hideOrder")) {
            $(".info").slideDown();
            $(this).find("span").removeClass("hideOrder").addClass("showOrder").text("隐藏订单详情");
        } else {
            $(".info").slideUp();
            $(this).find("span").removeClass("showOrder").addClass("hideOrder").text("显示订单详情");
        }
    });
    //滚动到一定位置固定
    $(window).on("scroll", function (event) {
        var headerHeight = $(".header").height(),
            scrollTop = $(window).scrollTop();
        if (scrollTop > headerHeight) {
            $(".order").addClass("orderFixed borBot1");
            $(".info").addClass("paddingTop");
        } else {
            $(".order").removeClass("orderFixed borBot1");
            $(".info").removeClass("paddingTop");
        }
    });
    $(window).on("touchmove", function (event) {
        var headerHeight = $(".header").height(),
            scrollTop = $(window).scrollTop();
        if (scrollTop > headerHeight) {
            $(".order").addClass("orderFixed borBot1");
            $(".info").addClass("paddingTop");
        } else {
            $(".order").removeClass("orderFixed borBot1");
            $(".info").removeClass("paddingTop");
        }
    });
    //支付方式选择
    $(".payMethod").each(function () {
        $(this).on("click", function () {
            $(this).find("i").removeClass("unCheckBox").addClass("checkBox");
            $(this).siblings("dl").find("i").removeClass("checkBox").addClass("unCheckBox");
            $(this).find("i").siblings("input").prop("checked",true);
        })
    });
    //$("#creditCard").on("click", function () {
    //    $("#depositCard").removeClass("checkBox").addClass("unCheckBox");
    //    $(this).removeClass("unCheckBox").addClass("checkBox");
    //    $(this).siblings("input").prop("checked",true);
    //});
    //$("#depositCard").on("click", function () {
    //    $("#creditCard").removeClass("checkBox").addClass("unCheckBox");
    //    $(this).removeClass("unCheckBox").addClass("checkBox");
    //    $(this).siblings("input").prop("checked",true);
    //});
    $("input[name='payType']").each(function(){
        if($(this).prop("checked")){
            $(this).siblings("i").removeClass("unCheckBox").addClass("checkBox");
        }else{
            $(this).siblings("i").removeClass("checkBox").addClass("unCheckBox");
        }
    });
    //是否阅读投保声明
    $("#whetherCheck").on("click", function () {
        if ($(this).hasClass("unCheckBox")) {
            $(this).removeClass("unCheckBox").addClass("checkBox");
        } else {
            $(this).removeClass("checkBox").addClass("unCheckBox");
        }
    });
    //弹窗
    $(".pop-sure").on("click",function(){
        $(".pop").hide();
        $(".mask").hide();
    });
    $("#declareLink").on("click", function () {
        $("html,body").css({"position":"fixed","top":"0","height":"100%"});
        $(".cover .declareContent h2").text($(this).text());
        $("#declareCover").fadeIn();

        //var coverHtml = '';
        //var pArr = ["本电子投保单是保险合同的重要组成部分","请您详细阅读所投保险种的相关保险条款","请您全面理解所要投保的产品","以死亡为给付保险金条件的合同","根据国务院保险监督管理机构的规定","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款","请您详细阅读所投保险种的相关保险条款"];
        //for (var i = 0; i < pArr.length; i++) {
        //    coverHtml += '<p>' + pArr[i] + '</p>';
        //}
        //$(".cover .declareText").html(coverHtml);

    });
    $("#declareCover .closeBtn").on("click", function () {
        $("html,body").css({"position":"relative","top":"0","height":"auto"});
        $("html body").scrollTop($("html body").height())
        $("#declareCover").fadeOut();
    });
    $("#noticeLink").on("click", function () {
        $("html,body").css({"position":"fixed","top":"0","height":"100%"});
        $("#noticeCover").fadeIn();
    });
    $("#noticeCover .closeBtn").on("click", function () {
        $("html,body").css({"position":"relative","top":"0","height":"auto"});
        $("#noticeCover").fadeOut();
    });
    $("#tipBookLink").on("click", function () {
        $("html,body").css({"position":"fixed","top":"0","height":"100%"});
        $("#tipBookCover").fadeIn();
    });
    $("#tipBookCover .closeBtn").on("click", function () {
        $("html,body").css({"position":"relative","top":"0","height":"auto"});
        $("#tipBookCover").fadeOut();
    });

    //popup($("#declareLink"), $("#declareCover"), $("#declareCover .closeBtn"));
    //popup($("#noticeLink"), $("#noticeCover"), $("#noticeCover .closeBtn"));
    //popup($("#tipBookLink"), $("#tipBookCover"), $("#tipBookCover .closeBtn"));

    //投保声明弹窗函数
    //function popup(linkElm, coverElm, closeElm){
    //    linkElm.on("click", function () {
    //        $("html,body").css({"position":"fixed","top":"0","height":"100%"});
    //        coverElm.fadeIn();
    //    });
    //    closeElm.on("click", function () {
    //        $("html,body").css({"position":"relative","top":"0","height":"auto"});
    //        coverElm.fadeOut();
    //    });
    //}

    //点击立即支付时校验是否勾选
    $(".insureBtn").on("click", function () {
        if (!$("#whetherCheck").hasClass("checkBox")) {
            $(".pop").show().find("span").html("请认真阅读《投保声明》并勾选同意上述协议规定！");
            $(".mask").show();
            return;
        }
        if ($("#WXPay").siblings("input").prop("checked")) {
            alert("微信支付");
            WXPay();
        } else if ($("#Alipay").siblings("input").prop("checked")) {
            alert("支付宝支付");
        } else {
            $(".loading").show();
            //提交form表单
            $("#payTypeForm").submit();
        }

    });
    //点击修改回退
    $(".modify").on("click", function () {
        goBack();
    });
});

//历史回退
function goBack() {
    window.history.go(-1);
}

//判断是处于哪个平台浏览器
function checkPlatform(){
    if(/MicroMessenger/i.test(navigator.userAgent)){
        return 0;//这是微信平台下浏览器
    }else if(/AlipayClient/.test(navigator.userAgent)){
        return 1;//这是支付宝平台下浏览器
    }
}

//微信接口配置
//wx.config({
//    debug: false,
//    appId: 'wxf8b4f85f3a794e77',
//    timestamp: 1486956852,
//    nonceStr: 'PByUsyEjhtNuQerP',
//    signature: 'f9c2f9f7fbdd2226b6a5d4c862b1685e6252107c',
//    jsApiList: [
//        // 所有要调用的 API 都要加到这个列表中
//        'checkJsApi',
//        'onMenuShareTimeline', //分享到朋友圈
//        'onMenuShareAppMessage', //分享给朋友
//        'chooseWXPay' //微信支付
//    ]
//});

function WXPay() {
    wx.ready(function () {
        //发起一个微信支付请求
        wx.chooseWXPay({
            timeStamp: 1414723227,//支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: 'noncestr',// 支付签名随机串，不长于 32 位
            package: 'addition=action_id%3dgaby1234%26limit_pay%3d&bank_type=WX&body=innertest&fee_type=1&input_charset=GBK&notify_url=http%3A%2F%2F120.204.206.246%2Fcgi-bin%2Fmmsupport-bin%2Fnotifypay&out_trade_no=1414723227818375338&partner=1900000109&spbill_create_ip=127.0.0.1&total_fee=1&sign=432B647FE95C7BF73BCD177CEECBEF8D',// 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: 'bd5b1933cda6e9548862944836a9b52e8c9a2b69', // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
            }
        });
    });
}
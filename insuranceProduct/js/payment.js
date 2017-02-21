$(function () {
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

    //点击立即支付时校验是否勾选
    $(".insureBtn").on("click", function () {
        if (!$("#whetherCheck").hasClass("checkBox")) {
            $(".pop").show().find("span").html("请认真阅读《投保声明》并勾选同意上述协议规定！");
            $(".mask").show();
            return;
        }
        //提交form表单
        $("#payTypeForm").submit();
        $(".loading").show();
    });
    //点击修改回退
    $(".modify").on("click", function () {
        goBack();
    });
});

//历史回退
function goBack() {
    window.history.back();
}

//判断是处于哪个平台浏览器
function checkPlatform(){
    if(/MicroMessenger/i.test(navigator.userAgent)){
        return 0;//这是微信平台下浏览器
    }else if(/AlipayClient/.test(navigator.userAgent)){
        return 1;//这是支付宝平台下浏览器
    }
}
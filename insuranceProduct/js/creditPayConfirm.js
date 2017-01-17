$(function () {
    //下拉选择样式
    $("select").each(function () {
        $(this).scroller('destroy').scroller($.extend({preset: 'select'}, {
            theme: "android-ics light",
            lang: "zh",
            display: 'bottom',
            rtl: true,
            inputClass: 'tmp'
        }));
    });
    //弹出键盘时改变样式
    $("input").on("focus", function () {
        if (!$(this).prop("readonly")) {
            $(".header").css("position", "static");
            $(".info").css("marginTop", "0.45rem");
        }
    }).on("blur", function () {
        $(".header").css({"position": "fixed", "top": "0"});
        $(".info").css("marginTop", "2.7rem");
    });
    //获取验证码
    $("#getCode").on("click", function () {
        //校验前面数据
        if (!checkConfirm()) return false;
        var oObj = {};
        $(".bankInfo").each(function(index, el){
            if(el.tagName == "SELECT"){
                oObj[el.name] = $(this).find("option:selected").val();
            }else if(el.tagName == "INPUT"){
                oObj[el.name] = $(this).val();
            }
        });
        var _this = $(this);
        _this.addClass("disabled");
        _this.attr("disabled",true);
        var seconds = 60;
        var timer = setInterval(function () {
            seconds--;
            _this.val(seconds + "秒后获取");
            if (seconds <= 0) {
                _this.removeClass("disabled");
                _this.val("获取验证码");
                clearInterval(timer);
                _this.attr("disabled",false);
            }
        }, 1000);
        sendRequest(path +"/pay/getVerificationCode",oObj,function (data) {
            var obj = JSON.parse(data);
            if(obj.code == 0){
                var token = obj.data.token;
                $("#token").val(token);
            }else{
                $("#getCode").removeClass("disabled");
                $("#getCode").val("获取验证码");
                clearInterval(timer);
                $("#getCode").attr("disabled",false);
                $(".mask").show();
                $(".pop").show().find("span").text(obj.msg);
                $(".pop-sure").on("click",function(){
                    $(".mask").hide();
                    $(".pop").hide().find("span").text("");
                })
            }
        },function(){});
    });
    //确认支付
    $(".confirmBtn").on("click", function () {
        //提交校验
        if (!checkConfirm()) return false;
        //短信验证码校验
        if (!checkVerificationCode($("#verificationCode"))) return false;
        $("#formId").submit();
        $(".loading").show();
    });

    //点击修改回退-重新选择支付方式
    $(".reelect").on("click", function () {
        goBack();
    });

    /********************************填写信息校验*******************************/
    //姓名校验
    $("#policyName").on("blur", function () {
        checkName($(this));
        if (checkName($(this))) {
            $("#accountName").val($(this).val());
        } else {
            $("#accountName").val("");
        }
    });
    //改变证件类型，焦点移到证件号码输入框
    $("#cardType").on("change", function () {
        $("#idNo").focus();
    });
    //证件号码校验
    $("#idNo").on("blur", function () {
        //身份证校验
        if ($("#cardType").find("option:selected").text() == "身份证") {
            checkID($(this));
        }
        //护照或其他证件校验
        else {
            checkOtherId($(this));
        }
    });
    //信用卡卡号校验
    $("#creditNo").on("blur", function () {
        checkCreditNo($(this));
    });
    //改变有效期下拉状态，错误提示信息消失
    $("#valid").on("change", function () {
        $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    //信用卡验证码校验
    $("#creditVerify").on("blur", function () {
        checkCreditVerify($(this));
    });
    //手机号校验
    $("#tel").on("blur", function () {
        checkTel($(this));
    });
    //短信验证码校验
    $("#verificationCode").on("blur", function () {
        checkVerificationCode($(this));
    });
});
/********************************提交校验（不含验证码）*******************************/
function checkConfirm() {
    var flag = true;
    //姓名
    if (!checkName($("#policyName"))) {
        flag = false;
    }
    //证件号码
    if (!($("#cardType").find("option:selected").text() == "身份证"?checkID($("#idNo")):checkOtherId($("#idNo")))) {
        flag = false;
    }
    //信用卡卡号
    if (!checkCreditNo($("#creditNo"))) {
        flag = false;
    }
    //有效期
    if ($("#valid").val() == "") {
        $("#valid").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请输入信用卡有效期！");
        flag = false;
    } else {
        $("#valid").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    }
    //信用卡验证码
    if (!checkCreditVerify($("#creditVerify"))) {
        flag = false;
    }
    //手机号
    if (!checkTel($("#tel"))) {
        flag = false;
    }
    if (!flag) return;
    return true;
}

//历史回退
function goBack() {
    window.history.back();
}

//ajax
function sendRequest(url, data, success, error) {
    $.ajax({
        url: url,
        type: "post",
        async: true,
        data: data ? data : {},
        beforeSend:function(){
            $(".loading").show();
        },
        success: function (data) {
            if (success) {
                success(data);
            }
        },
        error: function (data) {
            if (error) {
                error(data);
            }
        },
        complete:function(){
            $(".loading").hide();
        }
    });
}









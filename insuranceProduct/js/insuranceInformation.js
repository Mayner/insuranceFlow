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
    //地区
    getArea("appntArea");
    //改变银行发送数据
    $("#accountBank").change(function(){
        $("#bankArea").val("");
        if($(this).find("option:selected").text() == "请选择"){
    		return;
    	}
        getBankArea("bankArea",$(this).find("option:selected").val());
    });
    //默认一加载就判断显示哪个
    if ($("#cardType").find("option:selected").text() == "身份证") {
        $(".birthday").hide();
        $(".birthdayReadonly").show();
        $(".sex").hide();
        $(".sexReadonly").show();
    } else {
        $(".birthday").show().css("display", "inline-block");
        $(".birthdayReadonly").hide();
        $(".sex").show().css("display", "inline-block");
        $(".sexReadonly").hide();
    }
    $("input[type = checkbox]").each(function () {
        if ($(this).prop("checked")) {
            $(this).removeClass("unCheckBox").addClass("checkBox");
            $(this).parent().siblings("span").find("input[type = text]").hide();
        } else {
            $(this).removeClass("checkBox").addClass("unCheckBox");
            $(this).parent().siblings("span").find("input[type = text]").show();
        }
    });
    if ($("input[type = radio]").prop("checked")) {
        $("input[type = radio]").siblings("#switch").removeClass("turnOn").addClass("turnOff");
        $(".insured").show();
        if ($("#relation").find("option:selected").text() == "本人") {
            $(".insured .mySelf").show().siblings().hide();
            $(".insured .errorMsg").hide();
        } else {
            $(".insured .mySelf").hide().siblings().show();
            if ($("#insuredCardType").find("option:selected").text() == "身份证") {
                $(".insuredBirthday").hide();
                $(".insuredBirthdayReadonly").show();
                $(".insuredSex").hide();
                $(".insuredSexReadonly").show();
            }else {
                $(".insuredBirthday").show();
                $(".insuredBirthdayReadonly").hide();
                $(".insuredSex").show();
                $(".insuredSexReadonly").hide();
            }
        }
    } else {
        $("input[type = radio]").siblings("#switch").removeClass("turnOff").addClass("turnOn");
        $(".insured").hide();
    }
    //投保人被保人证件有效期是否长期--切换
    $("input[type = checkbox]").each(function () {
        $(this).on("click", function () {
            if ($(this).hasClass("unCheckBox")) {
                $(this).removeClass("unCheckBox").addClass("checkBox").prop("checked",true);
                $(this).parent().siblings("span").find("input[type = text]").hide().val("");
                $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
            } else {
                $(this).removeClass("checkBox").addClass("unCheckBox").prop("checked",false);
                $(this).parent().siblings("span").find("input[type = text]").show();
                $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请输入有效期或选择长期！");
            }
        });
    });
    //投被保人是否一致的按钮控制
    $("#switch").on("click", function () {
        if ($(this).hasClass("turnOn")) {
            $(this).removeClass("turnOn").addClass("turnOff").siblings("input").prop("checked",true);
            $(".insured").slideDown();
            $("#isSelf").val("0");
            //关闭开关后就将投保人的信息赋给被保人相应项
            $("#insuredName").siblings(".mySelf").val($("#policyName").val());
            $("#insuredCardType").siblings(".mySelf").val($("#cardType").find("option:selected").text());
            $("#insuredIdNo").siblings(".mySelf").val($("#idNo").val());
            $(".occupationReadonly").val($(".appntOccupation").val());
            if ($("#checkbox").hasClass("checkBox")) {
                $("#insuredCheckbox").parent().siblings(".mySelf").val($("#checkbox").parent().siblings("span").find("label").text());
            } else {
                $("#insuredCheckbox").parent().siblings(".mySelf").val($("#idDate").val());
            }
            if ($("#cardType").find("option:selected").text() == "身份证") {
                $(".insuredBirthdayReadonly").siblings(".mySelf").val($(".birthdayReadonly").val());
                $(".insuredSexReadonly").siblings(".mySelf").val($(".sexReadonly").val());
            } else {
                $(".insuredBirthdayReadonly").siblings(".mySelf").val($("#birthday").val());
                $(".insuredSexReadonly").siblings(".mySelf").val($("#sex").find("option:selected").text());
            }
            if ($("#relation").find("option:selected").text() == "本人") {
                $(".insured .mySelf").show().siblings().hide();
                $(".insured .errorMsg").hide();
            } else {
                $(".insured .mySelf").hide().siblings().show();
                if ($("#insuredCardType").find("option:selected").text() == "身份证") {
                    $(".insuredBirthday").hide();
                    $(".insuredBirthdayReadonly").show();
                    $(".insuredSex").hide();
                    $(".insuredSexReadonly").show();
                }else {
                    $(".insuredBirthday").show();
                    $(".insuredBirthdayReadonly").hide();
                    $(".insuredSex").show();
                    $(".insuredSexReadonly").hide();
                }
            }
        } else {
            $(this).removeClass("turnOff").addClass("turnOn").siblings("input").prop("checked",false);
            $(".insured").slideUp();
            $("#isSelf").val("1");
        }
    });
    //勾选同意
    $("#whetherCheck").on("click", function () {
        if ($(this).hasClass("unCheckBox")) {
            $(this).removeClass("unCheckBox").addClass("checkBox");
        } else {
            $(this).removeClass("checkBox").addClass("unCheckBox");
        }
    });
    //输入框弹出键盘时改变样式
    $("input").on("focus", function () {
        if (!$(this).prop("readonly")) {
            $(".fixedBox").css("position", "static");
            $(".header").css("position", "static");
            $(".info").css("marginTop", "0");
            $(".whetherRead").css("marginBottom", "1.375rem");
        }
    }).on("blur", function () {
        $(".fixedBox").css({"position": "fixed", "bottom": "0"});
        $(".header").css({"position": "fixed", "top": "0"});
        $(".info").css("marginTop", "2.2rem");
        $(".whetherRead").css("marginBottom", "3.575rem");
    });
    //当被保人为本人时，相应信息显示并只读,否则显示输入框
    $("#relation").on("change", function () {
        if ($("#relation").find("option:selected").text() == "本人") {
            $(".insured .mySelf").show().siblings().hide();
            $(".insured .errorMsg").hide();
            $(".occupationReadonly").val($(".appntOccupation").val());
        } else {
            $(".insured .mySelf").hide().siblings().show();
            if ($("#insuredCardType").find("option:selected").text() == "身份证") {
                $(".insuredBirthday").hide();
                $(".insuredBirthdayReadonly").show();
                $(".insuredSex").hide();
                $(".insuredSexReadonly").show();
            }else {
                $(".insuredBirthday").show();
                $(".insuredBirthdayReadonly").hide();
                $(".insuredSex").show();
                $(".insuredSexReadonly").hide();
            }
        }
    });
    //被保人为本人时，改变输入框状态将投保人信息赋值给被保人对应项
    $("#cardType").on("change", function () {
        $("#birthday").val("");
        $("#idNo").focus();
        //清空年龄的错误信息提示
        $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        $("#insuredCardType").siblings(".mySelf").val($(this).find("option:selected").text());
        if ($("#cardType").find("option:selected").text() == "身份证") {
            $(".insuredBirthdayReadonly").siblings(".mySelf").val($(".birthdayReadonly").val());
            $(".insuredSexReadonly").siblings(".mySelf").val($(".sexReadonly").val());
        } else {
            $(".insuredBirthdayReadonly").siblings(".mySelf").val($("#birthday").val());
            $(".insuredSexReadonly").siblings(".mySelf").val($("#sex").find("option:selected").text());
        }
    });
    $("#idDate").on("change", function () {
        $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        $("#insuredCheckbox").parent().siblings(".mySelf").val($(this).val());
    });
    $("#checkbox").on("click", function () {
        if ($(this).hasClass("checkBox")) {
            $("#insuredCheckbox").parent().siblings(".mySelf").val($(this).parent().siblings("span").find("label").text());
        } else {
            $("#insuredCheckbox").parent().siblings(".mySelf").val($("#idDate").val());
        }
    });
    $("#birthday").on("change", function () {
        //年龄判断
        if (getAgeByBirthDay($("#birthday").val()) < 18) {
            $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("年龄必须满18周岁！");
        } else {
            $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
        $(".insuredBirthdayReadonly").siblings(".mySelf").val($("#birthday").val());
    });
    $("#sex").on("change", function () {
        $(".insuredSexReadonly").siblings(".mySelf").val($("#sex").find("option:selected").text());
    });
    //改变下拉状态，错误提示信息消失
    $("#insuredIdDate").on("change", function () {
        $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    $("#insuredBirthday").on("change", function () {
        $(this).parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });

    //局部修改开始-------------------------------------------------------------------------------------------------
    //$("#appntArea").on("change", function () {
    //    $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    //});
    $("#appntArea").on("touchend", function () {
        $("#appntArea").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    //$("#occupation").on("change", function () {
    //    $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    //});
    $(".occ").on("click", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    //$("#bankArea").on("change", function () {
    //    $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    //});
    $("#bankArea").on("click", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    //局部修改结束------------------------------------------------------------------------------------------------

    $("#accountBank").on("change", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    $("#accountSubBank").on("change", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });

    //改变证件类型，焦点移到证件号码输入框
    $("#insuredCardType").on("change", function () {
        $("#insuredBirthday").val("");
        $("#insuredIdNo").focus();
    });
    //点击确定，弹窗消失
    $(".pop-sure").on("click", function () {
        $(".pop").hide();
        $(".mask").hide();
    });

    /***************************投保人信息校验**************************/
    //姓名校验
    $("#policyName").on("blur", function () {
        checkName($(this));
        if (checkName($(this))) {
            $("#accountName").val($(this).val());
        } else {
            $("#accountName").val("");
        }
        $("#insuredName").siblings(".mySelf").val($(this).val());
    });
    //证件号码校验
    $("#idNo").on("blur", function () {
        //身份证校验
        if ($("#cardType").find("option:selected").text() == "身份证") {
            checkID($(this));
            if (checkID($(this))) {
                //带出生日和性别
                $(".birthdayReadonly").val(getBirthdayByIDCard($(this).val().trim()));
                $("#birthday").val(getBirthdayByIDCard($(this).val().trim()));
                $(".sexReadonly").val(getSexByIDCard($(this).val().trim()) == "1" ? "男" : "女");
                getSexByIDCard($(this).val().trim()) == "1" ? $("#sex").find("option").eq(0).prop("selected",true):$("#sex").find("option").eq(1).prop("selected",true);
            } else {
                //身份证错误时清空生日和性别
                $(".birthdayReadonly").val("");
                $("#birthday").val("");
                $(".sexReadonly").val("");
            }
            $(".insuredBirthdayReadonly").siblings(".mySelf").val($(".birthdayReadonly").val());
            $(".insuredSexReadonly").siblings(".mySelf").val($(".sexReadonly").val());
            //年龄判断
            if (getAgeByBirthDay($(".birthdayReadonly").val()) < 18) {
                $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("年龄必须满18周岁！");
            } else {
                $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
            }
        }
        //护照或其他证件校验
        else {
            $(".birthdayReadonly").val("");
            $(".sexReadonly").val("");
            checkOtherId($(this));
        }
        $("#insuredIdNo").siblings(".mySelf").val($(this).val());
    });
    //手机号码校验
    $("#tel").on("blur", function () {
        checkTel($(this));
    });
    //电子邮箱校验
    $("#email").on("blur", function () {
        checkEmail($(this));
    });
    //详细地址校验
    $("#address").on("blur", function () {
        checkAddress($(this));
    });
    //邮政编码校验
    $("#postalCode").on("blur", function () {
        checkPostalCode($(this));
    });

    /***************************被保人信息校验**************************/
        //姓名校验
    $("#insuredName").on("blur", function () {
        checkName($(this));
    });
    //证件号码校验
    $("#insuredIdNo").on("blur", function () {
        //身份证校验
        if ($("#insuredCardType").find("option:selected").text() == "身份证") {
            checkID($(this));
            if (checkID($(this))) {
                //带出生日和性别
                $(".insuredBirthdayReadonly").val(getBirthdayByIDCard($(this).val().trim()));
                $("#insuredBirthday").val(getBirthdayByIDCard($(this).val().trim()));
                $(".insuredSexReadonly").val(getSexByIDCard($(this).val().trim()) == "1" ? "男" : "女");
                getSexByIDCard($(this).val().trim()) == "1" ? $("#sex").find("option").eq(0).prop("selected",true):$("#sex").find("option").eq(1).prop("selected",true);
            } else {
                //身份证错误时清空生日和性别
                $(".insuredBirthdayReadonly").val("");
                $("#insuredBirthday").val("");
                $(".insuredSexReadonly").val("");
            }
        }
        //护照或其他证件校验
        else {
            $(".insuredBirthdayReadonly").val("");
            $(".insuredSexReadonly").val("");
            checkOtherId($(this));
        }
    });
    //身高校验
    $("#height").on("blur", function () {
        checkHeight($(this));
    });
    //体重校验
    $("#weight").on("blur", function () {
        checkWeight($(this));
    });
    /***************************续缴账户信息校验**************************/
        //开户名校验
    /*$("#accountName").on("blur", function () {
        checkName($(this));
    });*/
    //银行卡号校验
    $("#cardNo").on("blur", function () {
        checkCardNo($(this));
        $("#cardNoAgain").val("");
    });
    //再次输入银行卡号校验
    $("#cardNoAgain").on("blur", function () {
        checkCardNoAgain($(this),$("#cardNo"));
    });

    //计算保费
    $(".getPrice").change(function(){
    	calPrice();
    });
    $("#idNo").change(function(){
    	console.log($("#cardType").find("option:selected").text(),$("#insuredName").val());
    	if($("#cardType").find("option:selected").text() == "身份证" && ($("#isSelf").val() == 1 || $("#relation").find("option:selected").text() == "本人")){
    		checkID($(this));
            if (checkID($(this))) {
                //带出生日和性别
                $(".birthdayReadonly").val(getBirthdayByIDCard($(this).val().trim()));
                $("#birthday").val(getBirthdayByIDCard($(this).val().trim()));
                $(".sexReadonly").val(getSexByIDCard($(this).val().trim()) == "1" ? "男" : "女");
                getSexByIDCard($(this).val().trim()) == "1" ? $("#sex").find("option").eq(0).prop("selected",true):$("#sex").find("option").eq(1).prop("selected",true);
            } else {
                //身份证错误时清空生日和性别
                $(".birthdayReadonly").val("");
                $("#birthday").val("");
                $(".sexReadonly").val("");
                return;
            }
    		calPrice();
    	}
    });
    $("#insuredIdNo").change(function(){
    	if($("#insuredCardType").find("option:selected").text() == "身份证" && $("#isSelf").val() == 0){
    		checkID($(this));
            if (checkID($(this))) {
                //带出生日和性别
                $(".insuredBirthdayReadonly").val(getBirthdayByIDCard($(this).val().trim()));
                $("#insuredBirthday").val(getBirthdayByIDCard($(this).val().trim()));
                $(".insuredSexReadonly").val(getSexByIDCard($(this).val().trim()) == "1" ? "男" : "女");
                getSexByIDCard($(this).val().trim()) == "1" ? $("#sex").find("option").eq(0).prop("selected",true):$("#sex").find("option").eq(1).prop("selected",true);
            } else {
                //身份证错误时清空生日和性别
                $(".insuredBirthdayReadonly").val("");
                $("#insuredBirthday").val("");
                $(".insuredSexReadonly").val("");
                return;
            }
    		calPrice();
    	}
    });
    $("#sex").change(function(){
    	if($("#cardType").find("option:selected").text() != "身份证" && $("#isSelf").val() == 1){
    		calPrice();
    	}
    });
    $("#insuredSex").change(function(){
    	if($("#insuredCardType").find("option:selected").text() != "身份证" && $("#isSelf").val() == 0){
    		calPrice();
    	}
    });

    //发送数据
    $("#sureToSave").click(function() {
    	if (!checkAll()) return;
        sendRequest(path +"/getSaveInfo",getData(),function (data) {
        	var obj = JSON.parse(data);
        	if(obj.code == 0){
        		var orderNo = obj.data.orderNo,
                    returnPage = obj.data.returnPage;
        		window.location.href = path + returnPage + "?orderNo="+orderNo;
            }else{
            	$(".pop").show();
            	$(".mask").show();
            	$(".pop span").text(obj.msg);
            }
        },function(){});
    });

});

/***************************提交校验方法**************************/
function checkAll() {
    var flag = true;
//投保人信息
    //姓名校验
    if ($("#policyName").length>0) {
        if (!checkName($("#policyName"))) {
            flag = false;
        }
    }
    //证件号码校验
    if ($("#idNo").length>0) {
        if (!($("#cardType").find("option:selected").text() == "身份证" ? checkID($("#idNo")) : checkOtherId($("#idNo")))) {
            flag = false;
        }
    }
    //证件有效期
    if ($("#idDate").length>0) {
        if ($("#checkbox").hasClass("unCheckBox") && $("#idDate").val() == "") {
            $("#idDate").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请输入有效期或选择长期！");
            flag = false;
        } else {
            $("#idDate").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
    //出生日期校验
    if ($("#birthday").length>0) {
        if (!($("#cardType").find("option:selected").text() == "身份证")) {
            if ($("#birthday").val() == "") {
                $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请选择出生日期！");
                flag = false;
            } else if (getAgeByBirthDay($("#birthday").val()) < 18) {
                //年龄判断
                $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("年龄必须满18周岁！");
                flag = false;
            } else {
                $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
            }
        } else if (getAgeByBirthDay($(".birthdayReadonly").val()) < 18) {
            //年龄判断
            $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("年龄必须满18周岁！");
            flag = false;
        } else {
            $("#birthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
    //手机号码校验
    if ($("#tel").length>0) {
        if (!checkTel($("#tel"))) {
            flag = false;
        }
    }
    //电子邮箱校验
    if ($("#email").length>0) {
        if (!checkEmail($("#email"))) {
            flag = false;
        }
    }
    //通讯地址校验
    if ($("#appntArea").length>0) {
        if ($("#appntArea").val() == "") {
            $("#appntArea").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择通讯地址！");
            flag = false;
        } else {
            $("#appntArea").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
    //详细地址校验
    if ($("#address").length>0) {
        if (!checkAddress($("#address"))) {
            flag = false;
        }
    }
    //邮政编码校验
    if ($("#postalCode").length>0) {
        if (!checkPostalCode($("#postalCode"))) {
            flag = false;
        }
    }
    //职业校验
    if ($(".appntOccupation").length>0) {
        if ($(".appntOccupation").val() == "") {
            $(".appntOccupation").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择职业！");
            flag = false;
        } else {
            $(".appntOccupation").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }

//被保人信息
    if ($("#switch").hasClass("turnOff")) {
        if ($("#relation").find("option:selected").text() != "本人") {
            //姓名校验
            if ($("#insuredName").length>0) {
                if (!checkName($("#insuredName"))) {
                    flag = false;
                }
            }
            //关系校验
            if ($("#relation").length>0) {
                if ($("#relation").find("option:selected").text() == "请选择") {
                    $("#relation").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择投被保人关系！");
                    flag = false;
                } else {
                    $("#relation").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
                }
            }
            //证件号码校验
            if ($("#insuredIdNo").length>0) {
                if (!($("#insuredCardType").find("option:selected").text() == "身份证" ? checkID($("#insuredIdNo")) : checkOtherId($("#insuredIdNo")))) {
                    flag = false;
                }
            }
            //证件有效期
            if ($("#insuredIdDate").length>0) {
                if ($("#insuredCheckbox").hasClass("unCheckBox") && $("#insuredIdDate").val() == "") {
                    $("#insuredIdDate").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请输入有效期或选择长期！");
                    flag = false;
                } else {
                    $("#insuredIdDate").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
                }
            }
            //出生日期校验
            if ($("#insuredBirthday").length>0) {
                if (!($("#insuredCardType").find("option:selected").text() == "身份证")) {
                    if ($("#insuredBirthday").val() == "") {
                        $("#insuredBirthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("请选择出生日期！");
                        flag = false;
                    } else {
                        $("#insuredBirthday").parent().parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
                    }
                }
            }

            //局部修改开始-------------------------------------------------------------------------------------------------
            /*//职业校验
             if ($("#occupation").length>0) {
             if ($("#occupation").find("option:selected").text() == "请选择") {
             $("#occupation").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择职业！");
             flag = false;
             } else {
             $("#occupation").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
             }
             }*/
            //职业校验
            if ($(".occupation").length>0) {
                if ($(".occupation").val() == "") {
                    $(".occupation").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择职业！");
                    flag = false;
                } else {
                    $(".occupation").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
                }
            }
            //局部修改结束-------------------------------------------------------------------------------------------------

        }
    }
    //身高校验
    if ($("#height").length>0) {
        if (!checkHeight($("#height"))) {
            flag = false;
        }
    }
    //体重校验
    if ($("#weight").length>0) {
        if (!checkWeight($("#weight"))) {
            flag = false;
        }
    }
    //续缴账户信息
    //开户所在地校验
    if ($("#bankArea").length>0) {
        if ($("#bankArea").val() == "") {
            $("#bankArea").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择开户所在地！");
            flag = false;
        } else {
            $("#bankArea").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
    //开户行校验
    if ($("#accountBank").length>0) {
        if ($("#accountBank").find("option:selected").text() == "请选择") {
            $("#accountBank").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择开户行！");
            flag = false;
        } else {
            $("#accountBank").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
  //开户支行校验
    if ($("#accountSubBank").length>0) {
        if ($("#accountSubBank").find("option:selected").text() == "请选择") {
            $("#accountSubBank").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择开户支行！");
            flag = false;
        } else {
            $("#accountSubBank").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
        }
    }
    //开户名校验
    if ($("#accountName").length>0) {
        if (!checkName($("#accountName"))) {
            flag = false;
        }
    }
    //银行卡号校验
    if ($("#cardNo").length>0) {
        if (!checkCardNo($("#cardNo"))) {
            flag = false;
        }
    }
    //再次输入银行卡号校验
    if ($("#cardNoAgain").length>0) {
        if (!checkCardNoAgain($("#cardNoAgain"), $("#cardNo"))) {
            flag = false;
        }
    }
    //勾选阅读校验
    if (!$("#whetherCheck").hasClass("checkBox")) {
        $(".pop").show().find("span").html("请认真阅读并勾选同意此《授权》");
        $(".mask").show();
        flag = false;
    }
    if (!flag) return;
    return true;
}

//拼接传到后台的信息
function getData(){
	var appFactorInfo=[];
    $(".iFactor").each(function(index, el){
        var obj = {};
        if(el.tagName == "SELECT"){
            obj.apptype = $(this).data("type");
            obj.appFactorCode = $(this).data("appfactorid");
            obj.isPremCalFacotor = $(this).data("ispremcal");
            obj.appValue = $(this).find("option:selected").val();
            obj.appShowValue = $(this).find("option:selected").text();
        }else if(el.tagName == "INPUT"){
            obj.apptype = $(this).data("type");
            obj.appFactorCode = $(this).data("appfactorid");
            obj.isPremCalFacotor = $(this).data("ispremcal");
            obj.appValue = $(this).data("value");
            obj.appShowValue = $(this).val();
        }
        appFactorInfo.push(obj);
    });
    var dutyInfo = [];
    $(".insurInfo").each(function(index, el){
        var obj = {};
        if(el.tagName == "SELECT"){
            obj.dutyNo = $(this).data("code");
            obj.amnt = $(this).find("option:selected").val();
            obj.showAmnt = $(this).find("option:selected").text();
            obj.prem = $(this).data("prem");
            obj.isPremCalFacotor = $(this).data("ispremcal");
        }else if(el.tagName == "INPUT"){
            obj.dutyNo = $(this).data("code");
            obj.amnt = $(this).data("value");
            obj.showAmnt = $(this).val();
            obj.prem = $(this).data("prem");
            obj.isPremCalFacotor = $(this).data("ispremcal");
        }
        dutyInfo.push(obj);
    });
    var data = {
        appFactorInfo:JSON.stringify(appFactorInfo),
        dutyInfo:JSON.stringify(dutyInfo)
    };
    var oObj = {};
    $(".personInfo").each(function(index, el){
        if(el.tagName == "SELECT"){
            oObj[el.name] = $(this).find("option:selected").val();
        }else if(el.tagName == "INPUT"){
            oObj[el.name] = $(this).val();
        }
    });
    var allData = $.extend(data, oObj);
    return allData;
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
//计算价格ajax
function sendPriceRequest(url, data, success, error) {
    $.ajax({
        url: url,
        type: "post",
        async: true,
        data: data ? data : {},
        beforeSend:function(){
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
        }
    });
}
//计算保费
function calPrice(){
	sendPriceRequest(path +"/prem/getProductPrem",getData(),function (data) {
    	var obj = JSON.parse(data);
    	console.log(obj);
    	if(obj.code == 0){
    		$("#insurePrice").text(obj.data.totlePrem);
    	}else{
    		if(obj.data.totlePrem != ""){
            	$(".pop").show();
            	$(".mask").show();
            	$(".pop span").text(obj.msg);
    		}
    	}
    },function(){});
}

//选择投保人身份证时自动获取生日和性别
function changeCardType(cardVal) {
    var cardType = $("#cardType").find("option:selected").text();
    if (cardType == "身份证") {
        $(".birthday").hide();
        $(".birthdayReadonly").show();
        $(".sex").hide();
        $(".sexReadonly").show();
    } else {
        $(".birthday").show().css("display", "inline-block");
        $(".birthdayReadonly").hide();
        $(".sex").show().css("display", "inline-block");
        $(".sexReadonly").hide();
    }
}
//选择被保人身份证时自动获取生日和性别
function changeInsuredCardType(cardVal) {
    var cardType = $("#insuredCardType").find("option:selected").text();
    if (cardType == "身份证") {
        $(".insuredBirthday").hide();
        $(".insuredBirthdayReadonly").show();
        $(".insuredSex").hide();
        $(".insuredSexReadonly").show();
    } else {
        $(".insuredBirthday").show().css("display", "inline-block");
        $(".insuredBirthdayReadonly").hide();
        $(".insuredSex").show().css("display", "inline-block");
        $(".insuredSexReadonly").hide();
    }
}

//地区三级联动
function getArea(id){
    //ajax请求 默认发同步请求
    sendAreaRequest = function (url, data, success, error) {
        $.ajax({
            url: url,
            type: "post",
            async: false,//发送同步请求
            data: data ? data : {},
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (data) {
                if (error) {
                    error(data);
                }
            }
        });
    };
    //初始获取省数据
    var iosProvinces = [];
    sendAreaRequest(path + "/getAreaInfo", {
        productNo : $("#productNo").val(),
        parentId : "0"
    }, function (successData) {
        var data =  JSON.parse(successData).data;
        for (var i = 0; i < data.length; i++) {
            iosProvinces.push({
                id: data[i].id,
                value: data[i].codeName,
                parentId:data[i].parentId,
                codeValue:data[i].codeValue
            });
        }
    }, function (errorData) {});
    //这个对象处理关于市的读取
    this.citysObject = {
        selectedOneLevelId: {},
        iosCitys: [],
        refreshCitys: function (oneLevelId) {
            var _this = this;
            if (!(this.selectedOneLevelId[oneLevelId])) {
                this.selectedOneLevelId[oneLevelId] = true;
                //通过省id请求市
                sendAreaRequest(path + "/getAreaInfo", {
                    productNo : $("#productNo").val(),
                    parentId : oneLevelId
                }, function (successData) {
                    var data =  JSON.parse(successData).data;
                    for (var i = 0; i < data.length; i++) {
                        _this.iosCitys.push({
                            id: data[i].id,
                            value: data[i].codeName,
                            parentId:data[i].parentId,
                            codeValue:data[i].codeValue
                        });
                    }
                }, function (errorData) {});
            }
        }
    };
    //这个对象处理关于区的读取
    this.countysObject = {
        selectedTwoLevelId: {},
        iosCountys: [],
        refreshCountys: function (oneLevelId, twoLevelId) {
            var _this = this;
            if (!(this.selectedTwoLevelId[twoLevelId])) {
                this.selectedTwoLevelId[twoLevelId] = true;
                //通过市id请求区
                sendAreaRequest(path + "/getAreaInfo", {
                    productNo : $("#productNo").val(),
                    parentId : twoLevelId
                }, function (successData) {
                    var data =  JSON.parse(successData).data;
                    for (var i = 0; i < data.length; i++) {
                        _this.iosCountys.push({
                            id: data[i].id,
                            value: data[i].codeName,
                            parentId:data[i].parentId,
                            codeValue:data[i].codeValue
                        })
                    }
                }, function (errorData){});
            }
        }
    };
    var that = this;
    $("#"+id).on("click", function () {
        var oneLevelId = $("#newCar_price_lable").attr('data-province-code');
        var twoLevelId = $("#newCar_price_lable").attr('data-city-code');
        var threeLevelId = $("#newCar_price_lable").attr('data-district-code');
        var $this=$(this);
        if ($this.siblings("input")[0].value == 2){
            var iosSelect = new IosSelect(2,
                [iosProvinces, that.citysObject.iosCitys],
                {
                    title: '地址选择',
                    itemHeight: 35,
                    oneTwoRelation: 1,//第一列和第二列是否通过parentId关联
                    oneLevelId: oneLevelId,//默认选中的第一列是哪个ID
                    twoLevelId: twoLevelId, //默认选中的第二列是哪个ID
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        //先配置选择好的省市区Id,下次打开的时候默认选中之前选中好的省市区
                        $("#newCar_price_lable").attr('data-province-code', selectOneObj.id);
                        $("#newCar_price_lable").attr('data-city-code', selectTwoObj.id);
                        //把 “请选择行驶区域” 改为选好的省市区
                        $("#"+id).val(selectOneObj.value + ' ' + selectTwoObj.value);
                        $this.siblings("input")[1].value = selectOneObj.codevalue;
                        $this.siblings("input")[2].value = selectTwoObj.codevalue;
                    }
                });
        }else{
            var iosSelect = new IosSelect(3,
                [iosProvinces, that.citysObject.iosCitys, that.countysObject.iosCountys],
                {
                    title: '地址选择',
                    itemHeight: 35,
                    oneTwoRelation: 1,//第一列和第二列是否通过parentId关联
                    twoThreeRelation: 1,//第二列和第三列是否通过parentId关联
                    oneLevelId: oneLevelId,//默认选中的第一列是哪个ID
                    twoLevelId: twoLevelId, //默认选中的第二列是哪个ID
                    threeLevelId: threeLevelId,
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        //先配置选择好的省市区Id,下次打开的时候默认选中之前选中好的省市区
                        $("#newCar_price_lable").attr('data-province-code', selectOneObj.id);
                        $("#newCar_price_lable").attr('data-city-code', selectTwoObj.id);
                        $("#newCar_price_lable").attr('data-district-code', selectThreeObj.id);
                        //把 “请选择行驶区域” 改为选好的省市区
                        $("#"+id).val(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                        $this.siblings("input")[1].value = selectOneObj.codevalue;
                        $this.siblings("input")[2].value = selectTwoObj.codevalue;
                        $this.siblings("input")[3].value = selectThreeObj.codevalue;
                    }
                });
        }

    })
}
//银行地区
function getBankArea(id,bankCode){
    //ajax请求 默认发同步请求
    sendAreaRequest = function (url, data, success, error) {
        $.ajax({
            url: url,
            type: "post",
            async: false,//发送同步请求
            data: data ? data : {},
            success: function (data) {
                if (success) {
                    success(data);
                }
            },
            error: function (data) {
                if (error) {
                    error(data);
                }
            }
        });
    };
    //初始获取省数据
    var iosProvinces = [];
    sendAreaRequest(path + "/pay/getBankAreaInfo", {
    	bankCode : bankCode,
        parentId : "0"
    }, function (successData) {
        var data =  JSON.parse(successData).data;
        for (var i = 0; i < data.length; i++) {
            iosProvinces.push({
            	id: data[i].areaNo,
                value: data[i].name,
                parentId:data[i].pAreaNo,
                codeValue:data[i].areaNo
            });
        }
    }, function (errorData) {});
    //这个对象处理关于市的读取
    this.cityObject = {
        selectedOneLevelId: {},
        iosCitys: [],
        refreshCitys: function (oneLevelId) {
            var _this = this;
            if (!(this.selectedOneLevelId[oneLevelId])) {
                this.selectedOneLevelId[oneLevelId] = true;
                //通过省id请求市
                sendAreaRequest(path + "/pay/getBankAreaInfo", {
                	bankCode : bankCode,
                    parentId : oneLevelId
                }, function (successData) {
                    var data =  JSON.parse(successData).data;
                    for (var i = 0; i < data.length; i++) {
                        _this.iosCitys.push({
                        	id: data[i].areaNo,
                            value: data[i].name,
                            parentId:data[i].pAreaNo,
                            codeValue:data[i].areaNo
                        });
                    }
                }, function (errorData) {});
            }
        }
    };
    //这个对象处理关于区的读取
    this.countyObject = {
        selectedTwoLevelId: {},
        iosCountys: [],
        refreshCountys: function (oneLevelId, twoLevelId) {
            var _this = this;
            if (!(this.selectedTwoLevelId[twoLevelId])) {
                this.selectedTwoLevelId[twoLevelId] = true;
                //通过市id请求区
                sendAreaRequest(path + "/pay/getBankAreaInfo", {
                	bankCode : bankCode,
                    parentId : twoLevelId
                }, function (successData) {
                    var data =  JSON.parse(successData).data;
                    for (var i = 0; i < data.length; i++) {
                        _this.iosCountys.push({
                        	id: data[i].areaNo,
                            value: data[i].name,
                            parentId:data[i].pAreaNo,
                            codeValue:data[i].areaNo
                        })
                    }
                }, function (errorData){});
            }
        }
    };
    var that = this;
    if(!window.num){
        window.num = 0;
    }
    var flag = num;
	num++;
    $("#"+id).on("click", function () {
    	if(flag < num-1){
    		return
    	};
        var oneLevelId = $("#newCar_price_lable").attr('data-province-code');
        var twoLevelId = $("#newCar_price_lable").attr('data-city-code');
        var threeLevelId = $("#newCar_price_lable").attr('data-district-code');
        var $this=$(this);
        if ($this.siblings("input")[0].value == 2){
            var iosSelect01 = new IosSelect01(2,
                [iosProvinces, that.cityObject.iosCitys],
                {
                    title: '地址选择',
                    itemHeight: 35,
                    oneTwoRelation: 1,//第一列和第二列是否通过parentId关联
                    oneLevelId: oneLevelId,//默认选中的第一列是哪个ID
                    twoLevelId: twoLevelId, //默认选中的第二列是哪个ID
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        //先配置选择好的省市区Id,下次打开的时候默认选中之前选中好的省市区
                        $("#newCar_price_lable").attr('data-province-code', selectOneObj.id);
                        $("#newCar_price_lable").attr('data-city-code', selectTwoObj.id);
                        //把 “请选择行驶区域” 改为选好的省市区
                        $("#"+id).val(selectOneObj.value + ' ' + selectTwoObj.value);
                        $this.siblings("input")[1].value = selectOneObj.codevalue;
                        $this.siblings("input")[2].value = selectTwoObj.codevalue;
                        getSubBank(path +"/pay/getSubBankInfo",{
                        	bankCode:bankCode,
                        	banksProvince:selectOneObj.codevalue,
                        	banksCity:selectTwoObj.codevalue
                        },function(data){
                        	var obj = JSON.parse(data);
                        	$("#accountSubBank").html('<option value="">请选择</option>');
                        	var htm = "";
                        	for(var i = 0;i < obj.data.length;i++){
                        		htm += '<option value="'+obj.data[i].bankNo+'">'+obj.data[i].bankName+'</option>';
                        	}
                        	$("#accountSubBank").append(htm);
                        	$("#accountSubBank").scroller('destroy').scroller($.extend({preset: 'select'}, {
                                theme: "android-ics light",
                                lang: "zh",
                                display: 'bottom',
                                rtl: true,
                                inputClass: 'tmp'
                            }));
                        },function(){})
                    }
                });
        }else{
            var iosSelect01 = new IosSelect01(3,
                [iosProvinces, that.cityObject.iosCitys, that.countyObject.iosCountys],
                {
                    title: '地址选择',
                    itemHeight: 35,
                    oneTwoRelation: 1,//第一列和第二列是否通过parentId关联
                    twoThreeRelation: 1,//第二列和第三列是否通过parentId关联
                    oneLevelId: oneLevelId,//默认选中的第一列是哪个ID
                    twoLevelId: twoLevelId, //默认选中的第二列是哪个ID
                    threeLevelId: threeLevelId,
                    display: 'bottom',
                    callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                        //先配置选择好的省市区Id,下次打开的时候默认选中之前选中好的省市区
                        $("#newCar_price_lable").attr('data-province-code', selectOneObj.id);
                        $("#newCar_price_lable").attr('data-city-code', selectTwoObj.id);
                        $("#newCar_price_lable").attr('data-district-code', selectThreeObj.id);
                        //把 “请选择行驶区域” 改为选好的省市区
                        $("#"+id).val(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                        $this.siblings("input")[1].value = selectOneObj.codevalue;
                        $this.siblings("input")[2].value = selectTwoObj.codevalue;
                        $this.siblings("input")[3].value = selectThreeObj.codevalue;
                    }
                });
        }

    })
}
function getSubBank(url,data,success,error){
	$.ajax({
        url: url,
        type: "post",
        async: false,//发送同步请求
        data: data ? data : {},
        success: function (data) {
            if (success) {
                success(data);
            }
        },
        error: function (data) {
            if (error) {
                error(data);
            }
        }
    });
}
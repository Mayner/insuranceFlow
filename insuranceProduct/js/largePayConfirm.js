$(function () {
    //点击开户行获取后端数据
    $(".bankBtn").click(function(){
    });
    //下拉选择样式
    $("select").each(function () {
        $(this).scroller('destroy').scroller($.extend({preset: 'select'}, {
            theme: "android-ics light",
            lang: "zh",
            display: 'bottom',
            rtl: true,
            inputClass: 'tmp',
            onSelect: function () {
                if ($(this).find("option:selected").text()=="请选择"){
                    $(this).siblings(".tmp").css("color","#999999");
                }else{
                    $(this).siblings(".tmp").css("color","#222222");
                }
            }
        }));
    });
    $(".tmp").each(function(){
        if($(this).val()=="请选择"){
            $(this).css("color","#999999");
        }else{
            $(this).css("color","#222222");
        }
    });

    //改变银行发送数据
    $(".bankBtn").change(function(){
        $("#bankArea").val("");
        getBankArea("bankArea",$(this).find("option:selected").val());
    });

    //确认支付
    $(".confirmBtn").on("click", function () {
        //提交校验
        if (!checkConfirm()) return false;
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
    //改变开户行的下拉状态，错误提示信息消失
    $("#accountBank").on("change", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });
    //改变开户所在地的下拉状态，错误提示信息消失
    $("#bankArea").on("click", function () {
        $(this).parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    });

    //银行卡卡号校验
    $("#cardNo").on("blur", function () {
        checkCardNo($(this));
        $("#cardNoAgain").val("");
    });
    //再次输入银行卡号校验
    $("#cardNoAgain").on("blur", function () {
        checkCardNoAgain($(this),$("#cardNo"));
    });
});
/********************************提交信息校验方法*******************************/
function checkConfirm() {
    var flag = true;
    //姓名
    if (!checkName($("#policyName"))) {
        flag = false;
    }
    //开户行校验
    if ($("#accountBank").find("option:selected").text() == "请选择") {
        $("#accountBank").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择开户行！");
        flag = false;
    } else {
        $("#accountBank").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
    }
    //开户所在地校验
    if ($("#bankArea").val() == "") {
     $("#bankArea").parent().siblings(".errorMsg").css("display", "inline-block").text("请选择开户所在地！");
        flag = false;
     } else {
     $("#bankArea").parent().siblings(".errorMsg").css("display", "inline-block").text("").hide();
     }
    //银行卡卡号
    if (!checkCardNo($("#cardNo"))) {
        flag = false;
    }
    //再次输入银行卡号校验
    if (!checkCardNoAgain($("#cardNoAgain"),$("#cardNo"))) {
        flag = false;
    }
    if (!flag) return;
    return true;
}

//历史回退
function goBack() {
    window.history.back();
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
                id: data[i].id,
                value: data[i].codeName,
                parentId:data[i].parentId,
                codeValue:data[i].codeValue
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








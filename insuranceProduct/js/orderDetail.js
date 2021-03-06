$(function () {
    //var path = "http://10.10.116.170:21002/",//本地
    //var path = "http://10.219.10.72:21002/",//测试环境
    //var path = "http://10.10.116.90:21002/order/",//本地
    var path = "https://www.dahuobaoxian.com/order/",//生产环境
        productNo = getQueryString("productNo"),
        memberId = getQueryString("memberId"),
        channelCode = getQueryString("channelCode"),
        orderNo = getQueryString("orderNo"),
        orderStatus = getQueryString("orderStatus"),
        code = getQueryString("code");
    //productNo = "210102001";
    //memberId = "187891";
    //channelCode = "01";
    //orderNo = "D00DtI1rXo000000000305";
    //code = "ee645483092e1af702a219368730e8da";
    //orderStatus = "0";//全部
    //orderStatus = "1";//暂存
    //orderStatus = "2";//待支付
    //orderStatus = "3";//已支付
    //orderStatus = "4";//订单过期
    //orderStatus = "5";//已取消
    //orderStatus = "6";//订单删除
    //orderStatus = "7";//待续保
    //orderStatus = "8";//已预约
    //console.log(productNo, memberId, channelCode, orderNo, orderStatus, code);

    //判断显示理赔还是再投
    if (orderStatus == "3") {
        //$("#apply").show();
        $("#insuredAgain").hide();
    }else if (orderStatus == "5" || orderStatus == "7") {
        //$("#apply").hide();
        $("#insuredAgain").show();
    } else {
        //$("#apply").hide();
        $("#insuredAgain").hide();
    }

    //var url = "http://10.10.116.170:21002/orderInfo/getOrderInfoDetail?memberId=187891&orderNo=D00DtI1rXo000000000305";
    sendRequest(path + "orderInfo/getOrderInfoDetail",{memberId: memberId, orderNo: orderNo, code: code}, function (data) {
        console.log(data);
        if (data.code == "0") {
            var dataObj = data.data;
            var orderShowInfoList = dataObj.orderShowInfoList,
                dutyShowInfoList = dataObj.dutyShowInfoList,
                appntShowInfoList = dataObj.appntShowInfoList,
                insuredShowInfoList = dataObj.insuredShowInfoList,
                totalAmount = dataObj.totalAmount,
                html = '';

            //渲染保费
            $(".premium .m-num").text(totalAmount);
            orderNo = dataObj.orderNo;
            //订单号
            $("#orderNo").val(orderNo);

            //渲染页面数据
            renderHtml(orderShowInfoList);
            $("#orderShowInfoList").append(html);
            html = '';
            renderHtml(dutyShowInfoList);
            $("#dutyShowInfoList").append(html);
            html = '';
            renderHtml(appntShowInfoList);
            $("#appntShowInfoList").append(html);
            html = '';
            renderHtml(insuredShowInfoList);
            $("#insuredShowInfoList").append(html);

            //判断显示理赔还是再投
            orderStatus = dataObj.orderStatus;
            if (orderStatus == "3") {
                //$("#apply").show();
                $("#insuredAgain").hide();
            }else if (orderStatus == "5" || orderStatus == "7") {
                //$("#apply").hide();
                $("#insuredAgain").show();
            } else {
                //$("#apply").hide();
                $("#insuredAgain").hide();
            }

            //渲染页面函数
            function renderHtml(arr) {
                for (var i = 0; i < arr.length; i ++) {
                    if (arr[i].showName == undefined) {
                        arr[i].showName = "";
                    }
                    if (arr[i].showValue == undefined) {
                        arr[i].showValue = "";
                    }
                    html += '<dl>'+
                            '    <span class="orderLeft">'+arr[i].showName+'</span><span class="orderRight">'+arr[i].showValue+'</span>'+
                            '</dl>';
                }
            }
        } else if (data.code == "1") {
            $(".mask01 span").text(data.msg);
            $(".mask01").show();
            $(".pop01").show();
        }
    }, function () {

    });

    //点击再次投保按钮
    $("#insuredAgain").on("click", function () {
        $(".loading").show();
        window.location.href = path + "getOrderAgainPageInfo?orderNo=" + orderNo;
    });
    //产品编码相对应的保险公司名称
    //1101 : 安邦人寿保险股份有限公司
    //2101 : 安邦财产保险股份有限公司
    //3101 : 和谐健康保险股份有限公司
    //4101 : 安邦养老保险股份有限公司
    if (productNo) {
        if (productNo.substr(0, 4) == "1101") {
            $("footer .content").text("本产品由安邦人寿保险股份有限公司承保。")
        } else if (productNo.substr(0, 4) == "2101") {
            $("footer .content").text("本产品由安邦财产保险股份有限公司承保。")
        } else if (productNo.substr(0, 4) == "3101") {
            $("footer .content").text("本产品由和谐健康保险股份有限公司承保。")
        } else if (productNo.substr(0, 4) == "4101") {
            $("footer .content").text("本产品由安邦养老保险股份有限公司承保。")
        }
    }

    //点击申请理赔弹窗
    //$("#apply").on("click", function () {
    //    $(".mask").show();
    //    $(".pop").show();
    //});
    //$(".pop-cancel,.pop-sure").on("click", function () {
    //    $(".mask").hide();
    //    $(".pop").hide();
    //})
});

//获取页面urlParam
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
//ajax
function sendRequest(url, data, success, error) {
    $.ajax({
        url: url,
        type: "post",
        async: true,
        data: data ? data : {},
        dataType: "json",
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
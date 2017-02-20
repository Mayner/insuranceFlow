$(function () {
    var memberId = getQueryString("memberId");
    console.log(memberId);
    $("#insuredAgain").on("click", function () {
        console.log($("#orderForm").submit());
        $(".loading").show();
    });
    //var url = "http://10.10.112.224:21002/orderInfo/getOrderInfoDetail?memberId=187891&orderNo=D00DtI1rXo000000000305";
    sendRequest("http://10.10.116.170:21002/orderInfo/getOrderInfoDetail",{memberId:"187891",orderNo:"D00DtI1rXo000000000305"}, function (data) {
        if (data.code == "0") {
            console.log(data);
            var dataObj = data.data;
            console.log(dataObj);
            var insuredShowInfoList = dataObj.insuredShowInfoList;
            console.log(insuredShowInfoList);
        }

    }, function () {});

});

//ajax
function sendRequest(url, data, success, error) {
    $.ajax({
        url: url,
        type: "post",
        async: true,
        data: data ? data : {},
        dataType: "json",
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
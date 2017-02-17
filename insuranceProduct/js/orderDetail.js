$(function () {
    $("#insuredAgain").on("click", function () {
        console.log($("#orderForm").submit());
        $(".loading").show();
    })
});
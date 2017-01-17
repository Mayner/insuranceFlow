<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no"/>
    <meta name="format-detection" content="email=no">
    <title>支付成功</title>
    <link rel="stylesheet" href="../css/insuranceBase.css">
    <link rel="stylesheet" href="../css/paySuccess.css">
    <script src="../js/jquery-1.10.1.min.js"></script>
    <script src="../js/html5shiv.min.js"></script>
    <script src="../js/rem.min.js"></script>
    <script src="../js/runRem.js"></script>
    <script src="../js/fastclick.js"></script>
    <script src="../js/runFastclick.js"></script>
    <script src="../js/paySuccess.js"></script>
</head>
<body>
    <div class="box bgColor">
        <div class="payContent">
            <div class="bgImg"></div>
            <p class="txtC">恭喜您，投保成功！</p>
            <p class="txtC">${productName }</p>
            <p class="txtC">保单号：${policyNo }</p>
        </div>
        <ul class="jumpBtn pl pr">
            <li class="txtC l-float" id="jumpToProduct">产品主页</li>
            <li class="txtC r-float active" id="jumpToOrder">查看订单</li>
        </ul>
        <div class="msg">
            <p class="txtC">保单号稍后将以短信方式发送至您的手机；</p>
            <p class="txtC">电子保单稍后将以邮件形式发送至您的邮箱。</p>
            <a href="tel:95569" class="txtC">如有疑问，请致电客服：95569</a>
        </div>
    </div>

    <!--加载动画-->
    <div class="loading">
        <div class="sk-circle">
            <div class="sk-circle1 sk-child"></div>
            <div class="sk-circle2 sk-child"></div>
            <div class="sk-circle3 sk-child"></div>
            <div class="sk-circle4 sk-child"></div>
            <div class="sk-circle5 sk-child"></div>
            <div class="sk-circle6 sk-child"></div>
            <div class="sk-circle7 sk-child"></div>
            <div class="sk-circle8 sk-child"></div>
            <div class="sk-circle9 sk-child"></div>
            <div class="sk-circle10 sk-child"></div>
            <div class="sk-circle11 sk-child"></div>
            <div class="sk-circle12 sk-child"></div>
        </div>
    </div>
</body>
</html>
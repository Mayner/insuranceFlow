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
    <title>异常页面</title>
    <link rel="stylesheet" href="../css/insuranceBase.css">
    <link rel="stylesheet" href="../css/payFailed.css">
    <script src="../js/jquery-1.10.1.min.js"></script>
    <script src="../js/html5shiv.min.js"></script>
    <script src="../js/rem.min.js"></script>
    <script src="../js/runRem.js"></script>
    <script src="../js/fastclick.js"></script>
    <script src="../js/runFastclick.js"></script>
    <script src="../js/payFailed.js"></script>
</head>
<body>
    <div class="box bgColor">
        <div class="payContent">
            <div class="bgImg"></div>
            <p class="txtC">支付失败</p>
            <p class="txtC">${msg}</p>
        </div>
        <input type="hidden" id="orderNo" name="orderNo" value ="${orderNo}"/> 
        <ul class="jumpBtn txtC">
            <li class="txtC" id="payAgain">重新支付</li>
        </ul>
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
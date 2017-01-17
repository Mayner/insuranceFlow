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
    <title>储蓄卡支付</title>
    <link rel="stylesheet" href="../../../shopping/css/insuranceBase.css">
    <link rel="stylesheet" href="../../../shopping/css/payConfirm.css">
    <link href="../../../shopping/css/mobiscroll-2.13.2.full.min.css" rel="stylesheet" type="text/css" />
    <script src="../../../shopping/js/path.js"></script>
    <script src="../../../shopping/js/jquery-1.10.1.min.js"></script>
    <script src="../../../shopping/js/html5shiv.min.js"></script>
    <script src="../../../shopping/js/rem.min.js"></script>
    <script src="../../../shopping/js/runRem.js"></script>
    <script src="../../../shopping/js/fastclick.js"></script>
    <script src="../../../shopping/js/runFastclick.js"></script>
    <script src="../../../shopping/js/checkFn.js"></script>
    <script src="../../../shopping/js/depositPayConfirm.js"></script>
    <script src="../../../shopping/js/mobiscroll-2.13.2.full.min.js" type="text/javascript"></script>
</head>
<body>
<header class="header w100 borTop1 borBot1 bgColor pl pr">
    <a href="javascript:void(0)" class="reelect hasArrow w100">
        <span class="">重新选择支付方式</span>
        <i class="reelectArrow"></i>
    </a>
</header>
<article class="info">
    <form id="formId" name="formName" method="post" action="/pay/payDebitCard">
    	<input type="hidden" class="bankInfo" id="orderId" name="orderId" value="${payR.orderId}" />
    	<input type="hidden" class="bankInfo" id="payType" name="payType" value="${payR.payType}" />
    	<input type="hidden" class="bankInfo" id="orderNo" name="orderNo" value="${payR.orderNo}" />
    	<input type="hidden" class="bankInfo" id="memberId" name="memberId" value="${payR.memberId}" />
    	<input type="hidden" class="bankInfo" id="totalAmount" name="totalAmount" value="${payR.totalAmount}" />
    	<input type="hidden" class="bankInfo" id="manageCompany" name="manageCompany" value="${payR.manageCompany}" />
    	<input type="hidden" class="bankInfo" id="token" name="token" value="" />
        <!--投保人信息-->
        <section class="infoList">
            <div class="infoSec pl pr bgColor borTop1 borBot1">
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">姓名</dt>
                    <dd class="w60 l-float txtR">
                        <input type="text" class="textfield txtR bankInfo" id="policyName" name="accountName" value="${payR.accountName}" placeholder="请输入开户名">
                    </dd>
                    <span class="errorMsg"></span>
                </dl>
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">证件类型</dt>
                    <dd class="w60 l-float txtR hasArrow">
                        <select id="cardType" name="" class="bankInfo">
                            <option value="1">身份证</option>
                        </select>
                        <i class="arrow"></i>
                    </dd>
                    <span class="errorMsg"></span>
                </dl>
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">证件号码</dt>
                    <dd class="w60 l-float txtR">
                        <input type="text" class="textfield txtR bankInfo" name="certificateNo" id="idNo" value="${payR.certificateNo }" placeholder="请输入证件号码">
                    </dd>
                    <span class="errorMsg"></span>
                </dl>
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">储蓄卡卡号</dt>
                    <dd class="w60 l-float txtR">
                        <input type="text" class="textfield txtR bankInfo" name="accountCode" id="depositNo" placeholder="请输入银行卡号">
                    </dd>
                    <span class="errorMsg"></span>
                </dl>
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">银行预留手机号</dt>
                    <dd class="w60 l-float txtR">
                        <input type="tel" class="textfield txtR bankInfo" name="phone" id="tel" placeholder="请输入手机号">
                    </dd>
                    <span class="errorMsg"></span>
                </dl>
                <dl class="clearfix infoDl borBot1 dlSec">
                    <dt class="w40 l-float">短信验证码</dt>
                    <dd class="w60 l-float txtR posRelative">
                        <input type="text" class="txtR w40 l-float verificationCode bankInfo" name="validCode" id="verificationCode">
                        <i class="iconBorder"></i>
                        <input type="button" class="w55 r-float getCode" id="getCode"  value="获取验证码">
                    </dd>
                    <span class="errorMsg">had</span>
                </dl>
            </div>
        </section>
    </form>
    <!--支付按钮-->
    <div class="txtC confirmBtn" >确认支付</div>
</article>
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
<!--弹窗-->
<div class="mask" >
    <div class="pop repeat">
        <span>失败提示</span>
        <a class="pop-sure">确定</a>
    </div>
</div>
</body>
</html>
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
    <title>确认并支付</title>
    <link rel="stylesheet" href="../../../shopping/css/insuranceBase.css">
    <link rel="stylesheet" href="../../../shopping/css/payment.css">
    <script src="../../../shopping/js/jquery-1.10.1.min.js"></script>
    <script src="../../../shopping/js/html5shiv.min.js"></script>
    <script src="../../../shopping/js/rem.min.js"></script>
    <script src="../../../shopping/js/runRem.js"></script>
    <script src="../../../shopping/js/fastclick.js"></script>
    <script src="../../../shopping/js/runFastclick.js"></script>
    <script src="../../../shopping/js/payment.js"></script>
</head>
<body>
    <header class="header borTop1 pl pr bgColor">
        <h3 class="">${orderProduct.productName }</h3>
        <a class="w20 txtC modify" href="javascript:void(0)">修改</a>
        <div class="headerDetails w100">
            <dl class="insureDetails">
            	<span class="headerLeft">订单号：</span><span class="headerRight">${order.orderNo}</span>
            </dl>
            <dl class="insureDetails">
            	<span class="headerLeft">投保人：</span><span class="headerRight">${applicant.appntName}</span>
            </dl>
            <c:forEach var="appfact" items="${appfactList}">
                <dl class="insureDetails">
                	<span class="headerLeft">${appfact.appName}：</span><span class="headerRight">${appfact.showValue}</span>
                </dl>
            </c:forEach>
            <dl class="insureDetails">
            	<span class="headerLeft">应缴费用：</span><span class="headerRight">${order.totalAmount}元</span>
            </dl>
        </div>
    </header>
    <div class="order txtC bgColor">
        <span class="hideOrder">显示订单详情</span>
    </div>
    <article class="info">
        <!--保障责任-->
        <section class="pl pr pt bgColor">
            <p class="borBot1 secTitle">保障责任</p>
            <div class="orderDetails w100">
            	<c:forEach var="du" items="${dutyList}">
	                <dl>
	                    <span class="orderLeft">${du.dutyName}：</span><span class="orderRight">${du.showamnt}</span>
	                </dl>
                </c:forEach>
            </div>
        </section>
        <!--投保人信息-->
        <section class="pl pr pt bgColor">
            <p class="borBot1 secTitle">投保人信息</p>
            <div class="orderDetails w100">
                <dl>
                    <span class="orderLeft">姓名：</span><span class="orderRight">${applicant.appntName }</span>
                </dl>
                <dl>
                    <span class="orderLeft">性别：</span>
                    <c:choose>
						  <c:when test="${applicant.appntSex=='1'}">  
                    		        <span class="orderRight">男</span>
                    	  </c:when> 
                    	  <c:when test="${applicant.appntSex=='2'}">  
                    		        <span class="orderRight">女</span>
                    	  </c:when> 
						  <c:otherwise>   
                          			<span class="orderRight">不详</span>
						  </c:otherwise> 
					</c:choose>
                </dl>
                <dl>
                    <span class="orderLeft">生日：</span><span class="orderRight">${applicant.appntBirthday }</span>
                </dl>
                <dl>
                    <span class="orderLeft">证件类型：</span><span class="orderRight">${applicant.appntIdcardTypeName }</span>
                </dl>
                <dl>
                    <span class="orderLeft">证件号码：</span><span class="orderRight">${applicant.appntIdcardNo }</span>
                </dl>
                <c:if test="${applicant.appntEmail!=null && applicant.appntEmail!=''}">
	                 <dl>
	                    <span class="orderLeft">邮箱：</span><span class="orderRight">${applicant.appntEmail }</span>
	                </dl>
                </c:if>
                <c:if test="${applicant.appntMobile!=null && applicant.appntMobile!=''}">
	                 <dl>
	                    <span class="orderLeft">手机：</span><span class="orderRight">${applicant.appntMobile }</span>
	                </dl>
                </c:if>
                <c:if test="${applicant.appntProvinceName !=null||applicant.appntCityName !=null||applicant.appntCountyName !=null||applicant.appntAddress !=null}">
	                 <dl>
	                    <span class="orderLeft">地址：</span>
	                    <span class="orderRight">
	                    	<c:if test="${applicant.appntProvinceName!=null && applicant.appntProvinceName!=''}">
	                    		${applicant.appntProvinceName}
	                    	</c:if>
	                    	<c:if test="${applicant.appntCityName!=null && applicant.appntCityName!=''}">
	                    		${applicant.appntCityName}
	                    	</c:if>
	                    	<c:if test="${applicant.appntCountyName!=null && applicant.appntCountyName!=''}">
	                    		${applicant.appntCountyName}
	                    	</c:if>
	                    	<c:if test="${applicant.appntAddress!=null && applicant.appntAddress!=''}">
	                    		${applicant.appntAddress}
	                    	</c:if>
	                    </span>
	                </dl>
                </c:if>
                <c:if test="${applicant.appntOccupation3Name!=null && applicant.appntOccupation3Name!=''}">
	                <dl>
	                    <span class="orderLeft">职业：</span><span class="orderRight">${applicant.appntOccupation3Name }</span>
	                </dl>
                </c:if>
                <c:if test="${applicant.appntZipCode!=null && applicant.appntZipCode!=''}">
	                <dl>
	                    <span class="orderLeft">邮编：</span><span class="orderRight">${applicant.appntZipCode }</span>
	                </dl>
                </c:if>
            </div>
        </section>
        <!--被保人信息-->
        <section class="pl pr pt bgColor">
            <p class="borBot1 secTitle">被保人信息</p>
            <div class="orderDetails w100">
                <dl>
                    <span class="orderLeft">姓名：</span><span class="orderRight">${insured.insuredName }</span>
                </dl>
                <dl>
                    <span class="orderLeft">性别：</span>
                    <c:choose>
						  <c:when test="${insured.insuredSex=='1'}">  
                    		        <span class="orderRight">男</span>
                    	  </c:when> 
                    	  <c:when test="${insured.insuredSex=='2'}">  
                    		        <span class="orderRight">女</span>
                    	  </c:when> 
						  <c:otherwise>   
                          			<span class="orderRight">不详</span>
						  </c:otherwise> 
					</c:choose>
                </dl>
                <dl>
                    <span class="orderLeft">生日：</span><span class="orderRight">${insured.insuredBirthday }</span>
                </dl>
                <dl>
                    <span class="orderLeft">证件类型：</span><span class="orderRight">${insured.insuredIdcardTypeName }</span>
                </dl>
                <dl>
                    <span class="orderLeft">证件号码：</span><span class="orderRight">${insured.insuredIdcardNo }</span>
                </dl>
                <c:if test="${insured.insuredEmail!=null && insured.insuredEmail!=''}">
	                 <dl>
	                    <span class="orderLeft">邮箱：</span><span class="orderRight">${insured.insuredEmail }</span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredMobile!=null && insured.insuredMobile!=''}">
	                 <dl>
	                    <span class="orderLeft">手机：</span><span class="orderRight">${insured.insuredMobile }</span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredProvinceName !=null||insured.insuredCityName !=null||insured.insuredCountyName !=null||insured.insuredAddress !=null}">
	                 <dl>
	                    <span class="orderLeft">地址：</span>
	                    <span class="orderRight">
	                    	<c:if test="${insured.insuredProvinceName!=null && insured.insuredProvinceName!=''}">
	                    		${insured.insuredProvinceName}
	                    	</c:if>
	                    	<c:if test="${insured.insuredCityName!=null && insured.insuredCityName!=''}">
	                    		${insured.insuredCityName}
	                    	</c:if>
	                    	<c:if test="${insured.insuredCountyName!=null && insured.insuredCountyName!=''}">
	                    		${insured.insuredCountyName}
	                    	</c:if>
	                    	<c:if test="${insured.insuredAddress!=null && insured.insuredAddress!=''}">
	                    		${insured.insuredAddress}
	                    	</c:if>
	                    </span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredOccupation3Name!=null && insured.insuredOccupation3Name!=''}">
	                <dl>
	                    <span class="orderLeft">职业：</span><span class="orderRight">${insured.insuredOccupation3Name }</span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredZipCode!=null && insured.insuredZipCode!=''}">
	                <dl>
	                    <span class="orderLeft">邮编：</span><span class="orderRight">${insured.insuredZipCode }</span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredHeight!=null && insured.insuredHeight!=''}">
	                <dl>
	                    <span class="orderLeft">身高：</span><span class="orderRight">${insured.insuredHeight } cm</span>
	                </dl>
                </c:if>
                <c:if test="${insured.insuredBodyWeight!=null && insured.insuredBodyWeight!=''}">
	                <dl>
	                    <span class="orderLeft">体重：</span><span class="orderRight">${insured.insuredBodyWeight } kg</span>
	                </dl>
                </c:if>
                <c:if test="${insured.copiesNo!=null && insured.copiesNo!=''}">
	                <dl>
	                    <span class="orderLeft">份数：</span><span class="orderRight">${insured.copiesNo }份</span>
	                </dl>
                </c:if>
            </div>
        </section>
        <!--其他信息-->
        <section class="pl pr pt bgColor">
            <p class="borBot1 secTitle">其他信息</p>
            <div class="orderDetails w100">
                <dl>
                    <span class="orderLeft policyType">保单类型：</span><span class="orderRight">电子子保单(理赔时只需要提供身份证即可)</span>
                </dl>
            </div>
        </section>
    </article>
        <!--支付方式-->
    <section class="pt borBot1 bgColor">
	    <form id="payTypeForm" action="/pay/getPayPage" method="post">
	        <input type="hidden" name="orderNo" value="${order.orderNo}" />
	        <p class="pl borTop1 payTitle">支付方式</p>
	        <div class="pl pr borTop1 borBot1 largePay">
	            <dl class="clearfix infoDl w100 depositCard">
	                <dt class="w40 l-float">储蓄卡支付</dt>
	                <input type="radio"  name="payType" checked class="payType" value="1" style="display: none;">
	            </dl>
	        </div>
		</form>
    </section>
    <!--勾选同意-->
    <section class="infoList">
        <div class="ml whetherRead">
            <i id="whetherCheck" class="checkBox whetherCheck"></i>
            <span>我已认真阅读<a href="">《投保声明》</a>并同意上述协议规定</span>
        </div>
    </section>
    <!--支付按钮-->
    <div class="infoSec pl bgColor borTop1 fixedBox w100">
        <dl class="clearfix w100">
            <dt class="w60 l-float">合计：<span class="insurePrice" id="insurePrice">1314.00</span>元</dt>
            <dd class="w40 l-float">
                <div class="insureBtn txtC">立即支付</div>
            </dd>
        </dl>
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
    <!--弹窗-->
    <div class="mask" >
        <div class="pop repeat">
            <span>对不起，您的核保未通过XXX</span>
            <a class="pop-sure">确定</a>
        </div>
    </div>
</body>
</html>
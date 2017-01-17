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
    <title>投保信息</title>
    <link rel="stylesheet" href="../../../shopping/css/insuranceBase.css">
    <link rel="stylesheet" href="../../../shopping/css/insuranceInformation.css">
    <link href="../../../shopping/css/mobiscroll-2.13.2.full.min.css" rel="stylesheet" type="text/css" />
    <link href="../../../shopping/css/iosSelect.css" rel="stylesheet" type="text/css" />
    <script src="../../../shopping/js/path.js"></script>
    <script src="../../../shopping/js/jquery-1.10.1.min.js"></script>
    <script src="../../../shopping/js/html5shiv.min.js"></script>
    <script src="../../../shopping/js/rem.min.js"></script>
    <script src="../../../shopping/js/runRem.js"></script>
    <script src="../../../shopping/js/fastclick.js"></script>
    <script src="../../../shopping/js/runFastclick.js"></script>
    <script src="../../../shopping/js/mobiscroll-2.13.2.full.min.js" type="text/javascript"></script>
    <script src="../../../shopping/js/iscroll.js" type="text/javascript"></script>
    <script src="../../../shopping/js/iosSelect.js" type="text/javascript"></script>
    <script src="../../../shopping/js/iosSelect01.js" type="text/javascript"></script>
    <script src="../../../shopping/js/checkFn.js"></script>
    <script src="../../../shopping/js/insuranceInformation.js"></script>
    <script>
        $(function () {
            var currYear = (new Date()).getFullYear();
            function addDay(dayNumber, date) {
                date = date ? date : new Date();
                var ms = dayNumber * (1000 * 60 * 60 * 24);
                var newDate = new Date(date.getTime() + ms);
                return newDate;
            }
            var birthdayObj = {
                theme: 'android-ics light', //皮肤样式
                display: 'bottom', //显示方式
                rtl:true,
                mode: 'scroller', //日期选择模式
                lang:'zh',
                dateFormat: 'yyyy-mm-dd',
                dateOrder: 'ddmmyy',
                startYear:currYear - 150, //开始年份
                endYear:currYear, //结束年份
                maxDate: addDay(0)
            };
            // 出生日期
            $(".birthdayChoose").scroller('destroy').scroller($.extend({preset : 'date'}, birthdayObj));
            $(".insuredBirthdayChoose").scroller('destroy').scroller($.extend({preset : 'date'}, birthdayObj));
            var dateObj = {
                theme: 'android-ics light', //皮肤样式
                display: 'bottom', //显示方式
                rtl:true,
                mode: 'scroller', //日期选择模式
                lang:'zh',
                dateFormat: 'yyyy-mm-dd',
                dateOrder: 'ddmmyy',
                startYear:currYear - 80, //开始年份
                endYear:currYear + 30, //结束年份
                minDate: addDay(1)
            };
            // 证件有效期
            $("#idDate").scroller('destroy').scroller($.extend({preset : 'date'}, dateObj));
            $("#insuredIdDate").scroller('destroy').scroller($.extend({preset : 'date'}, dateObj));
        });
    </script>
</head>
<body>
    <header class="header w100 borTop1 borBot1 pl bgColor">
        <span>${productName}</span>
    </header>
    <article class="info">
        <form id="formId" name="formName" method="post" action="/getSaveInfo">
            <input type = "hidden" class = "personInfo" id= "productNo" name = "orderProduct.productCode" value = "${productNo}">
            <input type = "hidden" class = "personInfo" id= "memberId" name = "order.memberId" value = "${memberId}">
            <input type = "hidden" class = "personInfo" id= "channelCode" name = "order.channelCode" value = "${channelCode}">
         	<!--产品投保要素信息-->
            <section class="infoList">
                <p class="ml">产品投保要素</p>
                <div class="infoSec pl pr bgColor borTop1 borBot1">
	                <c:forEach var="appfact" items="${appfactList}">
	                    <dl class="clearfix borBot1 dlSec">
	                        <dt class="w35 l-float">${appfact.factorTypeName}</dt>
	                        <dd class="w65 l-float txtR hasArrow">
	                            <c:choose>
									  <c:when test="${appfact.femriskFactorList.size()>1}">   
										    <select name="appfact_${appfact.appFactorCode}" data-type="${appfact.factorType}" data-appfactorid="${appfact.appFactorCode }" data-ispremcal="${appfact.femriskFactorList.get(0).isPremCalFacotor}" data-value="" class="premium txtR iFactor">
				                                <c:forEach var="appfactV" items="${appfact.femriskFactorList}">
				                                	<option value="${appfactV.factorValue}">${appfactV.factorDisplayValue}</option>
				                                </c:forEach>
				                            </select>
	                           				 <i class="arrow"></i>
									  </c:when> 
									  <c:otherwise>   
	                            			<input type="text" readonly class="only txtR iFactor"  data-type="${appfact.factorType}"  data-appfactorid="${appfact.appFactorCode }" data-ispremcal="${appfact.femriskFactorList.get(0).isPremCalFacotor}" data-value="${appfact.femriskFactorList.get(0).factorValue}" value="${appfact.femriskFactorList.get(0).factorDisplayValue}">
									  </c:otherwise> 
								</c:choose>
	                        </dd>
                            <span class="errorMsg"></span>
	                    </dl>
	                </c:forEach>
	            </div>
            </section>
            <!--投保人信息-->
            <section class="infoList">
                <p class="ml">投保人信息</p>
                <div class="infoSec pl pr bgColor borTop1 borBot1">
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">姓名</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" id="policyName" name="applicant.appntName" placeholder="请输入投保人姓名">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">证件类型</dt>
                        <dd class="w65 l-float txtR hasArrow">
                            <select name="applicant.appntIdcardType" id="cardType"  class="cardType txtR personInfo " onchange="changeCardType(this.value)">
                                <!-- <option value="">请选择</option> -->
                                <c:forEach var="certificate" items="${certificateList}">
                                	<option value="${certificate.codeValue }" >${certificate.codeName }</option>
                                </c:forEach>
                            </select>
                            <i class="arrow"></i>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">证件号码</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" id="idNo" name ="applicant.appntIdcardNo" placeholder="请输入证件号码">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">证件有效期</dt>
                        <dd class="w65 l-float txtR">
                            <span class="l-float w60">
                                <input type="text" class="textfield txtR personInfo" readonly id="idDate" name = "applicant.appntIdcardExpireEnd" placeholder="请输入有效期">
                            </span>
                            <span class="choose"><input type="checkbox" name="applicant.longTermEffective" id="checkbox" class="unCheckBox personInfo"></span>
                            <span class=""><label for="checkbox" class="longTime">长期</label></span>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">出生日期</dt>
                        <dd class="w65 l-float txtR hasArrow">
                            <span class="birthday" id="birthdayChoose"><input type="text" class="textfield txtR personInfo birthdayChoose" readonly id="birthday" name = "applicant.appntBirthday" placeholder="请选择">
                            	<i class="arrow"></i>
                            </span>
                            <input type="text" class="textfield txtR birthdayReadonly" readonly>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">性别</dt>
                        <dd class="w65 l-float txtR hasArrow">
                            <input type = "hidden" name="applicant.appntSexName" id="applicantSex" value="" />
                            <div class="sex" id="sexChoose">
	                            <select name="applicant.appntSex" id="sex" class="sex txtR personInfo">
	                                <!-- <option value="" selected>请选择</option> -->
	                                <option value = "1">男</option>
	                                <option value = "2">女</option>
	                            </select>
                            	<i class="arrow"></i>
	                        </div>
                            <input type="text" class="textfield txtR sexReadonly" readonly>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">手机号码</dt>
                        <dd class="w65 l-float txtR">
                            <input type="tel" class="textfield txtR personInfo" id="tel" name = "applicant.appntMobile" placeholder="用于接收投保信息">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">电子邮箱</dt>
                        <dd class="w65 l-float txtR">
                            <input type="email" class="textfield txtR personInfo" id="email" name = "applicant.appntEmail" placeholder="用于接收电子保单">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">通讯地址</dt>
                        <dd class="w65 l-float txtR hasArrow">
                        	<input type="hidden" name = "" id ="" value="2" />
                            <input type="hidden" class="personInfo" name = "applicant.appntProvince" value="" />
                            <input type="hidden" class="personInfo" name = "applicant.appntCity" value="" />
                            <input type="hidden" class="personInfo" name = "applicant.appntCounty" value="" />
                            <input type="text" class="chosen txtR pr" readonly placeholder="请选择" id = "appntArea" value="">
                            <i class="arrow"></i>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">详细地址</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" id="address" name = "applicant.appntAddress" placeholder="请具体至门牌号">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">邮政编码</dt>
                        <dd class="w65 l-float txtR">
                            <input type="number" class="textfield txtR personInfo" id="postalCode" name = "applicant.appntZipCode" placeholder="请输入邮编">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                </div>
            </section>
            <!--被保人信息-->
            <section class="infoList">
                <p class="ml">被保人信息</p>
                <div class="infoSec pl pr bgColor borTop1 borBot1">
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w40 l-float">与投保人一致</dt>
                        <dd class="w60 l-float txtR hasArrow">
                            <i id="switch" class="turnOn"></i>
                            <input type="radio" style="display: none;">
                             <input type="hidden" class="personInfo" name = "isSelf" value="1">
                        </dd>
                    </dl>

                    <!--不一致时被保人信息-->
                    <div class="insured">
	                    <dl class="clearfix infoDl borBot1 dlSec">
	                        <dt class="w35 l-float">投被保人关系</dt>
	                        <dd class="w65 l-float txtR hasArrow">
	                            <select id="relation" name = "insuredList[0].relationShip" class="cardType txtR personInfo">
	                                <!--<option value="">请选择</option>-->
	                                <c:forEach var="relation" items="${relationList}">
	                                	<option value="${relation.codeValue}" >${relation.codeName }</option>
	                                </c:forEach>
	                            </select>
	                            <i class="arrow"></i>
	                        </dd>
                            <span class="errorMsg"></span>
	                    </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">姓名</dt>
                            <dd class="w65 l-float txtR">
                                <input type="text" class="textfield txtR personInfo" id="insuredName" name = "insuredList[0].insuredName" placeholder="请输入被保人姓名">
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">证件类型</dt>
                            <dd class="w65 l-float txtR hasArrow">
                                <select id="insuredCardType" name = "insuredList[0].insuredIdcardType" class="cardType txtR personInfo" onchange="changeInsuredCardType(this.value)">
                                    <c:forEach var="certificate" items="${certificateList}">
	                                	<option value="${certificate.codeValue}" >${certificate.codeName }</option>
	                                </c:forEach>
                                </select>
                                <i class="arrow"></i>
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">证件号码</dt>
                            <dd class="w65 l-float txtR">
                                <input type="text" class="textfield txtR personInfo" id="insuredIdNo" name="insuredList[0].insuredIdcardNo" placeholder="请输入证件号码">
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">证件有效期</dt>
                            <dd class="w65 l-float txtR">
                            <span class="l-float w60">
                                <input type="text" class="textfield txtR personInfo" readonly id="insuredIdDate" name = "insuredList[0].insuredIdcardExpireEnd" placeholder="请输入有效期">
                            </span>
                                <span class="choose"><input type="checkbox" name="insuredList[0].longTermEffective" id="insuredCheckbox" class="unCheckBox personInfo"></span>
                                <span class=""><label for="checkbox" class="longTime">长期</label></span>
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">出生日期</dt>
                            <dd class="w65 l-float txtR hasArrow">
                                <span class="insuredBirthday" id="insuredBirthdayChoose"><input type="text" class="textfield txtR personInfo insuredBirthdayChoose" readonly id="insuredBirthday" name = "insuredList[0].insuredBirthday" placeholder="请选择">
                                	<i class="arrow"></i>
                                </span>
                                <input type="text" class="textfield txtR insuredBirthdayReadonly" readonly>
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                        <dl class="clearfix infoDl borBot1 dlSec">
                            <dt class="w35 l-float">性别</dt>
                            <dd class="w65 l-float txtR hasArrow">
                                <div class="insuredSex" id="insuredSexChoose">
	                                <select name="insuredList[0].insuredSex" id="insuredSex" class="sex txtR personInfo">
	                                    <!-- <option value="" selected>请选择</option> -->
	                                    <option value = "1">男</option>
	                                	<option value = "2">女</option>
	                                </select>
	                                <i class="arrow"></i>
                                </div>
                                <input type="text" class="textfield txtR insuredSexReadonly" readonly>
                                <input class="textfield txtR mySelf" readonly>
                            </dd>
                            <span class="errorMsg"></span>
                        </dl>
                    </div>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w40 l-float">身高<span class="space"></span>(CM)</dt>
                        <dd class="w60 l-float txtR">
                            <input type="number" class="textfield txtR personInfo" id="height" name = "insuredList[0].insuredHeight" placeholder="请输入">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w40 l-float">体重<span class="space"></span>(KG)</dt>
                        <dd class="w60 l-float txtR ">
                            <input type="number" class="textfield txtR personInfo" id="weight" name = "insuredList[0].insuredBodyWeight" placeholder="请输入">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">职业</dt>
                        <dd class="w65 l-float txtR hasArrow">
                            <select name="occupation" id="occupation" name = "insuredList[0].insuredOccupation3" class="occupation txtR personInfo">
                                <option value="" >请选择</option>
                                <c:forEach var="occup" items="${occupList}">
                                	<option value="${occup.codeValue}" >${occup.codeName }</option>
                                </c:forEach>
                            </select>
                            <i class="arrow"></i>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                </div>
            </section>
            <!--责任信息-->
            <section class="infoList">
                <p class="ml">保险信息</p>
                <div class="infoSec pl pr bgColor borTop1 borBot1">
	                <c:forEach var="fmduty" items="${fmdutyList}">
	                    <dl class="clearfix borBot1 dlSec">
	                        <dt class="w80 l-float">${fmduty.dutyName}</dt>
	                        <dd class="w20 l-float txtR hasArrow">
	                            <c:choose>
									  <c:when test="${fmduty.femdutyFactor.femdutyAmntPremList.size()>1}">
										    <select name="duty_${fmduty.dutyCode}" id = "duty_${fmduty.dutyCode}" data-code="${fmduty.dutyCode}" data-value="" data-prem=""  data-ispremcal="${fmduty.femdutyFactor.isPremCalFacotor}" class="premium txtR insurInfo">
				                                <c:forEach var="fmdutyV" items="${fmduty.femdutyFactor.femdutyAmntPremList}">
				                                	<option value="${fmdutyV.backUp1}" selected>${fmdutyV.amnt}</option>
				                                </c:forEach>
				                            </select>
	                            	  		<i class="arrow"></i>
									  </c:when>
									  <c:otherwise>
	                            			<input type="text" readonly class="only textfield txtR insurInfo"  name="duty_${fmduty.dutyCode}" id = "duty_${fmduty.dutyCode}" data-code="${fmduty.dutyCode}" data-value="${fmduty.femdutyFactor.femdutyAmntPremList.get(0).backUp1}"  data-ispremcal="${fmduty.femdutyFactor.isPremCalFacotor}" data-prem="" value="${fmduty.femdutyFactor.femdutyAmntPremList.get(0).amnt}">
									  </c:otherwise>
								</c:choose>
	                        </dd>
                            <span class="errorMsg"></span>
	                    </dl>
	                </c:forEach>
	            </div>
            </section>
            <!--受益人信息-->
            <section class="infoList">
                <p class="ml">受益人信息</p>
                <div class="infoSec pl pr pt pb bgColor borTop1 borBot1">
                    <p class="title">法定受益人</p>
                    <a class="content pl pr" href="tel:95569">(如需变更请携带身份证原件到我司柜面处理，具体详情请咨询95569)</a>
                </div>
            </section>
            <!--续缴账户信息-->
            <section class="infoList">
                <p class="ml">续缴账户信息</p>
                <span class="tip ml">*为确保续保成功，请准确填写如下信息</span>
                <div class="infoSec pl pr bgColor borTop1 borBot1">
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">开户所在地</dt>
                        <dd class="w65 l-float txtR hasArrow">
                        	<input type="hidden" name = "" id ="" value="2" />
                            <input type="hidden" class="personInfo" name = "renewalBank.banksProvince" value="" />
                            <input type="hidden" class="personInfo" name = "renewalBank.banksCity" value="" />
                            <input type="hidden" class="personInfo" name = "renewalBank." value="" />
                            <input type="text" class="chosen txtR pr" readonly placeholder="请选择" id = "bankArea">
                            <i class="arrow"></i>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">开户行</dt>
                        <dd class="w65 l-float txtR hasArrow">
                            <select name="renewalBank.bankCode" id="accountBank" class="accountBank txtR personInfo">
                                <option value="" selected>请选择</option>
                            </select>
                            <i class="arrow"></i>
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">开户名</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" name="renewalBank.accountName" id="accountName" placeholder="请输入开户名">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">银行卡号</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" name = "renewalBank.accountCode" id="cardNo" placeholder="请输入卡号">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                    <dl class="clearfix infoDl borBot1 dlSec">
                        <dt class="w35 l-float">再次输入卡号</dt>
                        <dd class="w65 l-float txtR">
                            <input type="text" class="textfield txtR personInfo" id="cardNoAgain">
                        </dd>
                        <span class="errorMsg"></span>
                    </dl>
                </div>
            </section>
            <!--勾选同意-->
            <section class="infoList">
                <div class="ml whetherRead">
                    <i id="whetherCheck" class="checkBox"></i>
                    <span>我已认真阅读并同意此<a href="">《授权》</a></span>
                </div>
            </section>
        </form>
        <!--投保按钮-->
        <div class="pl bgColor borTop1 borBot1 fixedBox w100">
            <dl class="clearfix infoDl w100">
                <dt class="w60 l-float">保额：<span class="insurePrice" id="insurePrice">1314.00</span>元</dt>
                <dd class="w40 l-float">
                    <div class="insureBtn txtC" id="sureToSave">立即投保</div>
                </dd>
            </dl>
        </div>
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
/**
 * 姓名校验及错误信息提示函数
 * @param nameElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkName(nameElm) {
    if (checkEmpty(nameElm.val())) {
        nameElm.parent().siblings(".errorMsg").css("display", "inline-block").text("姓名不能为空！");
        return false;
    } else if (!Regex.noLessThanTwoChar.test(nameElm.val().trim())) {
        nameElm.parent().siblings(".errorMsg").css("display", "inline-block").text("姓名至少为2位且不能为数字！");
        return false;
    } else if (!Regex.onlyChineseOrOnlyEnglish.test(nameElm.val().trim())) {
        nameElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请输入有效姓名！");
        return false;
    } else {
        nameElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 身份证校验及错误信息提示函数
 * @param idElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkID(idElm) {
    if (checkEmpty(idElm.val())) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请输入证件号码！");
        return false;
    }
    //校验长度，类型
    else if (isCardNo(idElm.val().trim()) === false) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("您输入的证件号码不正确，请重新输入！");
        return false;
    }
    //检查省份
    else if (checkProvince(idElm.val().trim()) === false) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("您输入的证件号码不正确，请重新输入！");
        return false;
    }
    //校验生日
    else if (checkBirthday(idElm.val().trim()) === false) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("您输入的证件号码生日不正确，请重新输入！");
        return false;
    }
    //检验位的检测
    else if (checkParity(idElm.val().trim()) === false) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("您的证件号码不正确,请重新输入！");
        return false;
    }
    else {
        idElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 护照或其他证件校验及错误信息提示函数
 * @param idElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkOtherId(idElm) {
    if (checkEmpty(idElm.val())) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请输入证件号码！");
        return false;
    } else if (!Regex.leterOrNumber.test(idElm.val().trim())) {
        idElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请输入有效证件号码！");
        return false;
    } else {
        idElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 手机号校验及错误信息提示函数
 * @param telElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkTel(telElm) {
    if (checkEmpty(telElm.val())) {
        telElm.parent().siblings(".errorMsg").css("display", "inline-block").text("手机号码不能为空！");
        return false;
    } else if (!Regex.mobile.test(telElm.val().trim())) {
        telElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请正确输入手机号码！");
        return false;
    } else {
        telElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 电子邮箱校验及错误信息提示函数
 * @param emailElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkEmail(emailElm) {
    if (checkEmpty(emailElm.val())) {
        emailElm.parent().siblings(".errorMsg").css("display", "inline-block").text("电子邮箱不能为空！");
        return false;
    } else if (!Regex.email.test(emailElm.val().trim())) {
        emailElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请正确输入电子邮箱！");
        return false;
    } else {
        emailElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 详细地址校验及错误信息提示函数
 * @param addressElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkAddress(addressElm) {
    if (checkEmpty(addressElm.val())) {
        addressElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写详细联系地址！");
        return false;
    } else if (!(/^[a-zA-Z\d\u4E00-\u9FA5]+$/i.test(addressElm.val().trim()))) {
        addressElm.parent().siblings(".errorMsg").css("display", "inline-block").text("不能填写特殊字符或空格！");
        return false;
    }  else if (!Regex.address.test(addressElm.val().trim())) {
        addressElm.parent().siblings(".errorMsg").css("display", "inline-block").text("详细联系地址请具体到门牌号！");
        return false;
    }else {
        addressElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 邮政编码校验及错误信息提示函数
 * @param postalCodeElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkPostalCode(postalCodeElm) {
    if (checkEmpty(postalCodeElm.val())) {
        postalCodeElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写邮政编码！");
        return false;
    } else if (!Regex.postcode.test(postalCodeElm.val().trim())) {
        postalCodeElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请正确输入邮政编码！");
        return false;
    } else {
        postalCodeElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 身高校验及错误信息提示函数
 * @param heightElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkHeight(heightElm) {
    if (checkEmpty(heightElm.val())) {
        heightElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写身高！");
        return false;
    } else if (!/^\d{1,3}$/.test(heightElm.val().trim())) {
        heightElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写不超过3位数的正整数！");
        return false;
    } else {
        heightElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 体重校验及错误信息提示函数
 * @param weightElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkWeight(weightElm) {
    if (checkEmpty(weightElm.val())) {
        weightElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写体重！");
        return false;
    } else if (!/^\d{1,3}$/.test(weightElm.val().trim())) {
        weightElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写不超过3位数的正整数！");
        return false;
    } else {
        weightElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 银行卡号校验及错误信息提示函数
 * @param cardNoElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkCardNo(cardNoElm) {
    if (checkEmpty(cardNoElm.val())) {
        cardNoElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写银行卡号！");
        return false;
    } else if (!/^\d{16,19}$/.test(cardNoElm.val().trim())) {
        cardNoElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写正确的银行卡号！");
        return false;
    } else {
        cardNoElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 再次输入银行卡号校验及错误信息提示函数
 * @param cardNoAgainElm 该参数为Dom对象
 * @param cardNoElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkCardNoAgain(cardNoAgainElm, cardNoElm) {
    if (checkEmpty(cardNoAgainElm.val())) {
        cardNoAgainElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写银行卡号！");
        return false;
    } else if (!/^\d{16,19}$/.test(cardNoAgainElm.val().trim())) {
        cardNoAgainElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写正确的银行卡号！");
        return false;
    } else if (cardNoAgainElm.val().trim() !== cardNoElm.val().trim()) {
        cardNoAgainElm.parent().siblings(".errorMsg").css("display", "inline-block").text("两次输入的银行卡号不一致！");
        return false;
    } else {
        cardNoAgainElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 信用卡号校验及错误信息提示函数
 * @param creditNoElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkCreditNo(creditNoElm) {
    if (checkEmpty(creditNoElm.val())) {
        creditNoElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写信用卡号！");
        return false;
    } else if (!/^\d{13,19}$/.test(creditNoElm.val().trim())) {
        creditNoElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写正确的信用卡号！");
        return false;
    } else {
        creditNoElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 信用卡验证码校验及错误信息提示函数
 * @param creditVerifyElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkCreditVerify(creditVerifyElm) {
    if (checkEmpty(creditVerifyElm.val())) {
        creditVerifyElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写信用卡验证码！");
        return false;
    } else if (!/^\d{3}$/.test(creditVerifyElm.val().trim())) {
        creditVerifyElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请正确输入信用卡验证码！");
        return false;
    } else {
        creditVerifyElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}

/**
 * 短信验证码校验及错误信息提示函数
 * @param verificationCodeElm 该参数为Dom对象
 * @returns {boolean}
 */
function checkVerificationCode(verificationCodeElm) {
    if (checkEmpty(verificationCodeElm.val())) {
        verificationCodeElm.parent().siblings(".errorMsg").css("display", "inline-block").text("请填写短信验证码！");
        return false;
    } else {
        verificationCodeElm.parent().siblings(".errorMsg").hide().text("");
        return true;
    }
}


//身份证号校验
var vcity = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
    33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
    42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
    63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
};

//检查号码是否符合规范，包括长度，类型
function isCardNo(card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    if (reg.test(card) === false) {
        return false;
    }
    return true;
}

//取身份证前两位,校验省份
function checkProvince(card) {
    var province = card.substr(0, 2);
    if (vcity[province] == undefined) {
        return false;
    }
    return true;
}

//检查生日是否正确
function checkBirthday(card) {
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = card.match(re_fifteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19' + year + '/' + month + '/' + day);
        return verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = card.match(re_eighteen);
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year + '/' + month + '/' + day);
        return verifyBirthday(year, month, day, birthday);
    }
    return false;
}

//校验日期
function verifyBirthday(year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
        //判断年份的范围（0岁到100岁之间)
        var time = now_year - year;
        if (time >= 0 && time <= 100) {
            return true;
        }
        return false;
    }
    return false;
}

//校验位的检测
function checkParity(card) {
    //15位转18位
    card = changeFivteenToEighteen(card);
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
}

//15位转18位身份证号
function changeFivteenToEighteen(card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
}

/**
 * 通过sessionStorage设置缓存
 * @param name
 * @param value
 */
function _setItem(name, value) {
    if (window.sessionStorage) {
        sessionStorage.setItem(name, value);
    }
}

/**
 * 根据传入的name, 从sesseionStorage缓存中获取值
 * @param name
 * @returns
 */
function _getItem(name) {
    if (window.sessionStorage) {
        var value = sessionStorage.getItem(name);
        if (value == null) {
            return '';
        }
        return value;
    }
    return '';
}

/**
 * 根据身份证号获取性别
 * @param IDNO
 * @returns 1-男, 2-女
 */
function getSexByIDCard(IDNO) {
    var val = IDNO;
    if (15 == val.length) {// 15位身份证号码
        if (parseInt(val.charAt(14) / 2) * 2 != val.charAt(14)) {
            return "1";
        } else {
            return "2";
        }
    }
    if (18 == val.length) {// 18位身份证号码
        if (parseInt(val.charAt(16) / 2) * 2 != val.charAt(16)) {
            return "1";
        } else {
            return "2";
        }
    }
}

/**
 * 根据身份证号码获取当前出生年月日
 * @param IDNO
 * @returns
 */
function getBirthdayByIDCard(IDNO) {
    var val = IDNO;
    var birthdayValue;
    if (15 == val.length) {// 15位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7);
        if (parseInt(birthdayValue) < 10) {
            birthdayValue = "20" + birthdayValue;
        } else {
            birthdayValue = "19" + birthdayValue;
        }
        birthdayValue = birthdayValue + "-" + val.charAt(8) + val.charAt(9) + "-" + val.charAt(10) + val.charAt(11);
    }
    if (18 == val.length) {// 18位身份证号码
        birthdayValue = val.charAt(6) + val.charAt(7) + val.charAt(8) + val.charAt(9) + "-" + val.charAt(10) + val.charAt(11) + "-" + val.charAt(12) + val.charAt(13);
    }
    return birthdayValue;
}

/**
 * 根据生日获取当前年龄
 * @param birth
 * @returns
 */
function getAgeByBirthDay(birth){
    var returnAge = "";
    var aDate = new Date();
    var nowYear = aDate.getFullYear();
    var nowMonth = (aDate.getMonth()+1) < 10 ? '0'+(aDate.getMonth()+1) : (aDate.getMonth()+1);
    var nowDay = (aDate.getDate()) < 10 ? '0'+aDate.getDate() : aDate.getDate();

    var birthYear = birth.split("-")[0];
    var birthMonth = birth.split("-")[1];
    var birthDay = birth.split("-")[2];
    if(nowYear == birthYear){
        returnAge = 0;// 同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear ; // 年之差
        if (ageDiff > 0){
            if (nowMonth == birthMonth){
                var dayDiff = nowDay - birthDay;// 日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff ;
                }
            } else {
                var monthDiff = nowMonth - birthMonth;// 月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff ;
                }
            }
        }
    }
    return returnAge;
}

//空值判断
function checkEmpty(obj) {
    if (typeof(obj) == "undefined") {
        return true;
    } else if (obj == "") {
        return true;
    } else if (obj == null) {
        return true;
    } else {
        var rs = obj.replace(/[ ]/g, "");
        if (rs == "") {
            return true;
        }
    }
    return false;
}

/**
 * 校验常用正则表达式
 */
var Regex = {
    chineseOrEnglish: /^[\u4E00-\u9FA5a-zA-Z]*$/,  //汉字或英文
    onlyChineseOrOnlyEnglish: /((^[\u4E00-\u9FA5]*$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?)*[a-zA-Z]$))/,  //汉字或英文，汉子和英文不能混杂
    chineseChar: /^[\u4E00-\u9FA5]*$/,
    moreThanTwoChineseChar: /^[\u4E00-\u9FA5]{2,}$/,
    noLessThanFiveChar: /^[\u4E00-\u9FA50-9a-zA-Z]{5,}$/,
    noLessThanTwoChar: /^[\u4E00-\u9FA5a-zA-Z\.]{2,}$/,
    integer: /^-?[1-9]\\d*$/,					//整数
    integer1: /^[1-9]*$/,					//正整数
    integer2: /^-[1-9]\\d*$/,					//负整数
    num: /^([+-]?)\\d*\\.?\\d+$/,			//数字
    num1: /^[1-9]\\d*|0$/,					//正数（正整数 + 0）
    num2: /^-[1-9]\\d*|0$/,					//负数（负整数 + 0）
    decmal: /^([+-]?)\\d*\\.\\d+$/,			//浮点数
    decmal1: /^[1-9]\d*.\d*|0.\d*[1-9]*$/,    //正浮点数
    decmal2: /^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$/, //负浮点数
    decmal3: /^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$/,    //浮点数
    decmal4: /^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$/,        //非负浮点数（正浮点数 + 0）
    decmal5: /^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$/,   //非正浮点数（负浮点数 + 0）
    email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, //邮件
    color: /^[a-fA-F0-9]{6}$/,				//颜色
//		url:/^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$/,	//url
//		chinese:/^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$/,					//仅中文
    ascii: /^[\\x00-\\xFF]+$/,				//仅ACSII字符
    postcode: /^\d{6}$/,						//邮编
    mobile: /^(13|14|15|17|18)[0-9]{9}$/,				//手机
    ip4: /^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$/,	//ip地址
    notempty: /^\\S+$/,						//非空
    picture: /(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,	//图片
    rar: /(.*)\\.(rar|zip|7zip|tgz)$/,								//压缩文件
    qq: /^[1-9]*[1-9][0-9]*$/,				//QQ号码
    phone: /^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$/,	//电话号码的函数(包括验证国内区号,国际区号,分机号)
    username: /^\\w+$/,						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
    letter: /^[A-Za-z]+$/,					//字母
    letter_u: /^[A-Z]+$/,					//大写字母
    letter_l: /^[a-z]+$/,					//小写字母
    idcard: /^[1-9]([0-9]{14}|[0-9]{17})$/,	//身份证
    date: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/,  //短日期 形如 yyyy-mm-dd
    time: /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/,    //短时间 形如  (13:04:06)
    datetime: /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/, //长时间，形如 (2003-12-05 13:04:06)
    address: /^\S*(\D+\d+)|(\d+\D)\S*$/,
    leterOrNumber: /^[a-zA-Z0-9]+$/
};

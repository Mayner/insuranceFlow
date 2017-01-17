var occ = 	[{
			    "ProID": 1,
			    "name": "北京市",
			    "ProSort": 1,
			    "ProRemark": "直辖市",
			    "child":[{
				    "CityID": 1,
				    "name": "北京市",
				    "ProID": 1,
				    "CitySort": 1,
			    	"child":[{
					    "Id": 1,
					    "DisName": "东城区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 2,
					    "DisName": "西城区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 3,
					    "DisName": "崇文区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 4,
					    "DisName": "宣武区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 5,
					    "DisName": "朝阳区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 6,
					    "DisName": "丰台区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 7,
					    "DisName": "石景山区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 8,
					    "DisName": "海淀区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 9,
					    "DisName": "门头沟区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 10,
					    "DisName": "房山区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 11,
					    "DisName": "通州区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 12,
					    "DisName": "顺义区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 13,
					    "DisName": "昌平区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 14,
					    "DisName": "大兴区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 15,
					    "DisName": "怀柔区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 16,
					    "DisName": "平谷区",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 17,
					    "DisName": "密云县",
					    "CityID": 1,
					    "DisSort": null
					}, {
					    "Id": 18,
					    "DisName": "延庆县",
					    "CityID": 1,
					    "DisSort": null
					}]
				}]
			}, {
			    "ProID": 2,
			    "name": "天津市",
			    "ProSort": 2,
			    "ProRemark": "直辖市",
			    "child":[{
				    "CityID": 2,
				    "name": "天津市",
				    "ProID": 2,
				    "CitySort": 2,
			    	"child":[{
					    "Id": 19,
					    "DisName": "和平区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 20,
					    "DisName": "河东区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 21,
					    "DisName": "河西区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 22,
					    "DisName": "南开区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 23,
					    "DisName": "河北区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 24,
					    "DisName": "红桥区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 25,
					    "DisName": "塘沽区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 26,
					    "DisName": "汉沽区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 27,
					    "DisName": "大港区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 28,
					    "DisName": "东丽区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 29,
					    "DisName": "西青区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 30,
					    "DisName": "津南区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 31,
					    "DisName": "北辰区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 32,
					    "DisName": "武清区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 33,
					    "DisName": "宝坻区",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 34,
					    "DisName": "宁河县",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 35,
					    "DisName": "静海县",
					    "CityID": 2,
					    "DisSort": null
					}, {
					    "Id": 36,
					    "DisName": "蓟县",
					    "CityID": 2,
					    "DisSort": null
					}]
				}]
			}];
			var third = [];
$(document).ready(function() {
	$("#occ").click(function(event) {
		layer.open({
		    type: 1,
            content: '<div class="layOcc">'+
                     '    <p>选择职业</p>'+
                     '    <div id="wrapper">'+
                     '        <div id="scroller">'+
                     '            <div class="accSearch">'+
                     '                <input type="text" style="border:#e2e2e2 solid 1px;" id="search"/>'+
                     '                <i></i>'+
                     '            </div>'+
                     '            <div class="occCon">'+
                     '                <div class="occLevel">'+
                     '                    <p class="level01">第一级职业</p>'+
                     '                    <i></i>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                    </ul>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                    </ul>'+
                     '                </div>'+
                     '                <div class="occLevel">'+
                     '                    <p class="level01">第一级职业</p>'+
                     '                    <i></i>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                    </ul>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极职业</li>'+
                     '                    </ul>'+
                     '                </div>'+
                     '            </div>'+
                     '        </div>'+
                     '    </div>'+
                     '</div>',
		    anim: 'up',
		    fixed: true,
		    style: 'position:absolute; bottom:0; left:0; width: 100%; height: 75%; border:none; overflow:auto;',
		    success:function(){
				$(".layui-m-layershade,.layui-m-layerchild").on("touchmove",function(e){ 
		            e.preventDefault();
		        });
		    }
		  });
		/*$(".layui-m-layershade").on("touchmove",function(e){ 
            e.preventDefault();  
        });
        $(".layui-m-layerchild").on("touch",function(e){  
        	e.stopPropagation();
        });
        $(".layui-m-layerchild").on("scroll",function(e){  
        	document.body.scrollTop = 0;
        });*/
		/*var html = "";
		for (var i = 0; i < occ.length; i++) {
			html += "<p>"+occ[i].name+"</p>";
			console.log(occ[i].name)
			for (var j = 0; j < occ[i].child.length; j++) {
				html += "<p>"+occ[i].child[j].name+"</p>";
				console.log(occ[i].child[j].name)
				for (var k = 0; k < occ[i].child[j].child.length; k++) {
					html += "<p>"+occ[i].child[j].child[k].DisName+"</p>";
					third.push(occ[i].child[j].child[k].DisName)
					console.log(occ[i].child[j].child[k].DisName)
				};
			};
		};
		console.log(third);
		$("#con").append(html);
		$("#search").on("input",function(event){
			var str = "";
			setTimeout(function() {
				alert()
			},0)
		})*/
		$(".level01,.level02").click(function(event) {
			$(this).parent().toggleClass("active");
		});
		$(".level03").click(function(event) {
			layer.closeAll();
			$("#occ").val($(this).text());
		});
		

		var myScroll;
		function loaded() {
			myScroll = new iScroll('wrapper', { checkDOMChanges: true });
		}
		loaded();
	});
});

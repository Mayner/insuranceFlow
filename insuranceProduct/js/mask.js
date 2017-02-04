var third = [];
$(document).ready(function() {
	var _this;
	$(".occ").click(function(event) {
		_this = $(this);
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
                     '                    <p class="level01">第一级职业第一级职业第一级职业第一级职业第一级职业第一级职业第一级职业第一级职业</p>'+
                     '                    <i></i>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业第二级职业第二级职业第二级职业第二级职业第二级职业第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三级职业第三级职业第三级职业第三级职业第三级职业第三级职业第三级职业第三级职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三级职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三级职业</li>'+
                     '                    </ul>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">职业</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">职业</li>'+
                     '                    </ul>'+
                     '                </div>'+
                     '                <div class="occLevel">'+
                     '                    <p class="level01">第一级职业</p>'+
                     '                    <i></i>'+
                     '                    <ul>'+
                     '                        <h2 class="level02">第二级职业</h2>'+
                     '                        <i></i>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极</li>'+
                     '                        <li data-occcode="" data-occlevel="" class="level03">第三极</li>'+
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
			_this.val($(this).text());
			$(".occupationReadonly").val($(this).text());
		});

		var myScroll;
		function loaded() {
			myScroll = new iScroll('wrapper', { checkDOMChanges: true });
		}
		loaded();
	});
});

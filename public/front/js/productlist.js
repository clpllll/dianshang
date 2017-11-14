$(function(){

	//调用函数获取关键字
	var key=getKey('key');

	$('.search input').val(key);

	function render(){
		if($('.sort').find('li').hasClass('now')){
		//如果有now 就获取有now 的li的 data-type 
		var sort = $('.sort li.now').data('type');
		var value =  $('.sort li.now i').hasClass('fa-angle-down')?2:1;
		};
	
		var obj = {
			page:1,
			pageSize:100,
			proName:key
		}
		obj[sort] = value;

		//根据获取到key发送ajax 渲染页面
		$.ajax({
			url:'/product/queryProduct',
			type:"get",
			data:obj,
			success:function(data){
				// console.log(data);
				$('.product').html(template('tpl',data));

			}
		})
	}

		render();



	//给有data-type属性的li添加点击事件
	$('.sort [data-type]').click(function(){
		//判断是否有now属性 有就改变上下箭头 没有就添加now
		var $that = $(this);
		if($that.hasClass('now')){
			$that.find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

		}else{
			//没有
			$('.sort [data-type] i').removeClass('fa-angle-up').addClass('fa-angle-down');
			$that.addClass('now').siblings('li').removeClass('now');


		}

		render();


	});


	//
	$('.search button').on('click',function(){
		var value = $('.search input').val()
		location.href = 'productlist.html?key='+value;
	})
})
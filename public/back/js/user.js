$(function(){
	//当前页码
	var currentpage = 1;
	//总页数
	var pageSize = 5;
	function render(){
		$.ajax({
			type:"get",
			url:'/user/queryUser',
			data:{
				page:currentpage,
				pageSize:pageSize,
			},
			success:function(data){
				// console.log(data);
				$('tbody').html(template("tpl",data));
				//渲染分页
				$('#paginator').bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:currentpage,
					totalPages:Math.ceil(data.total/data.size),
					//点击页码渲染ajax
					onPageClicked:function(a,b,c,page){
						currentpage=page;
						render();
					}

				})
			}

		})
	}
	render();

	//禁用启用按钮点击事件
	$('tbody').on("click",'.btn',function(){
		// console.log($(this));
		var id = $(this).parent().data('id');
		// console.log(id);
		$.ajax({
			url:'/user/updateUser',
			type:"post",
			data:{
				id:id,
				isDelete:$(this).html()=="启用"?1:0
			},
			success:function(data){
				// console.log(data);
				if(data.success){
					render();
				}
			}
		})
		
	})

})
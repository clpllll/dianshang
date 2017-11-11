$(function(){
	var currentPage = 1;
	var pageSize = 5;
	//发送ajax渲染数据
	function render(){
		$.ajax({
			url:'/product/queryProductDetailList',
			type:'get',
			data:{
				page:currentPage,
				pageSize:pageSize,
			},
			success:function(data){
				console.log(data);
				$('tbody').html(template('tpl',data));
				//初始化分页插件
				$('#pagintor').bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:currentPage,
					totalPages:Math.ceil(data.total/data.size),
					onPageClicked:function(a,b,c,page){
						currentPage=page;
						render();
					}
				})
			}
		})
	}
	render();
})
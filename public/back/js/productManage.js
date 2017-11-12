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

	//初始化模态框
	$('.btn-product').on('click',function(){

		$('#addModal').modal('show');

		//初始化二级菜单
		$.ajax({
			url:'/category/querySecondCategoryPaging',
			type:'get',
			data:{
				page:1,
				pageSize:100,
			},
			success:function(data){
				// console.log(data);
				//调用模板渲染二级分类
				$('.dropdown-menu').html(template('tpl2',data));
				//点击时修改按钮的文本
				$('.dropdown-menu a').on('click',function(){
					// console.log("hehheeh");
					$('.dropdown .drop-down-text').html($(this).text());
					//修改input的value
					$('.brandId').val($(this).data('id'));
					//收到修改验证表单的状态
					$form.data('bootstrapValidator').updateStatus('brandId', 'VALID');
					
				})
			}
		})

	})
	//验证表单
	var $form = $('form');
	$form.bootstrapValidator({
		excluded:[],
		feedbackIcons: {
	    valid: 'glyphicon glyphicon-ok',
	    invalid: 'glyphicon glyphicon-remove',
	    validating: 'glyphicon glyphicon-refresh'
  	},
  	fields:{
  		brandId:{
  			validators:{
  				notEmpty:{
  					message:"请选择品牌",
  				}
  			}
  		},
  		proName:{
  			validators:{
  				notEmpty:{
  					message:"请输入商品名称",
  				}
  			}
  		},
  		proDesc:{
  			validators:{
  				notEmpty:{
  					message:"请输入商品描述",
  				}
  			}
  		},
  		num:{
  			validators:{
  				notEmpty:{
  					message:"请输入商品库存",
  				},
  				regexp:{
  					regexp:/\d/,
  					message:'请输入正确的商品库存'
  				}
  			}
  		},
  		size:{
  			validators:{
  				notEmpty:{
  					message:"请输入尺码（32-48）",
  				},
  				regexp:{
  					regexp:/^[1-9]{2}-[1-9]{2}$/,
  					message:'请输入正确尺码（32-48）'
  				}
  			}
  		},
  		oldPrice:{
  			validators:{
  				notEmpty:{
  					message:"请输入商品原价",
  				}
  			}
  		},
  		price:{
  			validators:{
  				notEmpty:{
  					message:"请输入商品价格",
  				}
  			}
  		},
  		picName1:{
  			validators:{
  				notEmpty:{
  					message:"请选择三张图片",
  				}
  			}
  		}
  	}

	})



		//初始化图片上传
	$('#fileupload').fileupload({
			dataType:'json',
			done:function(e,data){
				console.log(data)
				
				//保证只能上传3张图片
				
				if($('.uploadimg img').length>2){
				
					return false;
				}

				$('.uploadimg').append('<img src="'+data.result.picAddr+'" data-src="'+data.result.picAddr+'" data-name="'+data.result.picName+'" width="100" alt="">');
				
					//如果图片3张手动修改表单的验证状态
					if($('.uploadimg img').length<3){ 
						console.log($('.uploadimg img').length);
						$form.data('bootstrapValidator').updateStatus('picName1','INVAlID');
					}else{
						console.log($('.uploadimg img').length);
					 	$form.data('bootstrapValidator').updateStatus('picName1','VALID');
					}
				


				//on绑定的事件会叠加  双击时移除自己
				$('.uploadimg img').off().on('dblclick',function(){
					$(this).remove();

					//如果图片3张手动修改表单的验证状态
					if($('.uploadimg img').length<3){ 
							console.log($('.uploadimg img').length);
							$form.data('bootstrapValidator').updateStatus('picName1','INVAlID');
						}else{
						console.log($('.uploadimg img').length);
							$form.data('bootstrapValidator').updateStatus('picName1','VAlID');
						}
					
				})

			}
	})

	//表单验证成功发送数据
	$form.on('success.form.bv',function(e){
		// console.log("hah");
		// 拼接数据
		var data = $form.serialize();
		data += $('.uploadimg img').eq(0).data('name')+"&picAddr1="+$('.uploadimg img').eq(0).data('src');
		data +="&picName2="+ $('.uploadimg img').eq(1).data('name')+"&picAddr2="+$('.uploadimg img').eq(1).data('src');
		data +="&picName3="+ $('.uploadimg img').eq(2).data('name')+"&picAddr3="+$('.uploadimg img').eq(2).data('src');

		//发送ajax 添加商品
		$.ajax({
			url:'/product/addProduct',
			type:'post',
			data:data,
			success:function(data){
				// console.log(data);
				if(data.success){
					currentPage=1;
					render();

					//关闭模态框
					$('#addModal').modal('hide');
					//清空样式
					$form.data("bootstrapValidator").resetForm();
					
					//清空内容
					$form[0].reset();
					$('.brandId').val('');
					$('.fileimg').val("");
					$('.uploadimg').html('');
					$('.drop-down-text').html('请选择二级分类');
					
				}
			}
		})
	})

	
})
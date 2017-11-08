$(function(){
	var $form = $('form');
	// console.log($form);

	$form.bootstrapValidator({

		feedbackIcons: {/*输入框不同状态，显示图片的样式*/
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    //字段检验
	    fields:{
	    	username:{
	    		validators:{
	    			notEmpty:{
               		 message:'用户名不能为空'
           			},
           			callback:{
           			 message:'用户名有误'
           			}
	    		}
	    	},
		    password:{
		    	validators:{
		    		notEmpty:{
		    			message:'密码不能为空'
		    		},
		    		stringLength:{
		    			min:6,
		    			max:12,
		    			message:'密码长度不符合'
		    		},
		    		callback:{
		    			message:'密码有误'
		    		}
		    	}
		    }
		}

	})
	$form.on('success.form.bv',function(e){
		console.log($(this));
		//阻止submit的默认事件
		e.preventDefault();
		// console.log($form.serialize());
		var $data =$form.serialize();
		$.ajax({
			url:'/employee/employeeLogin',
			type:'post',
			data:$data,
			success:function(data){
				// console.log(data);
				// 创建实例
				var validator = $form.data('bootstrapValidator');
				console.log(validator);

				if(data.error===1000){
					console.log("ddsdsd");
					//更新字段
					validator.updateStatus('username','INVALID','callback');
				}
				if(data.error===1001){
					// console.log("ddsdsd");
					//更新字段
					validator.updateStatus('password','INVALID','callback');
				}
				if(data.sueccss){
					loadction.href = "index.html";
				}
			}
		})
		
	})


})
$(function(){
	var $form = $('form');
	console.log($form);

	$form.bootstrapValidator({

		feedbackIcons: {/*输入框不同状态，显示图片的样式*/
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    //字段检验
	    fields:{
	    	userName:{
	    		validators:{
	    			notEmpty:{
               		 message:'用户名不能为空'
           			},
	    		}
	    	},
		    passWord:{
		    	validators:{
		    		notEmpty:{
		    			message:'密码不能为空'
		    		},
		    		stringLength:{
		    			min:6,
		    			max:12,
		    			message:'密码长度不符合'
		    		}
		    	}
		    }
		}

	})
})
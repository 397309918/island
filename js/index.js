function apiUrl(){
//	return 'http://localhost:8088/island/'
	return 'http://175.6.12.78/island/'
}

var API = {
	'login': apiUrl() + 'user/login',      //登陸
	'reg': apiUrl() + 'user/reg',  //註冊
	'qryPlace': apiUrl() + 'user/qryPlace',    //位置信息
	'verifyCode': apiUrl() + 'user/verifyCode', //圖片
	'qryGoods': apiUrl() + 'user/qryGoods',      //获取套餐信息
	'setGoods': apiUrl() + 'user/setGoods',       //提交套餐信息
	'getSeatNo': apiUrl() + 'user/getSeatNo',      //获取安置人
	'regChildNo': apiUrl() + 'user/regChildNo',     //注册
	'qrySeatNo': apiUrl() + 'user/qrySeatNo'       //查询自定义安置人
}


function closeDailog(){
	$("#propUp").html('')
	$("#propUp").hide()
}


function login(){
	$("#propUp").show()
	$("#propUp").html($("#loginHtml").html())
	getVerifyCode()
}
function register(){
	$("#propUp").show()
	$("#propUp").html($("#righterHtml").html())
	var userIn = JSON.parse(localStorage.userInfo)
	$("#recommendName").val(userIn.username)
	$.ajax({
			type:"post",
			url:API.qryGoods,
			async:true,
			success: function(res){
				var CHtml = ''
				if(res.code == 200){
					for(var index in res.data){
						CHtml += '<option value="'+ res.data[index].goodsId +'">' + res.data[index].value + '</option>'
					}
					$("#goodsId").append(CHtml)
				}else{
					alert(res.msg)
				}
			}
		});
	$.ajax({
			type:"post",
			url:API.getSeatNo,
			async:true,
			success: function(res){
				if(res.code == 200){
					var CHtml = ''
					if(res.data.left){
						CHtml+='<option value="left">左區</option>'
					}
					if(res.data.right){
						CHtml+='<option value="right">右區</option>'
					}
					if((!res.data.left) && (!res.data.right)){
						CHtml+='<option value="">該邀請碼無位置，請更換</option>'
					}
					$('#place').html(CHtml)
					$('#seatName').val(res.data.seatName)
				}else{
					alert(res.msg)
					return false
				}
			}
		});
}
// 獲取驗證碼
function getVerifyCode(){
	$.ajax({
		type:"post",
		url:API.verifyCode,
		async:true,
		success: function(res){
			if(res.code == '200'){
				var linkAdd = 'data:image/png;base64,' + res.data.pngBase64
				$("#code").attr('src',linkAdd)
			}
		}
	})
}
function qrySeatNo(){
	$('#place').html('<option value="">請選擇位置</option>')
	var seatName = $("#seatName").val()
	if(!seatName){
		alert("请输入安置人！")
		return false
	}
	$.ajax({
		type:"post",
		url:API.qrySeatNo,
		data: {seatName: seatName},
		async:true,
		success: function(res){
			if(res.code == 200){
				var CHtml = ''
				if(res.data.left){
					CHtml+='<option value="left">左區</option>'
				}
				if(res.data.right){
					CHtml+='<option value="right">右區</option>'
				}
				if((!res.data.left) && (!res.data.right)){
					CHtml+='<option value="">該邀請碼無位置，請更換</option>'
				}
				$('#place').html(CHtml)
			}else{
				alert(res.msg)
				$('#place').html('<option value="">請選擇位置</option>')
				return false
			}
		}
	})
}
// 檢驗左右位置
function checkCode(){
	$('#place').html('')
	var invitationcode = $("#invitationcode").val()
	if(!invitationcode){
		alert("請輸入邀請碼！")
		return false
	}
	$.ajax({
		type:"post",
		url:API.qryPlace,
		data: {invitationcode: invitationcode},
		async:true,
		success: function(res){
			if(res.code == 200){
				var CHtml = ''
				if(res.data.left){
					CHtml+='<option value="left">左區</option>'
				}
				if(res.data.right){
					CHtml+='<option value="right">右區</option>'
				}
				if((!res.data.left) && (!res.data.right)){
					CHtml+='<option value="">該邀請碼無位置，請更換</option>'
				}
				$('#place').html(CHtml)
			}else{
				alert(res.msg)
				return false
			}
		}
	})
}

function regChildNo(){
	$(".registerBtn").attr('disabled','disabled')
	var username = $("#username").val()
	var goodsId = $("#goodsId").val()
	var recommendName = $("#recommendName").val()
	var seatName = $("#seatName").val()
	var password = $("#password").val()
	var surePsw = $("#surePsw").val()
	var realname = $("#realname").val()
	var phone = $("#phone").val()
//	var invitationcode = $("#invitationcode").val()
	var place = $("#place").val()
	if(!username){
		alert("請輸入用戶名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!goodsId){
		alert("请选择套餐")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!password){
		alert("請輸入用戶名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!surePsw){
		alert("請輸入確認密碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(password != surePsw){
		alert("兩次密碼輸入不正確")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!realname){
		alert("請輸入您的姓名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!phone){
		alert("請輸入手機號碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!recommendName){
		alert("请输入推荐人")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!seatName){
		alert("请输入安置人")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!place){
		alert("請選擇位置")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	var parm = {
		username: username,
		goodsId: goodsId,
		password: password,
		realname: realname,
		phone: phone,
		recommendName: recommendName, 
		seatName: seatName,
		place: place
	}
	$.ajax({
		type:"post",
		url:API.regChildNo,
		async:true,
		data: parm,
		success: function(res){
			if(res.code==200){
				alert("註冊成功")
				location.reload()
			}else{
				alert(res.msg)
				return false
			}
		}
	});
}

function registerFun(){
	$(".registerBtn").attr('disabled','disabled')
	var username = $("#username").val()
	var password = $("#password").val()
	var surePsw = $("#surePsw").val()
	var realname = $("#realname").val()
	var phone = $("#phone").val()
	var invitationcode = $("#invitationcode").val()
	var place = $("#place").val()
	if(!username){
		alert("請輸入用戶名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!password){
		alert("請輸入用戶名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!surePsw){
		alert("請輸入確認密碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(password != surePsw){
		alert("兩次密碼輸入不正確")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!realname){
		alert("請輸入您的姓名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!phone){
		alert("請輸入手機號碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!invitationcode){
		alert("請輸入邀請碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!place){
		alert("請選擇位置")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	var parm = {
		username: username,
		password: password,
		realname: realname,
		phone: phone,
		invitationcode: invitationcode,
		place: place
	}
	$.ajax({
		type:"post",
		url:API.reg,
		async:true,
		data: parm,
		success: function(res){
			if(res.code==200){
				alert("註冊成功")
				location.reload()
			}else{
				alert(res.msg)
				return false
			}
		}
	});
}

function loginFun(){
	$(".registerBtn").attr('disabled','disabled')
	var username = $("#username").val()
	var password = $("#password").val()
	var verCode = $("#verCode").val()
	if(!username){
		alert("請輸入用戶名")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!password){
		alert("請輸入密碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	if(!verCode){
		alert("請輸入驗證碼")
		$(".registerBtn").removeAttr('disabled')
		return false
	}
	var parm ={
		username: username,
		password: password,
		verCode: verCode
	}
	$.ajax({
		type:"post",
		url:API.login,
		async:true,
		data: parm,
		success: function(res){
			if(res.code == '200'){
				localStorage.setItem('userInfo',JSON.stringify(res.data))
//				alert('登陸成功')
				location.reload()
			}else{
				alert(res.msg)
				getVerifyCode()
				$(".registerBtn").removeAttr('disabled')
			}
		}
	});
}
function quit(){
	localStorage.clear()
	location.reload()
}

function subscription(){
	if(!localStorage.userInfo){
		alert("请先登陆！")
		login()
		return false
	}
	var userIn = JSON.parse(localStorage.userInfo)
	if(userIn.isBuy){
		alert('您已成功购买套餐')
	}else{
		$("#propUp").show()
		$("#propUp").html($("#subsciptionHtml").html())
		$("#subList").html('')
		$.ajax({
			type:"post",
			url:API.qryGoods,
			async:true,
			success: function(res){
				var CHtml = ''
				if(res.code == 200){
					for(var index in res.data){
						CHtml += '<div class="listCell" onclick="chooseTc(this)" data-id="'+ res.data[index].goodsId +'">'
						CHtml += res.data[index].value
						CHtml += '<img src="img/choose.png">'
						CHtml += '</div>'
					}
					$("#subList").html(CHtml)
					goodsId = ''
				}else{
					alert(res.msg)
				}
			}
		});
	}
}

var goodsId = ''
function chooseTc(e){
	$(".listCell").removeClass('active')
	$(e).addClass('active')
	goodsId = $(e).data('id')
	console.log(goodsId)
}
function subsFun(){
	if(!goodsId){
		alert('请选择套餐！')
		return false
	}
	var userIn = JSON.parse(localStorage.userInfo)
	var parm = {
		vipno: userIn.vipno,
		goodsId: goodsId
	}
	$.ajax({
		type:"post",
		url:API.setGoods,
		async:true,
		data: parm,
		success: function(res){
			if(res.code == 200){
				alert(res.msg)
				location.reload()
			}else{
				alert(res.msg)
			}
		}
	});
}


$(function(){
	if(!localStorage.getItem('userInfo')){
		$(".loginBefore").show()	
	}else{
		$(".loginAfter").show()
		var userIn = JSON.parse(localStorage.userInfo)
		$("#userInfo").text('用戶名：'+userIn.username+'　邀請碼：'+userIn.invitationcode+'　')
	}
	
})
function Auxiliary_TOKEN(Usernamewj,Passwordwj){//----无极平台获取token
	while (true) {
		var  res =http.get('http://api6.wj.ink/isLogin.action?userName='+Usernamewj+'&userPwd='+Passwordwj).body.string();
			log(res)
			var str = JSON.parse(res);
			if ((str.code == 1)||(str.code == '1') || (str.msg == '登录成功')) {
				toastLog('登陆成功'+str.data);
				return str.data;
			} else {
					toastLog('登陆失败'+res);
					sleep(2000);
				}
		}
		sleep(2000);
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_qrcode(Token,interlinkage,grade){//----发布二维码任务
	while (true) {
		var  res =http.get("http://api6.wj.ink/issuTask.action?token="+Token+"&state=2&url="+interlinkage+"&script=&grade="+grade).body.string();
			log(res)
			var str = JSON.parse(res);
			if ((str.code == 1)||(str.code == '1' )|| (str.msg == '发布成功')) {
				toastLog('发布成功'+str.data);
				return str.data;
			} else {
					toastLog('发布失败'+res);
					sleep(2000);
				}
		}
		sleep(2000);
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_phone(Token,content,countryCode,type,grade){//----发布手机任务
		
	while (true) {
		var  res =http.get("http://api6.wj.ink/issuTask.action?token="+Token+"&state=1&content="+content+"&countryCode="+countryCode+"&type="+type+"&script=&time=300&grade="+grade).body.string();
			log(res)
			var str = JSON.parse(res);
			if ((str.code == 1)||(str.code == '1' )|| (str.msg == '发布成功')) {
				toastLog('发布成功'+str.data);
				return str.data;
			} else {
					toastLog('发布失败'+res);
					sleep(2000);
				}
		}
		sleep(2000);
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_zt(Token,identification){//----无极状态查询
	//主意事项查询状态时请不要做循环判断，，查一次返回一次结果
		var  res =http.get("http://api6.wj.ink/findTaskInfo.action?token="+Token+"&uid="+identification).body.string();
			/*code:1  msg:"该任务正在等待领取，如无人领取请提高佣金金额； 该任务剩余时间：XXX"  seconds:XXX
			code:2  msg:"该任务正在执行中； 该任务剩余时间：XXX"   seconds:XXX
			code:3  msg:"该任务用户已提交完成，请确认； 该任务剩余时间：XXX"   seconds:XXX
			code:4  msg:"任务已完结。结果：辅助成功"
			code:5  msg:"任务已完结。结果：辅助失败"
			code:10 msg:"参数错误"
			code:11 msg:"识别码错误"
			code:12 msg:"token不存在"
			code:13 msg:"token过期，重新登录"
			code:14 msg:"账户异常"
			code:15 msg:"找不到该任务或该任务超时被系统删除"
			code:16 msg:"任务已经超过有效期"
			code:17 msg:"该任务是资料单"*/
			var str = JSON.parse(res);
			toastLog(str.code);
			if ((str.code == 1)||(str.code == '1')||(str.code == 2)||(str.code == "2")||(str.code == 3)||(str.code == '3')){
				toastLog(str.msg);
				return str.code
			} else {
				sleep(2000);
				ddmsg = '任务已完成'
				toastLog(res+ddmsg);
				return ddmsg
				}

		sleep(2000);
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_fanh(statesss,token,identification){//----无极成功或失败
		var  res =http.get("http://api6.wj.ink/taskOper.action?token="+token+"&state="+statesss+"&script=&uid="+identification).body.string();
			log(res)
			var str = JSON.parse(res);
				if ((str.code == 1)||(str.code == '1')||(str.code == 2)||(str.code == '2')) {
				toastLog(str.msg);
				return str.msg;
			} else {
					toastLog(res);
					sleep(2000);
				}
	
		sleep(2000);
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_base64(){//这里读取图片里的BASE64数据
	sleep(1000)
	//请求横屏截图
	 setScreenMetrics(1440, 2560);//这里是手机分辨率
	requestScreenCapture();
	sleep(500)
	//截图
	var img = captureScreen();
	//获取在点(100, 100)的颜色值
	var src = images.read("/sdcard/1.png");
	var clip = images.clip(src, 216, 1099, 550, 550);//二维码 x,y左上角坐与与图片大小w,h
	images.save(clip, "/sdcard/clip.png");
	img2 = images.read("/sdcard/clip.png");
	//判断图片是否加载成功
	if(!img2){
	    toast("没有该图片");
	    exit();
	}
	var base64 = images.toBase64(img2);  //这里返回base64
	return base64;
}
//--------------------------------------------------------------------------------------------------------------------
function Auxiliary_Analyzetheqrcode65(){//这里为解析二维码
	Base64D = Auxiliary_base64()
	//http://api6.wj.ink/decode.action
	//base64Data=图片转base64的数据
	while (true) {
		var res = http.post("http://api6.wj.ink/decode.action",{"base64Data": Base64D});
		rets = res.body.string()
		var str = JSON.parse(rets);
		if (str.code == 1 != str.code == '1' ) {
			return str.data
		}else{
				toastLog(str.msg)
			}
	}

}
function Auxiliary_Analyzetheqrcode(){//这里为解析二维码
	ret = http.get("http://api6.wj.ink/decode.action?base64Data="+Base64D).body.string();
	toast(ret)
}

//--------------------------------------------------------------------------------------------------------------------


var  Usernamewj ='15365668999';//这里填无极辅助平台账号
var  Passwordwj ='123566dd'; //这里填无极辅助平台密码


var token = Auxiliary_TOKEN(Usernamewj,Passwordwj);//这里会返回token

var grade ='1'; //这里是等级可填数为（1-6）

//以下 二维码与手机任务两者二选一
//第一条二维码任务-----------------------------------------------------------------------

//var interlinkage = Auxiliary_Analyzetheqrcode()//这里是获取二维码的请求
//var identification =Auxiliary_qrcode(token,interlinkage,grade); //、这里是发布二维码任务并获取任务唯一标识码
//第二条手机任务------------------------------------------------
var Type = '3';//这里如果是中国请填 3 如果 是国外号填 4
var content = '1326556988'//填需要辅助的手机号
var  countryCode = '86' //这里是国家编码 中国为86
var  identification = Auxiliary_phone(token,content,countryCode,type,grade);//这里是发布手机任务

//------------------------------------------------------------------------------
//、这里做循环状态查询
while (true){
ddmsg =Auxiliary_zt(token,identification)//---这里是状态查询
//、当返回3时需要做成功或失败的判断处理
if ((ddmsg == '3')||(zhuangyai == 3)){
	//这里如果判断到微信辅助页面辅助成功了那么提交成功
	var  statesss ='1'//提交成功
	var fdd =Auxiliary_fanh(statesss,token,identification)		
	//---------------------------------------注意提交成功或失败2选1
	//这里如果判断到微信辅助页面辅助没成功那么提交失败
	var  statesss ='2'//提交失败
	var fdd =Auxiliary_fanh(statesss,token,identification)				
	break
}else if (ddmsg == '任务已完成'){
	//返回已完成时直接提交失败
	var  statesss ='2'//提交失败
	var fdd =Auxiliary_fanh(statesss,token,identification)	
}




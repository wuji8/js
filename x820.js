function clickByText(energyType,noFindExit,exceptionMsg){
    if(textEndsWith(energyType).exists()){
        textEndsWith(energyType).find().forEach(function(pos){
            var posb=pos.bounds();
            // click(posb.centerX(),posb.centerY()-60);
          	//press(posb.centerX()+random(0, 60),posb.centerY()-random(45, 65),random(2, 10));
          	 // click(posb.centerX()+random(0, 60),posb.centerY()-random(45, 65));
          	 sleeps(300,800);
       		press(posb.centerX()+random(0, 60),posb.centerY()-random(45, 65), random(20, 180));
       		 sleeps(800,1500);
        });
    }else{
        if(noFindExit!=null && noFindExit){
            if(exceptionMsg !=null){
                log(exceptionMsg);
                exit();
            }else{
                defaultException();
            }
        }    
    }
}
function clickbounds(ckbound){//随机点
	dddff = ckbound.toString()
	var xxyy0 = dddff.substring(5,(dddff).length-1)
	var xxyy1 = xxyy0.split(' - ')[0]
	var xxyy2 =xxyy0.split(' - ')[1]
	var x1= xxyy1.split(',')[0]
	var y1 =xxyy1.split(',')[1]
	var x2= xxyy2.split(',')[0]
	var y2 =xxyy2.split(',')[1]
	var xx1 =random(x1*1, x2*1)
	var yy1 =random(y1*1, y2*1)
	toastLog(xx1+"/"+yy1)
	sleeps(200,900);
	//press(parseInt(xx1)*1+random(0, 15),parseInt(yy1)*1+random(0, 60), random(2, 10));
	//click(parseInt(xx1)*1+random(0, 15),parseInt(yy1)*1+random(0, 60));
	press(parseInt(xx1)*1+random(0, 15),parseInt(yy1)*1+random(0, 60), random(20, 180));
	sleeps(500,1500);
	//click(xx1,yy1)
}
function getNowTime(){
    Date.prototype.format = function(fmt) { 
        var o = { 
           "M+" : this.getMonth()+1,                 //月份 
           "d+" : this.getDate(),                    //日 
           "h+" : this.getHours(),                   //小时 
           "m+" : this.getMinutes(),                 //分 
           "s+" : this.getSeconds(),                 //秒 
           "q+" : Math.floor((this.getMonth()+3)/3), //季度 
           "S"  : this.getMilliseconds()             //毫秒 
       }; 
       if(/(y+)/.test(fmt)) {
               fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
       }
        for(var k in o) {
           if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
       return fmt; 
    }      
    
    var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");
    return time1;
}
function changefly(){//飞行
    home();
   sleeps(1200,1700);
    launch("com.android.settings");
    sleeps(1200,1700);
    var startTime =new Date();  //开始时间
    while(true){
        if (textEndsWith("更多").exists()) {
            clickByText("更多");
            sleeps(1200,1700);
        } else {
            toastLog("1.0.10"+"等待点击 更多");
            sleeps(1200,1700);
            if ((parseInt((new Date().getTime()-startTime.getTime())/1000)) > 8){ //时间差的毫秒数
                launch("com.android.settings");
                sleeps(1200,1700);
            }
           
        }
        if (textEndsWith("飞行模式").exists()) {
            clickByText("飞行模式");
            sleeps(1200,1700);
            clickByText("飞行模式");
           sleeps(3500,4200)
            break;
        }
    }
    
  }

function changeVPN(){//切换VPN
    home();
    sleeps(1800,2200);
    launch("com.android.settings");
    sleeps(1500,2000);
    var startTime =new Date();  //开始时间
    while(true){
        if (textEndsWith("更多").exists()) {
            clickByText("更多");
            sleeps(1200,1700);
            break;
        } else {
            toastLog("1.0.10"+"等待点击 更多");
            sleeps(2200,2700);
            if ((parseInt((new Date().getTime()-startTime.getTime())/1000)) > 8){ //时间差的毫秒数
                launch("com.android.settings");
                sleeps(2200,2700);
            }
            
        }
    }
     while(true){
        if (textEndsWith("VPN").exists()) {
            clickByText("VPN");
            sleeps(1300,1700);
            break
        } else {
            toastLog("1.0.10"+"等待点击 VPN");
            sleeps(1300,1700);
        }
    }

    var isConn  = "";
    id("list").className("android.widget.TextView").find().forEach(function(tv){
    
        if(tv.text() != ""){
            isConn  = isConn + tv.text();
        }
    });
    log(isConn);

    // 已连接的  需要先断开
    if (isConn.indexOf("已") > 0) {
        log("vpn 已连接");

        sleeps(1500,2000);
        click(500, 300); // 点击 设置好的vpn
        sleeps(800,1200);

        while(true){
            if (textEndsWith("断开连接").exists()) {
                clickByText("断开连接");
                sleeps(1800,2200);
                break;
            } else {
                toastLog("1.0.10"+"等待断开");
                sleeps(1800,2200);
            }
        }

    }

    sleeps(1500,2000);
    click(500, 300); // 点击 设置好的vpn
    sleeps(1500,2000);

    while(true){
        if (textEndsWith("连接").exists()) {
            sleeps(1300,1700);
            clickByText("连接");
            sleeps(2700,3200);
            break;
        } else {
            toastLog("1.0.10"+"等待 连接");
            sleeps(1800,2200);
        }
    }

    var isConn  = "";
    while(true){
        id("list").className("android.widget.TextView").find().forEach(function(tv){
    
            if(tv.text() != ""){
                isConn  = isConn + tv.text();
            }
        });
        log(isConn);
        if (isConn.indexOf("已") > 0) {
            toastLog("1.0.10"+"vpn 已连接");
            break;
        } else if (isConn.indexOf("失败") > 0) {
            toastLog("1.0.10"+"vpn 连接失败");
            break;
        } else {
            toastLog("1.0.10"+"等待vpn连接");
            sleeps(3200,3800);
        }
    }

    if (isConn.indexOf("失败") > 0) {
        toastLog("1.0.10"+"VPN连接失败  重新开始");
        changeVPN();
        // return false;
    }

}
 function enterCG(phoneNum){//一键新机
    launch("com.igaiji.privacy");
    toastLog("1.0.10"+"等待IG启动");
    while (true) {
        var btnNewPhone = id("ll_changed").findOne(random(4500, 6500)); 
        if (btnNewPhone != null) {
            toastLog("1.0.10"+"找到一键新机...");
            sleeps(800,1200);
            // clickByText("一键新机",true,"没有找到一键新机");
            btnNewPhone.click();
            sleeps(2500,3000);
            toastLog("1.0.10"+"一键新机...");
            break;
        }else if(currentActivity() == "com.wj.it.ui.activity.BackupsDataListActivity"){
            toastLog("1.0.10"+"备份列表")
            id("iv_back").click();
            sleeps(2700,3200);
        }else {
            toastLog("1.0.10"+"等待IG加载。。。");
            sleeps(1800,2200);
        }
    }
	

    //在6秒内找出日志图标的控件
    var w = id("tv_ok").findOne(6000);   //一键新机 确认
    var w2 = id("et_gen_device_data_input_phone").findOne(random(4500, 6500));   //一键新机 输入框（请输入手机号码，无则留空）

    if(w2 != null){
        w2.click();
        sleeps(800,1200);
        w2.setText(phoneNum);
        sleeps(800,1200);
    }else{
        //否则提示没有找到
        toastLog("1.0.10"+"没有找到日志图标");
    }

    //如果找到控件则点击
    if(w != null){
        w.click();
        toastLog("1.0.10"+"确认一键新机");
    }else{
        //否则提示没有找到
        toastLog("1.0.10"+"没有找到确认一键新机");
    }
    sleep(13000)
    home()
}
function rechristen(phoneNum,pswpsw){//重命名
	 launch("com.igaiji.privacy");
    toastLog("1.0.10"+"等待IG启动");
    while (true) {
    	var Backuplist = id("ll_copy").findOne(random(4500, 6500)); 
    	if (Backuplist != null) {
    		toastLog("1.0.10"+"备份列表。。。");
     		Backuplist.click()
     		 sleeps(1800,2200);
     		 Backuplist = null
        }
        if (textEndsWith("备份数据列表").exists()) {
        	click(1312,  724)
        }
        if(textEndsWith("确定").exists()){
        	id("tv_alias_name").findOne().click()
        	setText(phoneNum+'--'+pswpsw+'--成功')
        	sleeps(500,800);
        	className("android.widget.TextView").text("确定").findOne().click()
        	sleeps(1000,1300);
        	click(75,  173)
        	sleeps(1000,1300);
        	home()
     	   break
         }else{
         	sleeps(1000,1300);
         }
        
    }
}
function getA16(){//提取A16
	var arr = files.listDir("/data/data/com.tencent.mm/files/kvcomm/");
	var a16Str = ""; 
	for(var j = 0,len = arr.length; j < len; j++){
	log(arr[j]);
		if (arr[j] != "exception" && (arr[j].indexOf("statistic")> 0)) {
		var str = files.read("/data/data/com.tencent.mm/files/kvcomm/" + arr[j], "utf-8");
		var tmp = str.match(/A(([a-z]|[0-9]){15})/g);
			if (tmp !=null) {
			log("a16: "+tmp[0]);
			a16Str = tmp[0];
			break;
			}
		}
	}
return a16Str;
}

function saveData(savePath, dataStr){//保存文本
    files.createWithDirs(savePath);
    files.append(savePath,getNowTime()+ " | " + dataStr +"\r\n");
}
//-----------------------分割
/**str='jpg|bmp|gif|ico|png'
arr=str.split('|');
toastLog("1.0.10"+arr[0])*/
//-------------------JSON转换
/*var str1 = '{ "name": "cxh", "sex": "man" }';
var obj = JSON.parse(str1);
toastLog("1.0.10"+obj.name+obj.sex)*/
function  sliding_blocks(){//滑块
	setScreenMetrics(1440, 2560);
		//截图
	sleeps(800,1200);
	var img = captureScreen();
	 sleeps(1800,2200);
	 toastLog("1.0.10"+"截图成功开始比色找缺口");	
	//获取在点(100, 100)的颜色值
	var xxb ="985,832|987,620|987,674|998,583|998,665|998,645|1000,821|1002,698|1004,645|1004,832|1006,584|1008,708|1008,587|1010,614|1012,634|1012,889|1016,599|1016,646|1018,583|1020,583|1020,832|1020,780|1022,723|1022,645|1024,624|1024,587|1024,692|1028,583|1032,612|1040,877|1047,665|1049,832|1049,733|1051,677|1057,598| 1057,626|1057,646|1061,657|1061,626|1062,653|1065,583| 1065,  649|1079,584|1086,768|1088,832|1089,603|1092,587|1098,680|1106,773| 1108,  637|1108, 832|1110,692|1127,583|1131,583|1155,591"
		var abcd = 0
		while (true) {
			var xxb1=xxb.split('|')[abcd]
			var xx1 = xxb1.split(',')[0]
			var yy1 = xxb1.split(',')[1]
				var color = images.pixel(img, xx1, yy1);
				//显示该颜色值
				var color1 = colors.toString(color)
				var  r =colors.red(color1)
				var g = colors.green(color1)
				var b= colors.blue(colors.toString(color))
				sleep(2)
				log("1.0.10"+'/'+r+'/'+g+'/'+b+'/'+xx1+'/'+yy1+'/'+abcd)
			if ((r<100) &&(b<100)&&(g<100)) {
				 toastLog("1.0.10"+r+'/'+g+'/'+b+'/'+xx1+'/'+yy1)
				 log(r+'/'+g+'/'+b+'/'+xx1+'/'+yy1)
				 xx1 = xx1*1+86
				 swipe(297, 1347, xx1, 1347,random(4500, 6300))
				// swipe(297, 1347, xx1, 1347,random(3500, 5800))
				/* "auto";
				gestures([0, 500, [297, 1347], [800, 1347]],
		         [0, 2000, [800, 1347], [xx1, 1347]]);*/
				 slidingblock = false
				 log("1.0.10"+"过滑块")      
				 sleeps(1200,1500);
				break
			}else{
				if (abcd >=54) {
					abcd = 0
					click( 1333, 1516)//点刷新
					sleep(4000)
					break
				}else{
					abcd = abcd*1 + 1;
					log('abcd'+abcd);
					}
			} 
			if(textEndsWith("让用户用微信扫描下面的二维码").exists()) {
				sleeps(800,1200);
				toastLog("1.0.10"+"跳二维码");	
				break
			}
		}
}
function sleeps(min,max){//随机时间
	 sleep(random(min, max))
}
function clicks(x,y){//随机点
	var yy =random(1, 2)
	sleeps(300,800);
	if (yy == 1) {
		press(x*1-random(0, 10),y*1-random(0, 10),random(20, 180));
	}else{
		press(x*1+random(0, 10),y*1+random(0, 10),random(20, 180));
	}
	sleeps(700,1500);
}
function GetToken_hahaptai(Username,Password){//----哈哈平台获取TOKEN
	//GetToken_hahaptai("api_liwuji_rfvx","123123123")
	while (true) {
		
		var  res =http.get('http://hhge.codesfrom.com/yhapi.ashx?Action=userLogin&userName='+Username+'&userPassword='+Password).body.string();
		//成功返回：OK|token|用户余额|级别|最大获取数|积分
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var token =str[1] ;
			if (returnz == 'OK'){
				toastLog("1.0.10"+'登陆成功token为'+token);
				return token;
			} else {
					toastLog("1.0.10"+'登陆失败'+res)
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetNumber_hahaptai(itemID,token){//----哈哈平台获取手机号
	while (true) {
		var  res =http.get('http://hhge.codesfrom.com/yhapi.ashx?Action=getPhone&token='+token+'&i_id='+itemID+'&p_operator=&p_qcellcore=&mobile=').body.string();
		//成功返回：OK|P_ID|获取时间|串口号|手机号|发送短信项目的接收号码|国家名称或区号
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var P_ID1 =str[1] ;
			var phonenumber =str[4] ;
			if (returnz == 'OK'){
				log(P_ID1+'/'+phonenumber);
				toastLog("1.0.10"+'获取到的手机号码为'+phonenumber);
				return phonenumber+'/'+P_ID1;
			} else {
					toastLog("1.0.10"+'获取不到手机号码'+res);
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetCode_hahaptai(token,P_ID1){//----哈哈平台获取验证码
	var dsfff = 1
	while (true) {
		var  res =http.get('http://hhge.codesfrom.com/yhapi.ashx?Action=getPhoneMessage&token='+token+'&p_id='+P_ID1).body.string();
		//成功返回：OK|验证码数字|完整短信内容
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var GetCode =str[1] ;
			if (returnz == 'OK'){
				toastLog("1.0.10"+'获取到的验证码为'+GetCode);
				return GetCode
			} else {
					toastLog("1.0.10"+'获取不到验证码'+res);
					sleeps(2500,3000);
					if (dsfff > 40) {
						GetCode = null
						return GetCode
					}else{
						if (dsfff > 20) {
							sleeps(2500,3000);
							clicks(697,904);
							sleeps(1500,1800);
							clicks(352, 1222);
						}
						dsfff = dsfff + 1
					}
 				}
		}
		sleeps(1500,2000);
}

function GetSendmessages_hahaptai(P_ID1,token,phonenumber,Message){//----哈哈平台发送信息
	while (true) {
		var  res =http.get('http://hhge.codesfrom.com/yhapi.ashx?Action=putPhoneMessage&token='+token+'&p_id='+P_ID1+'&receiver='+phonenumber+'&message='+Message).body.string();
		//OK|短信提交成功，请等待回执
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var messagehz =str[1] ;
			if (returnz == 'OK'){
				toastLog("1.0.10"+messagehz);
				return messagehz;
			} else {
					toastLog("1.0.10"+'短信发送不成功'+res);
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetNumberBlack_hahaptai(P_ID1,token,phonenumber,itemID){//----哈哈平台号码拉黑
	while (true) {
		var  res =http.get('http://hhge.codesfrom.com/yhapi.ashx?Action=phoneToBlack&token='+token+'&p_id='+P_ID1+'&i_id='+itemID+'&mobile='+phonenumber+'&reason=失败').body.string();
		//OK|加黑成功信息说明
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var Black =str[1] ;
			if (returnz == 'OK'){
				toastLog("1.0.10"+Black);
				return Black;
			} else {
					toastLog("1.0.10"+'号码拉黑不成功'+res);
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetToken_xiaoyu(Username,Password){//----小鱼平台获取TOKEN
	//GetToken_xiaoyu('105991-lik','meili99'')
	while (true) {		
		var  res =http.get('http://api.juxiutu.com/Api/index/userlogin?uid='+Username+'&pwd='+Password).body.string();
		//1.成功返回：用户ID|用户的apiid|token(下面所有方法都要用的令牌)，开发者ID要传此处的用户ID。
			log(res)
			var str = res.split('|');
			var returnz =str[1] ;
			var token =str[2] ;
			if (returnz == Username){
				toastLog("1.0.10"+'登陆成功token为'+token);
				return token;
			} else {
					toastLog("1.0.10"+'登陆失败'+res)
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetNumber_xiaoyu(itemID,token,Username){//----小鱼获取手机号
	while (true) {
		var  res =http.get('http://api.juxiutu.com/Api/index/getMobilenum?pid='+itemID+'&uid='+Username+'&token='+token).body.string();
		//成功返回：OK|P_ID|获取时间|串口号|手机号|发送短信项目的接收号码|国家名称或区号
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[1] ;
			var phonenumber =str[0] ;
			if (returnz == token){
				toastLog("1.0.10"+'获取到的手机号码为'+phonenumber);
				return phonenumber;
			} else {
					toastLog("1.0.10"+'获取不到手机号码'+res);
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}

function GetSendmessages_xiaoyu(Username,token,phonenumber,Message,itemID){//----小鱼平台发送信息
	while (true) {
		var  res =http.get('http://api.juxiutu.com/Api/index/sendSms?uid='+Username+'&token='+token+'&pid='+itemID+'&mobile='+phonenumber+'&content='+Message).body.string();
		//OK|短信提交成功，请等待回执
		//失败返回：ERR|失败信息
			log(res)
			var str = res.split('|');
			var returnz =str[0] ;
			var messagehz =str[1] ;
			if (returnz == 'succ'){
				toastLog("1.0.10"+messagehz);
				return messagehz;
			} else {
					toastLog("1.0.10"+'短信发送不成功'+res);
					sleeps(1500,2000);
				}
		}
		sleeps(1500,2000);
}
function GetNumberBlack_xiaoyu(Username,token,phonenumber,itemID){//----哈哈平台号码拉黑
		var  res =http.get('http://api.juxiutu.com/Api/index/addIgnoreList?uid='+Username+'&token='+token+'&mobiles='+phonenumber+'&pid='+itemID).body.string();
		//OK|加黑成功信息说明
		//失败返回：ERR|失败信息
			log(res)
		sleeps(1500,2000);
}

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
				return str.msg
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

function randomRange(min, max){//随机字母
	    var returnStr = "",
	        range = (max ? Math.round(Math.random() * (max-min)) + min : min),
	        arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	 
	    for(var i=0; i<range; i++){
	        var index = Math.round(Math.random() * (arr.length-1));
	        returnStr += arr[index];
	    }
	    return returnStr;
	}
function random_text(test){//随机读取一行
	//textsentence= random_text('sentence')	
	//以读取模式打开文件
	file = open("/sdcard/"+test+".txt", "r")
	//读取剩余所有行并打印
	var  readlinenum =random(0, 399)
	var readlis = 0
	for each(line in file.readlines()){
		if (readlis >= readlinenum){
			return line
		}else{
			var readlis = readlis+1}
	}
	file.close()
}
function registerWX (){//跑微信注册

		launch("com.tencent.mm");
		while (true) {//注册页面
			if (textEndsWith("注册").exists()) {
			clickByText("注册");
			break;
			} else {
				toastLog("1.0.10"+"等待wx启动。。。");
				sleeps(1800,2200);
			}
		}
		while (true) {//手机号注册
			if (textEndsWith("手机号注册").exists()) {
					var w2 = className("android.widget.EditText").text("例如：陈晨").findOne(random(3500,5500));
					var w3 =className("android.widget.EditText").text("请填写手机号").findOne(random(3500,5500));
					var w5 = className("android.widget.Button").text("注册").findOne(random(3500,5500));
					var nickName = randomRange(3, 5)
					
					//如果找到控件则点击
					if(w2 != null){
						clickbounds(w2.bounds())
						//w2.click();
						toastLog("1.0.10"+"输入昵称");
						w2.setText(nickName);
					}
					else{
						//否则提示没有找到
						toastLog("1.0.10"+"没有找到日志图标");
					}
					clickbounds(w3.bounds())
					//w3.click();
					toastLog("1.0.10"+"输入手机号码");
					setText(1, phonenumber);
					//---------------输入密码-------------------
					//click(500, 1040); //
					setText(2, pswpsw); 
				/*while (true) {//选择国家和地区代码
						if (textEndsWith("选择国家和地区代码").exists()) {
							click(1350*1+random(0,5),  164*1+random(0,5));
							setText('越南'); 
							clicks(151,  486);
							toastLog("1.0.10"+"选择国家和地区代码");
							break
						}
						
						if (textEndsWith("阿尔巴尼亚").exists()) {
							click(1350*1+random(0,5),  164*1+random(0,5));
							setText('越南'); 
							clicks(151,  486);
							toastLog("1.0.10"+"选择国家和地区代码");
							break
						}
						if (textEndsWith("国家/地区").exists()) {
							 clickByText("国家/地区");
						}else{
							toastLog("1.0.10"+"查找地区选择国家");
						}
					}*/
					sleeps(1000,1200);
					clicks(1324, 2448);
					clicks(1324, 2448);
					
					clickbounds(w5.bounds())
					//w5.click();
					toastLog("1.0.10"+"点击注册");
					sleep(random(3000,4000) );
					break;
			} else {
					toastLog("1.0.10"+"等待 手机号注册页面加载。。。");
					sleeps(2700,3200);
				}
		}
	
		while (true) {//微信隐私保护指引
			if (textEndsWith("微信隐私保护指引").exists()) {
				clicks(73, 2196);
				sleep(random(500,800));
				clicks(729, 2390);
				toastLog("1.0.10"+'微信隐私保护指引');
				sleeps(4500,6000);
			}
			if (textEndsWith("WeChat 隐私保护概述").exists()) {
				clicks(148, 2215);
				sleep(random(500,800));
				clicks(713, 2391);
				toastLog("1.0.10"+'隐私保护概述');
				sleeps(4500,6000);
			}
			if (textEndsWith("手机号注册").exists()) {
				var zcc=className("android.widget.Button").text("注册").findOne(random(3500,5500));
				clickbounds(zcc.bounds())
				sleeps(8000,12000);
			}
			if(textEndsWith("安全验证").exists()) {
				toastLog("1.0.10"+'安全验证');
				var kky =className("android.view.View").text("开始 ").findOne(random(3500,5500));
				clickbounds(kky.bounds())
				sleeps(1200,1500);
				toastLog("1.0.10"+'安全验证');
				var pingfan = true
				var pfh = 1
			}
			if (textEndsWith("拖动下方滑块完成拼图").exists()) {
				toastLog("1.0.10"+'拖动下方滑块完成拼图')
				sleeps(800,1200);
				if (slidingBB == 0 != slidingBB == '0'){
						toastLog("1.0.10"+"请手动处理滑块")   	
				}else{
						toastLog("1.0.10"+"自动处理滑块")   	
						sliding_blocks();
						sleeps(1500,2000);	      
					}
				sleeps(1500,2000);
			}
			if (textEndsWith("验证码").exists()) {
				sleeps(5000,6000);
				if (textEndsWith("拖动下方滑块完成拼图").exists()) {
					toastLog("1.0.10"+'拖动下方滑块完成拼图')
					sleeps(800,1200);
					if (slidingBB == 0 != slidingBB == '0'){
						toastLog("1.0.10"+"请手动处理滑块")   	
						}else{
								toastLog("1.0.10"+"自动处理滑块")   	
								sliding_blocks();
								sleeps(1500,2000);	      
							}

				}else{
						if (textEndsWith("验证码").exists()) {
							clicks(403,  708);
							GetCode =GetCode_hahaptai(TOken,P_ID1)
							sleeps(1000,1300);
							if (GetCode!=''&&GetCode!=null){
							setText(GetCode); 
							sleeps(1300,1700);
							clicks(711, 1138);
							toastLog("1.0.10"+"下一步")  
							sleeps(2100,2600);
						}
					}else{
						toastLog("1.0.10"+"......")  
						sleeps(2100,2600);
					}
				}	
			}
			
		
		
			if(textEndsWith("验证成功").exists()) {
				var kky =className("android.view.View").text("返回注册流程 ").findOne(random(3500,5500));
				clickbounds(kky.bounds())
				sleeps(1200,1500);
				toastLog("1.0.10"+'验证成功');
				var  statesss ='1'
				var fdd =Auxiliary_fanh(statesss,Token22,identification)
			}
			if(textEndsWith("让用户填写你的手机号").exists()) {
				toastLog("1.0.10"+'让用户填写你的手机号');
				if (fuzhufabu) {
					var Type = '3';//这里如果是中国请填 3 如果 是国外号填 4
					var Token22=Auxiliary_TOKEN(UsernameWJ,PasswordWJ)
					var identification =Auxiliary_phone(Token22,phonenumber,86,3,1)
					sleeps(5000,6000);
					fuzhufabu = false
				}else{
					ddmsg = Auxiliary_zt(Token22,identification)
					if (ddmsg == '任务已完成'){
						var  statesss ='2'
						var fdd =Auxiliary_fanh(statesss,Token22,identification)
						break
					}
					sleeps(6000,9000);
				}
			}
			if(textEndsWith("让用户用微信扫描下面的二维码").exists()) {
				toastLog("1.0.10"+"二维码");	
				sleeps(1200,2300);
				press(61*1+random(0, 120),1999*1+random(0, 40),+random(50, 280));
				sleeps(1200,2300);
				var fuzhufabu = true
			}
			
			if (textEndsWith("发送短信验证").exists()) {
				pingfan = false
				sleeps(2000,2800);
						
						zctext = className("android.widget.TextView").bounds(98,592,1398,723).findOne();   
						Message = zctext.text().substring(3,7);
						toastLog("1.0.10"+Message);
						GetSendmessages_xiaoyu(Username,TOken,phonenumber,Message,itemID)
						sleeps(10000,15200);
						toastLog("1.0.10"+'短信发送中')
						sleeps(10000,15200);
						press(422*1+random(0, 700),1709*1+random(0, 90),+random(20, 180));
						sleeps(10000,15200);
						sleeps(10000,15200);
						
			}
			if (textEndsWith("不是我的，继续注册").exists()) {
				var jxzc=className("android.widget.Button").text("不是我的，继续注册").findOne(random(3500,5500));
				clickbounds(jxzc.bounds())
				sleeps(3500,5000);
			}
			if(textEndsWith("通讯录").exists()) {
				toastLog("1.0.10"+"首页通讯录");
				//getA16s = getA16()
				sleeps(800,1200);
				//toastLog(getA16s);
				//files.append("/sdcard/注册成功账号记录.txt", phonenumber+'/'+pswpsw+'/'+getA16s);
				files.append("/sdcard/注册成功账号记录.txt", phonenumber+'/'+pswpsw+"\r\n");
				sleeps(800,1200);
				rechristen(phonenumber,pswpsw)
				sleeps(800,1200);
				break;
			}else{
				toastLog("1.0.10"+"正在查找需要执行的页面")
				sleeps(2000,2500);
				/*if (pingfan) {
					if (pfh >= 4){
					clicks( 67, 168)
					pingfan = false
					sleeps(2500,3000);
					pfh = 0
					}else{
						pfh = pfh + 1
					}
				}*/
				
			}
	
		}
		
}
		
function fapyqWX (){//跑微信注册
		while (true) {//注册页面
			if (textEndsWith("发现").exists()) {
				sleeps(800,1200);
				clickByText("发现");
				sleeps(2700,3200);
			}
			if (textEndsWith("朋友圈").exists()) {
				sleeps(800,1200);
				clickByText("朋友圈");
				sleeps(2700,3200);
			}
		
				if (textEndsWith("发表").exists()) {
				sleeps(800,1200);
				
				sleeps(2700,3200);
			}
		}
}	

slidingBB= dialogs.singleChoice("滑块选项", ["手动", "脚本自动"], 1)
var Username = '555d2-lik'//这里填小鱼API平台账号
var Password = '125445d'//这里填小鱼密码
var itemID = '1296'
var UsernameWJ = '15365926545'//这里填无极平台账号
var PasswordWJ = '125445d'//这里填无极平台密码

//请求截图
requestScreenCapture();
while (true) {
	var TOken = GetToken_xiaoyu(Username,Password)
	var phonenumber = GetNumber_xiaoyu(itemID,TOken,Username)
	var pswpsw= randomRange(8, 12)
	enterCG(phonenumber)
	changefly()
	registerWX()
	GetNumberBlack_xiaoyu(Username,TOken,phonenumber,itemID)
	//fapyqWX()//发朋友圈
}  


var arr = files.listDir("/storage/emulated/0/IGHome/phoneinfo/");

var textbiao = arr.split(',');
dffe = 0
while (true){
	ming1 = textbiao[dffe]
	ming2 = ming1.split(';')[0] 
	toastLog(ming2)
	if (ming2== '66546981'){
		files.removeDir('/storage/emulated/0/IGHome/phoneinfo/'+ming1)
	break
	}else
	{dffe = dffe + 1}
}


//
// StarWebPrintTrader API
//
// Version 1.1.0
//
// Copyright 2012 STAR MICRONICS CO., LTD. All Rights Reserved.
//

var StarWebPrintTrader=function(a){this.papertype=this.checkedblock=this.url=null;this.timeout=9E4;this.onTimeout=this.onError=this.onReceive=null;this.holdprint_timeout=void 0;this._json=this._url=null;void 0!=a&&(void 0!=a.url&&(this.url=a.url),void 0!=a.checkedblock&&(this.checkedblock=a.checkedblock),void 0!=a.papertype&&(this.papertype=a.papertype),void 0!=a.timeout&&(this.timeout=a.timeout),void 0!=a.holdprint_timeout&&(this.holdprint_timeout=a.holdprint_timeout))},_handlerCallback={};
function _onFinish(a){var b=_handlerCallback[a.url],c=a.response;_handlerCallback[a.url]=null;if(200==a.htmlCode)b.onReceive({traderSuccess:c.slice(c.indexOf("&lt;success&gt;")+15,c.indexOf("&lt;/success&gt;")),traderCode:c.slice(c.indexOf("&lt;code&gt;")+12,c.indexOf("&lt;/code&gt;")),traderStatus:c.slice(c.indexOf("&lt;status&gt;")+14,c.indexOf("&lt;/status&gt;")),status:a.htmlCode,responseText:c});else b.onError({status:a.htmlCode,responseText:c})}
StarWebPrintTrader.prototype._callMessageHandler=function(){var a=this;null==_handlerCallback[a._url]?(_handlerCallback[a._url]=a,webkit.messageHandlers.sendMessageHandler.postMessage(a._json)):setTimeout(function(){a._callMessageHandler()},500)};
StarWebPrintTrader.prototype.sendMessage=function(a){var b="<root";void 0!=a.checkedblock?!1==a.checkedblock&&(b+=' checkedblock="false"'):!1==this.checkedblock&&(b+=' checkedblock="false"');void 0!=a.papertype?"normal"==a.papertype?b+=' papertype="normal"':"black_mark"==a.papertype?b+=' papertype="black_mark"':"black_mark_and_detect_at_power_on"==a.papertype&&(b+=' papertype="black_mark_and_detect_at_power_on"'):"normal"==this.papertype?b+=' papertype="normal"':"black_mark"==this.papertype?b+=' papertype="black_mark"':
"black_mark_and_detect_at_power_on"==this.papertype&&(b+=' papertype="black_mark_and_detect_at_power_on"');void 0!=a.holdprint_timeout?b+=' holdprint_timeout="'+a.holdprint_timeout+'"':void 0!=this.holdprint_timeout&&(b+=' holdprint_timeout="'+this.holdprint_timeout+'"');var b=b+(">"+a.request+"</root>"),c;c='<StarWebPrint xmlns="http://www.star-m.jp" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><Request>';c+=this._encodeEscapeSequence(b);c+="</Request>";c+="</StarWebPrint>";b="";b=void 0!=
a.url?a.url:this.url;if(/^https?:\/\/(localhost|127\.0\.0\.1):8001\//.test(b.toLowerCase())&&-1!=navigator.userAgent.indexOf("webPRNTSupportMessageHandler"))this._json=JSON.stringify({url:b,body:c}),this._url=b,this._callMessageHandler();else{var d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest;else if(window.ActiveXObject)d=new ActiveXObject("Microsoft.XMLHTTP");else{if(this.onError)this.onError({status:10001,responseText:"XMLHttpRequest is not supported."});return}if(-1!=navigator.userAgent.indexOf("iPad;")||
-1!=navigator.userAgent.indexOf("iPhone;")||-1!=navigator.userAgent.indexOf("iPod touch;")||-1!=navigator.userAgent.indexOf("Android"))if(-1==navigator.userAgent.indexOf("WebPRNTSupportHTTPS")&&(0==b.toLowerCase().indexOf("https://localhost")||0==b.toLowerCase().indexOf("https://127.0.0.1")))b="http://"+b.substring(8);try{d.open("POST",b,!0)}catch(f){if(this.onError)this.onError({status:10002,responseText:f.message});return}try{void 0!=a.timeout?d.timeout=a.timeout:this.timeout&&(d.timeout=this.timeout)}catch(h){}d.setRequestHeader("Content-Type",
"text/xml; charset=UTF-8");var e=this;d.onreadystatechange=function(){if(4==d.readyState)try{if(200==d.status){var a=d.responseXML.getElementsByTagName("Response");if(0<a.length){if(e.onReceive){var b=a[0].childNodes[0].nodeValue;e.onReceive({traderSuccess:b.slice(b.indexOf("<success>")+9,b.indexOf("</success>")),traderCode:b.slice(b.indexOf("<code>")+6,b.indexOf("</code>")),traderStatus:b.slice(b.indexOf("<status>")+8,b.indexOf("</status>")),status:d.status,responseText:d.responseText})}}else if(e.onError)e.onError({status:d.status,
responseText:d.responseText})}else if(e.onError)e.onError({status:d.status,responseText:d.responseText})}catch(c){if(e.onError)e.onError({status:0,responseText:"Connection timeout occurred."})}};try{d.ontimeout=function(){if(e.onTimeout)e.onTimeout()}}catch(k){}try{d.send(c)}catch(g){if(this.onError)this.onError({status:10003,responseText:g.message})}}};StarWebPrintTrader.prototype._onHandlerSuccess=function(a){if(trader.onReceive)trader.onReceive(a)};
StarWebPrintTrader.prototype._onHandlerError=function(a){if(trader.onError)trader.onError(a)};StarWebPrintTrader.prototype.isCoverOpen=function(a){return parseInt(a.traderStatus.substr(4,2),16)&32?!0:!1};StarWebPrintTrader.prototype.isOffLine=function(a){return parseInt(a.traderStatus.substr(4,2),16)&8?!0:!1};StarWebPrintTrader.prototype.isCompulsionSwitchClose=function(a){return parseInt(a.traderStatus.substr(4,2),16)&4?!0:!1};
StarWebPrintTrader.prototype.isEtbCommandExecute=function(a){return parseInt(a.traderStatus.substr(4,2),16)&2?!0:!1};StarWebPrintTrader.prototype.isHighTemperatureStop=function(a){return parseInt(a.traderStatus.substr(6,2),16)&64?!0:!1};StarWebPrintTrader.prototype.isNonRecoverableError=function(a){return parseInt(a.traderStatus.substr(6,2),16)&32?!0:!1};StarWebPrintTrader.prototype.isAutoCutterError=function(a){return parseInt(a.traderStatus.substr(6,2),16)&8?!0:!1};
StarWebPrintTrader.prototype.isBlackMarkError=function(a){return parseInt(a.traderStatus.substr(8,2),16)&8?!0:!1};StarWebPrintTrader.prototype.isPaperEnd=function(a){return parseInt(a.traderStatus.substr(10,2),16)&8?!0:!1};StarWebPrintTrader.prototype.isPaperNearEnd=function(a){return parseInt(a.traderStatus.substr(10,2),16)&4?!0:!1};StarWebPrintTrader.prototype.isPaperPresent=function(a){return parseInt(a.traderStatus.substr(12,2),16)&2?!0:!1};
StarWebPrintTrader.prototype.extractionEtbCounter=function(a){var b=0;parseInt(a.traderStatus.substr(14,2),16)&64&&(b|=16);parseInt(a.traderStatus.substr(14,2),16)&32&&(b|=8);parseInt(a.traderStatus.substr(14,2),16)&8&&(b|=4);parseInt(a.traderStatus.substr(14,2),16)&4&&(b|=2);parseInt(a.traderStatus.substr(14,2),16)&2&&(b|=1);return b};
StarWebPrintTrader.prototype._encodeEscapeSequence=function(a){var b=/[<>&]/g;b.test(a)&&(a=a.replace(b,function(a){switch(a){case "<":return"&lt;";case ">":return"&gt;"}return"&amp;"}));return a};

;//
// StarWebPrintBuilder API
//
// Version 1.1.0
//
// Copyright 2012 STAR MICRONICS CO., LTD. All Rights Reserved.
//

var StarWebPrintBuilder=function(){};StarWebPrintBuilder.prototype.createAlignmentElement=function(b){var a="<alignment";void 0!=b&&(a+=this._analysisEnumAttribute("position",b.position,/^(left|center|right)$/));return a+"/>"};
StarWebPrintBuilder.prototype.createBarcodeElement=function(b){var a;if(void 0!=b){a="<barcode"+this._analysisEnumAttribute("symbology",b.symbology,/^(UPCE|UPCA|JAN8|JAN13|Code39|ITF|Code128|Code93|NW7)$/);a+=this._analysisEnumAttribute("width",b.width,/^(width[2-4]|width_mode[1-9])$/);a+=this._analysisEnumAttribute("hri",b.hri,/^(false|true)$/);a+=this._analysisValueAttribute("height",b.height,1,255);if(void 0==b.data)throw Error('Argument "data" is undefined.');a=a+">"+this._encodeEscapeSequenceBinary(b.data)}else throw Error("Argument is undefined.");
return a+="</barcode>"};
StarWebPrintBuilder.prototype.createBitImageElement=function(b){var a="<bitimage";if(void 0!=b){var d=0,e=0,c=0,f=0;void 0!=b.x&&(d=b.x);void 0!=b.y&&(e=b.y);void 0!=b.width&&(c=b.width);void 0!=b.height&&(f=b.height);this._analysisValueAttribute("x",d,0,65535);this._analysisValueAttribute("y",e,0,65535);a+=this._analysisValueAttribute("width",c,0,65535);a+=this._analysisValueAttribute("height",f,0,65535);if(void 0==b.context)throw Error('Argument "context" is undefined.');a=a+">"+this._encodeRasterImage(b.context.getImageData(d,
e,c,f).data,c,f)}else throw Error("Argument is undefined.");return a+="</bitimage>"};StarWebPrintBuilder.prototype.createCutPaperElement=function(b){var a="<cutpaper";void 0!=b&&(a+=this._analysisEnumAttribute("feed",b.feed,/^(false|true)$/),a+=this._analysisEnumAttribute("type",b.type,/^(full|partial)$/));return a+"/>"};
StarWebPrintBuilder.prototype.createFeedElement=function(b){var a;if(void 0!=b)if(void 0!=b.line||void 0!=b.unit)a="<feed"+this._analysisValueAttribute("line",b.line,1,255),a+=this._analysisValueAttribute("unit",b.unit,1,255);else throw Error('Argument "line / unit" is undefined.');else throw Error("Argument is undefined.");return a+"/>"};
StarWebPrintBuilder.prototype.createInitializationElement=function(b){var a="<initialization";void 0!=b&&(a+=this._analysisEnumAttribute("reset",b.reset,/^(false|true)$/),a+=this._analysisEnumAttribute("print",b.print,/^(false|true)$/));return a+"/>"};
StarWebPrintBuilder.prototype.createLogoElement=function(b){var a="<logo";void 0!=b&&(a+=this._analysisEnumAttribute("width",b.width,/^(single|double)$/),a+=this._analysisEnumAttribute("height",b.height,/^(single|double)$/),a+=this._analysisValueAttribute("number",b.number,1,255));return a+"/>"};
StarWebPrintBuilder.prototype.createPdf417Element=function(b){var a;if(void 0!=b){a="<pdf417"+this._analysisEnumAttribute("level",b.level,/^(level[0-8])$/);void 0!=b.line&&(a=0!=b.line?a+this._analysisValueAttribute("line",b.line,3,90):a+' line="0"');a+=this._analysisValueAttribute("column",b.column,0,30);a+=this._analysisValueAttribute("module",b.module,1,8);a+=this._analysisValueAttribute("aspect",b.aspect,1,8);if(void 0==b.data)throw Error('Argument "data" is undefined.');a=a+">"+this._encodeEscapeSequenceBinary(b.data)}else throw Error("Argument is undefined.");
return a+="</pdf417>"};StarWebPrintBuilder.prototype.createPeripheralElement=function(b){var a="<peripheral";void 0!=b&&(a+=this._analysisValueAttribute("channel",b.channel,1,2),a+=this._analysisValueAttribute("on",b.on,1,65535),a+=this._analysisValueAttribute("off",b.off,1,65535));return a+"/>"};
StarWebPrintBuilder.prototype.createQrCodeElement=function(b){var a;if(void 0!=b){a="<qrcode"+this._analysisEnumAttribute("model",b.model,/^(model[12])$/);a+=this._analysisEnumAttribute("level",b.level,/^(level_[lmqh])$/);a+=this._analysisValueAttribute("cell",b.cell,1,8);if(void 0==b.data)throw Error('Argument "data" is undefined.');a=a+">"+this._encodeEscapeSequenceBinary(b.data)}else throw Error("Argument is undefined.");return a+="</qrcode>"};
StarWebPrintBuilder.prototype.createRawDataElement=function(b){if(void 0!=b){if(void 0==b.data)throw Error('Argument "data" is undefined.');b="<rawdata>"+this._encodeBase64Binary(b.data)}else throw Error("Argument is undefined.");return b+"</rawdata>"};
StarWebPrintBuilder.prototype.createRuledLineElement=function(b){var a="<ruledline";void 0!=b&&(a+=this._analysisEnumAttribute("thickness",b.thickness,/^(thin|medium|thick|double_(thin|medium|thick))$/),a+=this._analysisValueAttribute("width",b.width,1,65535));return a+"/>"};StarWebPrintBuilder.prototype.createSoundElement=function(b){var a="<sound";void 0!=b&&(a+=this._analysisValueAttribute("channel",b.channel,1,2),a+=this._analysisValueAttribute("repeat",b.repeat,1,20));return a+"/>"};
StarWebPrintBuilder.prototype.createTextElement=function(b){var a;if(void 0!=b)a="<text"+this._analysisEnumAttribute("emphasis",b.emphasis,/^(false|true)$/),a+=this._analysisEnumAttribute("invert",b.invert,/^(false|true)$/),a+=this._analysisEnumAttribute("linespace",b.linespace,/^(24|32)$/),a+=this._analysisEnumAttribute("font",b.font,/^(font_[ab])$/),a+=this._analysisEnumAttribute("underline",b.underline,/^(false|true)$/),a+=this._analysisValueAttribute("characterspace",b.characterspace,0,7),a+=
this._analysisValueAttribute("width",b.width,1,6),a+=this._analysisValueAttribute("height",b.height,1,6),a+=this._analysisEnumAttribute("codepage",b.codepage,/^(cp(437|737|772|774|851|852|855|857|858|860|861|862|863|864|865|866|869|874|928|932|998|999|1001|1250|1251|1252|2001|3001|3002|3011|3012|3021|3041|3840|3841|3843|3844|3845|3846|3847|3848)|utf8|blank|utf8|shift_jis|gb18030|gb2312|big5|korea)$/),a+=this._analysisEnumAttribute("international",b.international,/^(usa|france|germany|uk|denmark|sweden|italy|spain|japan|norway|denmark2|spain2|latin_america|korea|ireland|legal)$/),
void 0!=b.data?(a+=">",a=!0==b.binary?a+this._encodeEscapeSequenceBinary(b.data):a+this._encodeEscapeSequence(b.data),a+="</text>"):a+="/>";else throw Error("Argument is undefined.");return a};StarWebPrintBuilder.prototype.createHoldPrintElement=function(b){var a="<holdprint";void 0!=b&&(a+=this._analysisEnumAttribute("type",b.type,/^(valid|invalid|default)$/));return a+"/>"};
StarWebPrintBuilder.prototype._analysisEnumAttribute=function(b,a,d){if(void 0!=a){if(!d.test(a))throw Error('Argument "'+b+'" is invalid.');return" "+b+'="'+a+'"'}return""};StarWebPrintBuilder.prototype._analysisValueAttribute=function(b,a,d,e){if(void 0!=a){if(a<d||a>e)throw Error('Argument "'+b+'" is invalid.');return" "+b+'="'+a+'"'}return""};
StarWebPrintBuilder.prototype._encodeEscapeSequence=function(b){var a=/[\\\x00-\x20\x26\x3c\x3e\x7f]/g;a.test(b)&&(b=b.replace(a,function(a){return"\\"==a?"\\\\":"\\x"+("0"+a.charCodeAt(0).toString(16)).slice(-2)}));return b};StarWebPrintBuilder.prototype._encodeEscapeSequenceBinary=function(b){var a=/[\\\x00-\x20\x26\x3c\x3e\x7f-\xff]/g;a.test(b)&&(b=b.replace(a,function(a){return"\\"==a?"\\\\":"\\x"+("0"+a.charCodeAt(0).toString(16)).slice(-2)}));return b};
StarWebPrintBuilder.prototype._encodeBase64Binary=function(b){var a="",d=b.length;b+="\x00\x00";for(var e=0;e<d;e+=3)var c=b.charCodeAt(e)<<16|b.charCodeAt(e+1)<<8|b.charCodeAt(e+2),a=a+("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>18&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>12&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c>>6&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(c&
63));switch(d%3){case 1:return a.slice(0,-2)+"==";case 2:return a.slice(0,-1)+"="}return a};
StarWebPrintBuilder.prototype._encodeRasterImage=function(b,a,d){for(var e=[[-254,-126,-222,-94,-246,-118,-214,-86],[-62,-190,-30,-158,-54,-182,-22,-150],[-206,-78,-238,-110,-198,-70,-230,-102],[-14,-142,-46,-174,-6,-134,-38,-166],[-242,-114,-210,-82,-250,-122,-218,-90],[-50,-178,-18,-146,-58,-186,-26,-154],[-194,-66,-226,-98,-202,-74,-234,-106],[-2,-130,-34,-162,-10,-138,-42,-170]],c="",f=0,g=0;g<d;g++){for(var h=0,k=128,l=0;l<a;l++)if(((30*b[f]+59*b[f+1]+11*b[f+2])*b[f+3]+12800)/25500-b[f+3]<e[g&
7][l&7]&&(h|=k),f+=4,0==(k>>=1))c+=String.fromCharCode(h),h=0,k=128;128!=k&&(c+=String.fromCharCode(h))}b=c;c="";a=b.length;b+="\x00\x00";for(g=0;g<a;g+=3)d=b.charCodeAt(g)<<16|b.charCodeAt(g+1)<<8|b.charCodeAt(g+2),c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>18&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>12&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>6&63)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d&
63);switch(a%3){case 1:return c.slice(0,-2)+"==";case 2:return c.slice(0,-1)+"="}return c};

;/*! Epson ePOS SDK Version 2.14.0 Copyright(C) Seiko Epson Corporation 2016 - 2020. All rights reserved. */
(function(window,undefined){function callbackInfo(){this.callbackInfoList=new Object()}callbackInfo.prototype={addCallback:function(callback,sq){this.callbackInfoList[sq]=callback},removeCallback:function(sq){for(var i in this.callbackInfoList){if(i==sq){delete this.callbackInfoList[i];return}}},getCallback:function(sq){if(this.callbackInfoList[sq]!=null){return this.callbackInfoList[sq]}return null}};function CommBox(boxID,commBoxManager,callbackInfo){this.ERROR_OK="OK";this.ERROR_NOT_OPENED="NOT_OPENED";this.ERROR_MEMBER_NOT_FOUND="MEMBER_NOT_FOUND";this.ERROR_SYSTEM_ERROR="SYSTEM_ERROR";this.boxID=boxID;this.commBoxManager=commBoxManager;this.callbackInfo=callbackInfo;this.onreceive=null;this.connectionObj=this.commBoxManager.connectionObj}CommBox.prototype={getCommHistory:function(option,callback){var _option=(typeof(option)=="function")?null:option;var _callback=(typeof(option)=="function")?option:callback;var allHistory=((_option==null)||(_option.allHistory==null))?false:option.allHistory;var data={type:"getcommhistory",box_id:this.boxID,all_history:allHistory};var eposmsg=MessageFactory.getCommBoxDataMessage(data);if(!this.commBoxManager.isOpened(this.getBoxId())){if(_callback!=null){_callback(this.ERROR_NOT_OPENED,null,eposmsg.sequence)}return eposmsg.sequence}this.callbackInfo.addCallback(_callback,eposmsg.sequence);this.connectionObj.emit(eposmsg);return eposmsg.sequence},send:function(message,memberID,callback){var data={type:"send",box_id:this.boxID,message:message,member_id:memberID};var eposmsg=MessageFactory.getCommBoxDataMessage(data);if(!this.commBoxManager.isOpened(this.getBoxId())){if(callback!=null){callback(this.ERROR_NOT_OPENED,0,eposmsg.sequence)}return eposmsg.sequence}this.callbackInfo.addCallback(callback,eposmsg.sequence);this.connectionObj.emit(eposmsg);return eposmsg.sequence},client_getcommhistory:function(data,sq){var code=data.code;var historyList=data.history_list;var getCommHistoryCB=this.callbackInfo.getCallback(sq);this.callbackInfo.removeCallback(sq);if(getCommHistoryCB!=null){getCommHistoryCB(code,historyList,sq)}return},client_send:function(data,sq){var code=data.code;var count=data.count;var sendCB=this.callbackInfo.getCallback(sq);this.callbackInfo.removeCallback(sq);if(sendCB!=null){sendCB(code,count,sq)}return},client_onreceive:function(data,sq){var rcvData=new Object();rcvData.senderId=data.sender_id;rcvData.receiverId=data.receiver_id;rcvData.message=data.message;if(this.onreceive!=null){this.onreceive(rcvData)}return},getBoxId:function(){return this.boxID}};function CommBoxManager(){this.ERROR_OK="OK";this.ERROR_BOX_COUNT_OVER="BOX_COUNT_OVER";this.ERROR_BOX_CLIENT_OVER="BOX_CLIENT_OVER";this.ERROR_MEMBERID_ALREADY_USED="MEMBERID_ALREADY_USED";this.ERROR_ALREADY_OPENED="ALREADY_OPENED";this.ERROR_NOT_OPENED="NOT_OPENED";this.ERROR_PARAMETER_ERROR="PARAMETER_ERROR";this.ERROR_SYSTEM_ERROR="SYSTEM_ERROR";this.callbackInfo=new callbackInfo();this.commBoxList=new Array();this.connectionObj=null}CommBoxManager.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},openCommBox:function(boxID,option,callback){var memberID="";if(option!=null&&option.memberID!=null){memberID=option.memberID}var data={box_id:boxID,member_id:memberID};var eposmsg=MessageFactory.getOpenCommBoxMessage(data);if(!this.connectionObj.isUsableDeviceIF()){callback(null,this.ERROR_SYSTEM_ERROR,eposmsg.sequence);return eposmsg.sequence}this.connectionObj.emit(eposmsg);this.callbackInfo.addCallback(callback,eposmsg.sequence);return eposmsg.sequence},closeCommBox:function(boxObj,callback){var data={box_id:boxID};var eposmsg=MessageFactory.getCloseCommBoxMessage(data);try{var boxID=boxObj.getBoxId();data.box_id=boxID;eposmsg=MessageFactory.getCloseCommBoxMessage(data);if(!this.isOpened(boxID)){if(callback!=null){callback(this.ERROR_NOT_OPENED,eposmsg.sequence)}return eposmsg.sequence}this.connectionObj.emit(eposmsg)}catch(e){if(callback!=null){callback(this.ERROR_PARAMETER_ERROR,eposmsg.sequence)}}this.callbackInfo.addCallback(callback,eposmsg.sequence);return eposmsg.sequence},client_opencommbox:function(data,sq){var boxID=data.box_id;var code=data.code;var commBoxObj=null;if(code==this.ERROR_OK&&this.getCommBox(boxID)==null){commBoxObj=new CommBox(boxID,this,this.callbackInfo)}if(commBoxObj!=null){this.commBoxList.push(commBoxObj)}var openCommBoxCB=this.callbackInfo.getCallback(sq);this.callbackInfo.removeCallback(sq);if(openCommBoxCB!=null){openCommBoxCB(commBoxObj,code,sq)}return},client_closecommbox:function(data,sq){var boxID=data.box_id;var code=data.code;this.removeCommBox(boxID);var closeCommBoxCB=this.callbackInfo.getCallback(sq);this.callbackInfo.removeCallback(sq);if(closeCommBoxCB!=null){closeCommBoxCB(code,sq)}return},executeCommDataCallback:function(data,sq){var boxID=data.box_id;var commBoxObj=this.getCommBox(boxID);var method="client_"+data.type;try{eval("commBoxObj."+method+"(data, sq)")}catch(e){throw new Error("")}return},getCommBox:function(boxID){var commBoxObj=null;for(var i=0;i<this.commBoxList.length;i++){if(this.commBoxList[i].getBoxId()==boxID){commBoxObj=this.commBoxList[i];break}}return commBoxObj},removeCommBox:function(boxID){var result=false;for(var i=0;i<this.commBoxList.length;i++){if(this.commBoxList[i].getBoxId()==boxID){this.commBoxList.splice(i,1);result=true;break}}return result},isOpened:function(boxID){var result=false;for(var i=0;i<this.commBoxList.length;i++){if(this.commBoxList[i].getBoxId()==boxID){result=true;break}}return result}};function DeviceObjectSelector(){this.type2objectMap={type_scanner:"Scanner",type_keyboard:"Keyboard",type_poskeyboard:"POSKeyboard",type_msr:"MSR",type_cat:"CAT",type_cash_changer:"CashChanger",type_printer:"Printer",type_display:"Display",type_simple_serial:"SimpleSerial",type_hybrid_printer:"HybridPrinter",type_hybrid_printer2:"HybridPrinter2",type_dt:"DeviceTerminal",type_other_peripheral:"OtherPeripheral",type_storage:"GermanyFiscalElement"};this.connectionObj=null}DeviceObjectSelector.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},isSelectable:function(deviceType){if(this.connectionObj.isUsableDeviceIF()){return true}else{if(deviceType=="type_printer"&&this.connectionObj.isUsablePrintIF()){return true}else{if(deviceType=="type_display"&&this.connectionObj.isUsableDisplayIF()){return true}}}return false},select:function(deviceId,deviceType,specificDevice,isCrypto,ePOSDeviceContext){var deviceObjectName="";if(typeof(specificDevice)=="string"){deviceObjectName=specificDevice}else{deviceObjectName=this.type2objectMap[deviceType]}var templateObject=null;try{templateObject=eval(deviceObjectName)}catch(e){throw new Error("ERROR_PARAMETER")}if(typeof(templateObject)!="function"){throw new Error("ERROR_PARAMETER")}if((deviceObjectName=="Printer")||(deviceObjectName=="Display")||(deviceObjectName=="HybridPrinter")||(deviceObjectName=="HybridPrinter2")){return new templateObject(deviceId,isCrypto,ePOSDeviceContext)}else{return new templateObject(deviceId,isCrypto)}}};function CashChanger(deviceID,isCrypto){this.CONFIG_LEFT_CASH="CONFIG_LEFT_CASH";this.CONFIG_COUNT_MODE="CONFIG_COUNT_MODE";this.MODE_MANUAL_INPUT="MODE_MANUAL_INPUT";this.MODE_AUTOCOUNT="MODE_AUTO_COUNT";this.DEPOSIT_CHANGE="DEPOSIT_CHANGE";this.DEPOSIT_NOCHANGE="DEPOSIT_NOCHANGE";this.DEPOSIT_REPAY="DEPOSIT_REPAY";this.COLLECT_ALL_CASH="ALL_CASH";this.COLLECT_PART_OF_CASH="PART_OF_CASH";this.SUE_POWER_ONLINE=2001;this.SUE_POWER_OFF=2002;this.SUE_POWER_OFFLINE=2003;this.SUE_POWER_OFF_OFFLINE=2004;this.SUE_STATUS_EMPTY=11;this.SUE_STATUS_NEAREMPTY=12;this.SUE_STATUS_EMPTYOK=13;this.SUE_STATUS_FULL=21;this.SUE_STATUS_NEARFULL=22;this.SUE_STATUS_FULLOK=23;this.SUE_STATUS_JAM=31;this.SUE_STATUS_JAMOK=32;this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}CashChanger.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},client_oncashcounts:function(data){try{if(this.oncashcounts==null){return}this.oncashcounts(data)}catch(e){}return},client_onstatuschange:function(data){try{if(this.onstatuschange==null){return}this.onstatuschange(data)}catch(e){}return},client_ondeposit:function(data){try{if(this.ondeposit==null){return}this.ondeposit(data)}catch(e){}return},client_ondispense:function(data){try{if(this.ondispense==null){return}this.ondispense(data)}catch(e){}return},client_oncollect:function(data){try{if(this.oncollect==null){return}this.oncollect(data)}catch(e){}return},client_onconfigchange:function(data){try{if(this.onconfigchange==null){return}this.onconfigchange(data)}catch(e){}return},client_oncommandreply:function(data){try{if(this.oncommandreply==null){return}if(typeof data.command!=""){}else{var hexData=data.data;hexData=hexData.replace(/[0-9a-fA-F]{2}/g,function(c){var hexNum=parseInt(c,16);return String.fromCharCode(hexNum)});data.data=hexData}this.oncommandreply(data)}catch(e){}return},client_ondirectio:function(data){try{if(this.ondirectio==null){return}this.ondirectio(data)}catch(e){}return},client_onstatusupdate:function(data){try{if(this.onstatusupdate==null){return}this.onstatusupdate(data)}catch(e){}return},readCashCounts:function(){var data={type:"readcashcounts"};return this.send(data)},beginDeposit:function(){var data={type:"begindeposit"};return this.send(data)},pauseDeposit:function(){var data={type:"pausedeposit"};return this.send(data)},restartDeposit:function(){var data={type:"restartdeposit"};return this.send(data)},endDeposit:function(cmd){var data={type:"enddeposit",cmd:cmd};return this.send(data)},dispenseCash:function(data){var data_;if(typeof data=="object"){data_=data;data_.type="dispensecash"}else{data_={type:"dispensecash",cash:data}}return this.send(data_)},dispenseChange:function(cash){var data_;if(typeof cash=="object"){data_=cash;data_.type="dispensechange"}else{data_={type:"dispensechange",cash:cash}}return this.send(data_)},openDrawer:function(){var data={type:"opendrawer"};return this.send(data)},collectCash:function(collectMode){var data={type:"collectcash",collectmode:collectMode};return this.send(data)},setConfig:function(config,value){var data=null;switch(config){case this.CONFIG_COUNT_MODE:data={type:"setconfig",config:config,mode:value.mode};break;case this.CONFIG_LEFT_CASH:if((value.bills==null)||(value.bills=="")){value.bills="0"}if((value.coins==null)||(value.coins=="")){value.coins="0"}data={type:"setconfig",config:config,bills:value.bills,coins:value.coins};break;default:break}var sq=-1;if(data!=null){sq=this.send(data)}return sq},sendCommand:function(command){var data;if(typeof command=="object"){data=command;data.type="sendcommand"}else{data={type:"sendcommand",command:toHexBinary(command)}}return this.send(data)},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;return this.send(eventReq)},send:function(data){var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function CAT(deviceID,isCrypto){this.SUE_LOGSTATUS_OK=0;this.SUE_LOGSTATUS_NEARFULL=1;this.SUE_LOGSTATUS_FULL=2;this.SUE_POWER_ONLINE=2001;this.SUE_POWER_OFF_OFFLINE=2004;this.deviceID=deviceID;this.isCrypto=isCrypto;this.timeout=0;this.trainingMode=false;this.connectionObj=null}CAT.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},authorizeSales:function(data){var _data={service:data.service,total_amount:data.totalAmount,sequence:data.sequence};_data.type="authorizesales";_data.training=this.trainingMode;_data.timeout=this.timeout;return this.send(_data)},authorizeVoid:function(data){var _data={service:data.service,total_amount:data.totalAmount,sequence:data.sequence};_data.type="authorizevoid";_data.training=this.trainingMode;_data.timeout=this.timeout;return this.send(_data)},authorizeRefund:function(data){var _data={service:data.service,total_amount:data.totalAmount,sequence:data.sequence};_data.type="authorizerefund";_data.training=this.trainingMode;_data.timeout=this.timeout;return this.send(_data)},authorizeCompletion:function(data){var _data={service:data.service,total_amount:data.totalAmount,sequence:data.sequence};_data.type="authorizecompletion";_data.training=this.trainingMode;_data.timeout=this.timeout;return this.send(_data)},accessDailyLog:function(data){var _data={service:data.service,total_amount:data.totalAmount,sequence:data.sequence};_data.type="accessdailylog";_data.training=this.trainingMode;_data.timeout=this.timeout;return this.send(_data)},sendCommand:function(data){var _data={service:data.service,command:data.command,data:data.data,string:data.string};_data.type="sendcommand";_data.training=this.trainingMode;return this.send(_data)},send:function(data){var tmp=this.deviceID;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence},client_onauthorizesales:function(data){try{if(this.onauthorizesales==null){return}this.onauthorizesales(this.getResultObject(data))}catch(e){}return},client_onauthorizevoid:function(data){try{if(this.onauthorizevoid==null){return}this.onauthorizevoid(this.getResultObject(data))}catch(e){}return},client_onauthorizerefund:function(data){try{if(this.onauthorizerefund==null){return}this.onauthorizerefund(this.getResultObject(data))}catch(e){}return},client_onauthorizecompletion:function(data){try{if(this.onauthorizecompletion==null){return}this.onauthorizecompletion(this.getResultObject(data))}catch(e){}return},client_onaccessdailylog:function(data){try{if(this.onaccessdailylog==null){return}this.onaccessdailylog(this.getDailyLogObject(data))}catch(e){}return},client_oncommandreply:function(data){try{if(this.oncommandreply==null){return}this.oncommandreply(this.getCommandReplyObject(data))}catch(e){}return},client_onstatusupdate:function(data){try{if(this.onstatusupdate==null){return}this.onstatusupdate(data)}catch(e){}return},getResultObject:function(data){return({status:data.status,sequence:data.sequence,service:data.service,accountNumber:data.account_number,settledAmount:data.settled_amount,slipNumber:data.slip_number,kid:data.kid,approvalCode:data.approval_code,transactionNumber:data.transaction_number,paymentCondition:data.payment_condition,voidSlipNumber:data.void_slip_number,balance:data.balance})},getDailyLogObject:function(data){var dailylogData={};dailylogData.status=data.status;dailylogData.service=data.service;dailylogData.sequence=data.sequence;var logList=[];try{data.daily_log.forEach(function(log){var logData={};if(log===0){throw logList}logData.kid=log.kid;logData.salesCount=log.sales_count;logData.salesAmount=log.sales_amount;logData.voidCount=log.void_count;logData.voidAmount=log.void_amount;logList.push(logData)})}catch(e){}dailylogData.dailyLog=logList;return dailylogData},getCommandReplyObject:function(data){return({status:data.status,command:data.command,data:data.data,string:data.string,service:data.service,sequence:data.sequence,accountNumber:data.account_number,settledAmount:data.settled_amount,slipNumber:data.slip_number,transactionNumber:data.transaction_number,paymentCondition:data.payment_condition,balance:data.balance,additionalSecurityInformation:data.additional_security_information,})},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;return this.send(eventReq)}};function DeviceTerminal(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.onshutdown=null;this.onrestart=null;this.connectionObj=null}DeviceTerminal.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},shutdown:function(password,callback){this.onshutdown=callback;var data={type:"shutdown",password:password};return this.send(data)},client_onshutdown:function(data){try{if(typeof(this.onshutdown)!="function"){return}this.onshutdown(data)}catch(e){}return},restart:function(password,callback){this.onrestart=callback;var data={type:"restart",password:password};return this.send(data)},client_onrestart:function(data){try{if(typeof(this.onrestart)!="function"){return}this.onrestart(data)}catch(e){}return},send:function(data){var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function Display(deviceID,isCrypto,ePOSDeviceContext){this.message="";this.deviceID=deviceID;this.isCrypto=isCrypto;this.ePosDev=ePOSDeviceContext;this.timeout=10000;this.onreceive=null;this.onerror=null;this.ASB_NO_RESPONSE=1;this.ASB_DISPLAY_SUCCESS=2;this.SCROLL_OVERWRITE="overwrite";this.SCROLL_VERTICAL="v_scroll";this.SCROLL_HORIZONTAL="h_scroll";this.MOVE_TOP_LEFT="top_left";this.MOVE_TOP_RIGHT="top_right";this.MOVE_BOTTOM_LEFT="bottom_left";this.MOVE_BOTTOM_RIGHT="bottom_right";this.CURSOR_NONE="none";this.CURSOR_UNDERLINE="underline";this.BRIGHTNESS_20=20;this.BRIGHTNESS_40=40;this.BRIGHTNESS_60=60;this.BRIGHTNESS_100=100;this.MARQUEE_WALK="walk";this.MARQUEE_PLACE="place";this.connectionObj=null}Display.prototype.setConnectionObject=function(connectionObj){this.connectionObj=connectionObj};Display.prototype.reset=function(){try{this.message+="<reset />"}catch(e){throw e}return this};Display.prototype.createWindow=function(number,x,y,width,hight,scrollMode){try{var s="";s+=getIntAttr("number",number,1,4);s+=getIntAttr("x",x,1,20);s+=getIntAttr("y",y,1,2);s+=getIntAttr("width",width,1,(21-x));s+=getIntAttr("height",hight,1,(3-y));s+=getEnumAttr("scrollmode",scrollMode,regexScrollMode);this.message+="<window"+s+"/>"}catch(e){throw e}return this};Display.prototype.destroyWindow=function(number){try{var s="";s+=getIntAttr("number",number,1,4);this.message+="<window"+s+' destroy="true"/>'}catch(e){throw e}return this};Display.prototype.setCurrentWindow=function(number){try{var s="";s+=getIntAttr("number",number,1,4);this.message+="<window"+s+"/>"}catch(e){throw e}return this};Display.prototype.setCursorPosition=function(){try{var s="";s+=getIntAttr("x",arguments[0],1,20);s+=getIntAttr("y",arguments[1],1,2);this.message+="<cursor"+s+"/>"}catch(e){throw e}return this};Display.prototype.moveCursorPosition=function(){try{var s="";s+=getEnumAttr("moveto",arguments[0],regexMoveto);this.message+="<cursor"+s+"/>"}catch(e){throw e}return this};Display.prototype.setCursorType=function(underline){try{var s="";s+=getEnumAttr("type",underline,regexUnderline);this.message+="<cursor"+s+"/>"}catch(e){throw e}return this};Display.prototype.addText=function(){try{var s="";switch(arguments.length){case 1:break;case 2:s+=' lang="'+arguments[1]+'"';break;case 3:s+=getIntAttr("x",arguments[1],1,20);s+=getIntAttr("y",arguments[2],1,2);break;case 4:s+=getIntAttr("x",arguments[1],1,20);s+=getIntAttr("y",arguments[2],1,2);s+=' lang="'+arguments[3]+'"';break;default:throw new Error("Parameters are invalid");break}this.message+="<text"+s+">"+escapeMarkup(arguments[0])+"</text>"}catch(e){throw e}return this};Display.prototype.addReverseText=function(){try{var s="";switch(arguments.length){case 1:s+=getBoolAttr("reverse",true);break;case 2:s+=' lang="'+arguments[1]+'"';s+=getBoolAttr("reverse",true);break;case 3:s+=getIntAttr("x",arguments[1],1,20);s+=getIntAttr("y",arguments[2],1,2);s+=getBoolAttr("reverse",true);break;case 4:s+=getIntAttr("x",arguments[1],1,20);s+=getIntAttr("y",arguments[2],1,2);s+=' lang="'+arguments[3]+'"';s+=getBoolAttr("reverse",true);break;default:throw new Error("Parameters are invalid");break}this.message+="<text"+s+">"+escapeMarkup(arguments[0])+"</text>"}catch(e){throw e}return this};Display.prototype.clearWindow=function(){try{this.message+="<clear/>"}catch(e){throw e}return this};Display.prototype.setBlink=function(interval){try{var s="";s+=getUShortAttr("interval",interval);this.message+="<blink"+s+"/>"}catch(e){throw e}return this};Display.prototype.setBrightness=function(value){try{var s="";s+=getEnumAttr("value",value,regexBrightness);this.message+="<brightness"+s+"/>"}catch(e){throw e}return this};Display.prototype.addMarquee=function(text,format,uwait,rwait,repeat,lang){try{var s="";s+=getEnumAttr("format",format,regexMarquee);s+=getIntAttr("uwait",uwait,0,2000);s+=getIntAttr("rwait",rwait,100,2000);s+=getIntAttr("repeat",repeat,0,127);if((typeof lang)!=="undefined"){s+=' lang="'+lang+'"'}this.message+="<marquee"+s+">"+escapeMarkup(text)+"</marquee>"}catch(e){throw e}return this};Display.prototype.showClock=function(){try{this.message+="<clock/>"}catch(e){throw e}return this};Display.prototype.addCommand=function(text){try{this.message+="<command>"+toHexBinary(text)+"</command>"}catch(e){throw e}return this};Display.prototype.send=function(){var sq=-1;if((!this.ePosDev.eposprint)&&(this.connectionObj.isUsableDeviceIF())){try{var xml=this.toString();var data={type:"display",timeout:this.timeout,displaydata:xml};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);this.connectionObj.emit(eposmsg);sq=eposmsg.sequence;this.message=""}catch(e){sq=-1}}else{var self=this,address=this.connectionObj.getAddressWithProtocol()+"/cgi-bin/eposDisp/service.cgi?devid="+this.deviceID+"&timeout="+this.timeout,soap,xhr,tid,res,success,code,status;res={};soap='<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';soap+="<s:Body>"+this.toString()+"</s:Body></s:Envelope>";if(window.XMLHttpRequest){xhr=new XMLHttpRequest();if(!("withCredentials" in xhr)&&window.XDomainRequest){xhr=new XDomainRequest();xhr.open("POST",address,true);xhr.onload=function(){res=xhr.responseText;if(/response/.test(res)){success=/success\s*=\s*"\s*(1|true)\s*"/.test(res);code=res.match(/code\s*=\s*"\s*(\S*)\s*"/)?RegExp.$1:"";status=res.match(/status\s*=\s*"\s*(\d+)\s*"/)?parseInt(RegExp.$1):0;self.fireReceiveEvent(success,code,status,0)}else{self.fireErrorEvent(0,xhr.responseText,0)}};xhr.onerror=function(){self.fireErrorEvent(0,xhr.responseText,0)};xhr.onprogress=function(){};xhr.ontimeout=xhr.onerror;xhr.timeout=self.timeout;xhr.send(soap)}else{xhr.open("POST",address,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(tid);if(xhr.status==200&&xhr.responseXML){res=xhr.responseXML.getElementsByTagName("response");if(res.length>0){success=/^(1|true)$/.test(res[0].getAttribute("success"));code=res[0].hasAttribute("code")?res[0].getAttribute("code"):"";status=res[0].hasAttribute("status")?parseInt(res[0].getAttribute("status")):0;self.fireReceiveEvent(success,code,status,0)}else{self.fireErrorEvent(xhr.status,xhr.responseText,0)}}else{self.fireErrorEvent(xhr.status,xhr.responseText,0)}}};tid=setTimeout(function(){xhr.abort()},this.timeout);xhr.send(soap)}this.message=""}else{throw new Error("XMLHttpRequest is not supported")}sq=0}return sq};Display.prototype.fireReceiveEvent=function(success,code,status,sq){if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}if(this.onreceive){this.onreceive({success:success,code:code,status:status},sq)}};Display.prototype.fireErrorEvent=function(status,responseText,sq){if(this.onerror){this.onerror({status:0,responseText:this.ASB_NO_RESPONSE},sq)}this.ePosDev.cleanup()};Display.prototype.client_onxmlresult=function(res,sq){if(res){var xml=res.resultdata;var success=/success\s*=\s*"\s*(1|true)\s*"/.test(xml);xml.match(/code\s*=\s*"\s*(\S*)\s*"/);var code=RegExp.$1;xml.match(/status\s*=\s*"\s*(\d+)\s*"/);var status=parseInt(RegExp.$1);if(this.onreceive){this.onreceive({success:success,code:code,status:status},sq)}}else{if(this.onerror){this.onerror({status:0,responseText:this.ASB_NO_RESPONSE},sq)}this.ePosDev.cleanup()}};Display.prototype.toString=function(){var epos='<epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display">'+this.message+"</epos-display>";return epos};Display.prototype.setXmlString=function(xml){this.message=xml};Display.prototype.getXmlString=function(){return this.message};Display.prototype.callEvent=function(eventName,data){var eventReq={type:eventName,data:data};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence};var regexBrightness=/^(20|40|60|100)$/;var regexScrollMode=/^(overwrite|v_scroll|h_scroll)$/;var regexMoveto=/^(top_left|top_right|bottom_left|bottom_right)$/;var regexUnderline=/^(none|underline)$/;var regexMarquee=/^(walk|place)$/;function OtherPeripheral(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}OtherPeripheral.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},send:function(methodName,data){var _data={};for(var key in data){_data[key]=data[key]}_data.type=methodName;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,_data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence},client_onreceive:function(data){try{var eventData=data;delete eventData.type;this.onreceive(data.type,eventData)}catch(e){}return},callEvent:function(eventName,data){var eventReq={type:eventName,data:data};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function Keyboard(deviceID,isCrypto){this.VK_CANCEL=3;this.VK_BACK=8;this.VK_TAB=9;this.VK_RETURN=13;this.VK_SHIFT=16;this.VK_CONTROL=17;this.VK_MENU=18;this.VK_PAUSE=19;this.VK_CAPITAL=20;this.VK_KANA=21;this.VK_ESCAPE=27;this.VK_CONVERT=28;this.VK_NONCONVERT=29;this.VK_SPACE=32;this.VK_PRIOR=33;this.VK_NEXT=34;this.VK_END=35;this.VK_HOME=36;this.VK_LEFT=37;this.VK_UP=38;this.VK_RIGHT=39;this.VK_DOWN=40;this.VK_INSERT=45;this.VK_DELETE=46;this.VK_0=48;this.VK_1=49;this.VK_2=50;this.VK_3=51;this.VK_4=52;this.VK_5=53;this.VK_6=54;this.VK_7=55;this.VK_8=56;this.VK_9=57;this.VK_A=65;this.VK_B=66;this.VK_C=67;this.VK_D=68;this.VK_E=69;this.VK_F=70;this.VK_G=71;this.VK_H=72;this.VK_I=73;this.VK_J=74;this.VK_K=75;this.VK_L=76;this.VK_M=77;this.VK_N=78;this.VK_O=79;this.VK_P=80;this.VK_Q=81;this.VK_R=82;this.VK_S=83;this.VK_T=84;this.VK_U=85;this.VK_V=86;this.VK_W=87;this.VK_X=88;this.VK_Y=89;this.VK_Z=90;this.VK_LWIN=91;this.VK_RWIN=92;this.VK_APPS=93;this.VK_NUMPAD0=96;this.VK_NUMPAD1=97;this.VK_NUMPAD2=98;this.VK_NUMPAD3=99;this.VK_NUMPAD4=100;this.VK_NUMPAD5=101;this.VK_NUMPAD6=102;this.VK_NUMPAD7=103;this.VK_NUMPAD8=104;this.VK_NUMPAD9=105;this.VK_MULTIPLY=106;this.VK_ADD=107;this.VK_SEPARATOR=108;this.VK_SUBTRACT=109;this.VK_DECIMAL=110;this.VK_DIVIDE=111;this.VK_F1=112;this.VK_F2=113;this.VK_F3=114;this.VK_F4=115;this.VK_F5=116;this.VK_F6=117;this.VK_F7=118;this.VK_F8=119;this.VK_F9=120;this.VK_F10=121;this.VK_F11=122;this.VK_F12=123;this.VK_NUMLOCK=144;this.VK_SCROLL=145;this.VK_LSHIFT=160;this.VK_RSHIFT=161;this.VK_LCONTROL=162;this.VK_RCONTROL=163;this.VK_LMENU=164;this.VK_RMENU=165;this.VK_OEM_1=186;this.VK_OEM_PLUS=187;this.VK_OEM_COMMA=188;this.VK_OEM_MINUS=189;this.VK_OEM_PERIOD=190;this.VK_OEM_2=191;this.VK_OEM_3=192;this.VK_OEM_4=219;this.VK_OEM_5=220;this.VK_OEM_6=221;this.VK_OEM_7=222;this.VK_OEM_102=226;this.VK_OEM_ATTN=240;this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}Keyboard.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},client_onkeypress:function(data){try{if(this.onkeypress==null){return}this.onkeypress(data)}catch(e){}return},client_onstring:function(data){try{if(this.onstring==null){return}this.onstring(data)}catch(e){}return},setPrefix:function(keycodes){var data={type:"setprefix"};if(typeof keycodes=="object"){if((keycodes.length==0)){return -1}data.keycodes=keycodes}else{if((keycodes==null)||(keycodes=="")){return -1}data.keycodes=[keycodes]}var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,eventReq,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function MSR(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}MSR.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},client_ondata:function(data){try{if(this.ondata==null){return}this.ondata(data)}catch(e){}return},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,eventReq,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};
/*! Based JavaScript is ePOS-Print API Version 5.0.0 */
function ePOSBuilder(){this.message="";this.halftone=0;this.brightness=1;this.force=false;this.FONT_A="font_a";this.FONT_B="font_b";this.FONT_C="font_c";this.FONT_D="font_d";this.FONT_E="font_e";this.FONT_SPECIAL_A="special_a";this.FONT_SPECIAL_B="special_b";this.ALIGN_LEFT="left";this.ALIGN_CENTER="center";this.ALIGN_RIGHT="right";this.COLOR_NONE="none";this.COLOR_1="color_1";this.COLOR_2="color_2";this.COLOR_3="color_3";this.COLOR_4="color_4";this.FEED_PEELING="peeling";this.FEED_CUTTING="cutting";this.FEED_CURRENT_TOF="current_tof";this.FEED_NEXT_TOF="next_tof";this.MODE_MONO="mono";this.MODE_GRAY16="gray16";this.BARCODE_UPC_A="upc_a";this.BARCODE_UPC_E="upc_e";this.BARCODE_EAN13="ean13";this.BARCODE_JAN13="jan13";this.BARCODE_EAN8="ean8";this.BARCODE_JAN8="jan8";this.BARCODE_CODE39="code39";this.BARCODE_ITF="itf";this.BARCODE_CODABAR="codabar";this.BARCODE_CODE93="code93";this.BARCODE_CODE128="code128";this.BARCODE_GS1_128="gs1_128";this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL="gs1_databar_omnidirectional";this.BARCODE_GS1_DATABAR_TRUNCATED="gs1_databar_truncated";this.BARCODE_GS1_DATABAR_LIMITED="gs1_databar_limited";this.BARCODE_GS1_DATABAR_EXPANDED="gs1_databar_expanded";this.HRI_NONE="none";this.HRI_ABOVE="above";this.HRI_BELOW="below";this.HRI_BOTH="both";this.SYMBOL_PDF417_STANDARD="pdf417_standard";this.SYMBOL_PDF417_TRUNCATED="pdf417_truncated";this.SYMBOL_QRCODE_MODEL_1="qrcode_model_1";this.SYMBOL_QRCODE_MODEL_2="qrcode_model_2";this.SYMBOL_QRCODE_MICRO="qrcode_micro";this.SYMBOL_MAXICODE_MODE_2="maxicode_mode_2";this.SYMBOL_MAXICODE_MODE_3="maxicode_mode_3";this.SYMBOL_MAXICODE_MODE_4="maxicode_mode_4";this.SYMBOL_MAXICODE_MODE_5="maxicode_mode_5";this.SYMBOL_MAXICODE_MODE_6="maxicode_mode_6";this.SYMBOL_GS1_DATABAR_STACKED="gs1_databar_stacked";this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL="gs1_databar_stacked_omnidirectional";this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED="gs1_databar_expanded_stacked";this.SYMBOL_AZTECCODE_FULLRANGE="azteccode_fullrange";this.SYMBOL_AZTECCODE_COMPACT="azteccode_compact";this.SYMBOL_DATAMATRIX_SQUARE="datamatrix_square";this.SYMBOL_DATAMATRIX_RECTANGLE_8="datamatrix_rectangle_8";this.SYMBOL_DATAMATRIX_RECTANGLE_12="datamatrix_rectangle_12";this.SYMBOL_DATAMATRIX_RECTANGLE_16="datamatrix_rectangle_16";this.LEVEL_0="level_0";this.LEVEL_1="level_1";this.LEVEL_2="level_2";this.LEVEL_3="level_3";this.LEVEL_4="level_4";this.LEVEL_5="level_5";this.LEVEL_6="level_6";this.LEVEL_7="level_7";this.LEVEL_8="level_8";this.LEVEL_L="level_l";this.LEVEL_M="level_m";this.LEVEL_Q="level_q";this.LEVEL_H="level_h";this.LEVEL_DEFAULT="default";this.LINE_THIN="thin";this.LINE_MEDIUM="medium";this.LINE_THICK="thick";this.LINE_THIN_DOUBLE="thin_double";this.LINE_MEDIUM_DOUBLE="medium_double";this.LINE_THICK_DOUBLE="thick_double";this.DIRECTION_LEFT_TO_RIGHT="left_to_right";this.DIRECTION_BOTTOM_TO_TOP="bottom_to_top";this.DIRECTION_RIGHT_TO_LEFT="right_to_left";this.DIRECTION_TOP_TO_BOTTOM="top_to_bottom";this.CUT_NO_FEED="no_feed";this.CUT_FEED="feed";this.CUT_RESERVE="reserve";this.DRAWER_1="drawer_1";this.DRAWER_2="drawer_2";this.PULSE_100="pulse_100";this.PULSE_200="pulse_200";this.PULSE_300="pulse_300";this.PULSE_400="pulse_400";this.PULSE_500="pulse_500";this.PATTERN_NONE="none";this.PATTERN_0="pattern_0";this.PATTERN_1="pattern_1";this.PATTERN_2="pattern_2";this.PATTERN_3="pattern_3";this.PATTERN_4="pattern_4";this.PATTERN_5="pattern_5";this.PATTERN_6="pattern_6";this.PATTERN_7="pattern_7";this.PATTERN_8="pattern_8";this.PATTERN_9="pattern_9";this.PATTERN_10="pattern_10";this.PATTERN_A="pattern_a";this.PATTERN_B="pattern_b";this.PATTERN_C="pattern_c";this.PATTERN_D="pattern_d";this.PATTERN_E="pattern_e";this.PATTERN_ERROR="error";this.PATTERN_PAPER_END="paper_end";this.LAYOUT_RECEIPT="receipt";this.LAYOUT_RECEIPT_BM="receipt_bm";this.LAYOUT_LABEL="label";this.LAYOUT_LABEL_BM="label_bm";this.HALFTONE_DITHER=0;this.HALFTONE_ERROR_DIFFUSION=1;this.HALFTONE_THRESHOLD=2}ePOSBuilder.prototype.addText=function(data){this.message+="<text>"+escapeMarkup(data)+"</text>";return this};ePOSBuilder.prototype.addTextLang=function(lang){this.message+='<text lang="'+lang+'"/>';return this};ePOSBuilder.prototype.addTextAlign=function(align){var s="";s+=getEnumAttr("align",align,regexAlign);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextRotate=function(rotate){var s="";s+=getBoolAttr("rotate",rotate);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextLineSpace=function(linespc){var s="";s+=getUByteAttr("linespc",linespc);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextFont=function(font){var s="";s+=getEnumAttr("font",font,regexFont);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextSmooth=function(smooth){var s="";s+=getBoolAttr("smooth",smooth);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextDouble=function(dw,dh){var s="";if(dw!==undefined){s+=getBoolAttr("dw",dw)}if(dh!==undefined){s+=getBoolAttr("dh",dh)}this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextSize=function(width,height){var s="";if(width!==undefined){s+=getIntAttr("width",width,1,8)}if(height!==undefined){s+=getIntAttr("height",height,1,8)}this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextStyle=function(reverse,ul,em,color){var s="";if(reverse!==undefined){s+=getBoolAttr("reverse",reverse)}if(ul!==undefined){s+=getBoolAttr("ul",ul)}if(em!==undefined){s+=getBoolAttr("em",em)}if(color!==undefined){s+=getEnumAttr("color",color,regexColor)}this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextPosition=function(x){var s="";s+=getUShortAttr("x",x);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addTextVPosition=function(y){var s="";s+=getUShortAttr("y",y);this.message+="<text"+s+"/>";return this};ePOSBuilder.prototype.addFeedUnit=function(unit){var s="";s+=getUByteAttr("unit",unit);this.message+="<feed"+s+"/>";return this};ePOSBuilder.prototype.addFeedLine=function(line){var s="";s+=getUByteAttr("line",line);this.message+="<feed"+s+"/>";return this};ePOSBuilder.prototype.addFeed=function(){this.message+="<feed/>";return this};ePOSBuilder.prototype.addFeedPosition=function(pos){var s="";s+=getEnumAttr("pos",pos,regexFeed);this.message+="<feed"+s+"/>";return this};ePOSBuilder.prototype.addImage=function(context,x,y,width,height,color,mode){var s="",ht=this.halftone,br=this.brightness,imgdata,raster;getUShortAttr("x",x);getUShortAttr("y",y);s+=getUShortAttr("width",width);s+=getUShortAttr("height",height);if(color!==undefined){s+=getEnumAttr("color",color,regexColor)}if(mode!==undefined){s+=getEnumAttr("mode",mode,regexMode)}if(isNaN(ht)||ht<0||ht>2){throw new Error('Property "halftone" is invalid')}if(isNaN(br)||br<0.1||br>10){throw new Error('Property "brightness" is invalid')}imgdata=context.getImageData(x,y,width,height);raster=(mode==this.MODE_GRAY16)?toGrayImage(imgdata,br):toMonoImage(imgdata,ht,br);this.message+="<image"+s+">"+toBase64Binary(raster)+"</image>";return this};ePOSBuilder.prototype.addLogo=function(key1,key2){var s="";s+=getUByteAttr("key1",key1);s+=getUByteAttr("key2",key2);this.message+="<logo"+s+"/>";return this};ePOSBuilder.prototype.addBarcode=function(data,type,hri,font,width,height){var s="";s+=getEnumAttr("type",type,regexBarcode);if(hri!==undefined){s+=getEnumAttr("hri",hri,regexHri)}if(font!==undefined){s+=getEnumAttr("font",font,regexFont)}if(width!==undefined){s+=getUByteAttr("width",width)}if(height!==undefined){s+=getUByteAttr("height",height)}this.message+="<barcode"+s+">"+escapeControl(escapeMarkup(data))+"</barcode>";return this};ePOSBuilder.prototype.addSymbol=function(data,type,level,width,height,size){var s="";s+=getEnumAttr("type",type,regexSymbol);if(level!==undefined){s+=getEnumIntAttr("level",level,regexLevel,0,255)}if(width!==undefined){s+=getUByteAttr("width",width)}if(height!==undefined){s+=getUByteAttr("height",height)}if(size!==undefined){s+=getUShortAttr("size",size)}this.message+="<symbol"+s+">"+escapeControl(escapeMarkup(data))+"</symbol>";return this};ePOSBuilder.prototype.addHLine=function(x1,x2,style){var s="";s+=getUShortAttr("x1",x1);s+=getUShortAttr("x2",x2);if(style!==undefined){s+=getEnumAttr("style",style,regexLine)}this.message+="<hline"+s+"/>";return this};ePOSBuilder.prototype.addVLineBegin=function(x,style){var s="";s+=getUShortAttr("x",x);if(style!==undefined){s+=getEnumAttr("style",style,regexLine)}this.message+="<vline-begin"+s+"/>";return this};ePOSBuilder.prototype.addVLineEnd=function(x,style){var s="";s+=getUShortAttr("x",x);if(style!==undefined){s+=getEnumAttr("style",style,regexLine)}this.message+="<vline-end"+s+"/>";return this};ePOSBuilder.prototype.addPageBegin=function(){this.message+="<page>";return this};ePOSBuilder.prototype.addPageEnd=function(){this.message+="</page>";return this};ePOSBuilder.prototype.addPageArea=function(x,y,width,height){var s="";s+=getUShortAttr("x",x);s+=getUShortAttr("y",y);s+=getUShortAttr("width",width);s+=getUShortAttr("height",height);this.message+="<area"+s+"/>";return this};ePOSBuilder.prototype.addPageDirection=function(dir){var s="";s+=getEnumAttr("dir",dir,regexDirection);this.message+="<direction"+s+"/>";return this};ePOSBuilder.prototype.addPagePosition=function(x,y){var s="";s+=getUShortAttr("x",x);s+=getUShortAttr("y",y);this.message+="<position"+s+"/>";return this};ePOSBuilder.prototype.addPageLine=function(x1,y1,x2,y2,style){var s="";s+=getUShortAttr("x1",x1);s+=getUShortAttr("y1",y1);s+=getUShortAttr("x2",x2);s+=getUShortAttr("y2",y2);if(style!==undefined){s+=getEnumAttr("style",style,regexLine)}this.message+="<line"+s+"/>";return this};ePOSBuilder.prototype.addPageRectangle=function(x1,y1,x2,y2,style){var s="";s+=getUShortAttr("x1",x1);s+=getUShortAttr("y1",y1);s+=getUShortAttr("x2",x2);s+=getUShortAttr("y2",y2);if(style!==undefined){s+=getEnumAttr("style",style,regexLine)}this.message+="<rectangle"+s+"/>";return this};ePOSBuilder.prototype.addRotateBegin=function(){this.message+="<rotate-begin/>";return this};ePOSBuilder.prototype.addRotateEnd=function(){this.message+="<rotate-end/>";return this};ePOSBuilder.prototype.addCut=function(type){var s="";if(type!==undefined){s+=getEnumAttr("type",type,regexCut)}this.message+="<cut"+s+"/>";return this};ePOSBuilder.prototype.addPulse=function(drawer,time){var s="";if(drawer!==undefined){s+=getEnumAttr("drawer",drawer,regexDrawer)}if(time!==undefined){s+=getEnumAttr("time",time,regexPulse)}this.message+="<pulse"+s+"/>";return this};ePOSBuilder.prototype.addSound=function(pattern,repeat,cycle){var s="";if(pattern!==undefined){s+=getEnumAttr("pattern",pattern,regexPattern)}if(repeat!==undefined){s+=getUByteAttr("repeat",repeat)}if(cycle!==undefined){s+=getUShortAttr("cycle",cycle)}this.message+="<sound"+s+"/>";return this};ePOSBuilder.prototype.addLayout=function(type,width,height,margin_top,margin_bottom,offset_cut,offset_label){var s="";s+=getEnumAttr("type",type,regexLayout);if(width!==undefined){s+=getUShortAttr("width",width)}if(height!==undefined){s+=getUShortAttr("height",height)}if(margin_top!==undefined){s+=getShortAttr("margin-top",margin_top)}if(margin_bottom!==undefined){s+=getShortAttr("margin-bottom",margin_bottom)}if(offset_cut!==undefined){s+=getShortAttr("offset-cut",offset_cut)}if(offset_label!==undefined){s+=getShortAttr("offset-label",offset_label)}this.message+="<layout"+s+"/>";return this};ePOSBuilder.prototype.addRecovery=function(){this.message+="<recovery/>";return this};ePOSBuilder.prototype.addReset=function(){this.message+="<reset/>";return this};ePOSBuilder.prototype.addCommand=function(data){this.message+="<command>"+toHexBinary(data)+"</command>";return this};ePOSBuilder.prototype.toString=function(){var s="";if(this.force){s+=getBoolAttr("force",true)}return'<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"'+s+">"+this.message+"</epos-print>"};function toHexBinary(s){var l=s.length,r=new Array(l),i;for(i=0;i<l;i++){r[i]=("0"+s.charCodeAt(i).toString(16)).slice(-2)}return r.join("")}function toBase64Binary(s){var l=s.length,r=new Array((l+2)/3<<2),t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",p=(3-l%3)%3,j=0,i=0,n;s+="\x00\x00";while(i<l){n=s.charCodeAt(i++)<<16|s.charCodeAt(i++)<<8|s.charCodeAt(i++);r[j++]=t.charAt(n>>18&63);r[j++]=t.charAt(n>>12&63);r[j++]=t.charAt(n>>6&63);r[j++]=t.charAt(n&63)}while(p--){r[--j]="="}return r.join("")}function toMonoImage(imgdata,s,g){var x=String.fromCharCode,m8=[[2,130,34,162,10,138,42,170],[194,66,226,98,202,74,234,106],[50,178,18,146,58,186,26,154],[242,114,210,82,250,122,218,90],[14,142,46,174,6,134,38,166],[206,78,238,110,198,70,230,102],[62,190,30,158,54,182,22,150],[254,126,222,94,246,118,214,86]],d=imgdata.data,w=imgdata.width,h=imgdata.height,r=new Array((w+7>>3)*h),n=0,p=0,q=0,t=128,e=new Array(),e1,e2,b,v,f,i,j;if(s==1){i=w;while(i--){e.push(0)}}for(j=0;j<h;j++){e1=0;e2=0;i=0;while(i<w){b=i&7;if(s==0){t=m8[j&7][b]}v=Math.pow(((d[p++]*0.29891+d[p++]*0.58661+d[p++]*0.11448)*d[p]/255+255-d[p++])/255,1/g)*255|0;if(s==1){v+=e[i]+e1>>4;f=v-(v<t?0:255);if(i>0){e[i-1]+=f}e[i]=f*7+e2;e1=f*5;e2=f*3}if(v<t){n|=128>>b}i++;if(b==7||i==w){r[q++]=x(n==16?32:n);n=0}}}return r.join("")}function toGrayImage(imgdata,g){var x=String.fromCharCode,m4=[[0,9,2,11],[13,4,15,6],[3,12,1,10],[16,7,14,5]],thermal=[0,7,13,19,23,27,31,35,40,44,49,52,54,55,57,59,61,62,64,66,67,69,70,70,71,72,73,74,75,76,77,78,79,80,81,82,83,83,84,85,86,86,87,88,88,89,90,90,91,91,92,93,93,94,94,95,96,96,97,98,98,99,99,100,101,101,102,102,103,103,104,104,105,105,106,106,107,107,108,108,109,109,110,110,111,111,112,112,112,113,113,114,114,115,115,116,116,117,117,118,118,119,119,120,120,120,121,121,122,122,123,123,123,124,124,125,125,125,126,126,127,127,127,128,128,129,129,130,130,130,131,131,132,132,132,133,133,134,134,135,135,135,136,136,137,137,137,138,138,139,139,139,140,140,141,141,141,142,142,143,143,143,144,144,145,145,146,146,146,147,147,148,148,148,149,149,150,150,150,151,151,152,152,152,153,153,154,154,155,155,155,156,156,157,157,158,158,159,159,160,160,161,161,161,162,162,163,163,164,164,165,165,166,166,166,167,167,168,168,169,169,170,170,171,171,172,173,173,174,175,175,176,177,178,178,179,180,180,181,182,182,183,184,184,185,186,186,187,189,191,193,195,198,200,202,255],d=imgdata.data,w=imgdata.width,h=imgdata.height,r=new Array((w+1>>1)*h),n=0,p=0,q=0,b,v,v1,i,j;for(j=0;j<h;j++){i=0;while(i<w){b=i&1;v=thermal[Math.pow(((d[p++]*0.29891+d[p++]*0.58661+d[p++]*0.11448)*d[p]/255+255-d[p++])/255,1/g)*255|0];v1=v/17|0;if(m4[j&3][i&3]<v%17){v1++}n|=v1<<((1-b)<<2);i++;if(b==1||i==w){r[q++]=x(n);n=0}}}return r.join("")}function escapeMarkup(s){var markup=/[<>&'"\t\n\r]/g;if(markup.test(s)){s=s.replace(markup,function(c){var r="";switch(c){case"<":r="&lt;";break;case">":r="&gt;";break;case"&":r="&amp;";break;case"'":r="&apos;";break;case'"':r="&quot;";break;case"\t":r="&#9;";break;case"\n":r="&#10;";break;case"\r":r="&#13;";break;default:break}return r})}return s}function escapeControl(s){var control=/[\\\x00-\x1f\x7f-\xff]/g;if(control.test(s)){s=s.replace(control,function(c){return(c=="\\")?"\\\\":"\\x"+("0"+c.charCodeAt(0).toString(16)).slice(-2)})}return s}var regexFont=/^(font_[a-e]|special_[ab])$/,regexAlign=/^(left|center|right)$/,regexColor=/^(none|color_[1-4])$/,regexFeed=/^(peeling|cutting|current_tof|next_tof)$/,regexMode=/^(mono|gray16)$/,regexBarcode=/^(upc_[ae]|[ej]an13|[ej]an8|code(39|93|128)|itf|codabar|gs1_128|gs1_databar_(omnidirectional|truncated|limited|expanded))$/,regexHri=/^(none|above|below|both)$/,regexSymbol=/^(pdf417_(standard|truncated)|qrcode_(model_[12]|micro)|maxicode_mode_[2-6]|gs1_databar_(stacked(_omnidirectional)?|expanded_stacked)|azteccode_(fullrange|compact)|datamatrix_(square|rectangle_(8|12|16)))$/,regexLevel=/^(level_[0-8lmqh]|default)$/,regexLine=/^(thin|medium|thick)(_double)?$/,regexDirection=/^(left_to_right|bottom_to_top|right_to_left|top_to_bottom)$/,regexCut=/^(no_feed|feed|reserve)$/,regexDrawer=/^drawer_[12]$/,regexPulse=/^pulse_[1-5]00$/,regexPattern=/^(none|pattern_(10|[0-9a-e])|error|paper_end)$/,regexLayout=/^(receipt|label)(_bm)?$/;function getEnumAttr(name,value,regex){if(!regex.test(value)){throw new Error('Parameter "'+name+'" is invalid')}return" "+name+'="'+value+'"'}function getBoolAttr(name,value){return" "+name+'="'+!!value+'"'}function getIntAttr(name,value,min,max){if(isNaN(value)||value<min||value>max){throw new Error('Parameter "'+name+'" is invalid')}return" "+name+'="'+value+'"'}function getUByteAttr(name,value){return getIntAttr(name,value,0,255)}function getUShortAttr(name,value){return getIntAttr(name,value,0,65535)}function getShortAttr(name,value){return getIntAttr(name,value,-32768,32767)}function getEnumIntAttr(name,value,regex,min,max){if(!regex.test(value)){if(isNaN(value)||value<min||value>max){throw new Error('Parameter "'+name+'" is invalid')}}return" "+name+'="'+value+'"'}function ePOSPrint(address){this.address=address;this.enabled=false;this.interval=3000;this.timeout=300000;this.status=0;this.battery=0;this.drawerOpenLevel=0;this.onreceive=null;this.onerror=null;this.onstatuschange=null;this.ononline=null;this.onoffline=null;this.onpoweroff=null;this.oncoverok=null;this.oncoveropen=null;this.onpaperok=null;this.onpaperend=null;this.onpapernearend=null;this.ondrawerclosed=null;this.ondraweropen=null;this.onbatterylow=null;this.onbatteryok=null;this.onbatterystatuschange=null;this.ASB_NO_RESPONSE=1;this.ASB_PRINT_SUCCESS=2;this.ASB_DRAWER_KICK=4;this.ASB_BATTERY_OFFLINE=4;this.ASB_OFF_LINE=8;this.ASB_COVER_OPEN=32;this.ASB_PAPER_FEED=64;this.ASB_WAIT_ON_LINE=256;this.ASB_PANEL_SWITCH=512;this.ASB_MECHANICAL_ERR=1024;this.ASB_AUTOCUTTER_ERR=2048;this.ASB_UNRECOVER_ERR=8192;this.ASB_AUTORECOVER_ERR=16384;this.ASB_RECEIPT_NEAR_END=131072;this.ASB_RECEIPT_END=524288;this.ASB_BUZZER=16777216;this.ASB_WAIT_REMOVE_LABEL=16777216;this.ASB_NO_LABEL=67108864;this.ASB_SPOOLER_IS_STOPPED=2147483648;this.DRAWER_OPEN_LEVEL_LOW=0;this.DRAWER_OPEN_LEVEL_HIGH=1}ePOSPrint.prototype=new ePOSBuilder();ePOSPrint.prototype.constructor=ePOSPrint;ePOSPrint.prototype.open=function(){if(!this.enabled){this.enabled=true;this.status=0;this.battery=0;this.send()}};ePOSPrint.prototype.close=function(){this.enabled=false;if(this.intervalid){clearTimeout(this.intervalid);delete this.intervalid}if(this.intervalxhr){this.intervalxhr.abort();delete this.intervalxhr}};ePOSPrint.prototype.getPrintJobStatus=function(printjobid){this.send(printjobid)};ePOSPrint.prototype.send=function(request,printjobid){var args=arguments.length,epos=this,address=epos.address,soap,xhr,tid,res,success,code,status,battery;if(!/^<epos/.test(request)){if(args<2){printjobid=request;request=new ePOSBuilder().toString()}else{address=request;request=printjobid;printjobid=arguments[2]}}soap='<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';if(printjobid){soap+='<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>'+printjobid+"</printjobid></parameter></s:Header>"}soap+="<s:Body>"+request+"</s:Body></s:Envelope>";if(window.XMLHttpRequest){xhr=new XMLHttpRequest();if(!("withCredentials" in xhr)&&window.XDomainRequest){xhr=new XDomainRequest();xhr.open("POST",address,true);xhr.onload=function(){res=xhr.responseText;if(/response/.test(res)){success=/success\s*=\s*"\s*(1|true)\s*"/.test(res);code=res.match(/code\s*=\s*"\s*(\S*)\s*"/)?RegExp.$1:"";status=res.match(/status\s*=\s*"\s*(\d+)\s*"/)?parseInt(RegExp.$1):0;battery=res.match(/battery\s*=\s*"\s*(\d+)\s*"/)?parseInt(RegExp.$1):0;printjobid=res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/)?RegExp.$1:"";if(args>0){fireReceiveEvent(epos,success,code,status,battery,printjobid)}else{fireStatusEvent(epos,status,battery)}}else{if(args>0){fireErrorEvent(epos,0,xhr.responseText)}else{fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}}if(args<1){updateStatus(epos)}};xhr.onerror=function(){if(args>0){fireErrorEvent(epos,0,xhr.responseText)}else{fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0);updateStatus(epos)}};xhr.onprogress=function(){};xhr.ontimeout=xhr.onerror;xhr.timeout=epos.timeout;xhr.send(soap)}else{xhr.open("POST",address,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(tid);if(xhr.status==200&&xhr.responseXML){res=xhr.responseXML.getElementsByTagName("response");if(res.length>0){success=/^(1|true)$/.test(res[0].getAttribute("success"));code=res[0].hasAttribute("code")?res[0].getAttribute("code"):"";status=res[0].hasAttribute("status")?parseInt(res[0].getAttribute("status")):0;battery=res[0].hasAttribute("battery")?parseInt(res[0].getAttribute("battery")):0;res=xhr.responseXML.getElementsByTagName("printjobid");printjobid=res.length>0?res[0].textContent:"";if(args>0){fireReceiveEvent(epos,success,code,status,battery,printjobid)}else{fireStatusEvent(epos,status,battery)}}else{if(args>0){fireErrorEvent(epos,xhr.status,xhr.responseText)}else{fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}}}else{if(args>0){fireErrorEvent(epos,xhr.status,xhr.responseText)}else{fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}}if(args<1){updateStatus(epos)}}};tid=setTimeout(function(){xhr.abort()},epos.timeout);xhr.send(soap)}if(args<1){epos.intervalxhr=xhr}}else{throw new Error("XMLHttpRequest is not supported")}};function fireReceiveEvent(epos,success,code,status,battery,printjobid){if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}if(epos.onreceive){epos.onreceive({success:success,code:code,status:status,battery:battery,printjobid:printjobid})}}function fireStatusEvent(epos,status,battery){var diff,difb;if(status==0||status==epos.ASB_NO_RESPONSE){status=epos.status|epos.ASB_NO_RESPONSE}diff=epos.status==0?~0:epos.status^status;difb=epos.status==0?~0:epos.battery^battery;epos.status=status;epos.battery=battery;if(diff&&epos.onstatuschange){epos.onstatuschange(status)}if(difb&&epos.onbatterystatuschange){epos.onbatterystatuschange(battery)}if(diff&(epos.ASB_NO_RESPONSE|epos.ASB_OFF_LINE)){if(status&epos.ASB_NO_RESPONSE){if(epos.onpoweroff){epos.onpoweroff()}}else{if(status&epos.ASB_OFF_LINE){if(epos.onoffline){epos.onoffline()}}else{if(epos.ononline){epos.ononline()}}}}if(diff&epos.ASB_COVER_OPEN){if(status&epos.ASB_NO_RESPONSE){}else{if(status&epos.ASB_COVER_OPEN){if(epos.oncoveropen){epos.oncoveropen()}}else{if(epos.oncoverok){epos.oncoverok()}}}}if(diff&(epos.ASB_RECEIPT_END|epos.ASB_RECEIPT_NEAR_END)){if(status&epos.ASB_NO_RESPONSE){}else{if(status&epos.ASB_RECEIPT_END){if(epos.onpaperend){epos.onpaperend()}}else{if(status&epos.ASB_RECEIPT_NEAR_END){if(epos.onpapernearend){epos.onpapernearend()}}else{if(epos.onpaperok){epos.onpaperok()}}}}}if(diff&epos.ASB_DRAWER_KICK){if(status&epos.ASB_NO_RESPONSE){}else{if(status&epos.ASB_DRAWER_KICK){if(epos.drawerOpenLevel==epos.DRAWER_OPEN_LEVEL_HIGH){if(epos.ondraweropen){epos.ondraweropen()}}else{if(epos.ondrawerclosed){epos.ondrawerclosed()}}if(epos.onbatterylow){epos.onbatterylow()}}else{if(epos.drawerOpenLevel==epos.DRAWER_OPEN_LEVEL_HIGH){if(epos.ondrawerclosed){epos.ondrawerclosed()}}else{if(epos.ondraweropen){epos.ondraweropen()}}if(epos.onbatteryok){epos.onbatteryok()}}}}}function fireErrorEvent(epos,status,responseText){if(epos.onerror){epos.onerror({status:status,responseText:responseText})}}function updateStatus(epos){var delay=epos.interval;if(epos.enabled){if(isNaN(delay)||delay<1000){delay=3000}epos.intervalid=setTimeout(function(){delete epos.intervalid;if(epos.enabled){epos.send()}},delay)}delete epos.intervalxhr}function CanvasPrint(address){this.address=address;this.mode="mono";this.halftone=0;this.brightness=1;this.align="left";this.color="color_1";this.paper="receipt";this.feed="current_tof";this.cut=false;this.layout=null;this.ALIGN_LEFT="left";this.ALIGN_CENTER="center";this.ALIGN_RIGHT="right";this.COLOR_NONE="none";this.COLOR_1="color_1";this.COLOR_2="color_2";this.COLOR_3="color_3";this.COLOR_4="color_4";this.FEED_PEELING="peeling";this.FEED_CUTTING="cutting";this.FEED_CURRENT_TOF="current_tof";this.FEED_NEXT_TOF="next_tof";this.HALFTONE_DITHER=0;this.HALFTONE_ERROR_DIFFUSION=1;this.HALFTONE_THRESHOLD=2;this.MODE_MONO="mono";this.MODE_GRAY16="gray16";this.PAPER_RECEIPT="receipt";this.PAPER_RECEIPT_BM="receipt_bm";this.PAPER_LABEL="label";this.PAPER_LABEL_BM="label_bm";this.connectionObj=null}CanvasPrint.prototype=new ePOSPrint();CanvasPrint.prototype.constructor=CanvasPrint;CanvasPrint.prototype.setConnectionObject=function(connectionObj){this.connectionObj=connectionObj};CanvasPrint.prototype.print=function(){var args=arguments.length;var address=this.address,layout=this.layout,paper=this.paper;var canvas=arguments[0],cut=this.cut,mode=this.mode,printjobid=undefined;switch(args){case 2:printjobid=arguments[1];break;case 4:printjobid=arguments[3];case 3:cut=arguments[1];mode=arguments[2];break}if((typeof(canvas)=="undefined")||(canvas==null)){throw new Error("Canvas is not supported")}if(!canvas.getContext){throw new Error("Canvas is not supported")}if(layout){this.addLayout(paper,layout.width,layout.height,layout.margin_top,layout.margin_bottom,layout.offset_cut,layout.offset_label)}if(paper!=this.PAPER_RECEIPT){this.addFeedPosition(this.FEED_CURRENT_TOF);if(layout){this.addFeedPosition(this.FEED_NEXT_TOF)}}this.addTextAlign(this.align);this.addImage(canvas.getContext("2d"),0,0,canvas.width,canvas.height,this.color,mode);if(paper!=this.PAPER_RECEIPT){this.addFeedPosition(this.feed);if(cut){this.addCut(this.CUT_NO_FEED)}}else{if(cut){this.addCut(this.CUT_FEED)}}this.send(address,this.toString(),printjobid)};CanvasPrint.prototype.recover=function(){this.force=true;this.addRecovery();this.send(this.address,this.toString())};CanvasPrint.prototype.reset=function(){this.addReset();this.send(this.address,this.toString())};if(!window.epson){window.epson={}}window.epson.ePOSBuilder=ePOSBuilder;window.epson.ePOSPrint=ePOSPrint;window.epson.CanvasPrint=CanvasPrint;function POSKeyboard(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}POSKeyboard.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},client_onkeypress:function(data){try{if(this.onkeypress==null){return}this.onkeypress(data)}catch(e){}return},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,eventReq,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function Printer(deviceID,isCrypto,ePOSDeviceContext){this.deviceID=deviceID;this.isCrypto=isCrypto;this.ePosDev=ePOSDeviceContext;this.timeout=10000}Printer.prototype=new CanvasPrint();Printer.prototype.finalize=function(){this.stopMonitor()};Printer.prototype.toString=function(){var str=ePOSBuilder.prototype.toString.apply(this);return str};Printer.prototype.addFeedUnit=function(unit){try{ePOSBuilder.prototype.addFeedUnit.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addFeedLine=function(line){try{ePOSBuilder.prototype.addFeedLine.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addFeed=function(unit){try{ePOSBuilder.prototype.addFeed.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addFeedPosition=function(line){try{ePOSBuilder.prototype.addFeedPosition.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addText=function(text){try{ePOSBuilder.prototype.addText.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextLang=function(lang){try{ePOSBuilder.prototype.addTextLang.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextAlign=function(align){try{ePOSBuilder.prototype.addTextAlign.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextRotate=function(rotate){try{ePOSBuilder.prototype.addTextRotate.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextLineSpace=function(linespc){try{ePOSBuilder.prototype.addTextLineSpace.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextFont=function(font){try{ePOSBuilder.prototype.addTextFont.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextSmooth=function(smooth){try{ePOSBuilder.prototype.addTextSmooth.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextDouble=function(dw,dh){try{ePOSBuilder.prototype.addTextDouble.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextSize=function(width,height){try{ePOSBuilder.prototype.addTextSize.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextStyle=function(reverse,ul,em,color){try{ePOSBuilder.prototype.addTextStyle.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextPosition=function(x){try{ePOSBuilder.prototype.addTextPosition.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addTextVPosition=function(y){try{ePOSBuilder.prototype.addTextVPosition.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addImage=function(context,x,y,width,height,color,mode){try{ePOSBuilder.prototype.addImage.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addLogo=function(key1,key2){try{ePOSBuilder.prototype.addLogo.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addBarcode=function(barCodeData,type,hri,font,width,height){try{ePOSBuilder.prototype.addBarcode.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addSymbol=function(symbolData,type,level,width,height,size){try{ePOSBuilder.prototype.addSymbol.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addCommand=function(data){try{ePOSBuilder.prototype.addCommand.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addHLine=function(x1,x2,style){try{ePOSBuilder.prototype.addHLine.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addVLineBegin=function(x,style){try{ePOSBuilder.prototype.addVLineBegin.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addVLineEnd=function(x,style){try{ePOSBuilder.prototype.addVLineEnd.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPageBegin=function(){try{ePOSBuilder.prototype.addPageBegin.apply(this)}catch(e){throw e}return this};Printer.prototype.addPageEnd=function(){try{ePOSBuilder.prototype.addPageEnd.apply(this)}catch(e){throw e}return this};Printer.prototype.addPageArea=function(x,y,width,height){try{ePOSBuilder.prototype.addPageArea.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPageDirection=function(dir){try{ePOSBuilder.prototype.addPageDirection.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPagePosition=function(x,y){try{ePOSBuilder.prototype.addPagePosition.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPageLine=function(x1,y1,x2,y2,style){try{ePOSBuilder.prototype.addPageLine.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPageRectangle=function(x1,y1,x2,y2,style){try{ePOSBuilder.prototype.addPageRectangle.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addRotateBegin=function(){try{ePOSBuilder.prototype.addRotateBegin.apply(this)}catch(e){throw e}return this};Printer.prototype.addRotateEnd=function(){try{ePOSBuilder.prototype.addRotateEnd.apply(this)}catch(e){throw e}return this};Printer.prototype.addCut=function(type){try{ePOSBuilder.prototype.addCut.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addPulse=function(drawer,time){try{ePOSBuilder.prototype.addPulse.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addSound=function(pattern,repeat,cycle){try{ePOSBuilder.prototype.addSound.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.addLayout=function(type,width,height,margin_top,margin_bottom,offset_cut,offset_label){try{ePOSBuilder.prototype.addLayout.apply(this,arguments)}catch(e){throw e}return this};Printer.prototype.setXmlString=function(xml){this.message=xml};Printer.prototype.getXmlString=function(){return this.message};Printer.prototype.getPrintJobStatus=function(printjobid){this.setXmlString("");this.send(printjobid)};Printer.prototype.send=function(printjobid){var sq=-1;if((!this.ePosDev.eposprint)&&(this.connectionObj.isUsableDeviceIF())){try{var data={type:"print",timeout:this.timeout,printdata:this.toString()};switch(arguments.length){case 0:data.printdata=this.toString();break;case 1:data.printdata=this.toString();data.printjobid=printjobid;break;case 2:case 3:data.printdata=arguments[1];data.printjobid=arguments[2]}var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}this.force=false;this.setXmlString("")}catch(e){sq=-1}}else{var self=this,address=this.connectionObj.getAddressWithProtocol()+"/cgi-bin/epos/service.cgi?devid="+this.deviceID+"&timeout="+this.timeout,soap,xhr,tid,res,success,code,status,battery;soap='<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">';if(printjobid){soap+='<s:Header><parameter xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><printjobid>'+printjobid+"</printjobid></parameter></s:Header>"}soap+="<s:Body>"+this.toString()+"</s:Body></s:Envelope>";if(window.XMLHttpRequest){xhr=new XMLHttpRequest();if(!("withCredentials" in xhr)&&window.XDomainRequest){xhr=new XDomainRequest();xhr.open("POST",address,true);xhr.onload=function(){res=xhr.responseText;if(/response/.test(res)){success=/success\s*=\s*"\s*(1|true)\s*"/.test(res);code=res.match(/code\s*=\s*"\s*(\S*)\s*"/)?RegExp.$1:"";status=res.match(/status\s*=\s*"\s*(\d+)\s*"/)?parseInt(RegExp.$1):0;battery=res.match(/battery\s*=\s*"\s*(\d+)\s*"/)?parseInt(RegExp.$1):0;printjobid=res.match(/<printjobid>\s*(\S*)\s*<\/printjobid>/)?RegExp.$1:"";self.fireReceiveEvent(success,code,status,battery,printjobid,0)}else{self.fireErrorEvent(0,xhr.responseText,0)}};xhr.onerror=function(){self.fireErrorEvent(0,xhr.responseText,0)};xhr.onprogress=function(){};xhr.ontimeout=xhr.onerror;xhr.timeout=self.timeout;xhr.send(soap)}else{xhr.open("POST",address,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(tid);if(xhr.status==200&&xhr.responseXML){res=xhr.responseXML.getElementsByTagName("response");if(res.length>0){success=/^(1|true)$/.test(res[0].getAttribute("success"));code=res[0].hasAttribute("code")?res[0].getAttribute("code"):"";status=res[0].hasAttribute("status")?parseInt(res[0].getAttribute("status")):0;battery=res[0].hasAttribute("battery")?parseInt(res[0].getAttribute("battery")):0;res=xhr.responseXML.getElementsByTagName("printjobid");printjobid=res.length>0?res[0].textContent:"";self.fireReceiveEvent(success,code,status,battery,printjobid,0)}else{self.fireErrorEvent(xhr.status,xhr.responseText,0)}}else{self.fireErrorEvent(xhr.status,xhr.responseText,0)}}};tid=setTimeout(function(){xhr.abort()},this.timeout);xhr.send(soap)}this.setXmlString("")}else{throw new Error("XMLHttpRequest is not supported")}sq=0}return sq};Printer.prototype.client_onxmlresult=function(res,sq){if(res){var xml=res.resultdata;var success=/success\s*=\s*"\s*(1|true)\s*"/.test(xml);xml.match(/code\s*=\s*"\s*(\S*)\s*"/);var code=RegExp.$1;xml.match(/status\s*=\s*"\s*(\d+)\s*"/);var status=parseInt(RegExp.$1);xml.match(/battery\s*=\s*"\s*(\d+)\s*"/);var battery=parseInt(RegExp.$1);this.fireReceiveEvent(success,code,status,battery,res.printjobid,sq)}else{this.fireErrorEvent(0,this.ASB_NO_RESPONSE,sq)}};Printer.prototype.startMonitor=function(){var result=false;var address=this.connectionObj.getAddressWithProtocol()+"/cgi-bin/epos/service.cgi?devid="+this.deviceID+"&timeout=10000";try{if(!this.enabled){this.address=address;this.enabled=true;this.status=this.ASB_DRAWER_KICK;this.sendStartMonitorCommand()}result=true}catch(e){throw e}return result};Printer.prototype.sendStartMonitorCommand=function(){var self=this;var address=this.address;var request=new ePOSBuilder().toString();var soap='<?xml version="1.0" encoding="utf-8"?><s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body>'+request+"</s:Body></s:Envelope>";var epos=this;if(window.XDomainRequest){var xdr=new XDomainRequest();xdr.open("POST",address,true);xdr.onload=function(){var res=xdr.responseText;if(/response/.test(res)){var success=/success\s*=\s*"\s*(1|true)\s*"/.test(res);res.match(/code\s*=\s*"\s*(\S*)\s*"/);var code=RegExp.$1;res.match(/status\s*=\s*"\s*(\d+)\s*"/);var status=parseInt(RegExp.$1);res.match(/battery\s*=\s*"\s*(\d+)\s*"/);var battery=parseInt(RegExp.$1);self.fireStatusEvent(epos,status,battery)}else{self.fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}self.updateStatus(epos)};xdr.onerror=function(){self.fireStatusEvent(epos,epos.ASB_NO_RESPONSE);self.updateStatus(epos)};xdr.onprogress=function(){};xdr.ontimeout=xdr.onerror;xdr.send(soap)}else{if(window.XMLHttpRequest){var xhr=new XMLHttpRequest();xhr.open("POST",address,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200&&xhr.responseXML){var res=xhr.responseXML.getElementsByTagName("response");if(res.length>0){var success=/^(1|true)$/.test(res[0].getAttribute("success"));var code=res[0].getAttribute("code");var status=parseInt(res[0].getAttribute("status"));var battery=res[0].hasAttribute("battery")?parseInt(res[0].getAttribute("battery")):0;self.fireStatusEvent(epos,status,battery)}else{self.fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}}else{self.fireStatusEvent(epos,epos.ASB_NO_RESPONSE,0)}self.updateStatus(epos)}};xhr.send(soap)}else{throw new Error("XMLHttpRequest is not supported")}}};Printer.prototype.stopMonitor=function(){var result=false;try{this.enabled=false;if(this.timeoutid){clearTimeout(this.timeoutid);delete this.timeoutid}result=true}catch(e){throw e}return result};Printer.prototype.fireReceiveEvent=function(success,code,status,battery,printjobid,sq){delete this.isPrint;if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}if(this.onreceive){this.onreceive({success:success,code:code,status:status,battery:battery,printjobid:printjobid},sq)}};Printer.prototype.fireErrorEvent=function(status,responseText,sq){if(this.onerror){this.onerror({status:status,responseText:responseText},sq)}this.ePosDev.cleanup()};Printer.prototype.fireStatusEvent=function(epos,status,battery){if(status==0||status==this.ASB_NO_RESPONSE){status=this.status|this.ASB_NO_RESPONSE}var diff=this.status==this.ASB_DRAWER_KICK?~0:this.status^status;var difb=this.status==0?~0:this.battery^battery;this.status=status;this.battery=battery;if(diff&&this.onstatuschange){this.onstatuschange(status)}if(difb&&this.onbatterystatuschange){this.onbatterystatuschange(battery)}if(diff&(this.ASB_NO_RESPONSE|this.ASB_OFF_LINE)){if(status&this.ASB_NO_RESPONSE){if(this.onpoweroff){this.onpoweroff()}}else{if(status&this.ASB_OFF_LINE){if(this.onoffline){this.onoffline()}}else{if(this.ononline){this.ononline()}}}}if(diff&this.ASB_COVER_OPEN){if(status&this.ASB_NO_RESPONSE){}else{if(status&this.ASB_COVER_OPEN){if(this.oncoveropen){this.oncoveropen()}}else{if(this.oncoverok){this.oncoverok()}}}}if(diff&(this.ASB_RECEIPT_END|this.ASB_RECEIPT_NEAR_END)){if(status&this.ASB_NO_RESPONSE){}else{if(status&this.ASB_RECEIPT_END){if(this.onpaperend){this.onpaperend()}}else{if(status&this.ASB_RECEIPT_NEAR_END){if(this.onpapernearend){this.onpapernearend()}}else{if(this.onpaperok){this.onpaperok()}}}}}if(diff&this.ASB_DRAWER_KICK){if(status&this.ASB_NO_RESPONSE){}else{if(status&this.ASB_DRAWER_KICK){if(this.drawerOpenLevel==this.DRAWER_OPEN_LEVEL_HIGH){if(this.ondraweropen){this.ondraweropen()}}else{if(this.ondrawerclosed){this.ondrawerclosed()}}if(this.onbatterylow){this.onbatterylow()}}else{if(this.drawerOpenLevel==this.DRAWER_OPEN_LEVEL_HIGH){if(this.ondrawerclosed){this.ondrawerclosed()}}else{if(this.ondraweropen){this.ondraweropen()}}if(this.onbatteryok){this.onbatteryok()}}}}};Printer.prototype.updateStatus=function(){var self=this;if(this.enabled){var delay=this.interval;if(isNaN(delay)||delay<1000){delay=3000}this.timeoutid=setTimeout(function(){delete self.timeoutid;if(self.enabled){self.sendStartMonitorCommand()}},delay)}};Printer.prototype.print=function(canvas,cut,mode,printjobid){try{CanvasPrint.prototype.print.apply(this,arguments)}catch(e){throw e}};Printer.prototype.reset=function(){try{CanvasPrint.prototype.reset.apply(this,arguments)}catch(e){throw e}};Printer.prototype.recover=function(){try{CanvasPrint.prototype.recover.apply(this,arguments)}catch(e){throw e}};function HybridPrinter(deviceID,isCrypto,ePOSDeviceContext){this.deviceID=deviceID;this.isCrypto=isCrypto;this.ePosDev=ePOSDeviceContext;this.connectionObj=null;this.ReceiptPrinter;this.SlipPrinter;this.EndorsePrinter;this.MICRReader;this.force=false;this.onstatuschange;this.ononline;this.onoffline;this.onpoweroff;this.oncoveropen;this.onpaperok;this.onpapernearend;this.onpaperend;this.ondrawerclosed;this.ondraweropen;this.ASB_NO_RESPONSE=1;this.ASB_PRINT_SUCCESS=2;this.ASB_DRAWER_KICK=4;this.ASB_OFF_LINE=8;this.ASB_COVER_OPEN=32;this.ASB_PAPER_FEED=64;this.ASB_WAIT_ON_LINE=256;this.ASB_PANEL_SWITCH=512;this.ASB_MECHANICAL_ERR=1024;this.ASB_AUTOCUTTER_ERR=2048;this.ASB_UNRECOVER_ERR=8192;this.ASB_AUTORECOVER_ERR=16384;this.ASB_RECEIPT_NEAR_END=131072;this.ASB_RECEIPT_END=524288;this.ASB_TOF_NOPAPER=2097152;this.ASB_BOF_NOPAPER=4194304;this.ASB_SLIP_NO_SELECT=16777216;this.ASB_SLIP_IMPOSSIBLE_PRINT=33554432;this.ASB_SPOOLER_IS_STOPPED=2147483648;this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="ERROR_DEVICE_NOT_FOUND";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="ERROR_COVER_OPEN";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_AUTOMATICAL="ERROR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="ERROR_UNRECOVERABLE";this.ERROR_BADPORT="ERROR_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.init(deviceID)}HybridPrinter.prototype={init:function(deviceID){var obj=this;obj.deviceID=deviceID;obj.ReceiptPrinter=new ReceiptPrinter(this);obj.SlipPrinter=new SlipPrinter(this);obj.EndorsePrinter=new EndorsePrinter(this);obj.MICRReader=new MICRReader(this);obj.ReceiptPrinter.onstatuschange=function(status){if(obj.onstatuschange!=null){obj.onstatuschange(status)}};obj.ReceiptPrinter.ononline=function(){if(obj.ononline!=null){obj.ononline()}};obj.ReceiptPrinter.onoffline=function(){if(obj.onoffline!=null){obj.onoffline()}};obj.ReceiptPrinter.onpoweroff=function(){if(obj.onpoweroff!=null){obj.onpoweroff()}};obj.ReceiptPrinter.oncoveropen=function(){if(obj.oncoveropen!=null){obj.oncoveropen()}};obj.ReceiptPrinter.onpaperok=function(){if(obj.onpaperok!=null){obj.onpaperok()}};obj.ReceiptPrinter.onpapernearend=function(){if(obj.onpapernearend!=null){obj.onpapernearend()}};obj.ReceiptPrinter.onpaperend=function(){if(obj.onpaperend!=null){obj.onpaperend()}};obj.ReceiptPrinter.ondrawerclosed=function(){if(obj.ondrawerclosed!=null){obj.ondrawerclosed()}};obj.ReceiptPrinter.ondraweropen=function(){if(obj.ondraweropen!=null){obj.ondraweropen()}}},setConnectionObject:function(connectionObj){this.connectionObj=connectionObj;this.ReceiptPrinter.setConnectionObject(this.connectionObj)},lock:function(){var data={type:"lock"};return this.send(data)},unlock:function(){var data={type:"unlock"};return this.send(data)},eject:function(){var data={type:"eject"};return this.send(data)},recover:function(){return this.ReceiptPrinter.recover()},reset:function(){this.ReceiptPrinter.force=this.force;var ret=this.ReceiptPrinter.reset();this.force=false;return ret},startMonitor:function(){return this.ReceiptPrinter.startMonitor()},stopMonitor:function(){return this.ReceiptPrinter.stopMonitor()},client_onreceive:function(res,sq){switch(res.eventtype){case"slipprint":case"slipcancel":this.SlipPrinter.fireOnReceive(res,sq);break;case"endorseprint":case"endorsecancel":this.EndorsePrinter.fireOnReceive(res,sq);break;case"micrread":case"micrcleaning":case"micrcancel":this.MICRReader.fireOnReceive(res,sq);break;case"print":var tmp=res;tmp.eventtype=this.ReceiptPrinter.methodName;this.fireOnReceive(tmp,sq);break;default:this.fireOnReceive(res,sq);break}},client_onxmlresult:function(res,sq){this.ReceiptPrinter.fireOnReceive(res,sq)},fireOnReceive:function(res,sq){if(this.onreceive==null){return}if(res==null){return}this.onreceive({eventtype:res.eventtype,success:res.success,code:res.code,status:res.status},sq)},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;return this.send(eventReq)},send:function(data){var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function ReceiptPrinter(parent){this.parent=parent;this.methodName="";this.deviceID=this.parent.deviceID;this.ePosDev=this.parent.ePosDev;this.connectionObj=null;this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="DeviceNotFound";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="EPTR_COVER_OPEN";this.ERROR_TIMEOUT="EX_TIMEOUT";this.ERROR_AUTOMATICAL="EPTR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="EPTR_UNRECOVERABLE";this.ERROR_BADPORT="EX_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.EPTR_CUTTER="EPTR_CUTTER";this.EPTR_MECHANICAL="EPTR_MECHANICAL";this.EPTR_REC_EMPTY="EPTR_REC_EMPTY";this.EPTR_SCHEMAERROR="SchemaError";this.EPTR_PRINT_SYSTEM_ERROR="PrintSystemError"}ReceiptPrinter.prototype.setConnectionObject=function(connectionObj){this.connectionObj=connectionObj};ReceiptPrinter.prototype=new Printer();ReceiptPrinter.prototype.send=function(){if(this.methodName==""){this.methodName="send"}return Printer.prototype.send.apply(this,arguments)};ReceiptPrinter.prototype.print=function(canvas,cut,mode){this.methodName="print";return Printer.prototype.print.apply(this,arguments)};ReceiptPrinter.prototype.recover=function(){this.methodName="recover";return Printer.prototype.recover.apply(this,arguments)};ReceiptPrinter.prototype.reset=function(){this.methodName="reset";return Printer.prototype.reset.apply(this,arguments)};ReceiptPrinter.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}var eventtype=this.methodName;var success="false";var code="";var status=this.ASB_NO_RESPONSE;if(res){var xml=res.resultdata;success=/success\s*=\s*"\s*(1|true)\s*"/.test(xml);xml.match(/code\s*=\s*"\s*(\S*)\s*"/);code=RegExp.$1;if(code==""){code=(success)?"SUCCESS":"ERROR_DEVICE_NOT_FOUND"}xml.match(/status\s*=\s*"\s*(\d+)\s*"/);status=parseInt(RegExp.$1)}if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}this.onreceive({eventtype:eventtype,success:success,code:code,status:status},sq);this.methodName=""};function SlipPrinter(parent){this.parent=parent;this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="ERROR_DEVICE_NOT_FOUND";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="ERROR_COVER_OPEN";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_AUTOMATICAL="ERROR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="ERROR_UNRECOVERABLE";this.ERROR_BADPORT="ERROR_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.EPTR_CUTTER="EPTR_CUTTER";this.EPTR_MECHANICAL="EPTR_MECHANICAL";this.EPTR_REC_EMPTY="EPTR_REC_EMPTY";this.EPTR_SCHEMAERROR="EPTR_SCHEMAERROR";this.EPTR_PRINT_SYSTEM_ERROR="EPTR_PRINT_SYSTEM_ERROR"}SlipPrinter.prototype=new ePOSBuilder();SlipPrinter.prototype.timeout=60000;SlipPrinter.prototype.send=function(){var xml=(arguments.length<1)?this.toString():arguments[1];var data={type:"slipprint",timeout:this.timeout,printdata:xml};var sequence=this.parent.send(data);this.setXmlString("");return sequence};SlipPrinter.prototype.setXmlString=function(xml){this.message=xml};SlipPrinter.prototype.getXmlString=function(){return this.message};SlipPrinter.prototype.cancel=function(){var data={type:"slipcancel"};return this.parent.send(data)};SlipPrinter.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"slipprint":eventtype="send";break;case"slipcancel":eventtype="cancel";break;default:break}var code=res.code;if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}this.onreceive({eventtype:eventtype,success:res.success,code:code,status:res.status},sq)};function EndorsePrinter(parent){this.parent=parent;this.mode40cpl=false;this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="ERROR_DEVICE_NOT_FOUND";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="ERROR_COVER_OPEN";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_AUTOMATICAL="ERROR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="ERROR_UNRECOVERABLE";this.ERROR_BADPORT="ERROR_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.EPTR_CUTTER="EPTR_CUTTER";this.EPTR_MECHANICAL="EPTR_MECHANICAL";this.EPTR_REC_EMPTY="EPTR_REC_EMPTY";this.EPTR_SCHEMAERROR="EPTR_SCHEMAERROR";this.EPTR_PRINT_SYSTEM_ERROR="EPTR_PRINT_SYSTEM_ERROR"}EndorsePrinter.prototype=new ePOSBuilder();EndorsePrinter.prototype.timeout=60000;EndorsePrinter.prototype.send=function(){var xml=(arguments.length<1)?this.toString():arguments[1];var data={type:"endorseprint",is40cplmode:this.mode40cpl,timeout:this.timeout,printdata:xml};var sequence=this.parent.send(data);this.setXmlString("");return sequence};EndorsePrinter.prototype.setXmlString=function(xml){this.message=xml};EndorsePrinter.prototype.getXmlString=function(){return this.message};EndorsePrinter.prototype.cancel=function(){var data={type:"endorsecancel"};return this.parent.send(data)};EndorsePrinter.prototype.enable40cplmode=function(flag){this.mode40cpl=flag};EndorsePrinter.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"endorseprint":eventtype="send";break;case"endorsecancel":eventtype="cancel";break;default:break}var code=res.code;if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}this.onreceive({eventtype:eventtype,success:res.success,code:code,status:res.status},sq)};function MICRReader(parent){this.parent=parent;this.timeout=60000;this.FONT_E13B="MICR_E13B";this.FONT_CMC7="MICR_CMC7";this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="ERROR_DEVICE_NOT_FOUND";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="ERROR_COVER_OPEN";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_AUTOMATICAL="ERROR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="ERROR_UNRECOVERABLE";this.ERROR_BADPORT="ERROR_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.EMICR_ILLEGAL_LENGTH="EMICR_ILLEGAL_LENGTH";this.EMICR_NO_MICR="EMICR_NO_MICR";this.EMICR_RECOGNITION="EMICR_RECOGNITION";this.EMICR_READ="EMICR_READ";this.EMICR_NOISE_DETECTED="EMICR_NOISE_DETECTED";this.EMICR_COVER_OPENED="EMICR_COVER_OPENED";this.EMICR_PAPER_JAM="EMICR_PAPER_JAM"}MICRReader.prototype.read=function(ignoreerror,font){var data={type:"micrread",ignoreerror:ignoreerror,font:font,timeout:this.timeout};return this.parent.send(data)};MICRReader.prototype.cleaning=function(){var data={type:"micrcleaning",timeout:this.timeout};return this.parent.send(data)};MICRReader.prototype.cancel=function(){var data={type:"micrcancel"};return this.parent.send(data)};MICRReader.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"micrread":eventtype="read";break;case"micrcleaning":eventtype="cleaning";break;case"micrcancel":eventtype="cancel";break;default:break}var code=res.code;if(code=="EX_ENPC_TIMEOUT"){code="ERROR_DEVICE_BUSY"}this.onreceive({eventtype:eventtype,success:res.success,code:code,status:res.status,data:res.data},sq)};function HybridPrinter2(deviceID,isCrypto,ePOSDeviceContext){this.deviceID=deviceID;this.isCrypto=isCrypto;this.ePosDev=ePOSDeviceContext;this.connectionObj=null;this.ReceiptPrinter=null;this.SlipPrinter2=null;this.ValidationPrinter=null;this.EndorsePrinter2=null;this.MICRReader2=null;this.currentPrinter=null;this.isMicrMode=false;this.FONT_A="font_a";this.FONT_B="font_b";this.FONT_C="font_c";this.FONT_D="font_d";this.FONT_E="font_e";this.FONT_SPECIAL_A="special_a";this.FONT_SPECIAL_B="special_b";this.ALIGN_LEFT="left";this.ALIGN_CENTER="center";this.ALIGN_RIGHT="right";this.COLOR_NONE="none";this.COLOR_1="color_1";this.COLOR_2="color_2";this.COLOR_3="color_3";this.COLOR_4="color_4";this.FEED_PEELING="peeling";this.FEED_CUTTING="cutting";this.FEED_CURRENT_TOF="current_tof";this.FEED_NEXT_TOF="next_tof";this.MODE_MONO="mono";this.MODE_GRAY16="gray16";this.BARCODE_UPC_A="upc_a";this.BARCODE_UPC_E="upc_e";this.BARCODE_EAN13="ean13";this.BARCODE_JAN13="jan13";this.BARCODE_EAN8="ean8";this.BARCODE_JAN8="jan8";this.BARCODE_CODE39="code39";this.BARCODE_ITF="itf";this.BARCODE_CODABAR="codabar";this.BARCODE_CODE93="code93";this.BARCODE_CODE128="code128";this.BARCODE_GS1_128="gs1_128";this.BARCODE_GS1_DATABAR_OMNIDIRECTIONAL="gs1_databar_omnidirectional";this.BARCODE_GS1_DATABAR_TRUNCATED="gs1_databar_truncated";this.BARCODE_GS1_DATABAR_LIMITED="gs1_databar_limited";this.BARCODE_GS1_DATABAR_EXPANDED="gs1_databar_expanded";this.HRI_NONE="none";this.HRI_ABOVE="above";this.HRI_BELOW="below";this.HRI_BOTH="both";this.SYMBOL_PDF417_STANDARD="pdf417_standard";this.SYMBOL_PDF417_TRUNCATED="pdf417_truncated";this.SYMBOL_QRCODE_MODEL_1="qrcode_model_1";this.SYMBOL_QRCODE_MODEL_2="qrcode_model_2";this.SYMBOL_QRCODE_MICRO="qrcode_micro";this.SYMBOL_MAXICODE_MODE_2="maxicode_mode_2";this.SYMBOL_MAXICODE_MODE_3="maxicode_mode_3";this.SYMBOL_MAXICODE_MODE_4="maxicode_mode_4";this.SYMBOL_MAXICODE_MODE_5="maxicode_mode_5";this.SYMBOL_MAXICODE_MODE_6="maxicode_mode_6";this.SYMBOL_GS1_DATABAR_STACKED="gs1_databar_stacked";this.SYMBOL_GS1_DATABAR_STACKED_OMNIDIRECTIONAL="gs1_databar_stacked_omnidirectional";this.SYMBOL_GS1_DATABAR_EXPANDED_STACKED="gs1_databar_expanded_stacked";this.SYMBOL_AZTECCODE_FULLRANGE="azteccode_fullrange";this.SYMBOL_AZTECCODE_COMPACT="azteccode_compact";this.SYMBOL_DATAMATRIX_SQUARE="datamatrix_square";this.SYMBOL_DATAMATRIX_RECTANGLE_8="datamatrix_rectangle_8";this.SYMBOL_DATAMATRIX_RECTANGLE_12="datamatrix_rectangle_12";this.SYMBOL_DATAMATRIX_RECTANGLE_16="datamatrix_rectangle_16";this.LEVEL_0="level_0";this.LEVEL_1="level_1";this.LEVEL_2="level_2";this.LEVEL_3="level_3";this.LEVEL_4="level_4";this.LEVEL_5="level_5";this.LEVEL_6="level_6";this.LEVEL_7="level_7";this.LEVEL_8="level_8";this.LEVEL_L="level_l";this.LEVEL_M="level_m";this.LEVEL_Q="level_q";this.LEVEL_H="level_h";this.LEVEL_DEFAULT="default";this.LINE_THIN="thin";this.LINE_MEDIUM="medium";this.LINE_THICK="thick";this.LINE_THIN_DOUBLE="thin_double";this.LINE_MEDIUM_DOUBLE="medium_double";this.LINE_THICK_DOUBLE="thick_double";this.DIRECTION_LEFT_TO_RIGHT="left_to_right";this.DIRECTION_BOTTOM_TO_TOP="bottom_to_top";this.DIRECTION_RIGHT_TO_LEFT="right_to_left";this.DIRECTION_TOP_TO_BOTTOM="top_to_bottom";this.CUT_NO_FEED="no_feed";this.CUT_FEED="feed";this.CUT_RESERVE="reserve";this.DRAWER_1="drawer_1";this.DRAWER_2="drawer_2";this.PULSE_100="pulse_100";this.PULSE_200="pulse_200";this.PULSE_300="pulse_300";this.PULSE_400="pulse_400";this.PULSE_500="pulse_500";this.PATTERN_NONE="none";this.PATTERN_0="pattern_0";this.PATTERN_1="pattern_1";this.PATTERN_2="pattern_2";this.PATTERN_3="pattern_3";this.PATTERN_4="pattern_4";this.PATTERN_5="pattern_5";this.PATTERN_6="pattern_6";this.PATTERN_7="pattern_7";this.PATTERN_8="pattern_8";this.PATTERN_9="pattern_9";this.PATTERN_10="pattern_10";this.PATTERN_A="pattern_a";this.PATTERN_B="pattern_b";this.PATTERN_C="pattern_c";this.PATTERN_D="pattern_d";this.PATTERN_E="pattern_e";this.PATTERN_ERROR="error";this.PATTERN_PAPER_END="paper_end";this.LAYOUT_RECEIPT="receipt";this.LAYOUT_RECEIPT_BM="receipt_bm";this.LAYOUT_LABEL="label";this.LAYOUT_LABEL_BM="label_bm";this.HALFTONE_DITHER=0;this.HALFTONE_ERROR_DIFFUSION=1;this.HALFTONE_THRESHOLD=2;this.ASB_NO_RESPONSE=1;this.ASB_PRINT_SUCCESS=2;this.ASB_DRAWER_KICK=4;this.ASB_OFF_LINE=8;this.ASB_COVER_OPEN=32;this.ASB_PAPER_FEED=64;this.ASB_WAIT_ON_LINE=256;this.ASB_PANEL_SWITCH=512;this.ASB_MECHANICAL_ERR=1024;this.ASB_AUTOCUTTER_ERR=2048;this.ASB_UNRECOVER_ERR=8192;this.ASB_AUTORECOVER_ERR=16384;this.ASB_INSERTION_WAIT_PAPER=65536;this.ASB_RECEIPT_NEAR_END=131072;this.ASB_REMOVAL_WAIT_PAPER=262144;this.ASB_RECEIPT_END=524288;this.ASB_TOF_NOPAPER=2097152;this.ASB_BOF_NOPAPER=4194304;this.ASB_SLIP_NO_SELECT=16777216;this.ASB_SLIP_IMPOSSIBLE_PRINT=33554432;this.ASB_EJD_NOPAPER=1073741824;this.ASB_VALIDATION_NO_SELECT=67108864;this.ASB_VALIDATION_IMPOSSIBLE_PRINT=134217728;this.ASB_SPOOLER_IS_STOPPED=2147483648;this.DRAWER_OPEN_LEVEL_LOW=0;this.DRAWER_OPEN_LEVEL_HIGH=1;this.SUCCESS="SUCCESS";this.CANCEL="CANCEL";this.ERROR_CANCEL_FAILED="ERROR_CANCEL_FAILED";this.ERROR_PARAMMETER="ERROR_PARAMMETER";this.ERROR_COMMAND="ERROR_COMMAND";this.ERROR_DEVICE_NOT_FOUND="ERROR_DEVICE_NOT_FOUND";this.ERROR_DEVICE_BUSY="ERROR_DEVICE_BUSY";this.ERROR_NOT_SUPPORTED="ERROR_NOT_SUPPORTED";this.ERROR_COVER_OPEN="ERROR_COVER_OPEN";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_AUTOMATICAL="ERROR_AUTOMATICAL";this.ERROR_UNRECOVERABLE="ERROR_UNRECOVERABLE";this.ERROR_BADPORT="ERROR_BADPORT";this.SYSTEM_ERROR="SYSTEM_ERROR";this.EPTR_AUTOMATICAL="EPTR_AUTOMATICAL";this.EPTR_COVER_OPEN="EPTR_COVER_OPEN";this.EPTR_CUTTER="EPTR_CUTTER";this.EPTR_MECHANICAL="EPTR_MECHANICAL";this.EPTR_REC_EMPTY="EPTR_REC_EMPTY";this.EPTR_UNRECOVERABLE="EPTR_UNRECOVERABLE";this.EPTR_SCHEMAERROR="EPTR_SCHEMAERROR";this.EPTR_PRINT_SYSTEM_ERROR="EPTR_PRINT_SYSTEM_ERROR";this.EPTR_PAPER_PULLED_OUT="EPTR_PAPER_PULLED_OUT";this.EMICR_ILLEGAL_LENGTH="EMICR_ILLEGAL_LENGTH";this.EMICR_NO_MICR="EMICR_NO_MICR";this.EMICR_RECOGNITION="EMICR_RECOGNITION";this.EMICR_READ="EMICR_READ";this.EMICR_NOISE_DETECTED="EMICR_NOISE_DETECTED";this.EMICR_COVER_OPENED="EMICR_COVER_OPENED";this.EMICR_PAPER_JAM="EMICR_PAPER_JAM";this.EMICR_PAPER_PULLED_OUT="EMICR_PAPER_PULLED_OUT";this.DeviceNotFound="DeviceNotFound";this.EX_TIMEOUT="EX_TIMEOUT";this.EX_BADPORT="EX_BADPORT";this.SchemaError="SchemaError";this.PrintSystemError="PrintSystemError";this.PAPERTYPE_RECEIPT=0;this.PAPERTYPE_SLIP=1;this.PAPERTYPE_ENDORSE=2;this.PAPERTYPE_VALIDATION=3;this.FONT_E13B="MICR_E13B";this.FONT_CMC7="MICR_CMC7";this.halftone=this.HALFTONE_DITHER;this.brightness=1;this.force=false;this.drawerOpenLevel=this.DRAWER_OPEN_LEVEL_LOW;this.paperType=this.PAPERTYPE_RECEIPT;this.interval=3000;this.waitTime=500;this.enable40cplMode=true;this.onstatuschange=null;this.ononline=null;this.onoffline=null;this.onpoweroff=null;this.oncoveropen=null;this.onpaperok=null;this.onpapernearend=null;this.onpaperend=null;this.ondrawerclosed=null;this.ondraweropen=null;this.init(deviceID)}HybridPrinter2.prototype.init=function(deviceID){this.deviceID=deviceID;this.ReceiptPrinter=new ReceiptPrinter(this);this.SlipPrinter2=new SlipPrinter2(this);this.ValidationPrinter=new ValidationPrinter(this);this.EndorsePrinter2=new EndorsePrinter2(this);this.MICRReader2=new MICRReader2(this);this.currentPrinter=this.ReceiptPrinter;this.ReceiptPrinter.onstatuschange=function(status){if(this.parent.onstatuschange!=null){this.parent.onstatuschange(status)}};this.ReceiptPrinter.ononline=function(){if(this.parent.ononline!=null){this.parent.ononline()}};this.ReceiptPrinter.onoffline=function(){if(this.parent.onoffline!=null){this.parent.onoffline()}};this.ReceiptPrinter.onpoweroff=function(){if(this.parent.onpoweroff!=null){this.parent.onpoweroff()}};this.ReceiptPrinter.oncoveropen=function(){if(this.parent.oncoveropen!=null){this.parent.oncoveropen()}};this.ReceiptPrinter.oncoverok=function(){if(this.parent.oncoverok!=null){this.parent.oncoverok()}};this.ReceiptPrinter.onpaperok=function(){if(this.parent.onpaperok!=null){this.parent.onpaperok()}};this.ReceiptPrinter.onpapernearend=function(){if(this.parent.onpapernearend!=null){this.parent.onpapernearend()}};this.ReceiptPrinter.onpaperend=function(){if(this.parent.onpaperend!=null){this.parent.onpaperend()}};this.ReceiptPrinter.ondrawerclosed=function(){if(this.parent.ondrawerclosed!=null){this.parent.ondrawerclosed()}};this.ReceiptPrinter.ondraweropen=function(){if(this.parent.ondraweropen!=undefined){this.parent.ondraweropen()}};this.ReceiptPrinter.onreceive=function(res,sq){this.parent.fireOnReceive(res,sq)};this.SlipPrinter2.onreceive=function(res,sq){this.parent.fireOnReceive(res,sq)};this.EndorsePrinter2.onreceive=function(res,sq){this.parent.fireOnReceive(res,sq)};this.ValidationPrinter.onreceive=function(res,sq){this.parent.fireOnReceive(res,sq)};this.MICRReader2.onreceive=function(res,sq){this.parent.fireOnReceive(res,sq)}};HybridPrinter2.prototype.setConnectionObject=function(connectionObj){this.connectionObj=connectionObj;this.ReceiptPrinter.setConnectionObject(this.connectionObj)};HybridPrinter2.prototype.isValidFunction=function(paperType,supportPaperTypes){var isValid=false;var index=0;if(supportPaperTypes.length!=0){for(index=0;index<supportPaperTypes.length;index++){if(paperType==supportPaperTypes[index]){isValid=true;break}}}return isValid};HybridPrinter2.prototype.addText=function(data){this.currentPrinter.addText.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextLang=function(lang){this.currentPrinter.addTextLang.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextAlign=function(align){this.currentPrinter.addTextAlign.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextRotate=function(rotate){this.currentPrinter.addTextRotate.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextLineSpace=function(linespc){this.currentPrinter.addTextLineSpace.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextFont=function(font){this.currentPrinter.addTextFont.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextSmooth=function(smooth){this.currentPrinter.addTextSmooth.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextDouble=function(dw,dh){this.currentPrinter.addTextDouble.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextSize=function(width,height){this.currentPrinter.addTextSize.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextStyle=function(reverse,ul,em,color){this.currentPrinter.addTextStyle.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextPosition=function(x){this.currentPrinter.addTextPosition.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addTextVPosition=function(y){this.currentPrinter.addTextVPosition.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addFeedUnit=function(unit){this.currentPrinter.addFeedUnit.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addFeedLine=function(line){this.currentPrinter.addFeedLine.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addFeed=function(){this.currentPrinter.addFeed.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addFeedPosition=function(pos){this.currentPrinter.addFeedPosition.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addImage=function(context,x,y,width,height,color,mode){this.currentPrinter.halftone=this.halftone;this.currentPrinter.brightness=this.brightness;this.currentPrinter.addImage.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addLogo=function(key1,key2){this.currentPrinter.addLogo.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addBarcode=function(data,type,hri,font,width,height){this.currentPrinter.addBarcode.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addSymbol=function(data,type,level,width,height,size){this.currentPrinter.addSymbol.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addHLine=function(x1,x2,style){this.currentPrinter.addHLine.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addVLineBegin=function(x,style){this.currentPrinter.addVLineBegin.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addVLineEnd=function(x,style){this.currentPrinter.addVLineEnd.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageBegin=function(){this.currentPrinter.addPageBegin.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageEnd=function(){this.currentPrinter.addPageEnd.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageArea=function(x,y,width,height){this.currentPrinter.addPageArea.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageDirection=function(dir){this.currentPrinter.addPageDirection.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPagePosition=function(x,y){this.currentPrinter.addPagePosition.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageLine=function(x1,y1,x2,y2,style){this.currentPrinter.addPageLine.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addPageRectangle=function(x1,y1,x2,y2,style){this.currentPrinter.addPageRectangle.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addCut=function(type){this.ReceiptPrinter.addCut.apply(this.ReceiptPrinter,arguments);return this};HybridPrinter2.prototype.addPulse=function(drawer,time){this.currentPrinter.addPulse.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addSound=function(pattern,repeat,cycle){this.currentPrinter.addSound.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.addLayout=function(type,width,height,margin_top,margin_bottom,offset_cut,offset_label){this.ReceiptPrinter.addLayout.apply(this.ReceiptPrinter,arguments);return this};HybridPrinter2.prototype.addRecovery=function(){this.ReceiptPrinter.addRecovery.apply(this.ReceiptPrinter,arguments);return this};HybridPrinter2.prototype.addReset=function(){this.ReceiptPrinter.addReset.apply(this.ReceiptPrinter,arguments);return this};HybridPrinter2.prototype.addCommand=function(data){this.currentPrinter.addCommand.apply(this.currentPrinter,arguments);return this};HybridPrinter2.prototype.recover=function(){this.ReceiptPrinter.recover.apply(this.ReceiptPrinter,arguments);return this};HybridPrinter2.prototype.reset=function(){this.ReceiptPrinter.force=this.force;var ret=this.ReceiptPrinter.reset.apply(this.ReceiptPrinter,arguments);this.force=false;return ret};HybridPrinter2.prototype.setMessage=function(message){this.currentPrinter.message=message};HybridPrinter2.prototype.getMessage=function(){return this.currentPrinter.message};HybridPrinter2.prototype.startMonitor=function(){var delay=this.interval;if((typeof(this.interval)!="number")||delay<1000||6000<delay){delay=3000}this.ReceiptPrinter.interval=delay;return this.ReceiptPrinter.startMonitor()};HybridPrinter2.prototype.stopMonitor=function(){return this.ReceiptPrinter.stopMonitor()};HybridPrinter2.prototype.lock=function(){var data={type:"lock"};return this.send(data)};HybridPrinter2.prototype.unlock=function(){var data={type:"unlock"};return this.send(data)};HybridPrinter2.prototype.selectPaperType=function(paperType){if(this.isValidFunction(paperType,[this.PAPERTYPE_RECEIPT,this.PAPERTYPE_SLIP,this.PAPERTYPE_ENDORSE,this.PAPERTYPE_VALIDATION])!=true){throw new Error('Property "paperType" is invalid')}switch(paperType){case this.PAPERTYPE_RECEIPT:this.currentPrinter=this.ReceiptPrinter;break;case this.PAPERTYPE_SLIP:this.currentPrinter=this.SlipPrinter2;break;case this.PAPERTYPE_ENDORSE:this.currentPrinter=this.EndorsePrinter2;break;case this.PAPERTYPE_VALIDATION:this.currentPrinter=this.ValidationPrinter;break;default:this.currentPrinter=this.ReceiptPrinter;break}this.paperType=paperType;return this};HybridPrinter2.prototype.waitInsertion=function(timeout){if(this.isValidFunction(this.paperType,[this.PAPERTYPE_SLIP,this.PAPERTYPE_ENDORSE,this.PAPERTYPE_VALIDATION])!=true){throw new Error('Property "paperType" is invalid')}this.currentPrinter.waitTime=this.waitTime;var ret=this.currentPrinter.waitInsertion.apply(this.currentPrinter,arguments);return ret};HybridPrinter2.prototype.cancelInsertion=function(){var ret=null;if(this.isMicrMode){ret=this.MICRReader2.cancel.apply(this.MICRReader2,arguments)}else{if(this.isValidFunction(this.paperType,[this.PAPERTYPE_SLIP,this.PAPERTYPE_ENDORSE,this.PAPERTYPE_VALIDATION])!=true){throw new Error('Property "paperType" is invalid')}ret=this.currentPrinter.cancel.apply(this.currentPrinter,arguments)}return ret};HybridPrinter2.prototype.ejectPaper=function(){var data={type:"eject"};return this.send(data)};HybridPrinter2.prototype.sendData=function(timeout){this.currentPrinter.isCrypto=this.isCrypto;if((typeof(timeout)!="number")||(timeout<1)||(timeout>1000000)){this.currentPrinter.timeout=0}else{this.currentPrinter.timeout=timeout}this.EndorsePrinter2.enable40cplmode(this.enable40cplMode);this.currentPrinter.force=this.force;var ret=this.currentPrinter.send();this.force=false;return ret};HybridPrinter2.prototype.print=function(canvas,cut,mode,timeout){if((typeof(timeout)!="number")||(timeout<1)||(timeout>1000000)){this.ReceiptPrinter.timeout=0}else{this.ReceiptPrinter.timeout=timeout}this.ReceiptPrinter.print.apply(this.ReceiptPrinter,[canvas,cut,mode]);return this};HybridPrinter2.prototype.readMicrData=function(ignoreerror,micrFont,timeout){var ignoreerrorMicr=ignoreerror;var micrFontMicr=micrFont;if(typeof(ignoreerror)=="undefined"){ignoreerrorMicr=true}if(typeof(micrFont)=="undefined"){micrFontMicr=this.FONT_E13B}this.MICRReader2.timeout=timeout;this.MICRReader2.waitTime=this.waitTime;this.MICRReader2.read.apply(this.MICRReader2,[ignoreerrorMicr,micrFontMicr]);this.isMicrMode=true;return this};HybridPrinter2.prototype.cleanMicrReader=function(timeout){this.MICRReader2.timeout=timeout;this.MICRReader2.cleaning.apply(this.MICRReader2,[]);this.isMicrMode=true;return this};HybridPrinter2.prototype.client_onreceive=function(res,sq){switch(res.eventtype){case"slipprint2":case"slipcancel":case"slipwaitinsertion":this.SlipPrinter2.fireOnReceive(res,sq);break;case"endorseprint2":case"endorsecancel":case"endorsewaitinsertion":this.EndorsePrinter2.fireOnReceive(res,sq);break;case"validationprint2":case"validationcancel":case"validationwaitinsertion":this.ValidationPrinter.fireOnReceive(res,sq);break;case"micrread":case"micrcleaning":case"micrcancel":this.MICRReader2.fireOnReceive(res,sq);break;case"print":var tmp=res;tmp.eventtype=this.ReceiptPrinter.methodName;this.fireOnReceive(tmp,sq);break;default:this.fireOnReceive(res,sq);break}};HybridPrinter2.prototype.client_onxmlresult=function(res,sq){this.ReceiptPrinter.fireOnReceive(res,sq)};HybridPrinter2.prototype.fireOnReceive=function(res,sq){if(typeof(this.onreceive)==undefined){return}if(res==null){return}var eventtype=res.eventtype;var success=res.success;var code=res.code;var status=res.status;var data=res.data;switch(res.eventtype){case"send":eventtype="sendData";if(code==this.SUCCESS){this.isMicrMode=false}break;case"waitinsertion":eventtype="waitInsertion";if(code==this.SUCCESS){this.isMicrMode=false}break;case"read":eventtype="readMicrData";if(code==this.SUCCESS){this.isMicrMode=true}break;case"cleaning":eventtype="cleanMicrReader";if(code==this.SUCCESS){this.isMicrMode=true}break;case"cancel":eventtype="cancelInsertion";break;case"eject":eventtype="ejectPaper";if(code==this.SUCCESS){this.isMicrMode=false}break;default:break}switch(code){case"EX_ENPC_TIMEOUT":code="ERROR_DEVICE_BUSY";break;case"CANCEL":this.isMicrMode=false;break;default:break}this.onreceive({method:eventtype,success:success,code:code,status:status,data:data},sq)};HybridPrinter2.prototype.callEvent=function(eventName,data){var eventReq=data;eventReq.type=eventName;return this.send(eventReq)};HybridPrinter2.prototype.send=function(data){var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence};function SlipPrinter2(parent){this.parent=parent}SlipPrinter2.prototype=new SlipPrinter();SlipPrinter2.prototype.timeout=60000;SlipPrinter2.prototype.waitTime=500;SlipPrinter2.prototype.send=function(){var xml=null;if(arguments.length<1){xml=this.toString()}else{xml=arguments[1]}if((typeof(this.timeout)!="number")||(this.timeout<5000)||(this.timeout>1000000)){this.timeout=10000}var data={type:"slipprint2",timeout:this.timeout,printdata:xml};var sequence=this.parent.send(data);this.setXmlString("");return sequence};SlipPrinter2.prototype.setXmlString=function(xml){this.message=xml};SlipPrinter2.prototype.getXmlString=function(){return this.message};SlipPrinter2.prototype.waitInsertion=function(timeout){if((typeof(timeout)!="number")||(timeout<5000)||(timeout>900000)){this.timeout=60000}else{this.timeout=timeout}var slipWaitTime=this.waitTime;if((typeof(this.waitTime)!="number")||(this.waitTime<0)||(this.waitTime>6400)){slipWaitTime=500}var data={type:"slipwaitinsertion",timeout:this.timeout,waittime:slipWaitTime};return this.parent.send(data)};SlipPrinter2.prototype.cancel=function(){var data={type:"slipcancel"};return this.parent.send(data)};SlipPrinter2.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"slipprint2":eventtype="send";break;case"slipcancel":eventtype="cancel";break;case"slipwaitinsertion":eventtype="waitinsertion";break;default:break}this.onreceive({eventtype:eventtype,success:res.success,code:res.code,status:res.status},sq)};function EndorsePrinter2(parent){this.parent=parent;this.mode40cpl=false}EndorsePrinter2.prototype=new EndorsePrinter();EndorsePrinter2.prototype.timeout=60000;EndorsePrinter2.prototype.waitTime=500;EndorsePrinter2.prototype.send=function(){var xml=null;if(arguments.length<1){xml=this.toString()}else{xml=arguments[1]}if((typeof(this.timeout)!="number")||(this.timeout<60000)||(this.timeout>900000)){this.timeout=60000}var data={type:"endorseprint2",is40cplmode:this.mode40cpl,timeout:this.timeout,printdata:xml};var sequence=this.parent.send(data);this.setXmlString("");return sequence};EndorsePrinter2.prototype.setXmlString=function(xml){this.message=xml};EndorsePrinter2.prototype.getXmlString=function(){return this.message};EndorsePrinter2.prototype.waitInsertion=function(timeout){if((typeof(timeout)!="number")||(timeout<5000)||(timeout>900000)){this.timeout=60000}else{this.timeout=timeout}var endorseWaitTime=this.waitTime;if((typeof(this.waitTime)!="number")||(this.waitTime<0)||(this.waitTime>6400)){endorseWaitTime=500}var data={type:"endorsewaitinsertion",timeout:this.timeout,waittime:endorseWaitTime};return this.parent.send(data)};EndorsePrinter2.prototype.cancel=function(){var data={type:"endorsecancel"};return this.parent.send(data)};EndorsePrinter2.prototype.enable40cplmode=function(flag){this.mode40cpl=flag};EndorsePrinter2.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"endorseprint2":eventtype="send";break;case"endorsecancel":eventtype="cancel";break;case"endorsewaitinsertion":eventtype="waitinsertion";break;default:break}this.onreceive({eventtype:eventtype,success:res.success,code:res.code,status:res.status},sq)};function MICRReader2(parent){this.parent=parent}MICRReader2.prototype=new MICRReader();MICRReader2.prototype.waitTime=500;MICRReader2.prototype.read=function(ignoreerror,font){if((typeof(this.timeout)!="number")||(this.timeout<5000)||(this.timeout>900000)){this.timeout=60000}var micrWaitTime=this.waitTime;if((typeof(this.waitTime)!="number")||(this.waitTime<0)||(this.waitTime>6400)){micrWaitTime=500}var data={type:"micrread",ignoreerror:ignoreerror,font:font,timeout:this.timeout,waittime:micrWaitTime};return this.parent.send(data)};MICRReader2.prototype.cleaning=function(){var micrWaitTime=this.waitTime;this.timeout=60000;if((typeof(this.waitTime)!="number")||(this.waitTime<0)||(this.waitTime>6400)){micrWaitTime=500}var data={type:"micrcleaning",timeout:this.timeout,waittime:micrWaitTime};return this.parent.send(data)};function ValidationPrinter(parent){this.parent=parent}ValidationPrinter.prototype=new ePOSBuilder();ValidationPrinter.prototype.timeout=10000;ValidationPrinter.prototype.waitTime=500;ValidationPrinter.prototype.send=function(){var xml=null;if(arguments.length<1){xml=this.toString()}else{xml=arguments[1]}if((typeof(this.timeout)!="number")||(this.timeout<5000)||(this.timeout>1000000)){this.timeout=10000}var data={type:"validationprint2",timeout:this.timeout,printdata:xml};var sequence=this.parent.send(data);this.setXmlString("");return sequence};ValidationPrinter.prototype.setXmlString=function(xml){this.message=xml};ValidationPrinter.prototype.getXmlString=function(){return this.message};ValidationPrinter.prototype.waitInsertion=function(timeout){if((typeof(timeout)!="number")||(timeout<5000)||(timeout>900000)){this.timeout=60000}else{this.timeout=timeout}var validationWaitTime=this.waitTime;if((typeof(this.waitTime)!="number")||(this.waitTime<0)||(this.waitTime>6400)){validationWaitTime=500}var data={type:"validationwaitinsertion",timeout:this.timeout,waittime:validationWaitTime};return this.parent.send(data)};ValidationPrinter.prototype.cancel=function(){var data={type:"validationcancel"};return this.parent.send(data)};ValidationPrinter.prototype.fireOnReceive=function(res,sq){if(this.onreceive==null){return}if(res==null){return}var eventtype="";switch(res.eventtype){case"validationprint2":eventtype="send";break;case"validationcancel":eventtype="cancel";break;case"validationwaitinsertion":eventtype="waitinsertion";break;default:break}this.onreceive({eventtype:eventtype,success:res.success,code:res.code,status:res.status},sq)};function Scanner(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}Scanner.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},client_ondata:function(data){try{if(this.ondata==null){return}this.ondata(data)}catch(e){}return},client_onbinarydata:function(data){try{if(this.onbinarydata==null){return}this.onbinarydata(data)}catch(e){}return},client_setbinarymode:function(data){try{if(this.onbinarymode==null){return}this.onbinarymode(data)}catch(e){}return},setBinaryMode:function(enable){var str="";if(enable==true){str="true"}else{str="false"}var data={type:"setbinarymode",binarymode:str};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence},callEvent:function(eventName,data){var eventReq=data;eventReq.type=eventName;var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,eventReq,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function SimpleSerial(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null}SimpleSerial.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},sendCommand:function(command){var data={type:"sendcommand",command:toHexBinary(command)};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence},client_oncommandreply:function(data){try{if(this.oncommandreply==null){return}var hexData=data.data;hexData=hexData.replace(/[0-9a-fA-F]{2}/g,function(c){var hexNum=parseInt(c,16);return String.fromCharCode(hexNum)});data.data=hexData;this.oncommandreply(data)}catch(e){}return}};function GermanyFiscalElement(deviceID,isCrypto){this.deviceID=deviceID;this.isCrypto=isCrypto;this.connectionObj=null;this.ongfereceive=null;this.onerror=null}GermanyFiscalElement.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},operate:function(jsonString,timeout){var data={type:"operate",timeout:timeout,requestdata:jsonString};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){throw e}return sequence},client_operateresult:function(data){if(this.ongfereceive==null){return}if(data.resultformat=="Base64-encoded"){try{data.resultdata=window.atob(data.resultdata);var uint8array=new Uint8Array(data.resultdata.length);for(var i=0;i<data.resultdata.length;i++){uint8array[i]=data.resultdata.charCodeAt(i)}var inflate=new Zlib.Inflate(uint8array);var charData=inflate.decompress();data.resultdata=[];for(var j=0;j<charData.length;j++){data.resultdata=data.resultdata+String.fromCharCode(charData[j])}}catch(e){if(this.onerror){this.onerror(e)}return}}try{this.ongfereceive(this.getResultObject(data))}catch(e){if(this.onerror){this.onerror(e)}}return},getResultObject:function(data){return({success:data.success,code:data.code,resultdata:data.resultdata,})},callEvent:function(eventName,data){var eventReq={type:eventName,data:data};var eposmsg=MessageFactory.getDeviceDataMessage(this.deviceID,data,this.isCrypto);var sequence=-1;try{this.connectionObj.emit(eposmsg);sequence=eposmsg.sequence}catch(e){}return sequence}};function Ofsc(){this.SERVICE_ID="OFSC";this.callback=null;this.connectionObj=null}Ofsc.prototype={setConnectionObject:function(connectionObj){this.connectionObj=connectionObj},send:function(xml,timeout,crypto,callback){this.callback=callback;try{if(this.connectionObj.isUsableDeviceIF()){var data={type:"print",timeout:timeout,printdata:xml};var eposmsg=MessageFactory.getServiceMessage(this.SERVICE_ID,crypto,data);this.connectionObj.emit(eposmsg)}}catch(e){return}},notify:function(eposmsg){var data=null;if(eposmsg.isCrypto=="1"){data=MessageFactory.decrypt(eposmsg.data)}else{data=eposmsg.data}if(this.callback!=null){this.callback(data.resultdata)}},onxmlresult:function(xml){if(this.callback!=null){this.callback(xml)}}};function CookieIO(){this.KEY="EPSON_EPOSDEVICE_CLIENTID";this.EXPIRES_MINUTES=5}CookieIO.prototype={writeId:function(value){var path=location.pathname;if(path.slice(-1)=="/"){path=path+"index.html"}var hostname=location.hostname;var expired=this.getExpiredDate();document.cookie=this.KEY+"_"+hostname+path+"="+escape(value)+"; expires="+expired},readId:function(){var id="";var strCookie=document.cookie+";";var path=location.pathname;if(path.slice(-1)=="/"){path=path+"index.html"}var hostname=location.hostname;var searchKey=this.KEY+"_"+hostname+path+"=";var keyValueFrom=strCookie.indexOf(searchKey);if(keyValueFrom!=-1){keyValueFrom+=searchKey.length;var keyValueTo=strCookie.indexOf(";",keyValueFrom);id=unescape(strCookie.substring(keyValueFrom,keyValueTo))}return id},getExpiredDate:function(){var expire=new Date();var nTime=expire.getTime();expire.setTime(nTime+(1000*60*this.EXPIRE_MINUTES));return expire.toUTCString()}};function DeviceObjElement(deviceId,isCrypto,deviceObject,callback){this.deviceId=deviceId;this.isCrypto=isCrypto;this.deviceObject=deviceObject;this.callback=callback}function DeviceObjElementMap(){this.elementList=new Array()}DeviceObjElementMap.prototype={add:function(element){this.elementList.push(element)},get:function(deviceId){var element=null;for(var i=0;i<this.elementList.length;i++){if(this.elementList[i].deviceId==deviceId){element=this.elementList[i];break}}return element},getByObj:function(deviceObject){var element=null;for(var i=0;i<this.elementList.length;i++){if(this.elementList[i].deviceObject==deviceObject){element=this.elementList[i];break}}return element},remove:function(deviceId){for(var i=0;i<this.elementList.length;i++){if(this.elementList[i].deviceId==deviceId){this.elementList.splice(i,1);break}}},removeAll:function(){this.elementList=[]},getElementList:function(){return this.elementList},};function ePOSDevice(){this.DEVICE_TYPE_SCANNER="type_scanner";this.DEVICE_TYPE_KEYBOARD="type_keyboard";this.DEVICE_TYPE_POSKEYBOARD="type_poskeyboard";this.DEVICE_TYPE_MSR="type_msr";this.DEVICE_TYPE_CAT="type_cat";this.DEVICE_TYPE_CASH_CHANGER="type_cash_changer";this.DEVICE_TYPE_PRINTER="type_printer";this.DEVICE_TYPE_DISPLAY="type_display";this.DEVICE_TYPE_SIMPLE_SERIAL="type_simple_serial";this.DEVICE_TYPE_HYBRID_PRINTER="type_hybrid_printer";this.DEVICE_TYPE_HYBRID_PRINTER2="type_hybrid_printer2";this.DEVICE_TYPE_DT="type_dt";this.DEVICE_TYPE_OTHER_PERIPHERAL="type_other_peripheral";this.DEVICE_TYPE_GFE="type_storage";this.RESULT_OK="OK";this.ERROR_SYSTEM="SYSTEM_ERROR";this.ERROR_DEVICE_IN_USE="DEVICE_IN_USE";this.ERROR_DEVICE_OPEN="DEVICE_OPEN_ERROR";this.ERROR_DEVICE_CLOSE="DEVICE_CLOSE_ERROR";this.ERROR_DEVICE_NOT_OPEN="DEVICE_NOT_OPEN";this.ERROR_DEVICE_NOT_FOUND="DEVICE_NOT_FOUND";this.ERROR_PARAMETER="ERROR_PARAMETER";this.IFPORT_EPOSDEVICE=8008;this.IFPORT_EPOSDEVICE_S=8043;this.CONNECT_TIMEOUT=15000;this.RECONNECT_TIMEOUT=3000;this.MAX_RECONNECT_RETRY=5;this.socket=null;this.connectionId=null;this.reconnectTimerId=null;this.reconnectTryCount=0;this.admin="";this.location="";this.recievedDataId=0;this.connectStartTime=0;this.waitRetryConnectId=0;this.conectionObj=new Connection();this.commBoxManager=new CommBoxManager();this.commBoxManager.setConnectionObject(this.conectionObj);this.devObjSelector=new DeviceObjectSelector();this.devObjSelector.setConnectionObject(this.conectionObj);this.devObjElmMap=new DeviceObjElementMap();this.ofsc=new Ofsc();this.ofsc.setConnectionObject(this.conectionObj);this.cookieIo=new CookieIO();this.gbox=new SocketGarbageBox();this.eposprint=false;var self=this;window.onbeforeunload=function(){self.disconnect()};window.onpagehide=function(){self.disconnect()}}ePOSDevice.prototype={connect:function(address,port,callback,options){if((this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)!=this.conectionObj.DISCONNECT)||(this.conectionObj.status(this.conectionObj.IF_EPOSPRINT)!=this.conectionObj.DISCONNECT)){this.disconnect()}this.connectStartTime=new Date().getTime();var protocol=(port==this.IFPORT_EPOSDEVICE)?"http":"https";this.conectionObj.setAddress(protocol,address,port);this.conectionObj.registCallback(callback);if(arguments.length>=4){this.eposprint=options.eposprint}else{this.eposprint=false}var self=this;if(this.eposprint){var selfofProb=this.conectionObj;this.conectionObj.probeWebServiceIF(function(accessTime){var result=self.ERROR_PARAMETER;if(selfofProb.isUsablePrintIF()){result=self.RESULT_OK}callback(result)})}else{this.connectBySocketIo(this.CONNECT_TIMEOUT,protocol)}},isConnected:function(){var devIsConnect=false;var wsIsConnect=false;switch(this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)){case this.conectionObj.CONNECT:case this.conectionObj.RECONNECTING:devIsConnect=true;break;case this.conectionObj.DISCONNECT:break}if(this.conectionObj.status(this.conectionObj.IF_EPOSPRINT)==this.conectionObj.CONNECT){wsIsConnect=true}return devIsConnect|wsIsConnect},disconnect:function(){var eposmsg=MessageFactory.getDisconnectMessage(this.connectionId);this.conectionObj.emit(eposmsg);this.cleanup()},createDevice:function(deviceId,deviceType,options,callback){try{if(!this.isConnected()){throw new Error(this.ERROR_SYSTEM)}if(this.devObjElmMap.get(deviceId)!=null){throw new Error(this.ERROR_DEVICE_IN_USE)}if(!this.devObjSelector.isSelectable(deviceType)){throw new Error(this.ERROR_DEVICE_NOT_FOUND)}var isCrypto=false;var isBufferEnable=false;if(typeof(options)=="boolean"){isCrypto=options}else{if(typeof(options.crypto)=="boolean"){isCrypto=options.crypto}if(typeof(options.buffer)=="boolean"){isBufferEnable=options.buffer}}if(deviceType==this.DEVICE_TYPE_DT){isCrypto=true;deviceId="local_dt"}var deviceObject=this.devObjSelector.select(deviceId,deviceType,options.driver,isCrypto,this);deviceObject.setConnectionObject(this.conectionObj);var element=new DeviceObjElement(deviceId,isCrypto,deviceObject,callback);this.devObjElmMap.add(element);if(this.conectionObj.isUsableDeviceIF()){var eposmsg=MessageFactory.getOpenDeviceMessage(deviceId,deviceType,isCrypto,isBufferEnable);this.conectionObj.emit(eposmsg)}else{var self=this;this.checkEposPrintService(deviceId,deviceType,function(result){if(result==self.RESULT_OK){callback(deviceObject,self.RESULT_OK)}else{callback(null,self.ERROR_DEVICE_NOT_FOUND)}})}}catch(e){var message=e.message;if((message==null)||(message=="")){message=this.ERROR_DEVICE_OPEN}if(callback!=null){callback(null,message)}}},deleteDevice:function(deviceObject,callback){try{var element=this.devObjElmMap.getByObj(deviceObject);if(element==null){throw new Error(this.ERROR_DEVICE_NOT_OPEN)}if(this.conectionObj.isUsableDeviceIF()){element.callback=callback;var eposmsg=MessageFactory.getCloseDeviceMessage(element.deviceId);this.conectionObj.emit(eposmsg)}else{try{deviceObject.finalize()}catch(e){}this.devObjElmMap.remove(element.deviceId);callback(this.RESULT_OK)}}catch(e){var message=e.message;if((message==null)||(message=="")){message=this.ERROR_DEVICE_CLOSE}if(callback!=null){callback(message)}}},getAdmin:function(){return this.admin},getLocation:function(){return this.location},sendOfscXml:function(xml,timeout,crypto,callback){this.ofsc.send(xml,timeout,crypto,callback)},getCommBoxManager:function(){if(this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)!=this.conectionObj.CONNECT){return null}return this.commBoxManager},cleanup:function(){if(this.waitRetryConnectId!=0){clearTimeout(this.waitRetryConnectId);this.waitRetryConnectId=0}this.connectStartTime=0;this.gbox.stock(this.socket);this.gbox.dispose();var devObjList=this.devObjElmMap.getElementList();devObjList.forEach(function(obj){try{obj.deviceObject.finalize()}catch(e){}});devObjList=null;this.devObjElmMap.removeAll();if((this.ondisconnect!=null)&&(this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)!=this.conectionObj.DISCONNECT||this.conectionObj.status(this.conectionObj.IF_EPOSPRINT)!=this.conectionObj.DISCONNECT)){this.ondisconnect()}this.cookieIo.writeId("");this.conectionObj.changeStatus(this.conectionObj.IF_ALL,this.conectionObj.DISCONNECT);this.socket=null;this.conectionObj.setSocket(null);this.connectionId=null;this.conectionObj.setAddress("","","");if(this.reconnectTimerId!=null){clearInterval(this.reconnectTimerId)}this.reconnectTimerId=null;this.reconnectTryCount=0;this.admin="";this.location="";this.recievedDataId=0;this.eposprint=false},connectBySocketIo:function(timeout){var selfofProb=this.conectionObj;var url=selfofProb.getSocketIoURL();this.socket=io.connect(url,{reconnect:false,"connect timeout":timeout,"force new connection":true});this.conectionObj.setSocket(this.socket);var self=this;this.socket.on("connect",function(data){try{self.gbox.dispose()}catch(e){}});this.socket.on("close",function(){selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE,tselfofProb.DISCONNECT)});this.socket.on("disconnect",function(data){try{if(selfofProb.status(selfofProb.IF_EPOSDEVICE)==selfofProb.RECONNECTING){return}else{if(self.cookieIo.readId()==""&&self.connectionId==null){self.cleanup()}else{self.startReconnectAction()}}}catch(e){}});this.socket.on("error",function(){try{selfofProb.probeWebServiceIF(function(accessTime){if(selfofProb.isUsablePrintIF()){self.eposprint=true;selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE,selfofProb.ACCESS_NONE)}else{selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE,selfofProb.DISCONNECT);selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE,selfofProb.ACCESS_TIMEOUT)}})}catch(e){}});this.socket.on("connect_failed",function(){try{selfofProb.probeWebServiceIF(function(accessTime){if(selfofProb.isUsablePrintIF()){self.eposprint=true;selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE,selfofProb.ACCESS_NONE)}else{selfofProb.changeStatus(selfofProb.IF_EPOSDEVICE,selfofProb.DISCONNECT);selfofProb.registIFAccessResult(selfofProb.IF_EPOSDEVICE,selfofProb.ACCESS_TIMEOUT)}})}catch(e){}});this.socket.on("message",function(data){try{var eposmsg=MessageFactory.parseRequestMessage(data);if(eposmsg.data_id!=""){self.recievedDataId=eposmsg.data_id}switch(eposmsg.request){case eposmsg.REQUEST.CONNECT:self.procConnect(eposmsg);break;case eposmsg.REQUEST.PUBKEY:self.procPubkey(eposmsg);break;case eposmsg.REQUEST.ADMININFO:self.procAdminInfo(eposmsg);break;case eposmsg.REQUEST.RECONNECT:self.procReconnect(eposmsg);break;case eposmsg.REQUEST.DISCONNECT:self.procDisconnect(eposmsg);break;case eposmsg.REQUEST.OPENDEVICE:self.procOpenDevice(eposmsg);break;case eposmsg.REQUEST.CLOSEDEVICE:self.procCloseDevice(eposmsg);break;case eposmsg.REQUEST.DEVICEDATA:self.procDeviceData(eposmsg);break;case eposmsg.REQUEST.SERVICEDATA:self.procServiceData(eposmsg);break;case eposmsg.REQUEST.OPENCOMMBOX:self.procOpenCommBox(eposmsg);break;case eposmsg.REQUEST.CLOSECOMMBOX:self.procCloseCommBox(eposmsg);break;case eposmsg.REQUEST.COMMDATA:self.procCommBoxData(eposmsg);break;case eposmsg.REQUEST.ERROR:self.procError(eposmsg);break;default:return}}catch(e){}})},procConnect:function(eposmsg){try{if(this.reconnectTimerId!=null){clearInterval(this.reconnectTimerId);this.reconnectTimerId=null}var response=null;var prevConnectionId=this.cookieIo.readId();if(eposmsg.data.protocol_version<2){response=MessageFactory.getPubkeyMessage(eposmsg.data.prime,eposmsg.data.key);this.conectionObj.emit(response)}else{if(this.connectionId!=null){response=MessageFactory.getReconnectMessage(this.connectionId,eposmsg.data.client_id,this.recievedDataId);this.conectionObj.emit(response)}else{if(prevConnectionId!=""){response=MessageFactory.getDisconnectMessage(prevConnectionId);this.conectionObj.emit(response);response=MessageFactory.getPubkeyMessage(eposmsg.data.prime,eposmsg.data.key);this.conectionObj.emit(response)}else{response=MessageFactory.getPubkeyMessage(eposmsg.data.prime,eposmsg.data.key);this.conectionObj.emit(response)}}}this.cookieIo.writeId(eposmsg.data.client_id);this.connectionId=eposmsg.data.client_id}catch(e){this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_ERROR);this.cleanup()}},procPubkey:function(eposmsg){try{if(eposmsg.code=="SHARED_KEY_MISMATCH_ERROR"){var mismatchErrTime=new Date().getTime();var mismatchTimeout=0;if(this.connectStartTime!=0){mismatchTimeout=mismatchErrTime-this.connectStartTime;if(mismatchTimeout<this.CONNECT_TIMEOUT){var self=this;this.gbox.stock(this.socket);this.connectionId=null;this.waitRetryConnectId=setTimeout(function(){self.connectBySocketIo(self.CONNECT_TIMEOUT-mismatchTimeout)},100)}else{this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_TIMEOUT);this.cleanup()}}else{this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_TIMEOUT);this.cleanup()}}else{if(eposmsg.code=="PARAM_ERROR"){this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_ERROR);this.cleanup()}else{var response=MessageFactory.getAdminInfoMessage();this.conectionObj.emit(response)}}}catch(e){this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_ERROR);this.cleanup()}},procAdminInfo:function(eposmsg){if(this.eposprint){return}if(eposmsg.code!=this.RESULT_OK){this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_ERROR);return}this.admin=eposmsg.data.admin_name;this.location=eposmsg.data.location;this.conectionObj.registIFAccessResult(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.ACCESS_OK)},procReconnect:function(eposmsg){if(this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)!=this.conectionObj.RECONNECTING){return}if(eposmsg.code==this.RESULT_OK){this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.CONNECT);if(this.onreconnect!=null){this.onreconnect()}}else{this.cleanup()}},procDisconnect:function(eposmsg){},procOpenDevice:function(eposmsg){var deviceId=eposmsg.deviceId;try{var element=this.devObjElmMap.get(deviceId);if(eposmsg.code==this.RESULT_OK){if(element.callback!=null){element.callback(element.deviceObject,eposmsg.code)}}else{if(element.callback!=null){element.callback(null,eposmsg.code)}this.devObjElmMap.remove(deviceId)}}catch(e){if(this.onerror!=null){this.onerror("0",deviceId,this.ERROR_SYSTEM,null)}}},procCloseDevice:function(eposmsg){var deviceId=eposmsg.deviceId;try{if(eposmsg.code==this.RESULT_OK){var element=this.devObjElmMap.get(deviceId);if(element.callback!=null){element.callback(eposmsg.code)}try{element.deviceObject.finalize()}catch(e){}this.devObjElmMap.remove(deviceId)}}catch(e){if(this.onerror!=null){this.onerror("0",deviceId,this.ERROR_SYSTEM,null)}}},procDeviceData:function(eposmsg){var deviceId=eposmsg.deviceId;var sequence=eposmsg.sequence;var data=eposmsg.data;try{var devObjElm=this.devObjElmMap.get(deviceId);if(devObjElm.isCrypto){data=MessageFactory.decrypt(data)}var deviceObject=devObjElm.deviceObject;var method="client_"+data.type;try{if(deviceObject instanceof OtherPeripheral){deviceObject.client_onreceive(data,sequence)}else{eval("deviceObject."+method+"(data, sequence)")}}catch(e){eval("deviceObject."+data.type+"(data, sequence)")}}catch(e){if(this.onerror!=null){this.onerror(sequence,deviceId,this.ERROR_SYSTEM,null)}}},procServiceData:function(eposmsg){try{switch(eposmsg.serviceId){case"OFSC":this.ofsc.notify(eposmsg);break;default:break}}catch(e){if(this.onerror!=null){this.onerror(eposmsg.sequence,eposmsg.serviceId,this.ERROR_SYSTEM,null)}}},procOpenCommBox:function(eposmsg){var sequence=eposmsg.sequence;try{this.commBoxManager.client_opencommbox(eposmsg.data,sequence)}catch(e){if(this.onerror!=null){this.onerror(sequence,"",this.ERROR_SYSTEM,null)}}},procCloseCommBox:function(eposmsg){var sequence=eposmsg.sequence;try{this.commBoxManager.client_closecommbox(eposmsg.data,sequence)}catch(e){if(this.onerror!=null){this.onerror(sequence,"",this.ERROR_SYSTEM,null)}}},procCommBoxData:function(eposmsg){var sequence=eposmsg.sequence;try{this.commBoxManager.executeCommDataCallback(eposmsg.data,sequence)}catch(e){if(this.onerror!=null){this.onerror(sequence,"",this.ERROR_SYSTEM,null)}}},procError:function(eposmsg){try{if(this.onerror!=null){this.onerror(eposmsg.sequence,eposmsg.deviceId,eposmsg.code,eposmsg.data)}}catch(e){}},startReconnectAction:function(){if(this.conectionObj.status(this.conectionObj.IF_EPOSDEVICE)==this.conectionObj.RECONNECTING){return}this.conectionObj.changeStatus(this.conectionObj.IF_EPOSDEVICE,this.conectionObj.RECONNECTING);this.reconnectTryCount=0;var self=this;this.reconnectTimerId=setInterval(function(){if(self.socket!=null){self.gbox.stock(self.socket)}if(self.reconnectTryCount==self.MAX_RECONNECT_RETRY){clearInterval(self.reconnectTimerId);self.cleanup();return}if(self.conectionObj.status(self.conectionObj.IF_EPOSDEVICE)==self.conectionObj.RECONNECTING){self.connectBySocketIo(self.RECONNECT_TIMEOUT)}self.reconnectTryCount++},self.RECONNECT_TIMEOUT);if(this.reconnectTryCount==0&&this.onreconnecting!=null){this.onreconnecting()}},checkEposPrintService:function(deviceId,deviceType,callback){var OK="OK";var SSL_CONNECT_OK="SSL_CONNECT_OK";var ERROR_TIMEOUT="ERROR_TIMEOUT";var ERROR_PARAMETER="ERROR_PARAMETER";var ERROR_SYSTEM="SYSTEM_ERROR";var postUrl=null;var printUrl=this.conectionObj.getAddressWithProtocol()+"/cgi-bin/epos/service.cgi?devid="+deviceId+"&timeout=10000";var displayUrl=this.conectionObj.getAddressWithProtocol()+"/cgi-bin/eposDisp/service.cgi?devid="+deviceId+"&timeout=10000";var postData=null;var printData='<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>';var displayData='<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>';var xhr=null;var tid;var success;if(deviceType==this.DEVICE_TYPE_DISPLAY){postUrl=displayUrl;postData=displayData}else{postUrl=printUrl;postData=printData}if(window.XDomainRequest){try{xhr=new XDomainRequest();xhr.open("POST",postUrl);xhr.onload=function(){if(/response/.test(xhr.responseText)){success=/success\s*=\s*"\s*(1|true)\s*"/.test(xhr.responseText);if(success){callback(OK)}else{callback(ERROR_PARAMETER)}}else{callback(ERROR_PARAMETER)}};xhr.onerror=function(){callback(ERROR_PARAMETER)};xhr.ontimeout=function(){callback(ERROR_TIMEOUT)};xhr.onprogress=function(){};xhr.send(postData)}catch(e){callback(ERROR_PARAMETER)}}else{try{xhr=new XMLHttpRequest();xhr.open("POST",postUrl,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jun 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(tid);if((xhr.status==200)&&(xhr.responseXML)){var res=xhr.responseXML.getElementsByTagName("response");if(res.length<=0){success=false}else{success=/^(1|true)$/.test(res[0].getAttribute("success"))}if(success){callback(OK)}else{callback(ERROR_PARAMETER)}}else{callback(ERROR_PARAMETER)}}};tid=setTimeout(function(){xhr.abort();callback(ERROR_TIMEOUT)},5000);xhr.timeout=10000;xhr.send(postData)}catch(e){callback(ERROR_PARAMETER)}}}};function SocketGarbageBox(){this.box=new Array()}SocketGarbageBox.prototype={stock:function(socket){if(socket==null){return}socket.removeAllListeners("connect");socket.removeAllListeners("close");socket.removeAllListeners("disconnect");socket.removeAllListeners("error");socket.removeAllListeners("connect_failed");socket.removeAllListeners("message");var clone=function(){};clone.prototype=socket;this.box.push(clone)},dispose:function(){while(0<this.box.length){var socket=this.box.pop();try{socket.disconnect();delete socket}catch(e){}}}};function Connection(){this.OK="OK";this.SSL_CONNECT_OK="SSL_CONNECT_OK";this.ERROR_TIMEOUT="ERROR_TIMEOUT";this.ERROR_PARAMETER="ERROR_PARAMETER";this.ERROR_SYSTEM="SYSTEM_ERROR";this.socket_p=null;this.address_p="";this.protocol_p="";this.port_p="";this.callback_p=null;this.usableIF_p=0;this.ws_status_p=2;this.dev_status_p=2;this.IF_EPOSDEVICE=1;this.IF_EPOSPRINT=2;this.IF_EPOSDISPLAY=4;this.IF_ALL=7;this.ACCESS_OK="OK";this.ACCESS_ERROR="ERROR";this.ACCESS_TIMEOUT="TIMEOUT";this.ACCESS_NONE="NONE";this.CONNECT=1;this.DISCONNECT=2;this.RECONNECTING=4}Connection.prototype.probe=function(url,postdata,callback){var probeSelf=this;var xhr=null;var tid;if(window.XDomainRequest){try{xhr=new XDomainRequest();xhr.open("POST",url);xhr.onload=function(){callback(probeSelf.OK)};xhr.onerror=function(){callback(probeSelf.ERROR_PARAMETER)};xhr.ontimeout=function(){callback(probeSelf.ERROR_TIMEOUT)};xhr.onprogress=function(){};xhr.send(postdata)}catch(e){callback(this.ERROR_PARAMETER)}}else{try{xhr=new XMLHttpRequest();xhr.open("POST",url,true);xhr.setRequestHeader("Content-Type","text/xml; charset=utf-8");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jun 1970 00:00:00 GMT");xhr.setRequestHeader("SOAPAction",'""');xhr.onreadystatechange=function(){if(xhr.readyState==4){clearTimeout(tid);if(xhr.status==200){callback(probeSelf.OK)}else{callback(probeSelf.ERROR_PARAMETER)}}};tid=setTimeout(function(){xhr.abort();callback(probeSelf.ERROR_TIMEOUT)},5000);xhr.timeout=10000;xhr.send(postdata)}catch(e){callback(this.ERROR_PARAMETER)}}};Connection.prototype.probeWebServiceIF=function(callback){var startTime=(new Date()).getTime();var notify=false;var probeSelf=this;var printUrl=this.getAddressWithProtocol()+"/cgi-bin/epos/service.cgi?devid=local_printer&timeout=10000";var printData='<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"></epos-print></s:Body></s:Envelope>';this.probe(printUrl,printData,function(code){var result=probeSelf.ACCESS_ERROR;if(code==probeSelf.OK){result=probeSelf.ACCESS_OK}probeSelf.registIFAccessResult(probeSelf.IF_EPOSPRINT,result);if(notify){callback((new Date()).getTime()-startTime)}notify=!notify});var displayUrl=this.getAddressWithProtocol()+"/cgi-bin/eposDisp/service.cgi?devid=local_display&timeout=10000";var displayData='<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Body><epos-display xmlns="http://www.epson-pos.com/schemas/2012/09/epos-display"></epos-display></s:Body></s:Envelope>';this.probe(displayUrl,displayData,function(code){var result=probeSelf.ACCESS_ERROR;if(code==probeSelf.OK){result=probeSelf.ACCESS_OK}probeSelf.registIFAccessResult(probeSelf.IF_EPOSDISPLAY,result);if(notify){callback((new Date()).getTime()-startTime)}notify=!notify})};Connection.prototype.setSocket=function(socket){this.socket_p=socket};Connection.prototype.emit=function(eposmsg){try{if(this.socket_p==null){return}this.socket_p.emit("message",eposmsg.toTransmissionForm())}catch(e){throw new Error(this.ERROR_SYSTEM)}};Connection.prototype.setAddress=function(protocol,address,port){this.protocol_p=protocol;this.address_p=address;this.port_p=port;this.usableIF_p=0};Connection.prototype.getAddressWithProtocol=function(){return this.protocol_p+"://"+this.address_p};Connection.prototype.getSocketIoURL=function(){return this.getAddressWithProtocol()+":"+this.port_p};Connection.prototype.registCallback=function(callback){if(typeof(callback)=="function"){this.callback_p=callback}};Connection.prototype.changeStatus=function(target,status){switch(target){case this.IF_ALL:this.dev_status_p=status;this.ws_status_p=status;break;case this.IF_EPOSDEVICE:this.dev_status_p=status;break;default:this.ws_status_p=status;break}};Connection.prototype.status=function(target){if(target==this.IF_EPOSDEVICE){return this.dev_status_p}else{return this.ws_status_p}};Connection.prototype.isUsableDeviceIF=function(){return((this.usableIF_p&this.IF_EPOSDEVICE)==this.IF_EPOSDEVICE)};Connection.prototype.isUsablePrintIF=function(){if(this.isUsableDeviceIF()){return true}return((this.usableIF_p&this.IF_EPOSPRINT)==this.IF_EPOSPRINT)};Connection.prototype.isUsableDisplayIF=function(){if(this.isUsableDeviceIF()){return true}return((this.usableIF_p&this.IF_EPOSDISPLAY)==this.IF_EPOSDISPLAY)};Connection.prototype.registIFAccessResult=function(type,code){if(code==this.ACCESS_OK){this.changeStatus(type,this.CONNECT);this.usableIF_p|=type}if(type==this.IF_EPOSDEVICE){var result=this.ERROR_PARAMETER;if(this.usableIF_p&this.IF_ALL){if(this.protocol_p=="http"){result=this.OK}else{result=this.SSL_CONNECT_OK}}if(code==this.ACCESS_TIMEOUT){result=this.ERROR_TIMEOUT}if(this.callback_p!=null){try{this.callback_p(result)}catch(e){}this.callback_p=null}}};function ePosCrypto(){this.pubkey_c="";this.secretKey=""}ePosCrypto.prototype={genClientKeys:function(arg_prime_s,arg_pubkey_s){var g=str2bigInt("2",10);var prime_c=str2bigInt(arg_prime_s,16);var privkey_c=randBigInt(64,0);this.pubkey_c=powMod(g,privkey_c,prime_c);var intPubkey=str2bigInt(arg_pubkey_s,16);var modNum=powMod(intPubkey,privkey_c,prime_c);var strModNum=bigInt2str(modNum,16);var strSecretKey=strModNum.toLowerCase();while(strSecretKey.length<192){strSecretKey="0"+strSecretKey}this.secretKey=md5.bin(strSecretKey)},bfEncrypt:function(data){try{var enc_req={data:data,key:this.secretKey,mode:"cbc",round:16,iv:blowfish.mkIV()};var enc_data=blowfish.encrypt(enc_req);var cdata=base64.encode(enc_data)}catch(e){return""}return cdata},bfDecrypt:function(data){try{var dec_req={data:base64.decode(data),key:this.secretKey,mode:"cbc"};var ddata=blowfish.decrypt(dec_req)}catch(e){return""}return ddata}};function ePosDeviceMessage(){this.REQUEST={CONNECT:"connect",PUBKEY:"pubkey",ADMININFO:"admin_info",RECONNECT:"reconnect",DISCONNECT:"disconnect",OPENDEVICE:"open_device",CLOSEDEVICE:"close_device",DEVICEDATA:"device_data",SERVICEDATA:"service_data",ERROR:"error",OPENCOMMBOX:"open_commbox",CLOSECOMMBOX:"close_commbox",COMMDATA:"commbox_data"};this.request=null;this.sequence=0;this.deviceId="";this.serviceId="";this.data={};this.isCrypto="0";this.code="";this.data_id=0}ePosDeviceMessage.prototype={toTransmissionForm:function(){var message=null;switch(this.request){case this.REQUEST.PUBKEY:case this.REQUEST.ADMININFO:case this.REQUEST.RECONNECT:case this.REQUEST.DISCONNECT:message=[this.request,this.data];break;case this.REQUEST.OPENDEVICE:case this.REQUEST.CLOSEDEVICE:message=[this.request,this.deviceId,this.data,this.data_id];break;case this.REQUEST.DEVICEDATA:message=[this.request,this.sequence,this.deviceId,this.data,this.data_id];break;case this.REQUEST.SERVICEDATA:message=[this.request,this.sequence,this.serviceId,this.isCrypto,this.data,this.data_id];break;case this.REQUEST.OPENCOMMBOX:case this.REQUEST.CLOSECOMMBOX:case this.REQUEST.COMMDATA:message=[this.request,this.sequence,this.data,this.data_id];break;default:message=null}return message},};var MessageFactory=(function(){var PUBKEY_TEST_TEXT="hello";var sequence=0;var cipher=new ePosCrypto();getNextSequence=function(){sequence++;if(Number.MAX_VALUE==sequence){sequence=1}return String(sequence)};return{parseRequestMessage:function(message){var eposmsg=new ePosDeviceMessage();eposmsg.request=message[0];switch(eposmsg.request){case eposmsg.REQUEST.CONNECT:eposmsg.data=message[1];break;case eposmsg.REQUEST.PUBKEY:case eposmsg.REQUEST.ADMININFO:case eposmsg.REQUEST.RECONNECT:case eposmsg.REQUEST.DISCONNECT:eposmsg.code=message[1];eposmsg.data=message[2];break;case eposmsg.REQUEST.OPENDEVICE:case eposmsg.REQUEST.CLOSEDEVICE:eposmsg.deviceId=message[1];eposmsg.code=message[2];eposmsg.data=message[3];eposmsg.data_id=message[4];break;case eposmsg.REQUEST.DEVICEDATA:eposmsg.sequence=message[1];eposmsg.deviceId=message[2];eposmsg.data=message[3];eposmsg.data_id=message[4];break;case eposmsg.REQUEST.SERVICEDATA:eposmsg.sequence=message[1];eposmsg.serviceId=message[2];eposmsg.isCrypto=message[3];eposmsg.data=message[4];eposmsg.data_id=message[5];break;case eposmsg.REQUEST.OPENCOMMBOX:case eposmsg.REQUEST.CLOSECOMMBOX:case eposmsg.REQUEST.COMMDATA:eposmsg.sequence=message[1];eposmsg.data=message[2];eposmsg.data_id=message[3];break;case eposmsg.REQUEST.ERROR:eposmsg.sequence=message[1];eposmsg.deviceId=message[2];eposmsg.code=message[3];eposmsg.data=message[4];eposmsg.data_id=message[5];break;default:eposmsg=null}return eposmsg},getPubkeyMessage:function(prime,key){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.PUBKEY;cipher.genClientKeys(prime,key);var testData=cipher.bfEncrypt(PUBKEY_TEST_TEXT);var pubkey=bigInt2str(cipher.pubkey_c,16);while(pubkey.length<192){pubkey="0"+pubkey}eposmsg.data={key:pubkey,testData:testData};return eposmsg},getAdminInfoMessage:function(){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.ADMININFO;eposmsg.data={};return eposmsg},getReconnectMessage:function(prevId,curId,dataId){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.RECONNECT;eposmsg.data={old_client_id:prevId,new_client_id:curId,received_id:dataId};return eposmsg},getDisconnectMessage:function(connectionId){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.DISCONNECT;eposmsg.data={client_id:connectionId};return eposmsg},getOpenDeviceMessage:function(deviceId,deviceType,isCrypto,isBufferEnable){var eposmsg=new ePosDeviceMessage();var deviceTypeName=deviceType;if(deviceTypeName=="type_hybrid_printer2"){deviceTypeName="type_hybrid_printer"}eposmsg.request=eposmsg.REQUEST.OPENDEVICE;eposmsg.deviceId=deviceId;eposmsg.data={type:deviceTypeName,crypto:isCrypto,buffer:isBufferEnable};return eposmsg},getCloseDeviceMessage:function(deviceId){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.CLOSEDEVICE;eposmsg.deviceId=deviceId;eposmsg.data={};return eposmsg},getDeviceDataMessage:function(deviceId,data,crypto){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.DEVICEDATA;eposmsg.sequence=getNextSequence();eposmsg.deviceId=deviceId;if(crypto){eposmsg.data=cipher.bfEncrypt(JSON.stringify(data))}else{eposmsg.data=data}return eposmsg},getServiceMessage:function(serviceId,isCrypt,data){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.SERVICEDATA;eposmsg.sequence=getNextSequence();eposmsg.serviceId=serviceId;eposmsg.isCrypto=isCrypt;if(isCrypt){eposmsg.data=cipher.bfEncrypt(JSON.stringify(data))}else{eposmsg.data=data}return eposmsg},getOpenCommBoxMessage:function(data){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.OPENCOMMBOX;eposmsg.sequence=getNextSequence();eposmsg.data=data;return eposmsg},getCloseCommBoxMessage:function(data){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.CLOSECOMMBOX;eposmsg.sequence=getNextSequence();eposmsg.data=data;return eposmsg},getCommBoxDataMessage:function(data){var eposmsg=new ePosDeviceMessage();eposmsg.request=eposmsg.REQUEST.COMMDATA;eposmsg.sequence=getNextSequence();eposmsg.data=data;return eposmsg},decrypt:function(data){var decryptoData=cipher.bfDecrypt(data);return JSON.parse(decryptoData)},}}());function ePOSDeviceConfiguration(address){this.DEVICE_GROUP_ALL="group_all";this.DEVICE_GROUP_PRINTER="group_printer";this.DEVICE_GROUP_DISPLAY="group_display";this.DEVICE_GROUP_HID="group_hid";this.DEVICE_GROUP_SERIAL="group_serial";this.DEVICE_GROUP_OTHER="group_other";this.DEVICE_TYPE_PRINTER="type_printer";this.DEVICE_TYPE_HYBRID_PRINTER="type_hybrid_printer";this.DEVICE_TYPE_DISPLAY="type_display";this.DEVICE_TYPE_KEYBOARD="type_keyboard";this.DEVICE_TYPE_SCANNER="type_scanner";this.DEVICE_TYPE_MSR="type_msr";this.DEVICE_TYPE_CASH_CHANGER="type_cash_changer";this.DEVICE_TYPE_SIMPLE_SERIAL="type_simple_serial";this.DEVICE_TYPE_CASH_DRAWER="type_cash_drawer";this.DEVICE_TYPE_PIN_PAD="type_pin_pad";this.DEVICE_TYPE_CAT="type_cat";this.DEVICE_TYPE_SMARTCARD_RW="type_smartcard_rw";this.CGI_PATH="/epson_eposdevice/getDeviceList.cgi";this.RESULT_OK="OK";this.UNKNOWN="unknown";this.ONLINE="online";this.OFFLINE="offline";this.INTERVAL=500;this.TIMEOUT=60*1000;this.address=address;this.cb=null;this.message=null;this.WEBSOCKET_PORT=8008;this.SSLWEBSOCKET_PORT=8043}ePOSDeviceConfiguration.prototype.getRegisterdDevices=function(type,callback){this.cb=callback;var self=this;var xhr=null;var protocol=window.location.protocol+"//";var param="?group="+type;var url=protocol+this.address+this.CGI_PATH+param;if(window.XDomainRequest){xhr=new XDomainRequest();xhr.open("GET",url);xhr.onload=function(){self.message=self.RESULT_OK;var jsonObj=JSON.parse(xhr.responseText);self.checkDevice(jsonObj,function(resultList){for(var key in resultList){for(var i=0;i<jsonObj.length;i++){if(jsonObj[i].deviceId!=key){continue}jsonObj[i].status=resultList[key]}}if(self.cb!=null){self.cb(self,jsonObj);self.cb=null}})};xhr.onerror=function(){self.message="Failed to get device list.";if(self.cb!=null){self.cb(self,null);self.cb=null}}}else{xhr=new XMLHttpRequest();xhr.open("GET",url,true);xhr.setRequestHeader("Pragma","no-cache");xhr.setRequestHeader("Cache-Control","no-cache");xhr.setRequestHeader("If-Modified-Since","Thu, 01 Jun 1970 00:00:00 GMT");xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){self.message=self.RESULT_OK;var jsonObj=JSON.parse(xhr.responseText);self.checkDevice(jsonObj,function(resultList){for(var key in resultList){for(var i=0;i<jsonObj.length;i++){if(jsonObj[i].deviceId!=key){continue}jsonObj[i].status=resultList[key]}}if(self.cb!=null){self.cb(self,jsonObj);self.cb=null}})}else{self.message="Failed to get device list.";if(self.cb!=null){self.cb(self,null);self.cb=null}}}}}xhr.send(null)};ePOSDeviceConfiguration.prototype.checkDevice=function(obj,callback){var self=this;var protocol=window.location.protocol;var port=(protocol.match(/^(https:)/))?this.SSLWEBSOCKET_PORT:this.WEBSOCKET_PORT;var ePosDev=new epson.ePOSDevice();var resultList=new Array();for(var i=0;i<obj.length;i++){resultList[obj[i].deviceId]=self.UNKNOWN}ePosDev.onerror=function(sq,deviceId,result){if(deviceId!=""){resultList[deviceId]=self.OFFLINE}};ePosDev.connect(this.address,port,function(data){if((data=="OK")||(data=="SSL_CONNECT_OK")){for(var i=0;i<obj.length;i++){ePosDev.createDevice(obj[i].deviceId,obj[i].deviceType,{},function(data,code){resultList[data.deviceID]=(code=="OK")?self.ONLINE:self.OFFLINE;ePosDev.deleteDevice(data,null)})}}});var timer;timer=window.setInterval(function(){for(var key in resultList){if(resultList[key]==self.UNKNOWN){return}}clearInterval(timer);if(callback!=null){callback(resultList)}},self.INTERVAL);window.setTimeout(function(){clearInterval(timer);if(callback!=null){callback(resultList)}},self.TIMEOUT)};if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
/*! Socket.IO.js build:0.8.7, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
(function(exports,global){var io=exports;io.version="0.8.7";io.protocol=1;io.transports=[];io.j=[];io.sockets={};io.connect=function(host,details){var uri=io.util.parseUri(host),uuri,socket;if(global&&global.location){uri.protocol=uri.protocol||global.location.protocol.slice(0,-1);uri.host=uri.host||(global.document?global.document.domain:global.location.hostname);uri.port=uri.port||global.location.port}uuri=io.util.uniqueUri(uri);var options={host:uri.host,secure:"https"==uri.protocol,port:uri.port||("https"==uri.protocol?443:80),query:uri.query||""};io.util.merge(options,details);if(options["force new connection"]||!io.sockets[uuri]){socket=new io.Socket(options)}if(!options["force new connection"]&&socket){io.sockets[uuri]=socket}socket=socket||io.sockets[uuri];return socket.of(uri.path.length>1?uri.path:"")}})("object"===typeof module?module.exports:(this.io={}),this);(function(exports,global){var util=exports.util={};var re=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var parts=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];util.parseUri=function(str){var m=re.exec(str||""),uri={},i=14;while(i--){uri[parts[i]]=m[i]||""}return uri};util.uniqueUri=function(uri){var protocol=uri.protocol,host=uri.host,port=uri.port;if("document" in global){host=host||document.domain;port=port||(protocol=="https"&&document.location.protocol!=="https:"?443:document.location.port)}else{host=host||"localhost";if(!port&&protocol=="https"){port=443}}return(protocol||"http")+"://"+host+":"+(port||80)};util.query=function(base,addition){var query=util.chunkQuery(base||""),components=[];util.merge(query,util.chunkQuery(addition||""));for(var part in query){if(query.hasOwnProperty(part)){components.push(part+"="+query[part])}}return components.length?"?"+components.join("&"):""};util.chunkQuery=function(qs){var query={},params=qs.split("&"),i=0,l=params.length,kv;for(;i<l;++i){kv=params[i].split("=");if(kv[0]){query[kv[0]]=decodeURIComponent(kv[1])}}return query};var pageLoaded=false;util.load=function(fn){if("document" in global&&document.readyState==="complete"||pageLoaded){return fn()}util.on(global,"load",fn,false)};util.on=function(element,event,fn,capture){if(element.attachEvent){element.attachEvent("on"+event,fn)}else{if(element.addEventListener){element.addEventListener(event,fn,capture)}}};util.request=function(xdomain){if(xdomain&&"undefined"!=typeof XDomainRequest){return new XDomainRequest()}if("undefined"!=typeof XMLHttpRequest&&(!xdomain||util.ua.hasCORS)){return new XMLHttpRequest()}if(!xdomain){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}return null};if("undefined"!=typeof window){util.load(function(){pageLoaded=true})}util.defer=function(fn){if(!util.ua.webkit||"undefined"!=typeof importScripts){return fn()}util.load(function(){setTimeout(fn,100)})};util.merge=function merge(target,additional,deep,lastseen){var seen=lastseen||[],depth=typeof deep=="undefined"?2:deep,prop;for(prop in additional){if(additional.hasOwnProperty(prop)&&util.indexOf(seen,prop)<0){if(typeof target[prop]!=="object"||!depth){target[prop]=additional[prop];seen.push(additional[prop])}else{util.merge(target[prop],additional[prop],depth-1,seen)}}}return target};util.mixin=function(ctor,ctor2){util.merge(ctor.prototype,ctor2.prototype)};util.inherit=function(ctor,ctor2){function f(){}f.prototype=ctor2.prototype;ctor.prototype=new f};util.isArray=Array.isArray||function(obj){return Object.prototype.toString.call(obj)==="[object Array]"};util.intersect=function(arr,arr2){var ret=[],longest=arr.length>arr2.length?arr:arr2,shortest=arr.length>arr2.length?arr2:arr;for(var i=0,l=shortest.length;i<l;i++){if(~util.indexOf(longest,shortest[i])){ret.push(shortest[i])}}return ret};util.indexOf=function(arr,o,i){if(Array.prototype.indexOf){return Array.prototype.indexOf.call(arr,o,i)}for(var j=arr.length,i=i<0?i+j<0?0:i+j:i||0;i<j&&arr[i]!==o;i++){}return j<=i?-1:i};util.toArray=function(enu){var arr=[];for(var i=0,l=enu.length;i<l;i++){arr.push(enu[i])}return arr};util.ua={};util.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&(function(){try{var a=new XMLHttpRequest()}catch(e){return false}return a.withCredentials!=undefined})();util.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent)})("undefined"!=typeof io?io:module.exports,this);(function(exports,io){exports.EventEmitter=EventEmitter;function EventEmitter(){}EventEmitter.prototype.on=function(name,fn){if(!this.$events){this.$events={}}if(!this.$events[name]){this.$events[name]=fn}else{if(io.util.isArray(this.$events[name])){this.$events[name].push(fn)}else{this.$events[name]=[this.$events[name],fn]}}return this};EventEmitter.prototype.addListener=EventEmitter.prototype.on;EventEmitter.prototype.once=function(name,fn){var self=this;function on(){self.removeListener(name,on);fn.apply(this,arguments)}on.listener=fn;this.on(name,on);return this};EventEmitter.prototype.removeListener=function(name,fn){if(this.$events&&this.$events[name]){var list=this.$events[name];if(io.util.isArray(list)){var pos=-1;for(var i=0,l=list.length;i<l;i++){if(list[i]===fn||(list[i].listener&&list[i].listener===fn)){pos=i;break}}if(pos<0){return this}list.splice(pos,1);if(!list.length){delete this.$events[name]}}else{if(list===fn||(list.listener&&list.listener===fn)){delete this.$events[name]}}}return this};EventEmitter.prototype.removeAllListeners=function(name){if(this.$events&&this.$events[name]){this.$events[name]=null}return this};EventEmitter.prototype.listeners=function(name){if(!this.$events){this.$events={}}if(!this.$events[name]){this.$events[name]=[]}if(!io.util.isArray(this.$events[name])){this.$events[name]=[this.$events[name]]}return this.$events[name]};EventEmitter.prototype.emit=function(name){if(!this.$events){return false}var handler=this.$events[name];if(!handler){return false}var args=Array.prototype.slice.call(arguments,1);if("function"==typeof handler){handler.apply(this,args)}else{if(io.util.isArray(handler)){var listeners=handler.slice();for(var i=0,l=listeners.length;i<l;i++){listeners[i].apply(this,args)}}else{return false}}return true}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,nativeJSON){if(nativeJSON&&nativeJSON.parse){return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify}}var JSON=exports.JSON={};function f(n){return n<10?"0"+n:n}function date(d,key){return isFinite(d.valueOf())?d.getUTCFullYear()+"-"+f(d.getUTCMonth()+1)+"-"+f(d.getUTCDate())+"T"+f(d.getUTCHours())+":"+f(d.getUTCMinutes())+":"+f(d.getUTCSeconds())+"Z":null}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value instanceof Date){value=date(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})};JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}})("undefined"!=typeof io?io:module.exports,typeof JSON!=="undefined"?JSON:undefined);(function(exports,io){var parser=exports.parser={};var packets=parser.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"];var reasons=parser.reasons=["transport not supported","client not handshaken","unauthorized"];var advice=parser.advice=["reconnect"];var JSON=io.JSON,indexOf=io.util.indexOf;parser.encodePacket=function(packet){var type=indexOf(packets,packet.type),id=packet.id||"",endpoint=packet.endpoint||"",ack=packet.ack,data=null;switch(packet.type){case"error":var reason=packet.reason?indexOf(reasons,packet.reason):"",adv=packet.advice?indexOf(advice,packet.advice):"";if(reason!==""||adv!==""){data=reason+(adv!==""?("+"+adv):"")}break;case"message":if(packet.data!==""){data=packet.data}break;case"event":var ev={name:packet.name};if(packet.args&&packet.args.length){ev.args=packet.args}data=JSON.stringify(ev);break;case"json":data=JSON.stringify(packet.data);break;case"connect":if(packet.qs){data=packet.qs}break;case"ack":data=packet.ackId+(packet.args&&packet.args.length?"+"+JSON.stringify(packet.args):"");break}var encoded=[type,id+(ack=="data"?"+":""),endpoint];if(data!==null&&data!==undefined){encoded.push(data)}return encoded.join(":")};parser.encodePayload=function(packets){var decoded="";if(packets.length==1){return packets[0]}for(var i=0,l=packets.length;i<l;i++){var packet=packets[i];decoded+="\ufffd"+packet.length+"\ufffd"+packets[i]}return decoded};var regexp=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;parser.decodePacket=function(data){var pieces=data.match(regexp);if(!pieces){return{}}var id=pieces[2]||"",data=pieces[5]||"",packet={type:packets[pieces[1]],endpoint:pieces[4]||""};if(id){packet.id=id;if(pieces[3]){packet.ack="data"}else{packet.ack=true}}switch(packet.type){case"error":var pieces=data.split("+");packet.reason=reasons[pieces[0]]||"";packet.advice=advice[pieces[1]]||"";break;case"message":packet.data=data||"";break;case"event":try{var opts=JSON.parse(data);packet.name=opts.name;packet.args=opts.args}catch(e){}packet.args=packet.args||[];break;case"json":try{packet.data=JSON.parse(data)}catch(e){}break;case"connect":packet.qs=data||"";break;case"ack":var pieces=data.match(/^([0-9]+)(\+)?(.*)/);if(pieces){packet.ackId=pieces[1];packet.args=[];if(pieces[3]){try{packet.args=pieces[3]?JSON.parse(pieces[3]):[]}catch(e){}}}break;case"disconnect":case"heartbeat":break}return packet};parser.decodePayload=function(data){if(data.charAt(0)=="\ufffd"){var ret=[];for(var i=1,length="";i<data.length;i++){if(data.charAt(i)=="\ufffd"){ret.push(parser.decodePacket(data.substr(i+1).substr(0,length)));i+=Number(length)+1;length=""}else{length+=data.charAt(i)}}return ret}else{return[parser.decodePacket(data)]}}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,io){exports.Transport=Transport;function Transport(socket,sessid){this.socket=socket;this.sessid=sessid}io.util.mixin(Transport,io.EventEmitter);Transport.prototype.onData=function(data){this.clearCloseTimeout();if(this.socket.connected||this.socket.connecting||this.socket.reconnecting){this.setCloseTimeout()}if(data!==""){var msgs=io.parser.decodePayload(data);if(msgs&&msgs.length){for(var i=0,l=msgs.length;i<l;i++){this.onPacket(msgs[i])}}}return this};Transport.prototype.onPacket=function(packet){if(packet.type=="heartbeat"){return this.onHeartbeat()}if(packet.type=="connect"&&packet.endpoint==""){this.onConnect()}this.socket.onPacket(packet);return this};Transport.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var self=this;this.closeTimeout=setTimeout(function(){self.onDisconnect()},this.socket.closeTimeout)}};Transport.prototype.onDisconnect=function(){if(this.close&&this.open){this.close()}this.clearTimeouts();this.socket.onDisconnect();return this};Transport.prototype.onConnect=function(){this.socket.onConnect();return this};Transport.prototype.clearCloseTimeout=function(){if(this.closeTimeout){clearTimeout(this.closeTimeout);this.closeTimeout=null}};Transport.prototype.clearTimeouts=function(){this.clearCloseTimeout();if(this.reopenTimeout){clearTimeout(this.reopenTimeout)}};Transport.prototype.packet=function(packet){this.send(io.parser.encodePacket(packet))};Transport.prototype.onHeartbeat=function(heartbeat){this.packet({type:"heartbeat"})};Transport.prototype.onOpen=function(){this.open=true;this.clearCloseTimeout();this.socket.onOpen()};Transport.prototype.onClose=function(){var self=this;this.open=false;this.socket.onClose();this.onDisconnect()};Transport.prototype.prepareUrl=function(){var options=this.socket.options;return this.scheme()+"://"+options.host+":"+options.port+"/"+options.resource+"/"+io.protocol+"/"+this.name+"/"+this.sessid};Transport.prototype.ready=function(socket,fn){fn.call(this)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,io,global){exports.Socket=Socket;function Socket(options){this.options={port:80,secure:false,document:"document" in global?document:false,resource:"socket.io",transports:io.transports,"connect timeout":10000,"try multiple transports":true,reconnect:true,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3000,"max reconnection attempts":10,"sync disconnect on unload":true,"auto connect":true,"flash policy port":10843};io.util.merge(this.options,options);this.connected=false;this.open=false;this.connecting=false;this.reconnecting=false;this.namespaces={};this.buffer=[];this.doBuffer=false;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||io.util.ua.hasCORS)){var self=this;io.util.on(global,"beforeunload",function(){self.disconnectSync()},false)}if(this.options["auto connect"]){this.connect()}}io.util.mixin(Socket,io.EventEmitter);Socket.prototype.of=function(name){if(!this.namespaces[name]){this.namespaces[name]=new io.SocketNamespace(this,name);if(name!==""){this.namespaces[name].packet({type:"connect"})}}return this.namespaces[name]};Socket.prototype.publish=function(){this.emit.apply(this,arguments);var nsp;for(var i in this.namespaces){if(this.namespaces.hasOwnProperty(i)){nsp=this.of(i);nsp.$emit.apply(nsp,arguments)}}};function empty(){}Socket.prototype.handshake=function(fn){var self=this,options=this.options;function complete(data){if(data instanceof Error){self.onError(data.message)}else{fn.apply(null,data.split(":"))}}var url=["http"+(options.secure?"s":"")+":/",options.host+":"+options.port,options.resource,io.protocol,io.util.query(this.options.query,"t="+ +new Date)].join("/");var loadTimeout=setTimeout(function(){if(typeof script!=="undefined"){try{var srcIndex=script.src.lastIndexOf("=")+1;var arrayIndex=script.src.substring(srcIndex);io.j[arrayIndex]=function(data){script.parentNode.removeChild(script)}}catch(e){}}self.publish("connect_failed")},this.options["connect timeout"]);if(this.isXDomain()&&!io.util.ua.hasCORS){var insertAt=document.getElementsByTagName("script")[0],script=document.createElement("script");script.src=url+"&jsonp="+io.j.length;insertAt.parentNode.insertBefore(script,insertAt);io.j.push(function(data){clearTimeout(loadTimeout);complete(data);script.parentNode.removeChild(script)})}else{var xhr=io.util.request();xhr.open("GET",url,true);xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty;clearTimeout(loadTimeout);if(xhr.status==200){complete(xhr.responseText)}else{!self.reconnecting&&self.onError(xhr.responseText)}}};xhr.timeout=this.options["connect timeout"];xhr.send(null)}};Socket.prototype.getTransport=function(override){var transports=override||this.transports,match;for(var i=0,transport;transport=transports[i];i++){if(io.Transport[transport]&&io.Transport[transport].check(this)&&(!this.isXDomain()||io.Transport[transport].xdomainCheck())){return new io.Transport[transport](this,this.sessionid)}}return null};Socket.prototype.connect=function(fn){if(this.connecting){return this}var self=this;this.handshake(function(sid,heartbeat,close,transports){self.sessionid=sid;self.closeTimeout=close*1000;self.heartbeatTimeout=heartbeat*1000;self.transports=io.util.intersect(transports.split(","),self.options.transports);function connect(transports){if(self.transport){self.transport.clearTimeouts()}self.transport=self.getTransport(transports);if(!self.transport){return self.publish("connect_failed")}self.transport.ready(self,function(){self.connecting=true;self.publish("connecting",self.transport.name);self.transport.open();if(self.options["connect timeout"]){self.connectTimeoutTimer=setTimeout(function(){if(!self.connected){self.connecting=false;if(self.options["try multiple transports"]){if(!self.remainingTransports){self.remainingTransports=self.transports.slice(0)}var remaining=self.remainingTransports;while(remaining.length>0&&remaining.splice(0,1)[0]!=self.transport.name){}if(remaining.length){connect(remaining)}else{self.publish("connect_failed")}}}},self.options["connect timeout"])}})}connect();self.once("connect",function(){clearTimeout(self.connectTimeoutTimer);fn&&typeof fn=="function"&&fn()})});return this};Socket.prototype.packet=function(data){if(this.connected&&!this.doBuffer){this.transport.packet(data)}else{this.buffer.push(data)}return this};Socket.prototype.setBuffer=function(v){this.doBuffer=v;if(!v&&this.connected&&this.buffer.length){this.transport.payload(this.buffer);this.buffer=[]}};Socket.prototype.disconnect=function(){if(this.connected){if(this.open){this.of("").packet({type:"disconnect"})}this.onDisconnect("booted")}return this};Socket.prototype.disconnectSync=function(){var xhr=io.util.request(),uri=this.resource+"/"+io.protocol+"/"+this.sessionid;xhr.open("GET",uri,true);this.onDisconnect("booted")};Socket.prototype.isXDomain=function(){var port=global.location.port||("https:"==global.location.protocol?443:80);return this.options.host!==global.location.hostname||this.options.port!=port};Socket.prototype.onConnect=function(){if(!this.connected){this.connected=true;this.connecting=false;if(!this.doBuffer){this.setBuffer(false)}this.emit("connect")}};Socket.prototype.onOpen=function(){this.open=true};Socket.prototype.onClose=function(){this.open=false};Socket.prototype.onPacket=function(packet){this.of(packet.endpoint).onPacket(packet)};Socket.prototype.onError=function(err){if(err&&err.advice){if(err.advice==="reconnect"&&this.connected){this.disconnect();this.reconnect()}}this.publish("error",err&&err.reason?err.reason:err)};Socket.prototype.onDisconnect=function(reason){var wasConnected=this.connected;this.connected=false;this.connecting=false;this.open=false;if(wasConnected){this.transport.close();this.transport.clearTimeouts();this.publish("disconnect",reason);if("booted"!=reason&&this.options.reconnect&&!this.reconnecting){this.reconnect()}}};Socket.prototype.reconnect=function(){this.reconnecting=true;this.reconnectionAttempts=0;this.reconnectionDelay=this.options["reconnection delay"];var self=this,maxAttempts=this.options["max reconnection attempts"],tryMultiple=this.options["try multiple transports"],limit=this.options["reconnection limit"];function reset(){if(self.connected){for(var i in self.namespaces){if(self.namespaces.hasOwnProperty(i)&&""!==i){self.namespaces[i].packet({type:"connect"})}}self.publish("reconnect",self.transport.name,self.reconnectionAttempts)}self.removeListener("connect_failed",maybeReconnect);self.removeListener("connect",maybeReconnect);self.reconnecting=false;delete self.reconnectionAttempts;delete self.reconnectionDelay;delete self.reconnectionTimer;delete self.redoTransports;self.options["try multiple transports"]=tryMultiple}function maybeReconnect(){if(!self.reconnecting){return}if(self.connected){return reset()}if(self.connecting&&self.reconnecting){return self.reconnectionTimer=setTimeout(maybeReconnect,1000)}if(self.reconnectionAttempts++>=maxAttempts){if(!self.redoTransports){self.on("connect_failed",maybeReconnect);self.options["try multiple transports"]=true;self.transport=self.getTransport();self.redoTransports=true;self.connect()}else{self.publish("reconnect_failed");reset()}}else{if(self.reconnectionDelay<limit){self.reconnectionDelay*=2}self.connect();self.publish("reconnecting",self.reconnectionDelay,self.reconnectionAttempts);self.reconnectionTimer=setTimeout(maybeReconnect,self.reconnectionDelay)}}this.options["try multiple transports"]=false;this.reconnectionTimer=setTimeout(maybeReconnect,this.reconnectionDelay);this.on("connect",maybeReconnect)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(exports,io){exports.SocketNamespace=SocketNamespace;function SocketNamespace(socket,name){this.socket=socket;this.name=name||"";this.flags={};this.json=new Flag(this,"json");this.ackPackets=0;this.acks={}}io.util.mixin(SocketNamespace,io.EventEmitter);SocketNamespace.prototype.$emit=io.EventEmitter.prototype.emit;SocketNamespace.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)};SocketNamespace.prototype.packet=function(packet){packet.endpoint=this.name;this.socket.packet(packet);this.flags={};return this};SocketNamespace.prototype.send=function(data,fn){var packet={type:this.flags.json?"json":"message",data:data};if("function"==typeof fn){packet.id=++this.ackPackets;packet.ack=true;this.acks[packet.id]=fn}return this.packet(packet)};SocketNamespace.prototype.emit=function(name){var args=Array.prototype.slice.call(arguments,1),lastArg=args[args.length-1],packet={type:"event",name:name};if("function"==typeof lastArg){packet.id=++this.ackPackets;packet.ack="data";this.acks[packet.id]=lastArg;args=args.slice(0,args.length-1)}packet.args=args;return this.packet(packet)};SocketNamespace.prototype.disconnect=function(){if(this.name===""){this.socket.disconnect()}else{this.packet({type:"disconnect"});this.$emit("disconnect")}return this};SocketNamespace.prototype.onPacket=function(packet){var self=this;function ack(){self.packet({type:"ack",args:io.util.toArray(arguments),ackId:packet.id})}switch(packet.type){case"connect":this.$emit("connect");break;case"disconnect":if(this.name===""){this.socket.onDisconnect(packet.reason||"booted")}else{this.$emit("disconnect",packet.reason)}break;case"message":case"json":var params=["message",packet.data];if(packet.ack=="data"){params.push(ack)}else{if(packet.ack){this.packet({type:"ack",ackId:packet.id})}}this.$emit.apply(this,params);break;case"event":var params=[packet.name].concat(packet.args);if(packet.ack=="data"){params.push(ack)}this.$emit.apply(this,params);break;case"ack":if(this.acks[packet.ackId]){this.acks[packet.ackId].apply(this,packet.args);delete this.acks[packet.ackId]}break;case"error":if(packet.advice){this.socket.onError(packet)}else{if(packet.reason=="unauthorized"){this.$emit("connect_failed",packet.reason)}else{this.$emit("error",packet.reason)}}break}};function Flag(nsp,name){this.namespace=nsp;this.name=name}Flag.prototype.send=function(){this.namespace.flags[this.name]=true;this.namespace.send.apply(this.namespace,arguments)};Flag.prototype.emit=function(){this.namespace.flags[this.name]=true;this.namespace.emit.apply(this.namespace,arguments)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,io,global){exports.websocket=WS;function WS(socket){io.Transport.apply(this,arguments)}io.util.inherit(WS,io.Transport);WS.prototype.name="websocket";WS.prototype.open=function(){var query=io.util.query(this.socket.options.query),self=this,Socket;if(!Socket){Socket=global.MozWebSocket||global.WebSocket}this.websocket=new Socket(this.prepareUrl()+query);this.websocket.onopen=function(){self.onOpen();self.socket.setBuffer(false)};this.websocket.onmessage=function(ev){self.onData(ev.data)};this.websocket.onclose=function(){self.onClose();self.socket.setBuffer(true)};this.websocket.onerror=function(e){self.onError(e)};return this};WS.prototype.send=function(data){this.websocket.send(data);return this};WS.prototype.payload=function(arr){for(var i=0,l=arr.length;i<l;i++){this.packet(arr[i])}return this};WS.prototype.close=function(){this.websocket.close();return this};WS.prototype.onError=function(e){this.socket.onError(e)};WS.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"};WS.check=function(){return("WebSocket" in global&&!("__addTask" in WebSocket))||"MozWebSocket" in global};WS.xdomainCheck=function(){return true};io.transports.push("websocket")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(exports,io){exports.flashsocket=Flashsocket;function Flashsocket(){io.Transport.websocket.apply(this,arguments)}io.util.inherit(Flashsocket,io.Transport.websocket);Flashsocket.prototype.name="flashsocket";Flashsocket.prototype.open=function(){var self=this,args=arguments;WebSocket.__addTask(function(){io.Transport.websocket.prototype.open.apply(self,args)});return this};Flashsocket.prototype.send=function(){var self=this,args=arguments;WebSocket.__addTask(function(){io.Transport.websocket.prototype.send.apply(self,args)});return this};Flashsocket.prototype.close=function(){WebSocket.__tasks.length=0;io.Transport.websocket.prototype.close.call(this);return this};Flashsocket.prototype.ready=function(socket,fn){function init(){var options=socket.options,port=options["flash policy port"],path=["http"+(options.secure?"s":"")+":/",options.host+":"+options.port,options.resource,"static/flashsocket","WebSocketMain"+(socket.isXDomain()?"Insecure":"")+".swf"];if(!Flashsocket.loaded){if(typeof WEB_SOCKET_SWF_LOCATION==="undefined"){WEB_SOCKET_SWF_LOCATION=path.join("/")}if(port!==843){WebSocket.loadFlashPolicyFile("xmlsocket://"+options.host+":"+port)}WebSocket.__initialize();Flashsocket.loaded=true}fn.call(self)}var self=this;if(document.body){return init()}io.util.load(init)};Flashsocket.check=function(){if(typeof WebSocket=="undefined"||!("__initialize" in WebSocket)||!swfobject){return false}return swfobject.getFlashPlayerVersion().major>=10};Flashsocket.xdomainCheck=function(){return true};if(typeof window!="undefined"){WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=true}io.transports.push("flashsocket")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);if("undefined"!=typeof window){var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}()}(function(){if("undefined"==typeof window||window.WebSocket){return}var console=window.console;if(!console||!console.log||!console.error){console={log:function(){},error:function(){}}}if(!swfobject.hasFlashPlayerVersion("10.0.0")){console.error("Flash Player >= 10.0.0 is required.");return}if(location.protocol=="file:"){console.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://...")}WebSocket=function(url,protocols,proxyHost,proxyPort,headers){var self=this;self.__id=WebSocket.__nextId++;WebSocket.__instances[self.__id]=self;self.readyState=WebSocket.CONNECTING;self.bufferedAmount=0;self.__events={};if(!protocols){protocols=[]}else{if(typeof protocols=="string"){protocols=[protocols]}}setTimeout(function(){WebSocket.__addTask(function(){WebSocket.__flash.create(self.__id,url,protocols,proxyHost||null,proxyPort||0,headers||null)})},0)};WebSocket.prototype.send=function(data){if(this.readyState==WebSocket.CONNECTING){throw"INVALID_STATE_ERR: Web Socket connection has not been established"}var result=WebSocket.__flash.send(this.__id,encodeURIComponent(data));if(result<0){return true}else{this.bufferedAmount+=result;return false}};WebSocket.prototype.close=function(){if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING){return}this.readyState=WebSocket.CLOSING;WebSocket.__flash.close(this.__id)};WebSocket.prototype.addEventListener=function(type,listener,useCapture){if(!(type in this.__events)){this.__events[type]=[]}this.__events[type].push(listener)};WebSocket.prototype.removeEventListener=function(type,listener,useCapture){if(!(type in this.__events)){return}var events=this.__events[type];for(var i=events.length-1;i>=0;--i){if(events[i]===listener){events.splice(i,1);break}}};WebSocket.prototype.dispatchEvent=function(event){var events=this.__events[event.type]||[];for(var i=0;i<events.length;++i){events[i](event)}var handler=this["on"+event.type];if(handler){handler(event)}};WebSocket.prototype.__handleEvent=function(flashEvent){if("readyState" in flashEvent){this.readyState=flashEvent.readyState}if("protocol" in flashEvent){this.protocol=flashEvent.protocol}var jsEvent;if(flashEvent.type=="open"||flashEvent.type=="error"){jsEvent=this.__createSimpleEvent(flashEvent.type)}else{if(flashEvent.type=="close"){jsEvent=this.__createSimpleEvent("close")}else{if(flashEvent.type=="message"){var data=decodeURIComponent(flashEvent.message);jsEvent=this.__createMessageEvent("message",data)}else{throw"unknown event type: "+flashEvent.type}}}this.dispatchEvent(jsEvent)};WebSocket.prototype.__createSimpleEvent=function(type){if(document.createEvent&&window.Event){var event=document.createEvent("Event");event.initEvent(type,false,false);return event}else{return{type:type,bubbles:false,cancelable:false}}};WebSocket.prototype.__createMessageEvent=function(type,data){if(document.createEvent&&window.MessageEvent&&!window.opera){var event=document.createEvent("MessageEvent");event.initMessageEvent("message",false,false,data,null,null,window,null);return event}else{return{type:type,data:data,bubbles:false,cancelable:false}}};WebSocket.CONNECTING=0;WebSocket.OPEN=1;WebSocket.CLOSING=2;WebSocket.CLOSED=3;WebSocket.__flash=null;WebSocket.__instances={};WebSocket.__tasks=[];WebSocket.__nextId=0;WebSocket.loadFlashPolicyFile=function(url){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(url)})};WebSocket.__initialize=function(){if(WebSocket.__flash){return}if(WebSocket.__swfLocation){window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation}if(!window.WEB_SOCKET_SWF_LOCATION){console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");return}var container=document.createElement("div");container.id="webSocketContainer";container.style.position="absolute";if(WebSocket.__isFlashLite()){container.style.left="0px";container.style.top="0px"}else{container.style.left="-100px";container.style.top="-100px"}var holder=document.createElement("div");holder.id="webSocketFlash";container.appendChild(holder);document.body.appendChild(container);swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:true,swliveconnect:true,allowScriptAccess:"always"},null,function(e){if(!e.success){console.error("[WebSocket] swfobject.embedSWF failed")}})};WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash");WebSocket.__flash.setCallerUrl(location.href);WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var i=0;i<WebSocket.__tasks.length;++i){WebSocket.__tasks[i]()}WebSocket.__tasks=[]},0)};WebSocket.__onFlashEvent=function(){setTimeout(function(){try{var events=WebSocket.__flash.receiveEvents();for(var i=0;i<events.length;++i){WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i])}}catch(e){console.error(e)}},0);return true};WebSocket.__log=function(message){console.log(decodeURIComponent(message))};WebSocket.__error=function(message){console.error(decodeURIComponent(message))};WebSocket.__addTask=function(task){if(WebSocket.__flash){task()}else{WebSocket.__tasks.push(task)}};WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes){return false}var mimeType=window.navigator.mimeTypes["application/x-shockwave-flash"];if(!mimeType||!mimeType.enabledPlugin||!mimeType.enabledPlugin.filename){return false}return mimeType.enabledPlugin.filename.match(/flashlite/i)?true:false};if(!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION){if(window.addEventListener){window.addEventListener("load",function(){WebSocket.__initialize()},false)}else{window.attachEvent("onload",function(){WebSocket.__initialize()})}}})();(function(exports,io,global){exports.XHR=XHR;function XHR(socket){if(!socket){return}io.Transport.apply(this,arguments);this.sendBuffer=[]}io.util.inherit(XHR,io.Transport);XHR.prototype.open=function(){this.socket.setBuffer(false);this.onOpen();this.get();this.setCloseTimeout();return this};XHR.prototype.payload=function(payload){var msgs=[];for(var i=0,l=payload.length;i<l;i++){msgs.push(io.parser.encodePacket(payload[i]))}this.send(io.parser.encodePayload(msgs))};XHR.prototype.send=function(data){this.post(data);return this};function empty(){}XHR.prototype.post=function(data){var self=this;this.socket.setBuffer(true);function stateChange(){if(this.readyState==4){this.onreadystatechange=empty;self.posting=false;if(this.status==200){self.socket.setBuffer(false)}else{self.onClose()}}}function onload(){this.onload=empty;self.socket.setBuffer(false)}this.sendXHR=this.request("POST");if(global.XDomainRequest&&this.sendXHR instanceof XDomainRequest){this.sendXHR.onload=this.sendXHR.onerror=onload}else{this.sendXHR.onreadystatechange=stateChange}this.sendXHR.send(data)};XHR.prototype.close=function(){this.onClose();return this};XHR.prototype.request=function(method){var req=io.util.request(this.socket.isXDomain()),query=io.util.query(this.socket.options.query,"t="+ +new Date);req.open(method||"GET",this.prepareUrl()+query,true);if(method=="POST"){try{if(req.setRequestHeader){req.setRequestHeader("Content-type","text/plain;charset=UTF-8")}else{req.contentType="text/plain"}}catch(e){}}return req};XHR.prototype.scheme=function(){return this.socket.options.secure?"https":"http"};XHR.check=function(socket,xdomain){try{if(io.util.request(xdomain)){return true}}catch(e){}return false};XHR.xdomainCheck=function(){return XHR.check(null,true)}})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(exports,io){exports.htmlfile=HTMLFile;function HTMLFile(socket){io.Transport.XHR.apply(this,arguments)}io.util.inherit(HTMLFile,io.Transport.XHR);HTMLFile.prototype.name="htmlfile";HTMLFile.prototype.get=function(){this.doc=new ActiveXObject("htmlfile");this.doc.open();this.doc.write("<html></html>");this.doc.close();this.doc.parentWindow.s=this;var iframeC=this.doc.createElement("div");iframeC.className="socketio";this.doc.body.appendChild(iframeC);this.iframe=this.doc.createElement("iframe");iframeC.appendChild(this.iframe);var self=this,query=io.util.query(this.socket.options.query,"t="+ +new Date);this.iframe.src=this.prepareUrl()+query;io.util.on(window,"unload",function(){self.destroy()})};HTMLFile.prototype._=function(data,doc){this.onData(data);try{var script=doc.getElementsByTagName("script")[0];script.parentNode.removeChild(script)}catch(e){}};HTMLFile.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(e){}this.doc=null;this.iframe.parentNode.removeChild(this.iframe);this.iframe=null;CollectGarbage()}};HTMLFile.prototype.close=function(){this.destroy();return io.Transport.XHR.prototype.close.call(this)};HTMLFile.check=function(){if("ActiveXObject" in window){try{var a=new ActiveXObject("htmlfile");return a&&io.Transport.XHR.check()}catch(e){}}return false};HTMLFile.xdomainCheck=function(){return false};io.transports.push("htmlfile")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,io,global){exports["xhr-polling"]=XHRPolling;function XHRPolling(){io.Transport.XHR.apply(this,arguments)}io.util.inherit(XHRPolling,io.Transport.XHR);io.util.merge(XHRPolling,io.Transport.XHR);XHRPolling.prototype.name="xhr-polling";XHRPolling.prototype.open=function(){var self=this;io.Transport.XHR.prototype.open.call(self);return false};function empty(){}XHRPolling.prototype.get=function(){if(!this.open){return}var self=this;function stateChange(){if(this.readyState==4){this.onreadystatechange=empty;if(this.status==200){self.onData(this.responseText);self.get()}else{self.onClose()}}}function onload(){this.onload=empty;self.onData(this.responseText);self.get()}this.xhr=this.request();if(global.XDomainRequest&&this.xhr instanceof XDomainRequest){this.xhr.onload=this.xhr.onerror=onload}else{this.xhr.onreadystatechange=stateChange}this.xhr.send(null)};XHRPolling.prototype.onClose=function(){io.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=empty;try{this.xhr.abort()}catch(e){}this.xhr=null}};XHRPolling.prototype.ready=function(socket,fn){var self=this;io.util.defer(function(){fn.call(self)})};io.transports.push("xhr-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(exports,io,global){var indicator=global.document&&"MozAppearance" in global.document.documentElement.style;exports["jsonp-polling"]=JSONPPolling;function JSONPPolling(socket){io.Transport["xhr-polling"].apply(this,arguments);this.index=io.j.length;var self=this;io.j.push(function(msg){self._(msg)})}io.util.inherit(JSONPPolling,io.Transport["xhr-polling"]);JSONPPolling.prototype.name="jsonp-polling";JSONPPolling.prototype.post=function(data){var self=this,query=io.util.query(this.socket.options.query,"t="+(+new Date)+"&i="+this.index);if(!this.form){var form=document.createElement("form"),area=document.createElement("textarea"),id=this.iframeId="socketio_iframe_"+this.index,iframe;form.className="socketio";form.style.position="absolute";form.style.top="-1000px";form.style.left="-1000px";form.target=id;form.method="POST";form.setAttribute("accept-charset","utf-8");area.name="d";form.appendChild(area);document.body.appendChild(form);this.form=form;this.area=area}this.form.action=this.prepareUrl()+query;function complete(){initIframe();self.socket.setBuffer(false)}function initIframe(){if(self.iframe){self.form.removeChild(self.iframe)}try{iframe=document.createElement('<iframe name="'+self.iframeId+'">')}catch(e){iframe=document.createElement("iframe");iframe.name=self.iframeId}iframe.id=self.iframeId;self.form.appendChild(iframe);self.iframe=iframe}initIframe();this.area.value=io.JSON.stringify(data);try{this.form.submit()}catch(e){}if(this.iframe.attachEvent){iframe.onreadystatechange=function(){if(self.iframe.readyState=="complete"){complete()}}}else{this.iframe.onload=complete}this.socket.setBuffer(true)};JSONPPolling.prototype.get=function(){var self=this,script=document.createElement("script"),query=io.util.query(this.socket.options.query,"t="+(+new Date)+"&i="+this.index);if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}script.async=true;script.src=this.prepareUrl()+query;script.onerror=function(){self.onClose()};var insertAt=document.getElementsByTagName("script")[0];insertAt.parentNode.insertBefore(script,insertAt);this.script=script;if(indicator){setTimeout(function(){var iframe=document.createElement("iframe");document.body.appendChild(iframe);document.body.removeChild(iframe)},100)}};JSONPPolling.prototype._=function(msg){this.onData(msg);if(this.open){this.get()}return this};JSONPPolling.prototype.ready=function(socket,fn){var self=this;if(!indicator){return fn.call(this)}io.util.load(function(){fn.call(self)})};JSONPPolling.check=function(){return"document" in global};JSONPPolling.xdomainCheck=function(){return true};io.transports.push("jsonp-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);var JSON;if(!JSON){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());var base64=(function(undefined){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u={},v=0;while(v<64){u[t.charAt(v)]=v;v++}return{encode:function(d){var i=0,j=0,n,s=d+"\0\0",l=s.length-2,r=new Array((l+2)/3<<2);while(i<l){n=(s.charCodeAt(i++)&255)<<16|(s.charCodeAt(i++)&255)<<8|(s.charCodeAt(i++)&255);r[j++]=t.charAt(n>>18&63);r[j++]=t.charAt(n>>12&63);r[j++]=t.charAt(n>>6&63);r[j++]=t.charAt(n&63)}while(i>l){r[--j]="=";i--}return r.join("")},decode:function(d){var i=0,j=0,n,s=d.replace(/[^A-Za-z0-9\+\/]/g,"")+"AAA",l=s.length-3,r=new Array((l+3>>2)*3),x=String.fromCharCode;while(i<l){n=u[s.charAt(i++)]<<18|u[s.charAt(i++)]<<12|u[s.charAt(i++)]<<6|u[s.charAt(i++)];r[j++]=x(n>>16&255);r[j++]=x(n>>8&255);r[j++]=x(n&255)}r.length=j-i+l;return r.join("")}}})();bpe=0;mask=0;radix=mask+1;digitsStr="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\'\"+-";for(bpe=0;(1<<(bpe+1))>(1<<bpe);bpe++){}bpe>>=1;mask=(1<<bpe)-1;radix=mask+1;one=int2bigInt(1,1,1);t=new Array(0);ss=t;s0=t;s1=t;s2=t;s3=t;s4=t;s5=t;s6=t;s7=t;T=t;sa=t;mr_x1=t;mr_r=t;mr_a=t;eg_v=t;eg_u=t;eg_A=t;eg_B=t;eg_C=t;eg_D=t;md_q1=t;md_q2=t;md_q3=t;md_r=t;md_r1=t;md_r2=t;md_tt=t;primes=t;pows=t;s_i=t;s_i2=t;s_R=t;s_rm=t;s_q=t;s_n1=t;s_a=t;s_r2=t;s_n=t;s_b=t;s_d=t;s_x1=t;s_x2=t,s_aa=t;rpprb=t;function findPrimes(n){var i,s,p,ans;s=new Array(n);for(i=0;i<n;i++){s[i]=0}s[0]=2;p=0;for(;s[p]<n;){for(i=s[p]*s[p];i<n;i+=s[p]){s[i]=1}p++;s[p]=s[p-1]+1;for(;s[p]<n&&s[s[p]];s[p]++){}}ans=new Array(p);for(i=0;i<p;i++){ans[i]=s[i]}return ans}function millerRabinInt(x,b){if(mr_x1.length!=x.length){mr_x1=dup(x);mr_r=dup(x);mr_a=dup(x)}copyInt_(mr_a,b);return millerRabin(x,mr_a)}function millerRabin(x,b){var i,j,k,s;if(mr_x1.length!=x.length){mr_x1=dup(x);mr_r=dup(x);mr_a=dup(x)}copy_(mr_a,b);copy_(mr_r,x);copy_(mr_x1,x);addInt_(mr_r,-1);addInt_(mr_x1,-1);k=0;for(i=0;i<mr_r.length;i++){for(j=1;j<mask;j<<=1){if(x[i]&j){s=(k<mr_r.length+bpe?k:0);i=mr_r.length;j=mask}else{k++}}}if(s){rightShift_(mr_r,s)}powMod_(mr_a,mr_r,x);if(!equalsInt(mr_a,1)&&!equals(mr_a,mr_x1)){j=1;while(j<=s-1&&!equals(mr_a,mr_x1)){squareMod_(mr_a,x);if(equalsInt(mr_a,1)){return 0}j++}if(!equals(mr_a,mr_x1)){return 0}}return 1}function bitSize(x){var j,z,w;for(j=x.length-1;(x[j]==0)&&(j>0);j--){}for(z=0,w=x[j];w;(w>>=1),z++){}z+=bpe*j;return z}function expand(x,n){var ans=int2bigInt(0,(x.length>n?x.length:n)*bpe,0);copy_(ans,x);return ans}function randTruePrime(k){var ans=int2bigInt(0,k,0);randTruePrime_(ans,k);return trim(ans,1)}function randProbPrime(k){if(k>=600){return randProbPrimeRounds(k,2)}if(k>=550){return randProbPrimeRounds(k,4)}if(k>=500){return randProbPrimeRounds(k,5)}if(k>=400){return randProbPrimeRounds(k,6)}if(k>=350){return randProbPrimeRounds(k,7)}if(k>=300){return randProbPrimeRounds(k,9)}if(k>=250){return randProbPrimeRounds(k,12)}if(k>=200){return randProbPrimeRounds(k,15)}if(k>=150){return randProbPrimeRounds(k,18)}if(k>=100){return randProbPrimeRounds(k,27)}return randProbPrimeRounds(k,40)}function randProbPrimeRounds(k,n){var ans,i,divisible,B;B=30000;ans=int2bigInt(0,k,0);if(primes.length==0){primes=findPrimes(30000)}if(rpprb.length!=ans.length){rpprb=dup(ans)}for(;;){randBigInt_(ans,k,0);ans[0]|=1;divisible=0;for(i=0;(i<primes.length)&&(primes[i]<=B);i++){if(modInt(ans,primes[i])==0&&!equalsInt(ans,primes[i])){divisible=1;break}}for(i=0;i<n&&!divisible;i++){randBigInt_(rpprb,k,0);while(!greater(ans,rpprb)){randBigInt_(rpprb,k,0)}if(!millerRabin(ans,rpprb)){divisible=1}}if(!divisible){return ans}}}function mod(x,n){var ans=dup(x);mod_(ans,n);return trim(ans,1)}function addInt(x,n){var ans=expand(x,x.length+1);addInt_(ans,n);return trim(ans,1)}function mult(x,y){var ans=expand(x,x.length+y.length);mult_(ans,y);return trim(ans,1)}function powMod(x,y,n){var ans=expand(x,n.length);powMod_(ans,trim(y,2),trim(n,2),0);return trim(ans,1)}function sub(x,y){var ans=expand(x,(x.length>y.length?x.length+1:y.length+1));sub_(ans,y);return trim(ans,1)}function add(x,y){var ans=expand(x,(x.length>y.length?x.length+1:y.length+1));add_(ans,y);return trim(ans,1)}function inverseMod(x,n){var ans=expand(x,n.length);var s;s=inverseMod_(ans,n);return s?trim(ans,1):null}function multMod(x,y,n){var ans=expand(x,n.length);multMod_(ans,y,n);return trim(ans,1)}function randTruePrime_(ans,k){var c,m,pm,dd,j,r,B,divisible,z,zz,recSize;if(primes.length==0){primes=findPrimes(30000)}if(pows.length==0){pows=new Array(512);for(j=0;j<512;j++){pows[j]=Math.pow(2,j/511-1)}}c=0.1;m=20;recLimit=20;if(s_i2.length!=ans.length){s_i2=dup(ans);s_R=dup(ans);s_n1=dup(ans);s_r2=dup(ans);s_d=dup(ans);s_x1=dup(ans);s_x2=dup(ans);s_b=dup(ans);s_n=dup(ans);s_i=dup(ans);s_rm=dup(ans);s_q=dup(ans);s_a=dup(ans);s_aa=dup(ans)}if(k<=recLimit){pm=(1<<((k+2)>>1))-1;copyInt_(ans,0);for(dd=1;dd;){dd=0;ans[0]=1|(1<<(k-1))|Math.floor(Math.random()*(1<<k));for(j=1;(j<primes.length)&&((primes[j]&pm)==primes[j]);j++){if(0==(ans[0]%primes[j])){dd=1;break}}}carry_(ans);return}B=c*k*k;if(k>2*m){for(r=1;k-k*r<=m;){r=pows[Math.floor(Math.random()*512)]}}else{r=0.5}recSize=Math.floor(r*k)+1;randTruePrime_(s_q,recSize);copyInt_(s_i2,0);s_i2[Math.floor((k-2)/bpe)]|=(1<<((k-2)%bpe));divide_(s_i2,s_q,s_i,s_rm);z=bitSize(s_i);for(;;){for(;;){randBigInt_(s_R,z,0);if(greater(s_i,s_R)){break}}addInt_(s_R,1);add_(s_R,s_i);copy_(s_n,s_q);mult_(s_n,s_R);multInt_(s_n,2);addInt_(s_n,1);copy_(s_r2,s_R);multInt_(s_r2,2);for(divisible=0,j=0;(j<primes.length)&&(primes[j]<B);j++){if(modInt(s_n,primes[j])==0&&!equalsInt(s_n,primes[j])){divisible=1;break}}if(!divisible){if(!millerRabinInt(s_n,2)){divisible=1}}if(!divisible){addInt_(s_n,-3);for(j=s_n.length-1;(s_n[j]==0)&&(j>0);j--){}for(zz=0,w=s_n[j];w;(w>>=1),zz++){}zz+=bpe*j;for(;;){randBigInt_(s_a,zz,0);if(greater(s_n,s_a)){break}}addInt_(s_n,3);addInt_(s_a,2);copy_(s_b,s_a);copy_(s_n1,s_n);addInt_(s_n1,-1);powMod_(s_b,s_n1,s_n);addInt_(s_b,-1);if(isZero(s_b)){copy_(s_b,s_a);powMod_(s_b,s_r2,s_n);addInt_(s_b,-1);copy_(s_aa,s_n);copy_(s_d,s_b);GCD_(s_d,s_n);if(equalsInt(s_d,1)){copy_(ans,s_aa);return}}}}}function randBigInt(n,s){var a,b;a=Math.floor((n-1)/bpe)+2;b=int2bigInt(0,0,a);randBigInt_(b,n,s);return b}function randBigInt_(b,n,s){var i,a;for(i=0;i<b.length;i++){b[i]=0}a=Math.floor((n-1)/bpe)+1;for(i=0;i<a;i++){b[i]=Math.floor(Math.random()*(1<<(bpe-1)))}b[a-1]&=(2<<((n-1)%bpe))-1;if(s==1){b[a-1]|=(1<<((n-1)%bpe))}}function GCD(x,y){var xc,yc;xc=dup(x);yc=dup(y);GCD_(xc,yc);return xc}function GCD_(x,y){var i,xp,yp,A,B,C,D,q,sing;if(T.length!=x.length){T=dup(x)}sing=1;while(sing){sing=0;for(i=1;i<y.length;i++){if(y[i]){sing=1;break}}if(!sing){break}for(i=x.length;!x[i]&&i>=0;i--){}xp=x[i];yp=y[i];A=1;B=0;C=0;D=1;while((yp+C)&&(yp+D)){q=Math.floor((xp+A)/(yp+C));qp=Math.floor((xp+B)/(yp+D));if(q!=qp){break}t=A-q*C;A=C;C=t;t=B-q*D;B=D;D=t;t=xp-q*yp;xp=yp;yp=t}if(B){copy_(T,x);linComb_(x,y,A,B);linComb_(y,T,D,C)}else{mod_(x,y);copy_(T,x);copy_(x,y);copy_(y,T)}}if(y[0]==0){return}t=modInt(x,y[0]);copyInt_(x,y[0]);y[0]=t;while(y[0]){x[0]%=y[0];t=x[0];x[0]=y[0];y[0]=t}}function inverseMod_(x,n){var k=1+2*Math.max(x.length,n.length);if(!(x[0]&1)&&!(n[0]&1)){copyInt_(x,0);return 0}if(eg_u.length!=k){eg_u=new Array(k);eg_v=new Array(k);eg_A=new Array(k);eg_B=new Array(k);eg_C=new Array(k);eg_D=new Array(k)}copy_(eg_u,x);copy_(eg_v,n);copyInt_(eg_A,1);copyInt_(eg_B,0);copyInt_(eg_C,0);copyInt_(eg_D,1);for(;;){while(!(eg_u[0]&1)){halve_(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){halve_(eg_A);halve_(eg_B)}else{add_(eg_A,n);halve_(eg_A);sub_(eg_B,x);halve_(eg_B)}}while(!(eg_v[0]&1)){halve_(eg_v);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){halve_(eg_C);halve_(eg_D)}else{add_(eg_C,n);halve_(eg_C);sub_(eg_D,x);halve_(eg_D)}}if(!greater(eg_v,eg_u)){sub_(eg_u,eg_v);sub_(eg_A,eg_C);sub_(eg_B,eg_D)}else{sub_(eg_v,eg_u);sub_(eg_C,eg_A);sub_(eg_D,eg_B)}if(equalsInt(eg_u,0)){if(negative(eg_C)){add_(eg_C,n)}copy_(x,eg_C);if(!equalsInt(eg_v,1)){copyInt_(x,0);return 0}return 1}}}function inverseModInt(x,n){var a=1,b=0,t;for(;;){if(x==1){return a}if(x==0){return 0}b-=a*Math.floor(n/x);n%=x;if(n==1){return b}if(n==0){return 0}a-=b*Math.floor(x/n);x%=n}}function inverseModInt_(x,n){return inverseModInt(x,n)}function eGCD_(x,y,v,a,b){var g=0;var k=Math.max(x.length,y.length);if(eg_u.length!=k){eg_u=new Array(k);eg_A=new Array(k);eg_B=new Array(k);eg_C=new Array(k);eg_D=new Array(k)}while(!(x[0]&1)&&!(y[0]&1)){halve_(x);halve_(y);g++}copy_(eg_u,x);copy_(v,y);copyInt_(eg_A,1);copyInt_(eg_B,0);copyInt_(eg_C,0);copyInt_(eg_D,1);for(;;){while(!(eg_u[0]&1)){halve_(eg_u);if(!(eg_A[0]&1)&&!(eg_B[0]&1)){halve_(eg_A);halve_(eg_B)}else{add_(eg_A,y);halve_(eg_A);sub_(eg_B,x);halve_(eg_B)}}while(!(v[0]&1)){halve_(v);if(!(eg_C[0]&1)&&!(eg_D[0]&1)){halve_(eg_C);halve_(eg_D)}else{add_(eg_C,y);halve_(eg_C);sub_(eg_D,x);halve_(eg_D)}}if(!greater(v,eg_u)){sub_(eg_u,v);sub_(eg_A,eg_C);sub_(eg_B,eg_D)}else{sub_(v,eg_u);sub_(eg_C,eg_A);sub_(eg_D,eg_B)}if(equalsInt(eg_u,0)){if(negative(eg_C)){add_(eg_C,y);sub_(eg_D,x)}multInt_(eg_D,-1);copy_(a,eg_C);copy_(b,eg_D);leftShift_(v,g);return}}}function negative(x){return((x[x.length-1]>>(bpe-1))&1)}function greaterShift(x,y,shift){var i,kx=x.length,ky=y.length;k=((kx+shift)<ky)?(kx+shift):ky;for(i=ky-1-shift;i<kx&&i>=0;i++){if(x[i]>0){return 1}}for(i=kx-1+shift;i<ky;i++){if(y[i]>0){return 0}}for(i=k-1;i>=shift;i--){if(x[i-shift]>y[i]){return 1}else{if(x[i-shift]<y[i]){return 0}}}return 0}function greater(x,y){var i;var k=(x.length<y.length)?x.length:y.length;for(i=x.length;i<y.length;i++){if(y[i]){return 0}}for(i=y.length;i<x.length;i++){if(x[i]){return 1}}for(i=k-1;i>=0;i--){if(x[i]>y[i]){return 1}else{if(x[i]<y[i]){return 0}}}return 0}function divide_(x,y,q,r){var kx,ky;var i,j,y1,y2,c,a,b;copy_(r,x);for(ky=y.length;y[ky-1]==0;ky--){}b=y[ky-1];for(a=0;b;a++){b>>=1}a=bpe-a;leftShift_(y,a);leftShift_(r,a);for(kx=r.length;r[kx-1]==0&&kx>ky;kx--){}copyInt_(q,0);while(!greaterShift(y,r,kx-ky)){subShift_(r,y,kx-ky);q[kx-ky]++}for(i=kx-1;i>=ky;i--){if(r[i]==y[ky-1]){q[i-ky]=mask}else{q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1])}for(;;){y2=(ky>1?y[ky-2]:0)*q[i-ky];c=y2>>bpe;y2=y2&mask;y1=c+q[i-ky]*y[ky-1];c=y1>>bpe;y1=y1&mask;if(c==r[i]?y1==r[i-1]?y2>(i>1?r[i-2]:0):y1>r[i-1]:c>r[i]){q[i-ky]--}else{break}}linCombShift_(r,y,-q[i-ky],i-ky);if(negative(r)){addShift_(r,y,i-ky);q[i-ky]--}}rightShift_(y,a);rightShift_(r,a)}function carry_(x){var i,k,c,b;k=x.length;c=0;for(i=0;i<k;i++){c+=x[i];b=0;if(c<0){b=-(c>>bpe);c+=b*radix}x[i]=c&mask;c=(c>>bpe)-b}}function modInt(x,n){var i,c=0;for(i=x.length-1;i>=0;i--){c=(c*radix+x[i])%n}return c}function int2bigInt(t,bits,minSize){var i,k;k=Math.ceil(bits/bpe)+1;k=minSize>k?minSize:k;buff=new Array(k);copyInt_(buff,t);return buff}function str2bigInt(s,base,minSize){var d,i,j,x,y,kk;var k=s.length;if(base==-1){x=new Array(0);for(;;){y=new Array(x.length+1);for(i=0;i<x.length;i++){y[i+1]=x[i]}y[0]=parseInt(s,10);x=y;d=s.indexOf(",",0);if(d<1){break}s=s.substring(d+1);if(s.length==0){break}}if(x.length<minSize){y=new Array(minSize);copy_(y,x);return y}return x}x=int2bigInt(0,base*k,0);for(i=0;i<k;i++){d=digitsStr.indexOf(s.substring(i,i+1),0);if(base<=36&&d>=36){d-=26}if(d>=base||d<0){break}multInt_(x,base);addInt_(x,d)}for(k=x.length;k>0&&!x[k-1];k--){}k=minSize>k+1?minSize:k+1;y=new Array(k);kk=k<x.length?k:x.length;for(i=0;i<kk;i++){y[i]=x[i]}for(;i<k;i++){y[i]=0}return y}function equalsInt(x,y){var i;if(x[0]!=y){return 0}for(i=1;i<x.length;i++){if(x[i]){return 0}}return 1}function equals(x,y){var i;var k=x.length<y.length?x.length:y.length;for(i=0;i<k;i++){if(x[i]!=y[i]){return 0}}if(x.length>y.length){for(;i<x.length;i++){if(x[i]){return 0}}}else{for(;i<y.length;i++){if(y[i]){return 0}}}return 1}function isZero(x){var i;for(i=0;i<x.length;i++){if(x[i]){return 0}}return 1}function bigInt2str(x,base){var i,t,s="";if(s6.length!=x.length){s6=dup(x)}else{copy_(s6,x)}if(base==-1){for(i=x.length-1;i>0;i--){s+=x[i]+","}s+=x[0]}else{while(!isZero(s6)){t=divInt_(s6,base);s=digitsStr.substring(t,t+1)+s}}if(s.length==0){s="0"}return s}function dup(x){var i;buff=new Array(x.length);copy_(buff,x);return buff}function copy_(x,y){var i;var k=x.length<y.length?x.length:y.length;for(i=0;i<k;i++){x[i]=y[i]}for(i=k;i<x.length;i++){x[i]=0}}function copyInt_(x,n){var i,c;for(c=n,i=0;i<x.length;i++){x[i]=c&mask;c>>=bpe}}function addInt_(x,n){var i,k,c,b;x[0]+=n;k=x.length;c=0;for(i=0;i<k;i++){c+=x[i];b=0;if(c<0){b=-(c>>bpe);c+=b*radix}x[i]=c&mask;c=(c>>bpe)-b;if(!c){return}}}function rightShift_(x,n){var i;var k=Math.floor(n/bpe);if(k){for(i=0;i<x.length-k;i++){x[i]=x[i+k]}for(;i<x.length;i++){x[i]=0}n%=bpe}for(i=0;i<x.length-1;i++){x[i]=mask&((x[i+1]<<(bpe-n))|(x[i]>>n))}x[i]>>=n}function halve_(x){var i;for(i=0;i<x.length-1;i++){x[i]=mask&((x[i+1]<<(bpe-1))|(x[i]>>1))}x[i]=(x[i]>>1)|(x[i]&(radix>>1))}function leftShift_(x,n){var i;var k=Math.floor(n/bpe);if(k){for(i=x.length;i>=k;i--){x[i]=x[i-k]}for(;i>=0;i--){x[i]=0}n%=bpe}if(!n){return}for(i=x.length-1;i>0;i--){x[i]=mask&((x[i]<<n)|(x[i-1]>>(bpe-n)))}x[i]=mask&(x[i]<<n)}function multInt_(x,n){var i,k,c,b;if(!n){return}k=x.length;c=0;for(i=0;i<k;i++){c+=x[i]*n;b=0;if(c<0){b=-(c>>bpe);c+=b*radix}x[i]=c&mask;c=(c>>bpe)-b}}function divInt_(x,n){var i,r=0,s;for(i=x.length-1;i>=0;i--){s=r*radix+x[i];x[i]=Math.floor(s/n);r=s%n}return r}function linComb_(x,y,a,b){var i,c,k,kk;k=x.length<y.length?x.length:y.length;kk=x.length;for(c=0,i=0;i<k;i++){c+=a*x[i]+b*y[i];x[i]=c&mask;c>>=bpe}for(i=k;i<kk;i++){c+=a*x[i];x[i]=c&mask;c>>=bpe}}function linCombShift_(x,y,b,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]+b*y[i-ys];x[i]=c&mask;c>>=bpe}for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe}}function addShift_(x,y,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]+y[i-ys];x[i]=c&mask;c>>=bpe}for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe}}function subShift_(x,y,ys){var i,c,k,kk;k=x.length<ys+y.length?x.length:ys+y.length;kk=x.length;for(c=0,i=ys;i<k;i++){c+=x[i]-y[i-ys];x[i]=c&mask;c>>=bpe}for(i=k;c&&i<kk;i++){c+=x[i];x[i]=c&mask;c>>=bpe}}function sub_(x,y){var i,c,k,kk;k=x.length<y.length?x.length:y.length;for(c=0,i=0;i<k;i++){c+=x[i]-y[i];x[i]=c&mask;c>>=bpe}for(i=k;c&&i<x.length;i++){c+=x[i];x[i]=c&mask;c>>=bpe}}function add_(x,y){var i,c,k,kk;k=x.length<y.length?x.length:y.length;for(c=0,i=0;i<k;i++){c+=x[i]+y[i];x[i]=c&mask;c>>=bpe}for(i=k;c&&i<x.length;i++){c+=x[i];x[i]=c&mask;c>>=bpe}}function mult_(x,y){var i;if(ss.length!=2*x.length){ss=new Array(2*x.length)}copyInt_(ss,0);for(i=0;i<y.length;i++){if(y[i]){linCombShift_(ss,x,y[i],i)}}copy_(x,ss)}function mod_(x,n){if(s4.length!=x.length){s4=dup(x)}else{copy_(s4,x)}if(s5.length!=x.length){s5=dup(x)}divide_(s4,n,s5,x)}function multMod_(x,y,n){var i;if(s0.length!=2*x.length){s0=new Array(2*x.length)}copyInt_(s0,0);for(i=0;i<y.length;i++){if(y[i]){linCombShift_(s0,x,y[i],i)}}mod_(s0,n);copy_(x,s0)}function squareMod_(x,n){var i,j,d,c,kx,kn,k;for(kx=x.length;kx>0&&!x[kx-1];kx--){}k=kx>n.length?2*kx:2*n.length;if(s0.length!=k){s0=new Array(k)}copyInt_(s0,0);for(i=0;i<kx;i++){c=s0[2*i]+x[i]*x[i];s0[2*i]=c&mask;c>>=bpe;for(j=i+1;j<kx;j++){c=s0[i+j]+2*x[i]*x[j]+c;s0[i+j]=(c&mask);c>>=bpe}s0[i+kx]=c}mod_(s0,n);copy_(x,s0)}function trim(x,k){var i,y;for(i=x.length;i>0&&!x[i-1];i--){}y=new Array(i+k);copy_(y,x);return y}function powMod_(x,y,n){var k1,k2,kn,np;if(s7.length!=n.length){s7=dup(n)}if((n[0]&1)==0){copy_(s7,x);copyInt_(x,1);while(!equalsInt(y,0)){if(y[0]&1){multMod_(x,s7,n)}divInt_(y,2);squareMod_(s7,n)}return}copyInt_(s7,0);for(kn=n.length;kn>0&&!n[kn-1];kn--){}np=radix-inverseModInt(modInt(n,radix),radix);s7[kn]=1;multMod_(x,s7,n);if(s3.length!=x.length){s3=dup(x)}else{copy_(s3,x)}for(k1=y.length-1;k1>0&!y[k1];k1--){}if(y[k1]==0){copyInt_(x,1);return}for(k2=1<<(bpe-1);k2&&!(y[k1]&k2);k2>>=1){}for(;;){if(!(k2>>=1)){k1--;if(k1<0){mont_(x,one,n,np);return}k2=1<<(bpe-1)}mont_(x,x,n,np);if(k2&y[k1]){mont_(x,s3,n,np)}}}function mont_(x,y,n,np){var i,j,c,ui,t,ks;var kn=n.length;var ky=y.length;if(sa.length!=kn){sa=new Array(kn)}copyInt_(sa,0);for(;kn>0&&n[kn-1]==0;kn--){}for(;ky>0&&y[ky-1]==0;ky--){}ks=sa.length-1;for(i=0;i<kn;i++){t=sa[0]+x[i]*y[0];ui=((t&mask)*np)&mask;c=(t+ui*n[0])>>bpe;t=x[i];j=1;for(;j<ky-4;){c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++}for(;j<ky;){c+=sa[j]+ui*n[j]+t*y[j];sa[j-1]=c&mask;c>>=bpe;j++}for(;j<kn-4;){c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++;c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++}for(;j<kn;){c+=sa[j]+ui*n[j];sa[j-1]=c&mask;c>>=bpe;j++}for(;j<ks;){c+=sa[j];sa[j-1]=c&mask;c>>=bpe;j++}sa[j-1]=c&mask}if(!greater(n,sa)){sub_(sa,n)}copy_(x,sa)}var blowfish=(function(undefined){var P=[608135816,2242054355,320440878,57701188,2752067618,698298832,137296536,3964562569,1160258022,953160567,3193202383,887688300,3232508343,3380367581,1065670069,3041331479,2450970073,2306472731],S1=[3509652390,2564797868,805139163,3491422135,3101798381,1780907670,3128725573,4046225305,614570311,3012652279,134345442,2240740374,1667834072,1901547113,2757295779,4103290238,227898511,1921955416,1904987480,2182433518,2069144605,3260701109,2620446009,720527379,3318853667,677414384,3393288472,3101374703,2390351024,1614419982,1822297739,2954791486,3608508353,3174124327,2024746970,1432378464,3864339955,2857741204,1464375394,1676153920,1439316330,715854006,3033291828,289532110,2706671279,2087905683,3018724369,1668267050,732546397,1947742710,3462151702,2609353502,2950085171,1814351708,2050118529,680887927,999245976,1800124847,3300911131,1713906067,1641548236,4213287313,1216130144,1575780402,4018429277,3917837745,3693486850,3949271944,596196993,3549867205,258830323,2213823033,772490370,2760122372,1774776394,2652871518,566650946,4142492826,1728879713,2882767088,1783734482,3629395816,2517608232,2874225571,1861159788,326777828,3124490320,2130389656,2716951837,967770486,1724537150,2185432712,2364442137,1164943284,2105845187,998989502,3765401048,2244026483,1075463327,1455516326,1322494562,910128902,469688178,1117454909,936433444,3490320968,3675253459,1240580251,122909385,2157517691,634681816,4142456567,3825094682,3061402683,2540495037,79693498,3249098678,1084186820,1583128258,426386531,1761308591,1047286709,322548459,995290223,1845252383,2603652396,3431023940,2942221577,3202600964,3727903485,1712269319,422464435,3234572375,1170764815,3523960633,3117677531,1434042557,442511882,3600875718,1076654713,1738483198,4213154764,2393238008,3677496056,1014306527,4251020053,793779912,2902807211,842905082,4246964064,1395751752,1040244610,2656851899,3396308128,445077038,3742853595,3577915638,679411651,2892444358,2354009459,1767581616,3150600392,3791627101,3102740896,284835224,4246832056,1258075500,768725851,2589189241,3069724005,3532540348,1274779536,3789419226,2764799539,1660621633,3471099624,4011903706,913787905,3497959166,737222580,2514213453,2928710040,3937242737,1804850592,3499020752,2949064160,2386320175,2390070455,2415321851,4061277028,2290661394,2416832540,1336762016,1754252060,3520065937,3014181293,791618072,3188594551,3933548030,2332172193,3852520463,3043980520,413987798,3465142937,3030929376,4245938359,2093235073,3534596313,375366246,2157278981,2479649556,555357303,3870105701,2008414854,3344188149,4221384143,3956125452,2067696032,3594591187,2921233993,2428461,544322398,577241275,1471733935,610547355,4027169054,1432588573,1507829418,2025931657,3646575487,545086370,48609733,2200306550,1653985193,298326376,1316178497,3007786442,2064951626,458293330,2589141269,3591329599,3164325604,727753846,2179363840,146436021,1461446943,4069977195,705550613,3059967265,3887724982,4281599278,3313849956,1404054877,2845806497,146425753,1854211946],S2=[1266315497,3048417604,3681880366,3289982499,2909710000,1235738493,2632868024,2414719590,3970600049,1771706367,1449415276,3266420449,422970021,1963543593,2690192192,3826793022,1062508698,1531092325,1804592342,2583117782,2714934279,4024971509,1294809318,4028980673,1289560198,2221992742,1669523910,35572830,157838143,1052438473,1016535060,1802137761,1753167236,1386275462,3080475397,2857371447,1040679964,2145300060,2390574316,1461121720,2956646967,4031777805,4028374788,33600511,2920084762,1018524850,629373528,3691585981,3515945977,2091462646,2486323059,586499841,988145025,935516892,3367335476,2599673255,2839830854,265290510,3972581182,2759138881,3795373465,1005194799,847297441,406762289,1314163512,1332590856,1866599683,4127851711,750260880,613907577,1450815602,3165620655,3734664991,3650291728,3012275730,3704569646,1427272223,778793252,1343938022,2676280711,2052605720,1946737175,3164576444,3914038668,3967478842,3682934266,1661551462,3294938066,4011595847,840292616,3712170807,616741398,312560963,711312465,1351876610,322626781,1910503582,271666773,2175563734,1594956187,70604529,3617834859,1007753275,1495573769,4069517037,2549218298,2663038764,504708206,2263041392,3941167025,2249088522,1514023603,1998579484,1312622330,694541497,2582060303,2151582166,1382467621,776784248,2618340202,3323268794,2497899128,2784771155,503983604,4076293799,907881277,423175695,432175456,1378068232,4145222326,3954048622,3938656102,3820766613,2793130115,2977904593,26017576,3274890735,3194772133,1700274565,1756076034,4006520079,3677328699,720338349,1533947780,354530856,688349552,3973924725,1637815568,332179504,3949051286,53804574,2852348879,3044236432,1282449977,3583942155,3416972820,4006381244,1617046695,2628476075,3002303598,1686838959,431878346,2686675385,1700445008,1080580658,1009431731,832498133,3223435511,2605976345,2271191193,2516031870,1648197032,4164389018,2548247927,300782431,375919233,238389289,3353747414,2531188641,2019080857,1475708069,455242339,2609103871,448939670,3451063019,1395535956,2413381860,1841049896,1491858159,885456874,4264095073,4001119347,1565136089,3898914787,1108368660,540939232,1173283510,2745871338,3681308437,4207628240,3343053890,4016749493,1699691293,1103962373,3625875870,2256883143,3830138730,1031889488,3479347698,1535977030,4236805024,3251091107,2132092099,1774941330,1199868427,1452454533,157007616,2904115357,342012276,595725824,1480756522,206960106,497939518,591360097,863170706,2375253569,3596610801,1814182875,2094937945,3421402208,1082520231,3463918190,2785509508,435703966,3908032597,1641649973,2842273706,3305899714,1510255612,2148256476,2655287854,3276092548,4258621189,236887753,3681803219,274041037,1734335097,3815195456,3317970021,1899903192,1026095262,4050517792,356393447,2410691914,3873677099,3682840055],S3=[3913112168,2491498743,4132185628,2489919796,1091903735,1979897079,3170134830,3567386728,3557303409,857797738,1136121015,1342202287,507115054,2535736646,337727348,3213592640,1301675037,2528481711,1895095763,1721773893,3216771564,62756741,2142006736,835421444,2531993523,1442658625,3659876326,2882144922,676362277,1392781812,170690266,3921047035,1759253602,3611846912,1745797284,664899054,1329594018,3901205900,3045908486,2062866102,2865634940,3543621612,3464012697,1080764994,553557557,3656615353,3996768171,991055499,499776247,1265440854,648242737,3940784050,980351604,3713745714,1749149687,3396870395,4211799374,3640570775,1161844396,3125318951,1431517754,545492359,4268468663,3499529547,1437099964,2702547544,3433638243,2581715763,2787789398,1060185593,1593081372,2418618748,4260947970,69676912,2159744348,86519011,2512459080,3838209314,1220612927,3339683548,133810670,1090789135,1078426020,1569222167,845107691,3583754449,4072456591,1091646820,628848692,1613405280,3757631651,526609435,236106946,48312990,2942717905,3402727701,1797494240,859738849,992217954,4005476642,2243076622,3870952857,3732016268,765654824,3490871365,2511836413,1685915746,3888969200,1414112111,2273134842,3281911079,4080962846,172450625,2569994100,980381355,4109958455,2819808352,2716589560,2568741196,3681446669,3329971472,1835478071,660984891,3704678404,4045999559,3422617507,3040415634,1762651403,1719377915,3470491036,2693910283,3642056355,3138596744,1364962596,2073328063,1983633131,926494387,3423689081,2150032023,4096667949,1749200295,3328846651,309677260,2016342300,1779581495,3079819751,111262694,1274766160,443224088,298511866,1025883608,3806446537,1145181785,168956806,3641502830,3584813610,1689216846,3666258015,3200248200,1692713982,2646376535,4042768518,1618508792,1610833997,3523052358,4130873264,2001055236,3610705100,2202168115,4028541809,2961195399,1006657119,2006996926,3186142756,1430667929,3210227297,1314452623,4074634658,4101304120,2273951170,1399257539,3367210612,3027628629,1190975929,2062231137,2333990788,2221543033,2438960610,1181637006,548689776,2362791313,3372408396,3104550113,3145860560,296247880,1970579870,3078560182,3769228297,1714227617,3291629107,3898220290,166772364,1251581989,493813264,448347421,195405023,2709975567,677966185,3703036547,1463355134,2715995803,1338867538,1343315457,2802222074,2684532164,233230375,2599980071,2000651841,3277868038,1638401717,4028070440,3237316320,6314154,819756386,300326615,590932579,1405279636,3267499572,3150704214,2428286686,3959192993,3461946742,1862657033,1266418056,963775037,2089974820,2263052895,1917689273,448879540,3550394620,3981727096,150775221,3627908307,1303187396,508620638,2975983352,2726630617,1817252668,1876281319,1457606340,908771278,3720792119,3617206836,2455994898,1729034894,1080033504],S4=[976866871,3556439503,2881648439,1522871579,1555064734,1336096578,3548522304,2579274686,3574697629,3205460757,3593280638,3338716283,3079412587,564236357,2993598910,1781952180,1464380207,3163844217,3332601554,1699332808,1393555694,1183702653,3581086237,1288719814,691649499,2847557200,2895455976,3193889540,2717570544,1781354906,1676643554,2592534050,3230253752,1126444790,2770207658,2633158820,2210423226,2615765581,2414155088,3127139286,673620729,2805611233,1269405062,4015350505,3341807571,4149409754,1057255273,2012875353,2162469141,2276492801,2601117357,993977747,3918593370,2654263191,753973209,36408145,2530585658,25011837,3520020182,2088578344,530523599,2918365339,1524020338,1518925132,3760827505,3759777254,1202760957,3985898139,3906192525,674977740,4174734889,2031300136,2019492241,3983892565,4153806404,3822280332,352677332,2297720250,60907813,90501309,3286998549,1016092578,2535922412,2839152426,457141659,509813237,4120667899,652014361,1966332200,2975202805,55981186,2327461051,676427537,3255491064,2882294119,3433927263,1307055953,942726286,933058658,2468411793,3933900994,4215176142,1361170020,2001714738,2830558078,3274259782,1222529897,1679025792,2729314320,3714953764,1770335741,151462246,3013232138,1682292957,1483529935,471910574,1539241949,458788160,3436315007,1807016891,3718408830,978976581,1043663428,3165965781,1927990952,4200891579,2372276910,3208408903,3533431907,1412390302,2931980059,4132332400,1947078029,3881505623,4168226417,2941484381,1077988104,1320477388,886195818,18198404,3786409000,2509781533,112762804,3463356488,1866414978,891333506,18488651,661792760,1628790961,3885187036,3141171499,876946877,2693282273,1372485963,791857591,2686433993,3759982718,3167212022,3472953795,2716379847,445679433,3561995674,3504004811,3574258232,54117162,3331405415,2381918588,3769707343,4154350007,1140177722,4074052095,668550556,3214352940,367459370,261225585,2610173221,4209349473,3468074219,3265815641,314222801,3066103646,3808782860,282218597,3406013506,3773591054,379116347,1285071038,846784868,2669647154,3771962079,3550491691,2305946142,453669953,1268987020,3317592352,3279303384,3744833421,2610507566,3859509063,266596637,3847019092,517658769,3462560207,3443424879,370717030,4247526661,2224018117,4143653529,4112773975,2788324899,2477274417,1456262402,2901442914,1517677493,1846949527,2295493580,3734397586,2176403920,1280348187,1908823572,3871786941,846861322,1172426758,3287448474,3383383037,1655181056,3139813346,901632758,1897031941,2986607138,3066810236,3447102507,1393639104,373351379,950779232,625454576,3124240540,4148612726,2007998917,544563296,2244738638,2330496472,2058025392,1291430526,424198748,50039436,29584100,3605783033,2429876329,2791104160,1057563949,3255363231,3075367218,3463963227,1469046755,985887462],p,s1,s2,s3,s4;function i2s(i){return String.fromCharCode(i>>24&255,i>>16&255,i>>8&255,i&255)}function s2i(s,j){return(s.charCodeAt(j++)&255)<<24|(s.charCodeAt(j++)&255)<<16|(s.charCodeAt(j++)&255)<<8|(s.charCodeAt(j++)&255)}function xor(a,b){return i2s(s2i(a,0)^s2i(b,0))+i2s(s2i(a,4)^s2i(b,4))}function f(x){return(s1[x>>24&255]+s2[x>>16&255]^s3[x>>8&255])+s4[x&255]^0}function encipher(x){var i=0,t,l=s2i(x,0),r=s2i(x,4);while(i<16){l^=p[i++];r^=f(l);t=l;l=r;r=t}l^=p[i++];r^=p[i];return i2s(r)+i2s(l)}function decipher(x){var i=17,t,l=s2i(x,0),r=s2i(x,4);while(i>1){l^=p[i--];r^=f(l);t=l;l=r;r=t}l^=p[i--];r^=p[i];return i2s(r)+i2s(l)}function subkey(k){var i,x="\0\0\0\0\0\0\0\0";p=P.slice();s1=S1.slice();s2=S2.slice();s3=S3.slice();s4=S4.slice();while(k.length<72){k+=k}i=0;while(i<18){p[i]^=s2i(k,i<<2);i++}i=0;while(i<18){x=encipher(x);p[i++]=s2i(x,0);p[i++]=s2i(x,4)}i=0;while(i<256){x=encipher(x);s1[i++]=s2i(x,0);s1[i++]=s2i(x,4)}i=0;while(i<256){x=encipher(x);s2[i++]=s2i(x,0);s2[i++]=s2i(x,4)}i=0;while(i<256){x=encipher(x);s3[i++]=s2i(x,0);s3[i++]=s2i(x,4)}i=0;while(i<256){x=encipher(x);s4[i++]=s2i(x,0);s4[i++]=s2i(x,4)}}function utf8(s){var i=0,l=s.length,x=String.fromCharCode,c,r=[];while(i<l){c=s.charCodeAt(i++);if(c<128){r.push(x(c))}else{if(c<2048){r.push(x(c>>6&31|192,c&63|128))}else{if(c<65536){r.push(x(c>>12&15|224,c>>6&63|128,c&63|128))}else{if(c<2097152){r.push(x(c>>18&7|240,c>>12&63|128,c>>6&63|128,c&63|128))}else{}}}}}return r.join("")}function utf16(s){var i=0,l=s.length,x=String.fromCharCode,c,r=[];while(i<l){c=s.charCodeAt(i++);if((c&128)==0){r.push(x(c&255))}else{if((c&224)==192){if(i<l){r.push(x((c<<6&1984)|(s.charCodeAt(i++)&63)))}}else{if((c&240)==224){if(i+1<l){r.push(x((c<<12&61440)|(s.charCodeAt(i++)<<6&4032)|(s.charCodeAt(i++)&63)))}}else{if((c&248)==240){if(i+2<l){r.push(x((c<<18&1835008)|(s.charCodeAt(i++)<<12&258048)|(s.charCodeAt(i++)<<6&4032)|(s.charCodeAt(i++)&63)))}}else{}}}}}return r.join("")}return{encrypt:function(param){var i,c,v,block=[],data=param.data||"",key=param.key||"\0",mode=param.mode||"ecb",pchar=param.pchar||"\x05";subkey(key);data=utf8(data);data+=new Array((8-data.length%8)%8+1).join(pchar);if(mode=="cbc"){v=param.iv||"\0\0\0\0\0\0\0\0";block.push(v);i=0;while(i<data.length){c=encipher(xor(data.substr(i,8),v));block.push(c);v=c;i+=8}}else{i=0;while(i<data.length){block.push(encipher(data.substr(i,8)));i+=8}}return block.join("")},decrypt:function(param){var i,c,v,block=[],data=param.data||"",key=param.key||"\0",mode=param.mode||"ecb",pchar=param.pchar||"\x05";subkey(key);data+=new Array((8-data.length%8)%8+1).join("\0");if(mode=="cbc"){v=data.substr(0,8)||"\0\0\0\0\0\0\0\0";i=8;while(i<data.length){c=data.substr(i,8);block.push(xor(decipher(c),v));v=c;i+=8}}else{i=0;while(i<data.length){block.push(decipher(data.substr(i,8)));i+=8}}data=block.join("").replace(new RegExp(pchar+"+$"),"");return utf16(data)},mkIV:function(){return i2s(Math.random()*4294967296)+i2s(Math.random()*4294967296)}}})();var md5=(function(undefined){var s=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21],k=[3614090360,3905402710,606105819,3250441966,4118548399,1200080426,2821735955,4249261313,1770035416,2336552879,4294925233,2304563134,1804603682,4254626195,2792965006,1236535329,4129170786,3225465664,643717713,3921069994,3593408605,38016083,3634488961,3889429448,568446438,3275163606,4107603335,1163531501,2850285829,4243563512,1735328473,2368359562,4294588738,2272392833,1839030562,4259657740,2763975236,1272893353,4139469664,3200236656,681279174,3936430074,3572445317,76029189,3654602809,3873151461,530742520,3299628645,4096336452,1126891415,2878612391,4237533241,1700485571,2399980690,4293915773,2240044497,1873313359,4264355552,2734768916,1309151649,4149444226,3174756917,718787259,3951481745],p="\x80"+new Array(64).join("\0");function i2s(i){return String.fromCharCode(i&255,i>>8&255,i>>16&255,i>>24&255)}function s2i(s,j){return(s.charCodeAt(j++)&255)|(s.charCodeAt(j++)&255)<<8|(s.charCodeAt(j++)&255)<<16|(s.charCodeAt(j++))<<24}return{bin:function(data){var a0=1732584193,b0=4023233417,c0=2562383102,d0=271733878,a,b,c,d,f,g,r,i,j,m=new Array(16);data+=p.slice(0,64-(data.length+8)%64)+i2s(data.length<<3)+i2s(0);for(i=0;i<data.length;i+=64){for(j=0;j<16;j++){m[j]=s2i(data,i+(j<<2))}a=a0;b=b0;c=c0;d=d0;for(j=0;j<64;j++){if(j<16){f=(b&c)|(~b&d);g=j}else{if(j<32){f=(d&b)|(~d&c);g=j*5+1&15}else{if(j<48){f=b^c^d;g=j*3+5&15}else{f=c^(b|~d);g=j*7&15}}}r=a+f+k[j]+m[g]|0;r=(r<<s[j])|(r>>>32-s[j]);a=d;d=c;c=b;b=r+b|0}a0=a0+a|0;b0=b0+b|0;c0=c0+c|0;d0=d0+d|0}return i2s(a0)+i2s(b0)+i2s(c0)+i2s(d0)}}})();(function(){var l=void 0,aa=this;function r(c,d){var a=c.split("."),b=aa;!(a[0] in b)&&b.execScript&&b.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());){!a.length&&d!==l?b[e]=d:b=b[e]?b[e]:b[e]={}}}var t="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function v(c){var d=c.length,a=0,b=Number.POSITIVE_INFINITY,e,f,g,h,k,m,n,p,s,x;for(p=0;p<d;++p){c[p]>a&&(a=c[p]),c[p]<b&&(b=c[p])}e=1<<a;f=new (t?Uint32Array:Array)(e);g=1;h=0;for(k=2;g<=a;){for(p=0;p<d;++p){if(c[p]===g){m=0;n=h;for(s=0;s<g;++s){m=m<<1|n&1,n>>=1}x=g<<16|p;for(s=m;s<e;s+=k){f[s]=x}++h}}++g;h<<=1;k<<=1}return[f,a,b]}function w(c,d){this.g=[];this.h=32768;this.d=this.f=this.a=this.l=0;this.input=t?new Uint8Array(c):c;this.m=!1;this.i=y;this.r=!1;if(d||!(d={})){d.index&&(this.a=d.index),d.bufferSize&&(this.h=d.bufferSize),d.bufferType&&(this.i=d.bufferType),d.resize&&(this.r=d.resize)}switch(this.i){case A:this.b=32768;this.c=new (t?Uint8Array:Array)(32768+this.h+258);break;case y:this.b=0;this.c=new (t?Uint8Array:Array)(this.h);this.e=this.z;this.n=this.v;this.j=this.w;break;default:throw Error("invalid inflate mode")}}var A=0,y=1,B={t:A,s:y};w.prototype.k=function(){for(;!this.m;){var c=C(this,3);c&1&&(this.m=!0);c>>>=1;switch(c){case 0:var d=this.input,a=this.a,b=this.c,e=this.b,f=d.length,g=l,h=l,k=b.length,m=l;this.d=this.f=0;if(a+1>=f){throw Error("invalid uncompressed block header: LEN")}g=d[a++]|d[a++]<<8;if(a+1>=f){throw Error("invalid uncompressed block header: NLEN")}h=d[a++]|d[a++]<<8;if(g===~h){throw Error("invalid uncompressed block header: length verify")}if(a+g>d.length){throw Error("input buffer is broken")}switch(this.i){case A:for(;e+g>b.length;){m=k-e;g-=m;if(t){b.set(d.subarray(a,a+m),e),e+=m,a+=m}else{for(;m--;){b[e++]=d[a++]}}this.b=e;b=this.e();e=this.b}break;case y:for(;e+g>b.length;){b=this.e({p:2})}break;default:throw Error("invalid inflate mode")}if(t){b.set(d.subarray(a,a+g),e),e+=g,a+=g}else{for(;g--;){b[e++]=d[a++]}}this.a=a;this.b=e;this.c=b;break;case 1:this.j(ba,ca);break;case 2:for(var n=C(this,5)+257,p=C(this,5)+1,s=C(this,4)+4,x=new (t?Uint8Array:Array)(D.length),S=l,T=l,U=l,u=l,M=l,F=l,z=l,q=l,V=l,q=0;q<s;++q){x[D[q]]=C(this,3)}if(!t){q=s;for(s=x.length;q<s;++q){x[D[q]]=0}}S=v(x);u=new (t?Uint8Array:Array)(n+p);q=0;for(V=n+p;q<V;){switch(M=E(this,S),M){case 16:for(z=3+C(this,2);z--;){u[q++]=F}break;case 17:for(z=3+C(this,3);z--;){u[q++]=0}F=0;break;case 18:for(z=11+C(this,7);z--;){u[q++]=0}F=0;break;default:F=u[q++]=M}}T=t?v(u.subarray(0,n)):v(u.slice(0,n));U=t?v(u.subarray(n)):v(u.slice(n));this.j(T,U);break;default:throw Error("unknown BTYPE: "+c)}}return this.n()};var G=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],D=t?new Uint16Array(G):G,H=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],I=t?new Uint16Array(H):H,J=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],K=t?new Uint8Array(J):J,L=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],da=t?new Uint16Array(L):L,ea=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],N=t?new Uint8Array(ea):ea,O=new (t?Uint8Array:Array)(288),P,fa;P=0;for(fa=O.length;P<fa;++P){O[P]=143>=P?8:255>=P?9:279>=P?7:8}var ba=v(O),Q=new (t?Uint8Array:Array)(30),R,ga;R=0;for(ga=Q.length;R<ga;++R){Q[R]=5}var ca=v(Q);function C(c,d){for(var a=c.f,b=c.d,e=c.input,f=c.a,g=e.length,h;b<d;){if(f>=g){throw Error("input buffer is broken")}a|=e[f++]<<b;b+=8}h=a&(1<<d)-1;c.f=a>>>d;c.d=b-d;c.a=f;return h}function E(c,d){for(var a=c.f,b=c.d,e=c.input,f=c.a,g=e.length,h=d[0],k=d[1],m,n;b<k&&!(f>=g);){a|=e[f++]<<b,b+=8}m=h[a&(1<<k)-1];n=m>>>16;if(n>b){throw Error("invalid code length: "+n)}c.f=a>>n;c.d=b-n;c.a=f;return m&65535}w.prototype.j=function(c,d){var a=this.c,b=this.b;this.o=c;for(var e=a.length-258,f,g,h,k;256!==(f=E(this,c));){if(256>f){b>=e&&(this.b=b,a=this.e(),b=this.b),a[b++]=f}else{g=f-257;k=I[g];0<K[g]&&(k+=C(this,K[g]));f=E(this,d);h=da[f];0<N[f]&&(h+=C(this,N[f]));b>=e&&(this.b=b,a=this.e(),b=this.b);for(;k--;){a[b]=a[b++-h]}}}for(;8<=this.d;){this.d-=8,this.a--}this.b=b};w.prototype.w=function(c,d){var a=this.c,b=this.b;this.o=c;for(var e=a.length,f,g,h,k;256!==(f=E(this,c));){if(256>f){b>=e&&(a=this.e(),e=a.length),a[b++]=f}else{g=f-257;k=I[g];0<K[g]&&(k+=C(this,K[g]));f=E(this,d);h=da[f];0<N[f]&&(h+=C(this,N[f]));b+k>e&&(a=this.e(),e=a.length);for(;k--;){a[b]=a[b++-h]}}}for(;8<=this.d;){this.d-=8,this.a--}this.b=b};w.prototype.e=function(){var c=new (t?Uint8Array:Array)(this.b-32768),d=this.b-32768,a,b,e=this.c;if(t){c.set(e.subarray(32768,c.length))}else{a=0;for(b=c.length;a<b;++a){c[a]=e[a+32768]}}this.g.push(c);this.l+=c.length;if(t){e.set(e.subarray(d,d+32768))}else{for(a=0;32768>a;++a){e[a]=e[d+a]}}this.b=32768;return e};w.prototype.z=function(c){var d,a=this.input.length/this.a+1|0,b,e,f,g=this.input,h=this.c;c&&("number"===typeof c.p&&(a=c.p),"number"===typeof c.u&&(a+=c.u));2>a?(b=(g.length-this.a)/this.o[2],f=258*(b/2)|0,e=f<h.length?h.length+f:h.length<<1):e=h.length*a;t?(d=new Uint8Array(e),d.set(h)):d=h;return this.c=d};w.prototype.n=function(){var c=0,d=this.c,a=this.g,b,e=new (t?Uint8Array:Array)(this.l+(this.b-32768)),f,g,h,k;if(0===a.length){return t?this.c.subarray(32768,this.b):this.c.slice(32768,this.b)}f=0;for(g=a.length;f<g;++f){b=a[f];h=0;for(k=b.length;h<k;++h){e[c++]=b[h]}}f=32768;for(g=this.b;f<g;++f){e[c++]=d[f]}this.g=[];return this.buffer=e};w.prototype.v=function(){var c,d=this.b;t?this.r?(c=new Uint8Array(d),c.set(this.c.subarray(0,d))):c=this.c.subarray(0,d):(this.c.length>d&&(this.c.length=d),c=this.c);return this.buffer=c};function W(c,d){var a,b;this.input=c;this.a=0;if(d||!(d={})){d.index&&(this.a=d.index),d.verify&&(this.A=d.verify)}a=c[this.a++];b=c[this.a++];switch(a&15){case ha:this.method=ha;break;default:throw Error("unsupported compression method")}if(0!==((a<<8)+b)%31){throw Error("invalid fcheck flag:"+((a<<8)+b)%31)}if(b&32){throw Error("fdict flag is not supported")}this.q=new w(c,{index:this.a,bufferSize:d.bufferSize,bufferType:d.bufferType,resize:d.resize})}W.prototype.k=function(){var c=this.input,d,a;d=this.q.k();this.a=this.q.a;if(this.A){a=(c[this.a++]<<24|c[this.a++]<<16|c[this.a++]<<8|c[this.a++])>>>0;var b=d;if("string"===typeof b){var e=b.split(""),f,g;f=0;for(g=e.length;f<g;f++){e[f]=(e[f].charCodeAt(0)&255)>>>0}b=e}for(var h=1,k=0,m=b.length,n,p=0;0<m;){n=1024<m?1024:m;m-=n;do{h+=b[p++],k+=h}while(--n);h%=65521;k%=65521}if(a!==(k<<16|h)>>>0){throw Error("invalid adler-32 checksum")}}return d};var ha=8;r("Zlib.Inflate",W);r("Zlib.Inflate.prototype.decompress",W.prototype.k);var X={ADAPTIVE:B.s,BLOCK:B.t},Y,Z,$,ia;if(Object.keys){Y=Object.keys(X)}else{for(Z in Y=[],$=0,X){Y[$++]=Z}}$=0;for(ia=Y.length;$<ia;++$){Z=Y[$],r("Zlib.Inflate.BufferType."+Z,X[Z])}}).call(this);if(!window.epson){window.epson={}}window.epson.ePOSDevice=ePOSDevice;window.epson.ePOSDeviceConfiguration=ePOSDeviceConfiguration})(window);
;/**
 * Swiper 5.3.8
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: April 24, 2020
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Swiper = factory());
}(this, (function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.3
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2019, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: February 11, 2019
   */

  var Dom7 = function Dom7(arr) {
    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
        // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
          if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
          if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
          if (html.indexOf('<option') === 0) { toCreate = 'select'; }
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) { arr.push(els[i]); }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }

  // Classes and attributes
  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
      }
    }
    return this;
  }
  function removeClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  function data(key, value) {
    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = (void 0);
        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7(matchedItems);
  }
  // eslint-disable-next-line
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === doc) { return el === doc; }
    else if (selector === win) { return el === win; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function prepend(newChild) {
    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
    }
    return this;
  }
  function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
    add: add,
    styles: styles,
  };

  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = $.fn[methodName] || Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if ( delay === void 0 ) delay = 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if ( axis === void 0 ) axis = 'x';

      var matrix;
      var curTransform;
      var transformMatrix;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[4]); }
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[5]); }
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

      var to = Object(args[0]);
      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Support = (function Support() {
    return {
      touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
        return !!((win.navigator.maxTouchPoints > 0) || ('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
      }()),

      pointerEvents: !!win.PointerEvent && ('maxTouchPoints' in win.navigator) && win.navigator.maxTouchPoints > 0,

      observer: (function checkObserver() {
        return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
      }()),

      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }()),

      gestures: (function checkGestures() {
        return 'ongesturestart' in win;
      }()),
    };
  }());

  var SwiperClass = function SwiperClass(params) {
    if ( params === void 0 ) params = {};

    var self = this;
    self.params = params;

    // Events
    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = { components: { configurable: true } };

  SwiperClass.prototype.on = function on (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      self.off(events, onceHandler);
      if (onceHandler.f7proxy) {
        delete onceHandler.f7proxy;
      }
      handler.apply(self, args);
    }
    onceHandler.f7proxy = handler;
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off (events, handler) {
    var self = this;
    if (!self.eventsListeners) { return self; }
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;
    if (!self.eventsListeners) { return self; }
    var events;
    var data;
    var context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules (modulesParams) {
      if ( modulesParams === void 0 ) modulesParams = {};

    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;
    if (!Class.use) { return; }
    Class.use(components);
  };

  SwiperClass.installModule = function installModule (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (!Class.prototype.modules) { Class.prototype.modules = {}; }
    var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
    Class.prototype.modules[name] = module;
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  };

  SwiperClass.use = function use (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (Array.isArray(module)) {
      module.forEach(function (m) { return Class.installModule(m); });
      return Class;
    }
    return Class.installModule.apply(Class, [ module ].concat( params ));
  };

  Object.defineProperties( SwiperClass, staticAccessors );

  function updateSize () {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides () {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    function slidesForMargin(slideIndex) {
      if (!params.cssMode) { return true; }
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
    else { slides.css({ marginRight: '', marginBottom: '' }); }

    var slidesNumberEvenToRows;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = (void 0);
        var column = (void 0);
        var row = (void 0);
        if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
          var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
          var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;
          var columnsInGroup = groupIndex === 0
            ? params.slidesPerGroup
            : Math.min(Math.ceil((slidesLength - groupIndex * slidesPerColumn * params.slidesPerGroup) / slidesPerColumn), params.slidesPerGroup);
          row = Math.floor(slideIndexInGroup / columnsInGroup);
          column = (slideIndexInGroup - row * columnsInGroup) + groupIndex * params.slidesPerGroup;

          newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
          slide
            .css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex,
            });
        } else if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - (column * slidesPerColumn);
          if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
            row += 1;
            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - (row * slidesPerRow);
        }
        slide.css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        );
      }
      if (slide.css('display') === 'none') { continue; } // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = 'none';
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width'));
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            var boxSizing = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height'));
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing$1 && boxSizing$1 === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }
      } else {
        slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);


      if (params.centeredSlides) {
        slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
    }
    if (params.setWrapperSize) {
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];
          if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];
        if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) { snapGrid = [0]; }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) { slides.filter(slidesForMargin).css({ marginLeft: (spaceBetween + "px") }); }
        else { slides.filter(slidesForMargin).css({ marginRight: (spaceBetween + "px") }); }
      } else { slides.filter(slidesForMargin).css({ marginBottom: (spaceBetween + "px") }); }
    }

    if (params.centeredSlides && params.centeredSlidesBounds) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      var maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map(function (snap) {
        if (snap < 0) { return -offsetBefore; }
        if (snap > maxSnap) { return maxSnap + offsetAfter; }
        return snap;
      });
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize$1 = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize$1 += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize$1 -= params.spaceBetween;
      if (allSlidesSize$1 < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize$1) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight (speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;
    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      if (swiper.params.centeredSlides) {
        swiper.visibleSlides.each(function (index, slide) {
          activeSlides.push(slide);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
          var index = swiper.activeIndex + i;
          if (index > swiper.slides.length) { break; }
          activeSlides.push(swiper.slides.eq(index)[0]);
        }
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
  }

  function updateSlidesOffset () {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) { return; }
    if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

    var offsetCenter = -translate;
    if (rtl) { offsetCenter = translate; }

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = (slideBefore >= 0 && slideBefore < swiper.size - 1)
                  || (slideAfter > 1 && slideAfter <= swiper.size)
                  || (slideBefore <= 0 && slideAfter >= swiper.size);
        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
    }
    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress (translate) {
    var swiper = this;
    if (typeof translate === 'undefined') {
      var multiplier = swiper.rtlTranslate ? -1 : 1;
      // eslint-disable-next-line
      translate = (swiper && swiper.translate && (swiper.translate * multiplier)) || 0;
    }
    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / (translatesDiff);
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility || (params.centeredSlides && params.autoHeight)) { swiper.updateSlidesProgress(translate); }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses () {
    var swiper = this;

    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

    var activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex (newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      var skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    if (swiper.initialized || swiper.params.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide (e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest(("." + (params.slideClass)))[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) { slideFound = true; }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getTranslate (axis) {
    if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }
    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) { currentTranslate = -currentTranslate; }

    return currentTranslate || 0;
  }

  function setTranslate (translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var wrapperEl = swiper.wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)"));
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate () {
    return (-this.snapGrid[0]);
  }

  function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
  }

  function translateTo (translate, speed, runCallbacks, translateBounds, internal) {
    var obj;

    if ( translate === void 0 ) translate = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;
    if ( translateBounds === void 0 ) translateBounds = true;
    var swiper = this;

    var params = swiper.params;
    var wrapperEl = swiper.wrapperEl;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var minTranslate = swiper.minTranslate();
    var maxTranslate = swiper.maxTranslate();
    var newTranslate;
    if (translateBounds && translate > minTranslate) { newTranslate = minTranslate; }
    else if (translateBounds && translate < maxTranslate) { newTranslate = maxTranslate; }
    else { newTranslate = translate; }

    // Update progress
    swiper.updateProgress(newTranslate);

    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = -newTranslate, obj.behavior = 'smooth', obj ));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
        }
      }
      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionEnd');
      }
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper.emit('beforeTransitionStart', speed, internal);
        swiper.emit('transitionStart');
      }
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onTranslateToWrapperTransitionEnd) {
          swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
            swiper.onTranslateToWrapperTransitionEnd = null;
            delete swiper.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) {
              swiper.emit('transitionEnd');
            }
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
      }
    }

    return true;
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
    translateTo: translateTo,
  };

  function setTransition (duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;
    if (params.cssMode) { return; }
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }
      swiper.emit('slideChangeTransitionStart');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1 (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    var params = swiper.params;
    swiper.animating = false;
    if (params.cssMode) { return; }
    swiper.setTransition(0);

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }
      swiper.emit('slideChangeTransitionEnd');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo (index, speed, runCallbacks, internal) {
    var obj;

    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;
    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) { slideIndex = 0; }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    var wrapperEl = swiper.wrapperEl;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
    var snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }
    // Directions locks
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) { return false; }
      }
    }

    var direction;
    if (slideIndex > activeIndex) { direction = 'next'; }
    else if (slideIndex < activeIndex) { direction = 'prev'; }
    else { direction = 'reset'; }


    // Update Index
    if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      var t = -translate;
      if (rtl) {
        t = wrapperEl.scrollWidth - wrapperEl.offsetWidth - t;
      }
      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = t, obj.behavior = 'smooth', obj ));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;
        }
      }
      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var newIndex = index;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup;
    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) { return -Math.floor(Math.abs(val)); }
      return Math.floor(val);
    }
    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
    var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === 'undefined' && params.cssMode) {
      snapGrid.forEach(function (snap) {
        if (!prevSnap && normalizedTranslate >= snap) { prevSnap = snap; }
      });
    }
    var prevIndex;
    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest (speed, runCallbacks, internal, threshold) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;
    if ( threshold === void 0 ) threshold = 0.5;

    var swiper = this;
    var index = swiper.activeIndex;
    var skip = Math.min(swiper.params.slidesPerGroupSkip, index);
    var snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);

    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

    if (translate >= swiper.snapGrid[snapIndex]) {
      // The current translate is on or after the current snap index, so the choice
      // is between the current index and the one after it.
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];
      if ((translate - currentSnap) > (nextSnap - currentSnap) * threshold) {
        index += swiper.params.slidesPerGroup;
      }
    } else {
      // The current translate is before the current snap index, so the choice
      // is between the current index and the one before it.
      var prevSnap = swiper.snapGrid[snapIndex - 1];
      var currentSnap$1 = swiper.snapGrid[snapIndex];
      if ((translate - prevSnap) <= (currentSnap$1 - prevSnap) * threshold) {
        index -= swiper.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper.slidesGrid.length - 1);

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    if (params.loop) {
      if (swiper.animating) { return; }
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (
          (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
          || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

    var slides = $wrapperEl.children(("." + (params.slideClass)));

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children(("." + (params.slideClass)));
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

    swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);
      if (index < swiper.loopedSlides) { appendSlides.push(el); }
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
      slide.attr('data-swiper-slide-index', index);
    });
    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix () {
    var swiper = this;

    swiper.emit('beforeLoopFix');

    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate();

    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (activeIndex >= slides.length - loopedSlides) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    swiper.emit('loopFix');
  }

  function loopDestroy () {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor (moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor () {
    var swiper = this;
    if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide (slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.append(slides[i]); }
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide (slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.prepend(slides[i]); }
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide (index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

    var slidesBuffer = [];
    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide (slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides () {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  var Device = (function Device() {
    var platform = win.navigator.platform;
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      iphone: false,
      ipod: false,
      ipad: false,
      edge: false,
      ie: false,
      firefox: false,
      macos: false,
      windows: false,
      cordova: !!(win.cordova || win.phonegap),
      phonegap: !!(win.cordova || win.phonegap),
      electron: false,
    };

    var screenWidth = win.screen.width;
    var screenHeight = win.screen.height;

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    var edge = ua.indexOf('Edge/') >= 0;
    var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
    var windows = platform === 'Win32';
    var electron = ua.toLowerCase().indexOf('electron') >= 0;
    var macos = platform === 'MacIntel';

    // iPadOs 13 fix
    if (!ipad
      && macos
      && Support.touch
      && (
        (screenWidth === 1024 && screenHeight === 1366) // Pro 12.9
        || (screenWidth === 834 && screenHeight === 1194) // Pro 11
        || (screenWidth === 834 && screenHeight === 1112) // Pro 10.5
        || (screenWidth === 768 && screenHeight === 1024) // other
      )
    ) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      macos = false;
    }

    device.ie = ie;
    device.edge = edge;
    device.firefox = firefox;

    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.ipod = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Webview
    device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone))
      || (win.matchMedia && win.matchMedia('(display-mode: standalone)').matches);
    device.webview = device.webView;
    device.standalone = device.webView;

    // Desktop
    device.desktop = !(device.ios || device.android) || electron;
    if (device.desktop) {
      device.electron = electron;
      device.macos = macos;
      device.windows = windows;
      if (device.macos) {
        device.os = 'macos';
      }
      if (device.windows) {
        device.os = 'windows';
      }
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }());

  function onTouchStart (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    var $targetEl = $(e.target);

    if (params.touchEventsTarget === 'wrapper') {
      if (!$targetEl.closest(swiper.wrapperEl).length) { return; }
    }
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
    if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
    if (data.isTouched && data.isMoved) { return; }
    if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) { return; }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection
      && ((startX <= edgeSwipeThreshold)
      || (startX >= win.screen.width - edgeSwipeThreshold))
    ) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });

    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) { data.allowThresholdMove = false; }
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($targetEl.is(data.formElements)) { preventDefault = false; }
      if (
        doc.activeElement
        && $(doc.activeElement).is(data.formElements)
        && doc.activeElement !== $targetEl[0]
      ) {
        doc.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  }

  function onTouchMove (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      return;
    }
    if (data.isTouchEvent && e.type === 'mousemove') { return; }
    var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
    var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = Utils.now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
          || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
        || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }
    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) { return; }

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;
      if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if ((diffX * diffX) + (diffY * diffY) >= 25) {
          touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) { diff = -diff; }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }


    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) { return; }

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime,
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now(),
      });
    }
    // Update progress
    swiper.updateProgress(data.currentTranslate);
    // Update translate
    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd (event) {
    var swiper = this;
    var data = swiper.touchEventsData;

    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    // Return Grab Cursor
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap click', e);
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
        swiper.emit('doubleTap doubleClick', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) { swiper.allowClick = true; }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;

    var currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) { newPosition = -newPosition; }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (params.freeModeSticky) {
          var nextSlide;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
          if (params.freeModeSticky) {
            // If freeModeSticky is active and the user ends a swipe with a slow-velocity
            // event, then durations can be 20+ seconds to slide one (or zero!) slides.
            // It's easy to see this when simulating touch with mouse events. To fix this,
            // limit single-slide swipes to the default slide duration. This also has the
            // nice side effect of matching slide speed if the user stopped moving before
            // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
            // For faster swipes, also apply limits (albeit higher ones).
            var moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
            var currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];
            if (moveDistance < currentSlideSize) {
              momentumDuration = params.speed;
            } else if (moveDistance < 2 * currentSlideSize) {
              momentumDuration = params.speed * 1.5;
            } else {
              momentumDuration = params.speed * 2.5;
            }
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
            swiper.emit('momentumBounce');
            swiper.setTransition(params.speed);
            setTimeout(function () {
              swiper.setTranslate(afterBouncePosition);
              $wrapperEl.transitionEnd(function () {
                if (!swiper || swiper.destroyed) { return; }
                swiper.transitionEnd();
              });
            }, 0);
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += (i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup)) {
      var increment$1 = (i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);
      if (typeof slidesGrid[i + increment$1] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment$1]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment$1] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    var increment = (stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup);

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + increment); }
        else { swiper.slideTo(stopIndex); }
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + increment); }
        else { swiper.slideTo(stopIndex); }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      var isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper.swipeDirection === 'next') {
          swiper.slideTo(stopIndex + increment);
        }
        if (swiper.swipeDirection === 'prev') {
          swiper.slideTo(stopIndex);
        }
      } else if (e.target === swiper.navigation.nextEl) {
        swiper.slideTo(stopIndex + increment);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize () {
    var swiper = this;

    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) { return; }

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid;

    // Disable locks on resize
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }

    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick (e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) { e.preventDefault(); }
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll () {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl;
    var rtlTranslate = swiper.rtlTranslate;
    swiper.previousTranslate = swiper.translate;
    if (swiper.isHorizontal()) {
      if (rtlTranslate) {
        swiper.translate = ((wrapperEl.scrollWidth - wrapperEl.offsetWidth) - wrapperEl.scrollLeft);
      } else {
        swiper.translate = -wrapperEl.scrollLeft;
      }
    } else {
      swiper.translate = -wrapperEl.scrollTop;
    }
    // eslint-disable-next-line
    if (swiper.translate === -0) { swiper.translate = 0; }

    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
    }

    swiper.emit('setTranslate', swiper.translate, false);
  }

  var dummyEventAttached = false;
  function dummyEventListener() {}

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var capture = !!params.nested;

    // Touch Events
    if (!Support.touch && Support.pointerEvents) {
      el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
        el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        if (touchEvents.cancel) {
          el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
        if (!dummyEventAttached) {
          doc.addEventListener('touchstart', dummyEventListener);
          dummyEventAttached = true;
        }
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        el.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      el.addEventListener('click', swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl.addEventListener('scroll', swiper.onScroll);
    }

    // Resize handler
    if (params.updateOnWindowResize) {
      swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
    } else {
      swiper.on('observerUpdate', onResize, true);
    }
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    var capture = !!params.nested;

    // Touch Events
    if (!Support.touch && Support.pointerEvents) {
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        if (touchEvents.cancel) {
          el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        el.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      el.removeEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.removeEventListener('scroll', swiper.onScroll);
    }

    // Resize handler
    swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
    var params = swiper.params;
    var $el = swiper.$el;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

    // Get breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerGroupSkip', 'slidesPerColumn'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') { return; }
          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var wasMultiRow = params.slidesPerColumn > 1;
      var isMultiRow = breakpointParams.slidesPerColumn > 1;
      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(((params.containerModifierClass) + "multirow " + (params.containerModifierClass) + "multirow-column"));
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(((params.containerModifierClass) + "multirow"));
        if (breakpointParams.slidesPerColumnFill === 'column') {
          $el.addClass(((params.containerModifierClass) + "multirow-column"));
        }
      }

      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint (breakpoints) {
    // Get breakpoint for window width
    if (!breakpoints) { return undefined; }
    var breakpoint = false;

    var points = Object.keys(breakpoints).map(function (point) {
      if (typeof point === 'string' && point.indexOf('@') === 0) {
        var minRatio = parseFloat(point.substr(1));
        var value = win.innerHeight * minRatio;
        return { value: value, point: point };
      }
      return { value: point, point: point };
    });

    points.sort(function (a, b) { return parseInt(a.value, 10) - parseInt(b.value, 10); });
    for (var i = 0; i < points.length; i += 1) {
      var ref = points[i];
      var point = ref.point;
      var value = ref.value;
      if (value <= win.innerWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  }

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  function addClasses () {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];

    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
      if (params.slidesPerColumnFill === 'column') {
        suffixes.push('multirow-column');
      }
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }

    if (params.cssMode) {
      suffixes.push('css-mode');
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  }

  function removeClasses () {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;

    $el.removeClass(classNames.join(' '));
  }

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;
    function onReady() {
      if (callback) { callback(); }
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;
        if (sizes) {
          image.sizes = sizes;
        }
        if (srcset) {
          image.srcset = srcset;
        }
        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages () {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
      if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) { swiper.update(); }
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute('src'),
        imageEl.srcset || imageEl.getAttribute('srcset'),
        imageEl.sizes || imageEl.getAttribute('sizes'),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var params = swiper.params;
    var wasLocked = swiper.isLocked;
    var lastSlidePosition = swiper.slides.length > 0 && (params.slidesOffsetBefore + (params.spaceBetween * (swiper.slides.length - 1)) + ((swiper.slides[0]).offsetWidth) * swiper.slides.length);

    if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
      swiper.isLocked = lastSlidePosition <= swiper.size;
    } else {
      swiper.isLocked = swiper.snapGrid.length === 1;
    }

    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked;

    // events
    if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = { checkOverflow: checkOverflow };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    //
    preventInteractionOnTransition: false,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,

    // Autoheight
    autoHeight: false,

    // Set wrapper width
    setWrapperSize: false,

    // Virtual Translate
    virtualTranslate: false,

    // Effects
    effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

    // Breakpoints
    breakpoints: undefined,

    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0, // in px
    slidesOffsetAfter: 0, // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,

    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,

    // Round length
    roundLengths: false,

    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',

    // Callbacks
    runCallbacksOnInit: true,
  };

  /* eslint no-param-reassign: "off" */

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };

  var extendedDefaults = {};

  var Swiper = /*@__PURE__*/(function (SwiperClass) {
    function Swiper() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var el;
      var params;
      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        (assign = args, el = assign[0], params = assign[1]);
      }
      if (!params) { params = {}; }

      params = Utils.extend({}, params);
      if (el && !params.el) { params.el = el; }

      SwiperClass.call(this, params);

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = this;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
          if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (
            typeof params[moduleParamName] === 'object'
            && !('enabled' in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Save Dom lib
      swiper.$ = $;

      // Find el
      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl;
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        $wrapperEl = $(el.shadowRoot.querySelector(("." + (swiper.params.wrapperClass))));
        // Children needs to return slot items
        $wrapperEl.children = function (options) { return $el.children(options); };
      } else {
        $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));
      }
      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          }
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }()),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video, label',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0,

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return swiper;
    }

    if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
    Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
    Swiper.prototype.constructor = Swiper;

    var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    };

    Swiper.prototype.update = function update () {
      var swiper = this;
      if (!swiper || swiper.destroyed) { return; }
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    };

    Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
      if ( needUpdate === void 0 ) needUpdate = true;

      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
        return swiper;
      }

      swiper.$el
        .removeClass(("" + (swiper.params.containerModifierClass) + currentDirection))
        .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

      swiper.params.direction = newDirection;

      swiper.slides.each(function (slideIndex, slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });

      swiper.emit('changeDirection');
      if (needUpdate) { swiper.update(); }

      return swiper;
    };

    Swiper.prototype.init = function init () {
      var swiper = this;
      if (swiper.initialized) { return; }

      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      // Slide To Initial Slide
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      // Attach events
      swiper.attachEvents();

      // Init Flag
      swiper.initialized = true;

      // Emit
      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
      if ( deleteInstance === void 0 ) deleteInstance = true;
      if ( cleanStyles === void 0 ) cleanStyles = true;

      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides
            .removeClass([
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass ].join(' '))
            .removeAttr('style')
            .removeAttr('data-swiper-slide-index');
        }
      }

      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    };

    Swiper.extendDefaults = function extendDefaults (newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties( Swiper, staticAccessors );

    return Swiper;
  }(SwiperClass));

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device,
    },
    static: {
      device: Device,
    },
  };

  var Support$1 = {
    name: 'support',
    proto: {
      support: Support,
    },
    static: {
      support: Support,
    },
  };

  var Browser = (function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }
    return {
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    };
  }());

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser,
    },
    static: {
      browser: Browser,
    },
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('orientationchange');
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
    },
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if ( options === void 0 ) options = {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }
        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) { return; }
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      },
    },
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp;
      if (swiper.rtlTranslate) { offsetProp = 'right'; }
      else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

      var slidesAfter;
      var slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, (offset + "px"));
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: (function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()),
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
          }
        }
      }
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) { appendIndexes.push(i$1); }
            if (i$1 < previousFrom) { prependIndexes.push(i$1); }
          }
        }
      }
      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      var $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
      if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
      if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          var $cachedEl = cache[cachedIndex];
          var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
          if (cachedElIndex) {
            $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
          }
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
      var activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }
          if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex) { activeIndex -= 1; }
        activeIndex = Math.max(activeIndex, 0);
      }
      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    },
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {},
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
        var overwriteParams = {
          watchSlidesProgress: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.virtual.update();
      },
    },
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40) || kc === 34)) {
        return false;
      }
      if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38) || kc === 33)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
          return undefined;
        }
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiper.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiper.height],
          [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (
            point[0] >= 0 && point[0] <= windowWidth
            && point[1] >= 0 && point[1] <= windowHeight
          ) {
            inView = true;
          }
        }
        if (!inView) { return undefined; }
      }
      if (swiper.isHorizontal()) {
        if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (((kc === 34 || kc === 39) && !rtl) || ((kc === 33 || kc === 37) && rtl)) { swiper.slideNext(); }
        if (((kc === 33 || kc === 37) && !rtl) || ((kc === 34 || kc === 39) && rtl)) { swiper.slidePrev(); }
      } else {
        if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (kc === 34 || kc === 40) { swiper.slideNext(); }
        if (kc === 33 || kc === 38) { swiper.slidePrev(); }
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) { return; }
      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) { return; }
      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    },
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      },
    },
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported
      && doc.implementation
      && doc.implementation.hasFeature
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      && doc.implementation.hasFeature('', '') !== true
    ) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    lastEventBeforeSnap: undefined,
    recentWheelEvents: [],
    event: function event() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
      return isEventSupported() ? 'wheel' : 'mousewheel';
    },
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if (e.shiftKey && !pX) { // if user scrolls with shift he wants horizontal scroll
        pX = pY;
        pY = 0;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) { // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else { // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (swiper.params.cssMode) {
        e.preventDefault();
      }

      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) { return true; }

      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;

      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
          else { return true; }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
        else { return true; }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) { return true; }

      if (params.invert) { delta = -delta; }

      if (!swiper.params.freeMode) {
        // Register the new event in a variable which stores the relevant data
        var newEvent = {
          time: Utils.now(),
          delta: Math.abs(delta),
          direction: Math.sign(delta),
          raw: event,
        };

        // Keep the most recent events
        var recentWheelEvents = swiper.mousewheel.recentWheelEvents;
        if (recentWheelEvents.length >= 2) {
          recentWheelEvents.shift(); // only store the last N events
        }
        var prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
        recentWheelEvents.push(newEvent);

        // If there is at least one previous recorded event:
        //   If direction has changed or
        //   if the scroll is quicker than the previous one:
        //     Animate the slider.
        // Else (this is the first time the wheel is moved):
        //     Animate the slider.
        if (prevEvent) {
          if (newEvent.direction !== prevEvent.direction || newEvent.delta > prevEvent.delta) {
            swiper.mousewheel.animateSlider(newEvent);
          }
        } else {
          swiper.mousewheel.animateSlider(newEvent);
        }

        // If it's time to release the scroll:
        //   Return now so you don't hit the preventDefault.
        if (swiper.mousewheel.releaseScroll(newEvent)) {
          return true;
        }
      } else {
        // Freemode or scrollContainer:

        // If we recently snapped after a momentum scroll, then ignore wheel events
        // to give time for the deceleration to finish. Stop ignoring after 500 msecs
        // or if it's a new scroll (larger delta or inverse sign as last event before
        // an end-of-momentum snap).
        var newEvent$1 = { time: Utils.now(), delta: Math.abs(delta), direction: Math.sign(delta) };
        var ref = swiper.mousewheel;
        var lastEventBeforeSnap = ref.lastEventBeforeSnap;
        var ignoreWheelEvents = lastEventBeforeSnap
          && newEvent$1.time < lastEventBeforeSnap.time + 500
          && newEvent$1.delta <= lastEventBeforeSnap.delta
          && newEvent$1.direction === lastEventBeforeSnap.direction;
        if (!ignoreWheelEvents) {
          swiper.mousewheel.lastEventBeforeSnap = undefined;

          if (swiper.params.loop) {
            swiper.loopFix();
          }
          var position = swiper.getTranslate() + (delta * params.sensitivity);
          var wasBeginning = swiper.isBeginning;
          var wasEnd = swiper.isEnd;

          if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
          if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

          swiper.setTransition(0);
          swiper.setTranslate(position);
          swiper.updateProgress();
          swiper.updateActiveIndex();
          swiper.updateSlidesClasses();

          if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
            swiper.updateSlidesClasses();
          }

          if (swiper.params.freeModeSticky) {
            // When wheel scrolling starts with sticky (aka snap) enabled, then detect
            // the end of a momentum scroll by storing recent (N=15?) wheel events.
            // 1. do all N events have decreasing or same (absolute value) delta?
            // 2. did all N events arrive in the last M (M=500?) msecs?
            // 3. does the earliest event have an (absolute value) delta that's
            //    at least P (P=1?) larger than the most recent event's delta?
            // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
            // If 1-4 are "yes" then we're near the end of a momuntum scroll deceleration.
            // Snap immediately and ignore remaining wheel events in this scroll.
            // See comment above for "remaining wheel events in this scroll" determination.
            // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
            clearTimeout(swiper.mousewheel.timeout);
            swiper.mousewheel.timeout = undefined;
            var recentWheelEvents$1 = swiper.mousewheel.recentWheelEvents;
            if (recentWheelEvents$1.length >= 15) {
              recentWheelEvents$1.shift(); // only store the last N events
            }
            var prevEvent$1 = recentWheelEvents$1.length ? recentWheelEvents$1[recentWheelEvents$1.length - 1] : undefined;
            var firstEvent = recentWheelEvents$1[0];
            recentWheelEvents$1.push(newEvent$1);
            if (prevEvent$1 && (newEvent$1.delta > prevEvent$1.delta || newEvent$1.direction !== prevEvent$1.direction)) {
              // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
              recentWheelEvents$1.splice(0);
            } else if (recentWheelEvents$1.length >= 15
                && newEvent$1.time - firstEvent.time < 500
                && firstEvent.delta - newEvent$1.delta >= 1
                && newEvent$1.delta <= 6
            ) {
              // We're at the end of the deceleration of a momentum scroll, so there's no need
              // to wait for more events. Snap ASAP on the next tick.
              // Also, because there's some remaining momentum we'll bias the snap in the
              // direction of the ongoing scroll because it's better UX for the scroll to snap
              // in the same direction as the scroll instead of reversing to snap.  Therefore,
              // if it's already scrolled more than 20% in the current direction, keep going.
              var snapToThreshold = delta > 0 ? 0.8 : 0.2;
              swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
              recentWheelEvents$1.splice(0);
              swiper.mousewheel.timeout = Utils.nextTick(function () {
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 0); // no delay; move on next tick
            }
            if (!swiper.mousewheel.timeout) {
              // if we get here, then we haven't detected the end of a momentum scroll, so
              // we'll consider a scroll "complete" when there haven't been any wheel events
              // for 500ms.
              swiper.mousewheel.timeout = Utils.nextTick(function () {
                var snapToThreshold = 0.5;
                swiper.mousewheel.lastEventBeforeSnap = newEvent$1;
                recentWheelEvents$1.splice(0);
                swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
              }, 500);
            }
          }

          // Emit event
          if (!ignoreWheelEvents) { swiper.emit('scroll', e); }

          // Stop autoplay
          if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
          // Return page scroll on edge positions
          if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
        }
      }

      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      return false;
    },
    animateSlider: function animateSlider(newEvent) {
      var swiper = this;
      // If the movement is NOT big enough and
      // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
      //   Don't go any further (avoid insignificant scroll movement).
      if (newEvent.delta >= 6 && Utils.now() - swiper.mousewheel.lastScrollTime < 60) {
        // Return false as a default
        return true;
      }
      // If user is scrolling towards the end:
      //   If the slider hasn't hit the latest slide or
      //   if the slider is a loop and
      //   if the slider isn't moving right now:
      //     Go to next slide and
      //     emit a scroll event.
      // Else (the user is scrolling towards the beginning) and
      // if the slider hasn't hit the first slide or
      // if the slider is a loop and
      // if the slider isn't moving right now:
      //   Go to prev slide and
      //   emit a scroll event.
      if (newEvent.direction < 0) {
        if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
          swiper.slideNext();
          swiper.emit('scroll', newEvent.raw);
        }
      } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
        swiper.slidePrev();
        swiper.emit('scroll', newEvent.raw);
      }
      // If you got here is because an animation has been triggered so store the current time
      swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
      // Return false as a default
      return false;
    },
    releaseScroll: function releaseScroll(newEvent) {
      var swiper = this;
      var params = swiper.params.mousewheel;
      if (newEvent.direction < 0) {
        if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
          // Return true to animate scroll on edges
          return true;
        }
      } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
        // Return true to animate scroll on edges
        return true;
      }
      return false;
    },
    enable: function enable() {
      var swiper = this;
      var event = Mousewheel.event();
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
        return true;
      }
      if (!event) { return false; }
      if (swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      var event = Mousewheel.event();
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
        return true;
      }
      if (!event) { return false; }
      if (!swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.off(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    },
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          animateSlider: Mousewheel.animateSlider.bind(swiper),
          releaseScroll: Mousewheel.releaseScroll.bind(swiper),
          lastScrollTime: Utils.now(),
          lastEventBeforeSnap: undefined,
          recentWheelEvents: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          swiper.mousewheel.disable();
        }
        if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.cssMode) {
          swiper.mousewheel.enable();
        }
        if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
      },
    },
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) { return; }
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) { return; }
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) { return; }

      var $nextEl;
      var $prevEl;
      if (params.nextEl) {
        $nextEl = $(params.nextEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.nextEl === 'string'
          && $nextEl.length > 1
          && swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = $(params.prevEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.prevEl === 'string'
          && $prevEl.length > 1
          && swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if (
          swiper.params.navigation.hideOnClick
          && !$(e.target).is($prevEl)
          && !$(e.target).is($nextEl)
        ) {
          var isHidden;
          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }
          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }
          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      },
    },
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
          current -= (slidesLength - (swiper.loopedSlides * 2));
        }
        if (current > total - 1) { current -= total; }
        if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
            if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }
          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();
            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(((params.bulletActiveClass) + "-main"));
              }
              if (bulletIndex === firstIndex) {
                $bullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
              }
              if (bulletIndex === lastIndex) {
                $bullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          var bulletIndex = $bullet.index();
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);
            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
            }
            if (swiper.params.loop) {
              if (bulletIndex >= bullets.length - params.dynamicMainBullets) {
                for (var i$1 = params.dynamicMainBullets; i$1 >= 0; i$1 -= 1) {
                  bullets.eq(bullets.length - i$1).addClass(((params.bulletActiveClass) + "-main"));
                }
                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(((params.bulletActiveClass) + "-prev"));
              } else {
                $firstDisplayedBullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
                $lastDisplayedBullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            } else {
              $firstDisplayedBullet
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev"))
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev-prev"));
              $lastDisplayedBullet
                .next()
                .addClass(((params.bulletActiveClass) + "-next"))
                .next()
                .addClass(((params.bulletActiveClass) + "-next-next"));
            }
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
        }
      }
      if (params.type === 'fraction') {
        $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
        $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
          + ' / '
          + "<span class=\"" + (params.totalClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) { return; }

      var $el = $(params.el);
      if ($el.length === 0) { return; }

      if (
        swiper.params.uniqueNavElements
        && typeof params.el === 'string'
        && $el.length > 1
        && swiper.$el.find(params.el).length === 1
      ) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
        swiper.pagination.dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) { index += swiper.loopedSlides; }
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
      if (params.clickable) {
        $el.off('click', ("." + (params.bulletClass)));
      }
    },
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function (number) { return number; },
        formatFractionTotal: function (number) { return number; },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable', // NEW
        lockClass: 'swiper-pagination-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (
          swiper.params.pagination.el
          && swiper.params.pagination.hideOnClick
          && swiper.pagination.$el.length > 0
          && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
        ) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      },
    },
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
        $dragEl[0].style.width = newSize + "px";
      } else {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
        $dragEl[0].style.height = newSize + "px";
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;

      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize,
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    getPointerPosition: function getPointerPosition(e) {
      var swiper = this;
      if (swiper.isHorizontal()) {
        return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientX : e.clientX);
      }
      return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].clientY : e.clientY);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var dragStartPos = scrollbar.dragStartPos;

      var positionRatio;
      positionRatio = ((scrollbar.getPointerPosition(e)) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top']
        - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      swiper.scrollbar.dragStartPos = (e.target === $dragEl[0] || e.target === $dragEl)
        ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', 'none');
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) { return; }
      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) { return; }
      swiper.scrollbar.isTouched = false;
      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', '');
        $wrapperEl.transition('');
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;

      var $el = $(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
      if ($dragEl.length === 0) {
        $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    },
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      },
    },
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;

      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if ((x).indexOf('%') >= 0) {
        x = (parseInt(x, 10) * progress * rtlFactor) + "%";
      } else {
        x = (x * progress * rtlFactor) + "px";
      }
      if ((y).indexOf('%') >= 0) {
        y = (parseInt(y, 10) * progress) + "%";
      } else {
        y = (y * progress) + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
      } else {
        var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
        $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, progress);
        });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, slideProgress);
          });
      });
    },
    setTransition: function setTransition(duration) {
      if ( duration === void 0 ) duration = this.params.speed;

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, parallaxEl) {
          var $parallaxEl = $(parallaxEl);
          var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) { parallaxDuration = 0; }
          $parallaxEl.transition(parallaxDuration);
        });
    },
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTransition(duration);
      },
    },
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) { return 1; }
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest(("." + (swiper.params.slideClass)));
        if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      if (gesture.$imageEl) {
        gesture.$imageEl.transition(0);
      }
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (Support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
      }
      gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) { gesture.$slideEl = undefined; }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (image.isTouched) { return; }
      if (Device.android) { e.preventDefault(); }
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) { return; }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (
          swiper.isHorizontal()
          && (
            (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
            || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
          )
        ) {
          image.isTouched = false;
          return;
        } if (
          !swiper.isHorizontal()
          && (
            (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
            || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
          )
        ) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
      image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
      }
      if (image.currentX > image.maxX) {
        image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
      }

      if (image.currentY < image.minY) {
        image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
      }
      if (image.currentY > image.maxY) {
        image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
      }

      // Velocity
      if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
      if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
      if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
      if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        if (gesture.$imageEl) {
          gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        }
        if (gesture.$imageWrapEl) {
          gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        }

        zoom.scale = 1;
        zoom.currentScale = 1;

        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = (offsetX + (slideWidth / 2)) - touchX;
        diffY = (offsetY + (slideHeight / 2)) - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
        translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
      gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
          gesture.$slideEl = swiper.$wrapperEl.children(("." + (swiper.params.slideActiveClass)));
        } else {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas, picture, .swiper-zoom-target');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) { return; }
      zoom.enabled = true;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
      var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

      var slideSelector = "." + (swiper.params.slideClass);

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      }

      // Move image
      swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) { return; }

      swiper.zoom.enabled = false;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
      var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

      var slideSelector = "." + (swiper.params.slideClass);

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', slideSelector, zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', slideSelector, zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, zoom.onGestureChange, activeListenerWithCapture);
        swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, zoom.onGestureEnd, passiveListener);
        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, zoom.onGestureEnd, passiveListener);
        }
      }

      // Move image
      swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
    },
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed',
      },
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3,
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {},
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined,
        },
      };

      ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom,
      });

      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }
          scale = value;
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          swiper.zoom.onTransitionEnd();
        }
      },
    },
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') { return; }
      if (swiper.slides.length === 0) { return; }
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual
        ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
        : swiper.slides.eq(index);

      var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) { return; }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
          if (background) {
            $imageEl.css('background-image', ("url(\"" + background + "\")"));
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find(("." + (params.preloaderClass))).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
          if (swiper.params.autoHeight) {
            swiper.updateAutoHeight();
          }
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
            return true;
          }
        } else if (slides[index]) { return true; }
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }
        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
          }
          // Prev Slides
          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
          }
        } else {
          var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
          if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

          var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
          if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
        }
      }
    },
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.cssMode) {
          swiper.lazy.load();
        }
      },
    },
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = (function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }());
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) { return 0; }

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
      };
      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) { return; }
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    },
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide', // or 'container'
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper),
        },
      });
    },
    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTransition(duration, byController);
      },
    },
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) { return; }
      var $targetEl = $(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) { return; }
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop || !swiper.navigation) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
        },
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.destroy();
      },
    },
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) { return; }
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) { return; }
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));
          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    },
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.history.initialized && swiper.params.cssMode) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
    },
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
        if (typeof newIndex === 'undefined') { return; }
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');
          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
          swiper.hashNavigation.setHash();
        }
      },
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
        if (swiper.params.cssMode && swiper.autoplay.running) { swiper.autoplay.run(); }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
      if (swiper.autoplay.running) { return false; }
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) { return false; }
      if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) { return; }
      if (swiper.autoplay.paused) { return; }
      if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onVisibilityChange: function onVisibilityChange() {
            if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
              swiper.autoplay.pause();
            }
            if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
              swiper.autoplay.run();
              swiper.autoplay.paused = false;
            }
          },
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
          document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      touchEnd: function touchEnd() {
        var swiper = this;
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.run();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
        document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
      },
    },
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTransition(duration);
      },
    },
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: (swiperWidth + "px") });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
        }
        $slideEl.transform(transform);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          var multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
        }
      }
      var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTransition(duration);
      },
    },
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
        $slideEl
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTransition(duration);
      },
    },
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var stretch = params.stretch;
        // Allow percentage to make a relative stretch for responsive sliders
        if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
          stretch = ((parseFloat(params.stretch) / 100) * slideSize);
        }
        var translateY = isHorizontal ? 0 : stretch * (offsetMultiplier);
        var translateX = isHorizontal ? stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) { translateX = 0; }
        if (Math.abs(translateY) < 0.001) { translateY = 0; }
        if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
        if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
        if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
          if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
        }
      }

      // Set correct perspective for IE10
      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    },
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }

        swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTransition(duration);
      },
    },
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        }));
        swiper.thumbs.swiperCreated = true;
      }
      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }
      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
      var slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;
        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix();
          // eslint-disable-next-line
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }
        var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
        else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
        else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
        else { slideToIndex = prevIndex; }
      }
      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

      var autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
      var useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
      if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        var direction;
        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix();
            // eslint-disable-next-line
            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          }
          // Find actual thumbs index to slide to
          var prevThumbsIndex = thumbsSwiper.slides
            .eq(currentThumbsIndex)
            .prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
            .index();
          var nextThumbsIndex = thumbsSwiper.slides
            .eq(currentThumbsIndex)
            .nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0)
            .index();
          if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
          else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
          else { newThumbsIndex = prevThumbsIndex; }
          direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
        } else {
          newThumbsIndex = swiper.realIndex;
          direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
        }
        if (useOffset) {
          newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
        }

        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }

      // Activate thumbs
      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      if (!swiper.params.thumbs.multipleActiveThumbs) {
        thumbsToActivate = 1;
      }

      thumbsToActivate = Math.floor(thumbsToActivate);

      thumbsSwiper.slides.removeClass(thumbActiveClass);
      if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    },
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        multipleActiveThumbs: true,
        autoScrollOffset: 0,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;
        if (!thumbs || !thumbs.swiper) { return; }
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      },
    },
  };

  // Swiper Class

  var components = [
    Device$1,
    Support$1,
    Browser$1,
    Resize,
    Observer$1,
    Virtual$1,
    Keyboard$1,
    Mousewheel$1,
    Navigation$1,
    Pagination$1,
    Scrollbar$1,
    Parallax$1,
    Zoom$1,
    Lazy$1,
    Controller$1,
    A11y,
    History$1,
    HashNavigation$1,
    Autoplay$1,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    Thumbs$1
  ];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  return Swiper;

})));
//# sourceMappingURL=swiper.js.map

;(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ejs=f()}})(function(){var define,module,exports;return function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e}()({1:[function(require,module,exports){"use strict";var fs=require("fs");var path=require("path");var utils=require("./utils");var scopeOptionWarned=false;var _VERSION_STRING=require("../package.json").version;var _DEFAULT_OPEN_DELIMITER="<";var _DEFAULT_CLOSE_DELIMITER=">";var _DEFAULT_DELIMITER="%";var _DEFAULT_LOCALS_NAME="locals";var _NAME="ejs";var _REGEX_STRING="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";var _OPTS_PASSABLE_WITH_DATA=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"];var _OPTS_PASSABLE_WITH_DATA_EXPRESS=_OPTS_PASSABLE_WITH_DATA.concat("cache");var _BOM=/^\uFEFF/;exports.cache=utils.cache;exports.fileLoader=fs.readFileSync;exports.localsName=_DEFAULT_LOCALS_NAME;exports.promiseImpl=new Function("return this;")().Promise;exports.resolveInclude=function(name,filename,isDir){var dirname=path.dirname;var extname=path.extname;var resolve=path.resolve;var includePath=resolve(isDir?filename:dirname(filename),name);var ext=extname(name);if(!ext){includePath+=".ejs"}return includePath};function getIncludePath(path,options){var includePath;var filePath;var views=options.views;var match=/^[A-Za-z]+:\\|^\//.exec(path);if(match&&match.length){includePath=exports.resolveInclude(path.replace(/^\/*/,""),options.root||"/",true)}else{if(options.filename){filePath=exports.resolveInclude(path,options.filename);if(fs.existsSync(filePath)){includePath=filePath}}if(!includePath){if(Array.isArray(views)&&views.some(function(v){filePath=exports.resolveInclude(path,v,true);return fs.existsSync(filePath)})){includePath=filePath}}if(!includePath){throw new Error('Could not find the include file "'+options.escapeFunction(path)+'"')}}return includePath}function handleCache(options,template){var func;var filename=options.filename;var hasTemplate=arguments.length>1;if(options.cache){if(!filename){throw new Error("cache option requires a filename")}func=exports.cache.get(filename);if(func){return func}if(!hasTemplate){template=fileLoader(filename).toString().replace(_BOM,"")}}else if(!hasTemplate){if(!filename){throw new Error("Internal EJS error: no file name or template "+"provided")}template=fileLoader(filename).toString().replace(_BOM,"")}func=exports.compile(template,options);if(options.cache){exports.cache.set(filename,func)}return func}function tryHandleCache(options,data,cb){var result;if(!cb){if(typeof exports.promiseImpl=="function"){return new exports.promiseImpl(function(resolve,reject){try{result=handleCache(options)(data);resolve(result)}catch(err){reject(err)}})}else{throw new Error("Please provide a callback function")}}else{try{result=handleCache(options)(data)}catch(err){return cb(err)}cb(null,result)}}function fileLoader(filePath){return exports.fileLoader(filePath)}function includeFile(path,options){var opts=utils.shallowCopy({},options);opts.filename=getIncludePath(path,opts);return handleCache(opts)}function includeSource(path,options){var opts=utils.shallowCopy({},options);var includePath;var template;includePath=getIncludePath(path,opts);template=fileLoader(includePath).toString().replace(_BOM,"");opts.filename=includePath;var templ=new Template(template,opts);templ.generateSource();return{source:templ.source,filename:includePath,template:template}}function rethrow(err,str,flnm,lineno,esc){var lines=str.split("\n");var start=Math.max(lineno-3,0);var end=Math.min(lines.length,lineno+3);var filename=esc(flnm);var context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?" >> ":"    ")+curr+"| "+line}).join("\n");err.path=filename;err.message=(filename||"ejs")+":"+lineno+"\n"+context+"\n\n"+err.message;throw err}function stripSemi(str){return str.replace(/;(\s*$)/,"$1")}exports.compile=function compile(template,opts){var templ;if(opts&&opts.scope){if(!scopeOptionWarned){console.warn("`scope` option is deprecated and will be removed in EJS 3");scopeOptionWarned=true}if(!opts.context){opts.context=opts.scope}delete opts.scope}templ=new Template(template,opts);return templ.compile()};exports.render=function(template,d,o){var data=d||{};var opts=o||{};if(arguments.length==2){utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA)}return handleCache(opts,template)(data)};exports.renderFile=function(){var args=Array.prototype.slice.call(arguments);var filename=args.shift();var cb;var opts={filename:filename};var data;var viewOpts;if(typeof arguments[arguments.length-1]=="function"){cb=args.pop()}if(args.length){data=args.shift();if(args.length){utils.shallowCopy(opts,args.pop())}else{if(data.settings){if(data.settings.views){opts.views=data.settings.views}if(data.settings["view cache"]){opts.cache=true}viewOpts=data.settings["view options"];if(viewOpts){utils.shallowCopy(opts,viewOpts)}}utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA_EXPRESS)}opts.filename=filename}else{data={}}return tryHandleCache(opts,data,cb)};exports.Template=Template;exports.clearCache=function(){exports.cache.reset()};function Template(text,opts){opts=opts||{};var options={};this.templateText=text;this.mode=null;this.truncate=false;this.currentLine=1;this.source="";this.dependencies=[];options.client=opts.client||false;options.escapeFunction=opts.escape||opts.escapeFunction||utils.escapeXML;options.compileDebug=opts.compileDebug!==false;options.debug=!!opts.debug;options.filename=opts.filename;options.openDelimiter=opts.openDelimiter||exports.openDelimiter||_DEFAULT_OPEN_DELIMITER;options.closeDelimiter=opts.closeDelimiter||exports.closeDelimiter||_DEFAULT_CLOSE_DELIMITER;options.delimiter=opts.delimiter||exports.delimiter||_DEFAULT_DELIMITER;options.strict=opts.strict||false;options.context=opts.context;options.cache=opts.cache||false;options.rmWhitespace=opts.rmWhitespace;options.root=opts.root;options.outputFunctionName=opts.outputFunctionName;options.localsName=opts.localsName||exports.localsName||_DEFAULT_LOCALS_NAME;options.views=opts.views;options.async=opts.async;if(options.strict){options._with=false}else{options._with=typeof opts._with!="undefined"?opts._with:true}this.opts=options;this.regex=this.createRegex()}Template.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"};Template.prototype={createRegex:function(){var str=_REGEX_STRING;var delim=utils.escapeRegExpChars(this.opts.delimiter);var open=utils.escapeRegExpChars(this.opts.openDelimiter);var close=utils.escapeRegExpChars(this.opts.closeDelimiter);str=str.replace(/%/g,delim).replace(/</g,open).replace(/>/g,close);return new RegExp(str)},compile:function(){var src;var fn;var opts=this.opts;var prepended="";var appended="";var escapeFn=opts.escapeFunction;var ctor;if(!this.source){this.generateSource();prepended+="  var __output = [], __append = __output.push.bind(__output);"+"\n";if(opts.outputFunctionName){prepended+="  var "+opts.outputFunctionName+" = __append;"+"\n"}if(opts._with!==false){prepended+="  with ("+opts.localsName+" || {}) {"+"\n";appended+="  }"+"\n"}appended+='  return __output.join("");'+"\n";this.source=prepended+this.source+appended}if(opts.compileDebug){src="var __line = 1"+"\n"+"  , __lines = "+JSON.stringify(this.templateText)+"\n"+"  , __filename = "+(opts.filename?JSON.stringify(opts.filename):"undefined")+";"+"\n"+"try {"+"\n"+this.source+"} catch (e) {"+"\n"+"  rethrow(e, __lines, __filename, __line, escapeFn);"+"\n"+"}"+"\n"}else{src=this.source}if(opts.client){src="escapeFn = escapeFn || "+escapeFn.toString()+";"+"\n"+src;if(opts.compileDebug){src="rethrow = rethrow || "+rethrow.toString()+";"+"\n"+src}}if(opts.strict){src='"use strict";\n'+src}if(opts.debug){console.log(src)}try{if(opts.async){try{ctor=new Function("return (async function(){}).constructor;")()}catch(e){if(e instanceof SyntaxError){throw new Error("This environment does not support async/await")}else{throw e}}}else{ctor=Function}fn=new ctor(opts.localsName+", escapeFn, include, rethrow",src)}catch(e){if(e instanceof SyntaxError){if(opts.filename){e.message+=" in "+opts.filename}e.message+=" while compiling ejs\n\n";e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n";e.message+="https://github.com/RyanZim/EJS-Lint";if(!e.async){e.message+="\n";e.message+="Or, if you meant to create an async function, pass async: true as an option."}}throw e}if(opts.client){fn.dependencies=this.dependencies;return fn}var returnedFn=function(data){var include=function(path,includeData){var d=utils.shallowCopy({},data);if(includeData){d=utils.shallowCopy(d,includeData)}return includeFile(path,opts)(d)};return fn.apply(opts.context,[data||{},escapeFn,include,rethrow])};returnedFn.dependencies=this.dependencies;return returnedFn},generateSource:function(){var opts=this.opts;if(opts.rmWhitespace){this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")}this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var self=this;var matches=this.parseTemplateText();var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;if(matches&&matches.length){matches.forEach(function(line,index){var opening;var closing;var include;var includeOpts;var includeObj;var includeSrc;if(line.indexOf(o+d)===0&&line.indexOf(o+d+d)!==0){closing=matches[index+2];if(!(closing==d+c||closing=="-"+d+c||closing=="_"+d+c)){throw new Error('Could not find matching close tag for "'+line+'".')}}if(include=line.match(/^\s*include\s+(\S+)/)){opening=matches[index-1];if(opening&&(opening==o+d||opening==o+d+"-"||opening==o+d+"_")){includeOpts=utils.shallowCopy({},self.opts);includeObj=includeSource(include[1],includeOpts);if(self.opts.compileDebug){includeSrc="    ; (function(){"+"\n"+"      var __line = 1"+"\n"+"      , __lines = "+JSON.stringify(includeObj.template)+"\n"+"      , __filename = "+JSON.stringify(includeObj.filename)+";"+"\n"+"      try {"+"\n"+includeObj.source+"      } catch (e) {"+"\n"+"        rethrow(e, __lines, __filename, __line, escapeFn);"+"\n"+"      }"+"\n"+"    ; }).call(this)"+"\n"}else{includeSrc="    ; (function(){"+"\n"+includeObj.source+"    ; }).call(this)"+"\n"}self.source+=includeSrc;self.dependencies.push(exports.resolveInclude(include[1],includeOpts.filename));return}}self.scanLine(line)})}},parseTemplateText:function(){var str=this.templateText;var pat=this.regex;var result=pat.exec(str);var arr=[];var firstPos;while(result){firstPos=result.index;if(firstPos!==0){arr.push(str.substring(0,firstPos));str=str.slice(firstPos)}arr.push(result[0]);str=str.slice(result[0].length);result=pat.exec(str)}if(str){arr.push(str)}return arr},_addOutput:function(line){if(this.truncate){line=line.replace(/^(?:\r\n|\r|\n)/,"");this.truncate=false}if(!line){return line}line=line.replace(/\\/g,"\\\\");line=line.replace(/\n/g,"\\n");line=line.replace(/\r/g,"\\r");line=line.replace(/"/g,'\\"');this.source+='    ; __append("'+line+'")'+"\n"},scanLine:function(line){var self=this;var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;var newLineCount=0;newLineCount=line.split("\n").length-1;switch(line){case o+d:case o+d+"_":this.mode=Template.modes.EVAL;break;case o+d+"=":this.mode=Template.modes.ESCAPED;break;case o+d+"-":this.mode=Template.modes.RAW;break;case o+d+"#":this.mode=Template.modes.COMMENT;break;case o+d+d:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(o+d+d,o+d)+'")'+"\n";break;case d+d+c:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(d+d+c,d+c)+'")'+"\n";break;case d+c:case"-"+d+c:case"_"+d+c:if(this.mode==Template.modes.LITERAL){this._addOutput(line)}this.mode=null;this.truncate=line.indexOf("-")===0||line.indexOf("_")===0;break;default:if(this.mode){switch(this.mode){case Template.modes.EVAL:case Template.modes.ESCAPED:case Template.modes.RAW:if(line.lastIndexOf("//")>line.lastIndexOf("\n")){line+="\n"}}switch(this.mode){case Template.modes.EVAL:this.source+="    ; "+line+"\n";break;case Template.modes.ESCAPED:this.source+="    ; __append(escapeFn("+stripSemi(line)+"))"+"\n";break;case Template.modes.RAW:this.source+="    ; __append("+stripSemi(line)+")"+"\n";break;case Template.modes.COMMENT:break;case Template.modes.LITERAL:this._addOutput(line);break}}else{this._addOutput(line)}}if(self.opts.compileDebug&&newLineCount){this.currentLine+=newLineCount;this.source+="    ; __line = "+this.currentLine+"\n"}}};exports.escapeXML=utils.escapeXML;exports.__express=exports.renderFile;if(require.extensions){require.extensions[".ejs"]=function(module,flnm){var filename=flnm||module.filename;var options={filename:filename,client:true};var template=fileLoader(filename).toString();var fn=exports.compile(template,options);module._compile("module.exports = "+fn.toString()+";",filename)}}exports.VERSION=_VERSION_STRING;exports.name=_NAME;if(typeof window!="undefined"){window.ejs=exports}},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(require,module,exports){"use strict";var regExpChars=/[|\\{}()[\]^$+*?.]/g;exports.escapeRegExpChars=function(string){if(!string){return""}return String(string).replace(regExpChars,"\\$&")};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"};var _MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var escapeFuncStr="var _ENCODE_HTML_RULES = {\n"+'      "&": "&amp;"\n'+'    , "<": "&lt;"\n'+'    , ">": "&gt;"\n'+'    , \'"\': "&#34;"\n'+'    , "\'": "&#39;"\n'+"    }\n"+"  , _MATCH_HTML = /[&<>'\"]/g;\n"+"function encode_char(c) {\n"+"  return _ENCODE_HTML_RULES[c] || c;\n"+"};\n";exports.escapeXML=function(markup){return markup==undefined?"":String(markup).replace(_MATCH_HTML,encode_char)};exports.escapeXML.toString=function(){return Function.prototype.toString.call(this)+";\n"+escapeFuncStr};exports.shallowCopy=function(to,from){from=from||{};for(var p in from){to[p]=from[p]}return to};exports.shallowCopyFromList=function(to,from,list){for(var i=0;i<list.length;i++){var p=list[i];if(typeof from[p]!="undefined"){to[p]=from[p]}}return to};exports.cache={_data:{},set:function(key,val){this._data[key]=val},get:function(key){return this._data[key]},remove:function(key){delete this._data[key]},reset:function(){this._data={}}}},{}],3:[function(require,module,exports){},{}],4:[function(require,module,exports){(function(process){function normalizeArray(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up--;up){parts.unshift("..")}}return parts}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var splitPath=function(filename){return splitPathRe.exec(filename).slice(1)};exports.resolve=function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();if(typeof path!=="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){continue}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=normalizeArray(filter(resolvedPath.split("/"),function(p){return!!p}),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."};exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==="/";path=normalizeArray(filter(path.split("/"),function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path};exports.isAbsolute=function(path){return path.charAt(0)==="/"};exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=="string"){throw new TypeError("Arguments to path.join must be strings")}return p}).join("/"))};exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")};exports.sep="/";exports.delimiter=":";exports.dirname=function(path){var result=splitPath(path),root=result[0],dir=result[1];if(!root&&!dir){return"."}if(dir){dir=dir.substr(0,dir.length-1)}return root+dir};exports.basename=function(path,ext){var f=splitPath(path)[2];if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length)}return f};exports.extname=function(path){return splitPath(path)[3]};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i])}return res}var substr="ab".substr(-1)==="b"?function(str,start,len){return str.substr(start,len)}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len)}}).call(this,require("_process"))},{_process:5}],5:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;runClearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],6:[function(require,module,exports){module.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"2.6.1",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",contributors:["Timothy Gu <timothygu99@gmail.com> (https://timothygu.github.io)"],license:"Apache-2.0",main:"./lib/ejs.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{},devDependencies:{browserify:"^13.1.1",eslint:"^4.14.0","git-directory-deploy":"^1.5.1",istanbul:"~0.4.3",jake:"^8.0.16",jsdoc:"^3.4.0","lru-cache":"^4.0.1",mocha:"^5.0.5","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"jake test",lint:'eslint "**/*.js" Jakefile',coverage:"istanbul cover node_modules/mocha/bin/_mocha",doc:"jake doc",devdoc:"jake doc[dev]"}}},{}]},{},[1])(1)});

;
//
// StarWebPrintExtManager API
//
// Version 1.2.0
//
// Copyright (C) 2016-2019 STAR MICRONICS CO., LTD. All Rights Reserved.
//

var StarWebPrintExtManager=function(a){this.url=this.onStatusUpdate=this.onWrite=this.onAccessoryDisconnect=this.onAccessoryConnectFailure=this.onAccessoryConnectSuccess=this.onDisplayDisconnect=this.onDisplayConnect=this.onDisplayImpossible=this.onBarcodeDataReceive=this.onBarcodeReaderDisconnect=this.onBarcodeReaderConnect=this.onBarcodeReaderImpossible=this.onCashDrawerClose=this.onCashDrawerOpen=this.onPrinterCoverClose=this.onPrinterCoverOpen=this.onPrinterPaperEmpty=this.onPrinterPaperNearEmpty=
this.onPrinterPaperReady=this.onPrinterOffline=this.onPrinterOnline=this.onPrinterImpossible=this.onError=this.onReceive=null;this.pollingInterval=200;this.pollingTimeout=3E4;this.isWaitWriteCallback=this.isWaitCallback=!1;this.claimId=0;this.isReleaseRequest=this.isPolling=!1;void 0!=a&&(void 0!=a.pollingTimeout&&(this.pollingTimeout=a.pollingTimeout),void 0!=a.pollingInterval&&(this.pollingInterval=a.pollingInterval),void 0!=a.url&&(this.url=a.url))};
StarWebPrintExtManager.prototype.connect=function(a){void 0!=a&&(void 0!=a.pollingTimeout&&(this.pollingTimeout=a.pollingTimeout),void 0!=a.pollingInterval&&(this.pollingInterval=a.pollingInterval),void 0!=a.url&&(this.url=a.url));return!this.isPolling&&!this.isWaitCallback?(this.isReleaseRequest=!1,this._sendExtMessage({requestType:"claim",isNeedExternalCallBack:!0}),!0):!1};
StarWebPrintExtManager.prototype.disconnect=function(){return!this.isReleaseRequest&&this.isPolling&&!this.isWaitCallback?this.isReleaseRequest=!0:!1};StarWebPrintExtManager.prototype.write=function(a){if(void 0==a.request)return!1;0==this.claimId&&void 0!=a.url&&(this.url=a.url);this._sendExtMessage({requestType:"write",isNeedExternalCallBack:!0,request:a.request});return!0};StarWebPrintExtManager.prototype._getPollingInterval=function(){100>this.pollingInterval&&(this.pollingInterval=100);return this.pollingInterval};
StarWebPrintExtManager.prototype._getPollingTimeout=function(){1E4>this.pollingTimeout&&(this.pollingTimeout=1E4);return this.pollingTimeout};StarWebPrintExtManager.prototype._polling=function(){this.isReleaseRequest?(this.isReleaseRequest=!1,this._sendExtMessage({requestType:"release",isNeedExternalCallBack:!0}),this._clearClaimId()):this._sendExtMessage({requestType:"read",isNeedExternalCallBack:!1})};
StarWebPrintExtManager.prototype._analyzeXml=function(a,d){var e=new DOMParser,b,f;b=e.parseFromString(a.responseText,"text/xml");f=b.getElementsByTagName("Response");b=e.parseFromString(f.item(0).textContent,"text/xml");b.getElementsByTagName("root");f=b.getElementsByTagName("claimid").item(0);var g=b.getElementsByTagName("claim").item(0),e=b.getElementsByTagName("event");a.managerClaim=g.textContent;a.managerSuccess=a.traderSuccess;a.managerCode=a.traderCode;a.traderSuccess=void 0;a.traderCode=
void 0;a.traderStatus=void 0;if("true"==a.managerSuccess){if("true"==a.managerClaim){void 0!=f&&(this.claimId=f.textContent,this.isPolling=!0);var c=this;f={onPrinterImpossible:function(){c.onPrinterImpossible()},onPrinterOnline:function(){c.onPrinterOnline()},onPrinterOffline:function(){c.onPrinterOffline()},onPrinterPaperReady:function(){c.onPrinterPaperReady()},onPrinterPaperNearEmpty:function(){c.onPrinterPaperNearEmpty()},onPrinterPaperEmpty:function(){c.onPrinterPaperEmpty()},onPrinterCoverOpen:function(){c.onPrinterCoverOpen()},
onPrinterCoverClose:function(){c.onPrinterCoverClose()},onCashDrawerOpen:function(){c.onCashDrawerOpen()},onCashDrawerClose:function(){c.onCashDrawerClose()},onBarcodeReaderImpossible:function(){c.onBarcodeReaderImpossible()},onBarcodeReaderConnect:function(){c.onBarcodeReaderConnect()},onBarcodeReaderDisconnect:function(){c.onBarcodeReaderDisconnect()},onBarcodeDataReceive:function(a){c.onBarcodeDataReceive({data:a})},onDisplayImpossible:function(){c.onDisplayImpossible()},onDisplayConnect:function(){c.onDisplayConnect()},
onDisplayDisconnect:function(){c.onDisplayDisconnect()},onAccessoryConnectSuccess:function(){c.onAccessoryConnectSuccess()},onAccessoryConnectFailure:function(){c.onAccessoryConnectFailure()},onAccessoryDisconnect:function(){c.onAccessoryDisconnect()},onWrite:function(){c.onWrite()},onStatusUpdate:function(a){c.onStatusUpdate({status:a})}};g=0;if(this.isPolling||this.isWaitWriteCallback){if(void 0!=b.getElementsByTagName("eventcount"))try{g=b.getElementsByTagName("eventcount").item(0).textContent}catch(m){}for(b=
0;b<g;b++)for(var h=0;h<e.length;h++){var k=e.item(h).getElementsByTagName("action").item(0).textContent;if(e.item(h).getElementsByTagName("number").item(0).textContent==b)if("onBarcodeDataReceive"==k||"onStatusUpdate"==k){var l=e.item(h).getElementsByTagName("data").item(0).textContent;try{f[k](l)}catch(n){}}else try{f[k]()}catch(p){}}}}}else 1200!=a.managerCode&&(2001!=a.managerCode&&!(d&&1010==a.managerCode))&&this._clearClaimId();return a};
StarWebPrintExtManager.prototype._clearClaimId=function(){this.claimId=0;this.isPolling=!1};StarWebPrintExtManager.prototype._waitCallPolling=function(){var a=this;setTimeout(function(){a._polling()},a._getPollingInterval())};
StarWebPrintExtManager.prototype._sendExtMessage=function(a){a.isNeedExternalCallBack&&("write"==a.requestType?this.isWaitWriteCallback=!0:this.isWaitCallback=!0);var d="<extmanager ";"claim"==a.requestType||"read"==a.requestType||"write"==a.requestType?(d+='request_type="'+a.requestType+'" ',"claim"==a.requestType&&(d+='polling_timeout="'+this._getPollingTimeout()+'" ')):d+='request_type="release" ';0!=this.claimId&&(d+='claimid="'+this.claimId+'" ');d+=">";"write"==a.requestType&&void 0!=a.request&&
(d+=a.request);var d=d+"</extmanager>",e=new StarWebPrintTrader,b=this,f=this._getPollingTimeout(),g="write"==a.requestType;g?(e.onReceive=function(c){c=b._analyzeXml(c,g);if(a.isNeedExternalCallBack||"false"==c.managerSuccess){if(void 0!=b.onReceive)b.onReceive(c);b.isWaitWriteCallback=!1}},e.onError=function(a){b.isWaitWriteCallback=!1;b._clearClaimId();if(void 0!=b.onError)b.onError(a)}):(e.onReceive=function(c){c=b._analyzeXml(c,g);if(a.isNeedExternalCallBack||"false"==c.managerSuccess){if(void 0!=
b.onReceive)b.onReceive(c);b.isWaitCallback=!1}b.isPolling&&b._waitCallPolling()},e.onError=function(a){b.isWaitCallback=!1;b._clearClaimId();if(void 0!=b.onError)b.onError(a)});e.sendMessage({url:this.url,request:d,timeout:f})};

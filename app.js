var koa = require('koa');
var app = koa();

var crypto = require('crypto');

app.use(function *(){

	var TOKEN = 'yizecoala'
	var sha1 = crypto.createHash('sha1');

	var signature = this.request.query.signature;
	var timestamp = this.request.query.timestamp;
	var nonce = this.request.query.nonce;
	var echostr = this.request.query.echostr;

	if(checkSignature(signature,timestamp,nonce)){
		this.body = echostr;
	}else{
		this.body = false;
	}
});

function checkSignature(signature,timestamp,nonce){
	var TOKEN = 'yizecoala'

	var tmpArr = [TOKEN , timestamp , nonce];
	tmpArr.sort();

	var tmpStr = tmpArr.join('');

	var sha1 = crypto.createHash('sha1');

	sha1.update(tmpStr)
	var hex = sha1.digest('hex');

	if(hex === signature){
		console.log('验证成功');
		return true;
	}else{
		console.log('验证失败');
		return false;
	}
}

app.listen(1111);
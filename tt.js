/**
 * Created by kruny1001 on 6/14/15.
 */

var get_ip = require('ipware')().get_ip;
app.use(function(req, res, next) {
	var ip_info = get_ip(req);
	console.log(ip_info);
	// { clientIp: '127.0.0.1', clientIpRoutable: false }
	next();
});
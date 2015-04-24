'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

    var gPlus = require('../../app/controllers/google-plus.server.controller')

    app.route('/gapi')
    .get(gPlus.getGoogleAccess);

    app.route('/oauth2callback')
        .get(function(req, res) {
            var code = req.query.code;
            //gapi.client.getToken(code, function(err, tokens){
            //    gapi.client.credentials = tokens;
            //    getData();
            //});
            //var locals = {
            //    title: 'May sample app',
            //    url: gPlus.url
            //};
            gPlus.doSomthing(code);

            res.jsonp(code);
        });
};

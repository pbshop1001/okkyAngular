'use strict';

var passport = require('passport');

module.exports = function(app) {
	var gs = require('../../app/controllers/gs-app.server.controller');
	var users = require('../../app/controllers/users.server.controller')

	app.route('/gs')
		.get(users.requiresLogin, gs.gsGet);

	app.route('/createFile').get(users.requiresLogin, gs.createFile);
	app.route('/createHWD2l/:id').get(users.requiresLogin, gs.createHWD2l);

	app.route('/HWD2l/:id').get(users.requiresLogin, gs.getHWD2l);

	//Find Super Parent folder
	app.route('/superParent').get(users.requiresLogin, gs.searchMainFloder);


	//Permission
	app.route('/HWD2l/getPermission/:id').get(users.requiresLogin, gs.getPermissionHWD2l);
	app.route('/HWD2l/insertPermission/:id').get(users.requiresLogin, gs.insertPermissionHWD2l);

	//Copy files
	app.route('/HWD2l/copyFile/:id/:userNameDoc').get(users.requiresLogin, gs.copyHWD2l);


	app.route('/userInfo').get(gs.getUserInfo);
};

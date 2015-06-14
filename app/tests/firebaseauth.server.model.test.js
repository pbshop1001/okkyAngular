'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Firebaseauth = mongoose.model('Firebaseauth');

/**
 * Globals
 */
var user, firebaseauth;

/**
 * Unit tests
 */
describe('Firebaseauth Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			firebaseauth = new Firebaseauth({
				name: 'Firebaseauth Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return firebaseauth.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			firebaseauth.name = '';

			return firebaseauth.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Firebaseauth.remove().exec();
		User.remove().exec();

		done();
	});
});
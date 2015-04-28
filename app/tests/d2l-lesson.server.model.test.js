'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	D2lLesson = mongoose.model('D2lLesson');

/**
 * Globals
 */
var user, d2lLesson;

/**
 * Unit tests
 */
describe('D2l lesson Model Unit Tests:', function() {
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
			d2lLesson = new D2lLesson({
				name: 'D2l lesson Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return d2lLesson.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			d2lLesson.name = '';

			return d2lLesson.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		D2lLesson.remove().exec();
		User.remove().exec();

		done();
	});
});
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EtcProduct = mongoose.model('EtcProduct');

/**
 * Globals
 */
var user, etcProduct;

/**
 * Unit tests
 */
describe('Etc product Model Unit Tests:', function() {
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
			etcProduct = new EtcProduct({
				name: 'Etc product Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return etcProduct.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			etcProduct.name = '';

			return etcProduct.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		EtcProduct.remove().exec();
		User.remove().exec();

		done();
	});
});
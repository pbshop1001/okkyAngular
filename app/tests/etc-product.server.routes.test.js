'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	EtcProduct = mongoose.model('EtcProduct'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, etcProduct;

/**
 * Etc product routes tests
 */
describe('Etc product CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Etc product
		user.save(function() {
			etcProduct = {
				name: 'Etc product Name'
			};

			done();
		});
	});

	it('should be able to save Etc product instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Etc product
				agent.post('/etc-products')
					.send(etcProduct)
					.expect(200)
					.end(function(etcProductSaveErr, etcProductSaveRes) {
						// Handle Etc product save error
						if (etcProductSaveErr) done(etcProductSaveErr);

						// Get a list of Etc products
						agent.get('/etc-products')
							.end(function(etcProductsGetErr, etcProductsGetRes) {
								// Handle Etc product save error
								if (etcProductsGetErr) done(etcProductsGetErr);

								// Get Etc products list
								var etcProducts = etcProductsGetRes.body;

								// Set assertions
								(etcProducts[0].user._id).should.equal(userId);
								(etcProducts[0].name).should.match('Etc product Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Etc product instance if not logged in', function(done) {
		agent.post('/etc-products')
			.send(etcProduct)
			.expect(401)
			.end(function(etcProductSaveErr, etcProductSaveRes) {
				// Call the assertion callback
				done(etcProductSaveErr);
			});
	});

	it('should not be able to save Etc product instance if no name is provided', function(done) {
		// Invalidate name field
		etcProduct.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Etc product
				agent.post('/etc-products')
					.send(etcProduct)
					.expect(400)
					.end(function(etcProductSaveErr, etcProductSaveRes) {
						// Set message assertion
						(etcProductSaveRes.body.message).should.match('Please fill Etc product name');
						
						// Handle Etc product save error
						done(etcProductSaveErr);
					});
			});
	});

	it('should be able to update Etc product instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Etc product
				agent.post('/etc-products')
					.send(etcProduct)
					.expect(200)
					.end(function(etcProductSaveErr, etcProductSaveRes) {
						// Handle Etc product save error
						if (etcProductSaveErr) done(etcProductSaveErr);

						// Update Etc product name
						etcProduct.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Etc product
						agent.put('/etc-products/' + etcProductSaveRes.body._id)
							.send(etcProduct)
							.expect(200)
							.end(function(etcProductUpdateErr, etcProductUpdateRes) {
								// Handle Etc product update error
								if (etcProductUpdateErr) done(etcProductUpdateErr);

								// Set assertions
								(etcProductUpdateRes.body._id).should.equal(etcProductSaveRes.body._id);
								(etcProductUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Etc products if not signed in', function(done) {
		// Create new Etc product model instance
		var etcProductObj = new EtcProduct(etcProduct);

		// Save the Etc product
		etcProductObj.save(function() {
			// Request Etc products
			request(app).get('/etc-products')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Etc product if not signed in', function(done) {
		// Create new Etc product model instance
		var etcProductObj = new EtcProduct(etcProduct);

		// Save the Etc product
		etcProductObj.save(function() {
			request(app).get('/etc-products/' + etcProductObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', etcProduct.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Etc product instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Etc product
				agent.post('/etc-products')
					.send(etcProduct)
					.expect(200)
					.end(function(etcProductSaveErr, etcProductSaveRes) {
						// Handle Etc product save error
						if (etcProductSaveErr) done(etcProductSaveErr);

						// Delete existing Etc product
						agent.delete('/etc-products/' + etcProductSaveRes.body._id)
							.send(etcProduct)
							.expect(200)
							.end(function(etcProductDeleteErr, etcProductDeleteRes) {
								// Handle Etc product error error
								if (etcProductDeleteErr) done(etcProductDeleteErr);

								// Set assertions
								(etcProductDeleteRes.body._id).should.equal(etcProductSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Etc product instance if not signed in', function(done) {
		// Set Etc product user 
		etcProduct.user = user;

		// Create new Etc product model instance
		var etcProductObj = new EtcProduct(etcProduct);

		// Save the Etc product
		etcProductObj.save(function() {
			// Try deleting Etc product
			request(app).delete('/etc-products/' + etcProductObj._id)
			.expect(401)
			.end(function(etcProductDeleteErr, etcProductDeleteRes) {
				// Set message assertion
				(etcProductDeleteRes.body.message).should.match('User is not logged in');

				// Handle Etc product error error
				done(etcProductDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		EtcProduct.remove().exec();
		done();
	});
});
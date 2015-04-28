'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	D2lExample = mongoose.model('D2lExample'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, d2lExample;

/**
 * D2l example routes tests
 */
describe('D2l example CRUD tests', function() {
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

		// Save a user to the test db and create new D2l example
		user.save(function() {
			d2lExample = {
				name: 'D2l example Name'
			};

			done();
		});
	});

	it('should be able to save D2l example instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l example
				agent.post('/d2l-examples')
					.send(d2lExample)
					.expect(200)
					.end(function(d2lExampleSaveErr, d2lExampleSaveRes) {
						// Handle D2l example save error
						if (d2lExampleSaveErr) done(d2lExampleSaveErr);

						// Get a list of D2l examples
						agent.get('/d2l-examples')
							.end(function(d2lExamplesGetErr, d2lExamplesGetRes) {
								// Handle D2l example save error
								if (d2lExamplesGetErr) done(d2lExamplesGetErr);

								// Get D2l examples list
								var d2lExamples = d2lExamplesGetRes.body;

								// Set assertions
								(d2lExamples[0].user._id).should.equal(userId);
								(d2lExamples[0].name).should.match('D2l example Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save D2l example instance if not logged in', function(done) {
		agent.post('/d2l-examples')
			.send(d2lExample)
			.expect(401)
			.end(function(d2lExampleSaveErr, d2lExampleSaveRes) {
				// Call the assertion callback
				done(d2lExampleSaveErr);
			});
	});

	it('should not be able to save D2l example instance if no name is provided', function(done) {
		// Invalidate name field
		d2lExample.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l example
				agent.post('/d2l-examples')
					.send(d2lExample)
					.expect(400)
					.end(function(d2lExampleSaveErr, d2lExampleSaveRes) {
						// Set message assertion
						(d2lExampleSaveRes.body.message).should.match('Please fill D2l example name');
						
						// Handle D2l example save error
						done(d2lExampleSaveErr);
					});
			});
	});

	it('should be able to update D2l example instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l example
				agent.post('/d2l-examples')
					.send(d2lExample)
					.expect(200)
					.end(function(d2lExampleSaveErr, d2lExampleSaveRes) {
						// Handle D2l example save error
						if (d2lExampleSaveErr) done(d2lExampleSaveErr);

						// Update D2l example name
						d2lExample.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing D2l example
						agent.put('/d2l-examples/' + d2lExampleSaveRes.body._id)
							.send(d2lExample)
							.expect(200)
							.end(function(d2lExampleUpdateErr, d2lExampleUpdateRes) {
								// Handle D2l example update error
								if (d2lExampleUpdateErr) done(d2lExampleUpdateErr);

								// Set assertions
								(d2lExampleUpdateRes.body._id).should.equal(d2lExampleSaveRes.body._id);
								(d2lExampleUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of D2l examples if not signed in', function(done) {
		// Create new D2l example model instance
		var d2lExampleObj = new D2lExample(d2lExample);

		// Save the D2l example
		d2lExampleObj.save(function() {
			// Request D2l examples
			request(app).get('/d2l-examples')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single D2l example if not signed in', function(done) {
		// Create new D2l example model instance
		var d2lExampleObj = new D2lExample(d2lExample);

		// Save the D2l example
		d2lExampleObj.save(function() {
			request(app).get('/d2l-examples/' + d2lExampleObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', d2lExample.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete D2l example instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l example
				agent.post('/d2l-examples')
					.send(d2lExample)
					.expect(200)
					.end(function(d2lExampleSaveErr, d2lExampleSaveRes) {
						// Handle D2l example save error
						if (d2lExampleSaveErr) done(d2lExampleSaveErr);

						// Delete existing D2l example
						agent.delete('/d2l-examples/' + d2lExampleSaveRes.body._id)
							.send(d2lExample)
							.expect(200)
							.end(function(d2lExampleDeleteErr, d2lExampleDeleteRes) {
								// Handle D2l example error error
								if (d2lExampleDeleteErr) done(d2lExampleDeleteErr);

								// Set assertions
								(d2lExampleDeleteRes.body._id).should.equal(d2lExampleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete D2l example instance if not signed in', function(done) {
		// Set D2l example user 
		d2lExample.user = user;

		// Create new D2l example model instance
		var d2lExampleObj = new D2lExample(d2lExample);

		// Save the D2l example
		d2lExampleObj.save(function() {
			// Try deleting D2l example
			request(app).delete('/d2l-examples/' + d2lExampleObj._id)
			.expect(401)
			.end(function(d2lExampleDeleteErr, d2lExampleDeleteRes) {
				// Set message assertion
				(d2lExampleDeleteRes.body.message).should.match('User is not logged in');

				// Handle D2l example error error
				done(d2lExampleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		D2lExample.remove().exec();
		done();
	});
});
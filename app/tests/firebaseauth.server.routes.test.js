'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Firebaseauth = mongoose.model('Firebaseauth'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, firebaseauth;

/**
 * Firebaseauth routes tests
 */
describe('Firebaseauth CRUD tests', function() {
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

		// Save a user to the test db and create new Firebaseauth
		user.save(function() {
			firebaseauth = {
				name: 'Firebaseauth Name'
			};

			done();
		});
	});

	it('should be able to save Firebaseauth instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Firebaseauth
				agent.post('/firebaseauths')
					.send(firebaseauth)
					.expect(200)
					.end(function(firebaseauthSaveErr, firebaseauthSaveRes) {
						// Handle Firebaseauth save error
						if (firebaseauthSaveErr) done(firebaseauthSaveErr);

						// Get a list of Firebaseauths
						agent.get('/firebaseauths')
							.end(function(firebaseauthsGetErr, firebaseauthsGetRes) {
								// Handle Firebaseauth save error
								if (firebaseauthsGetErr) done(firebaseauthsGetErr);

								// Get Firebaseauths list
								var firebaseauths = firebaseauthsGetRes.body;

								// Set assertions
								(firebaseauths[0].user._id).should.equal(userId);
								(firebaseauths[0].name).should.match('Firebaseauth Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Firebaseauth instance if not logged in', function(done) {
		agent.post('/firebaseauths')
			.send(firebaseauth)
			.expect(401)
			.end(function(firebaseauthSaveErr, firebaseauthSaveRes) {
				// Call the assertion callback
				done(firebaseauthSaveErr);
			});
	});

	it('should not be able to save Firebaseauth instance if no name is provided', function(done) {
		// Invalidate name field
		firebaseauth.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Firebaseauth
				agent.post('/firebaseauths')
					.send(firebaseauth)
					.expect(400)
					.end(function(firebaseauthSaveErr, firebaseauthSaveRes) {
						// Set message assertion
						(firebaseauthSaveRes.body.message).should.match('Please fill Firebaseauth name');
						
						// Handle Firebaseauth save error
						done(firebaseauthSaveErr);
					});
			});
	});

	it('should be able to update Firebaseauth instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Firebaseauth
				agent.post('/firebaseauths')
					.send(firebaseauth)
					.expect(200)
					.end(function(firebaseauthSaveErr, firebaseauthSaveRes) {
						// Handle Firebaseauth save error
						if (firebaseauthSaveErr) done(firebaseauthSaveErr);

						// Update Firebaseauth name
						firebaseauth.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Firebaseauth
						agent.put('/firebaseauths/' + firebaseauthSaveRes.body._id)
							.send(firebaseauth)
							.expect(200)
							.end(function(firebaseauthUpdateErr, firebaseauthUpdateRes) {
								// Handle Firebaseauth update error
								if (firebaseauthUpdateErr) done(firebaseauthUpdateErr);

								// Set assertions
								(firebaseauthUpdateRes.body._id).should.equal(firebaseauthSaveRes.body._id);
								(firebaseauthUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Firebaseauths if not signed in', function(done) {
		// Create new Firebaseauth model instance
		var firebaseauthObj = new Firebaseauth(firebaseauth);

		// Save the Firebaseauth
		firebaseauthObj.save(function() {
			// Request Firebaseauths
			request(app).get('/firebaseauths')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Firebaseauth if not signed in', function(done) {
		// Create new Firebaseauth model instance
		var firebaseauthObj = new Firebaseauth(firebaseauth);

		// Save the Firebaseauth
		firebaseauthObj.save(function() {
			request(app).get('/firebaseauths/' + firebaseauthObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', firebaseauth.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Firebaseauth instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Firebaseauth
				agent.post('/firebaseauths')
					.send(firebaseauth)
					.expect(200)
					.end(function(firebaseauthSaveErr, firebaseauthSaveRes) {
						// Handle Firebaseauth save error
						if (firebaseauthSaveErr) done(firebaseauthSaveErr);

						// Delete existing Firebaseauth
						agent.delete('/firebaseauths/' + firebaseauthSaveRes.body._id)
							.send(firebaseauth)
							.expect(200)
							.end(function(firebaseauthDeleteErr, firebaseauthDeleteRes) {
								// Handle Firebaseauth error error
								if (firebaseauthDeleteErr) done(firebaseauthDeleteErr);

								// Set assertions
								(firebaseauthDeleteRes.body._id).should.equal(firebaseauthSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Firebaseauth instance if not signed in', function(done) {
		// Set Firebaseauth user 
		firebaseauth.user = user;

		// Create new Firebaseauth model instance
		var firebaseauthObj = new Firebaseauth(firebaseauth);

		// Save the Firebaseauth
		firebaseauthObj.save(function() {
			// Try deleting Firebaseauth
			request(app).delete('/firebaseauths/' + firebaseauthObj._id)
			.expect(401)
			.end(function(firebaseauthDeleteErr, firebaseauthDeleteRes) {
				// Set message assertion
				(firebaseauthDeleteRes.body.message).should.match('User is not logged in');

				// Handle Firebaseauth error error
				done(firebaseauthDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Firebaseauth.remove().exec();
		done();
	});
});
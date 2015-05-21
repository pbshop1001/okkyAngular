'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Googledoc = mongoose.model('Googledoc'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, googledoc;

/**
 * Googledoc routes tests
 */
describe('Googledoc CRUD tests', function() {
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

		// Save a user to the test db and create new Googledoc
		user.save(function() {
			googledoc = {
				name: 'Googledoc Name'
			};

			done();
		});
	});

	it('should be able to save Googledoc instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Googledoc
				agent.post('/googledocs')
					.send(googledoc)
					.expect(200)
					.end(function(googledocSaveErr, googledocSaveRes) {
						// Handle Googledoc save error
						if (googledocSaveErr) done(googledocSaveErr);

						// Get a list of Googledocs
						agent.get('/googledocs')
							.end(function(googledocsGetErr, googledocsGetRes) {
								// Handle Googledoc save error
								if (googledocsGetErr) done(googledocsGetErr);

								// Get Googledocs list
								var googledocs = googledocsGetRes.body;

								// Set assertions
								(googledocs[0].user._id).should.equal(userId);
								(googledocs[0].name).should.match('Googledoc Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Googledoc instance if not logged in', function(done) {
		agent.post('/googledocs')
			.send(googledoc)
			.expect(401)
			.end(function(googledocSaveErr, googledocSaveRes) {
				// Call the assertion callback
				done(googledocSaveErr);
			});
	});

	it('should not be able to save Googledoc instance if no name is provided', function(done) {
		// Invalidate name field
		googledoc.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Googledoc
				agent.post('/googledocs')
					.send(googledoc)
					.expect(400)
					.end(function(googledocSaveErr, googledocSaveRes) {
						// Set message assertion
						(googledocSaveRes.body.message).should.match('Please fill Googledoc name');
						
						// Handle Googledoc save error
						done(googledocSaveErr);
					});
			});
	});

	it('should be able to update Googledoc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Googledoc
				agent.post('/googledocs')
					.send(googledoc)
					.expect(200)
					.end(function(googledocSaveErr, googledocSaveRes) {
						// Handle Googledoc save error
						if (googledocSaveErr) done(googledocSaveErr);

						// Update Googledoc name
						googledoc.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Googledoc
						agent.put('/googledocs/' + googledocSaveRes.body._id)
							.send(googledoc)
							.expect(200)
							.end(function(googledocUpdateErr, googledocUpdateRes) {
								// Handle Googledoc update error
								if (googledocUpdateErr) done(googledocUpdateErr);

								// Set assertions
								(googledocUpdateRes.body._id).should.equal(googledocSaveRes.body._id);
								(googledocUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Googledocs if not signed in', function(done) {
		// Create new Googledoc model instance
		var googledocObj = new Googledoc(googledoc);

		// Save the Googledoc
		googledocObj.save(function() {
			// Request Googledocs
			request(app).get('/googledocs')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Googledoc if not signed in', function(done) {
		// Create new Googledoc model instance
		var googledocObj = new Googledoc(googledoc);

		// Save the Googledoc
		googledocObj.save(function() {
			request(app).get('/googledocs/' + googledocObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', googledoc.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Googledoc instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Googledoc
				agent.post('/googledocs')
					.send(googledoc)
					.expect(200)
					.end(function(googledocSaveErr, googledocSaveRes) {
						// Handle Googledoc save error
						if (googledocSaveErr) done(googledocSaveErr);

						// Delete existing Googledoc
						agent.delete('/googledocs/' + googledocSaveRes.body._id)
							.send(googledoc)
							.expect(200)
							.end(function(googledocDeleteErr, googledocDeleteRes) {
								// Handle Googledoc error error
								if (googledocDeleteErr) done(googledocDeleteErr);

								// Set assertions
								(googledocDeleteRes.body._id).should.equal(googledocSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Googledoc instance if not signed in', function(done) {
		// Set Googledoc user 
		googledoc.user = user;

		// Create new Googledoc model instance
		var googledocObj = new Googledoc(googledoc);

		// Save the Googledoc
		googledocObj.save(function() {
			// Try deleting Googledoc
			request(app).delete('/googledocs/' + googledocObj._id)
			.expect(401)
			.end(function(googledocDeleteErr, googledocDeleteRes) {
				// Set message assertion
				(googledocDeleteRes.body.message).should.match('User is not logged in');

				// Handle Googledoc error error
				done(googledocDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Googledoc.remove().exec();
		done();
	});
});
'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Crawling = mongoose.model('Crawling'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, crawling;

/**
 * Crawling routes tests
 */
describe('Crawling CRUD tests', function() {
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

		// Save a user to the test db and create new Crawling
		user.save(function() {
			crawling = {
				name: 'Crawling Name'
			};

			done();
		});
	});

	it('should be able to save Crawling instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawling
				agent.post('/crawlings')
					.send(crawling)
					.expect(200)
					.end(function(crawlingSaveErr, crawlingSaveRes) {
						// Handle Crawling save error
						if (crawlingSaveErr) done(crawlingSaveErr);

						// Get a list of Crawlings
						agent.get('/crawlings')
							.end(function(crawlingsGetErr, crawlingsGetRes) {
								// Handle Crawling save error
								if (crawlingsGetErr) done(crawlingsGetErr);

								// Get Crawlings list
								var crawlings = crawlingsGetRes.body;

								// Set assertions
								(crawlings[0].user._id).should.equal(userId);
								(crawlings[0].name).should.match('Crawling Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Crawling instance if not logged in', function(done) {
		agent.post('/crawlings')
			.send(crawling)
			.expect(401)
			.end(function(crawlingSaveErr, crawlingSaveRes) {
				// Call the assertion callback
				done(crawlingSaveErr);
			});
	});

	it('should not be able to save Crawling instance if no name is provided', function(done) {
		// Invalidate name field
		crawling.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawling
				agent.post('/crawlings')
					.send(crawling)
					.expect(400)
					.end(function(crawlingSaveErr, crawlingSaveRes) {
						// Set message assertion
						(crawlingSaveRes.body.message).should.match('Please fill Crawling name');
						
						// Handle Crawling save error
						done(crawlingSaveErr);
					});
			});
	});

	it('should be able to update Crawling instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawling
				agent.post('/crawlings')
					.send(crawling)
					.expect(200)
					.end(function(crawlingSaveErr, crawlingSaveRes) {
						// Handle Crawling save error
						if (crawlingSaveErr) done(crawlingSaveErr);

						// Update Crawling name
						crawling.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Crawling
						agent.put('/crawlings/' + crawlingSaveRes.body._id)
							.send(crawling)
							.expect(200)
							.end(function(crawlingUpdateErr, crawlingUpdateRes) {
								// Handle Crawling update error
								if (crawlingUpdateErr) done(crawlingUpdateErr);

								// Set assertions
								(crawlingUpdateRes.body._id).should.equal(crawlingSaveRes.body._id);
								(crawlingUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Crawlings if not signed in', function(done) {
		// Create new Crawling model instance
		var crawlingObj = new Crawling(crawling);

		// Save the Crawling
		crawlingObj.save(function() {
			// Request Crawlings
			request(app).get('/crawlings')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Crawling if not signed in', function(done) {
		// Create new Crawling model instance
		var crawlingObj = new Crawling(crawling);

		// Save the Crawling
		crawlingObj.save(function() {
			request(app).get('/crawlings/' + crawlingObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', crawling.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Crawling instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Crawling
				agent.post('/crawlings')
					.send(crawling)
					.expect(200)
					.end(function(crawlingSaveErr, crawlingSaveRes) {
						// Handle Crawling save error
						if (crawlingSaveErr) done(crawlingSaveErr);

						// Delete existing Crawling
						agent.delete('/crawlings/' + crawlingSaveRes.body._id)
							.send(crawling)
							.expect(200)
							.end(function(crawlingDeleteErr, crawlingDeleteRes) {
								// Handle Crawling error error
								if (crawlingDeleteErr) done(crawlingDeleteErr);

								// Set assertions
								(crawlingDeleteRes.body._id).should.equal(crawlingSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Crawling instance if not signed in', function(done) {
		// Set Crawling user 
		crawling.user = user;

		// Create new Crawling model instance
		var crawlingObj = new Crawling(crawling);

		// Save the Crawling
		crawlingObj.save(function() {
			// Try deleting Crawling
			request(app).delete('/crawlings/' + crawlingObj._id)
			.expect(401)
			.end(function(crawlingDeleteErr, crawlingDeleteRes) {
				// Set message assertion
				(crawlingDeleteRes.body.message).should.match('User is not logged in');

				// Handle Crawling error error
				done(crawlingDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Crawling.remove().exec();
		done();
	});
});
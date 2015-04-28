'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	D2lLesson = mongoose.model('D2lLesson'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, d2lLesson;

/**
 * D2l lesson routes tests
 */
describe('D2l lesson CRUD tests', function() {
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

		// Save a user to the test db and create new D2l lesson
		user.save(function() {
			d2lLesson = {
				name: 'D2l lesson Name'
			};

			done();
		});
	});

	it('should be able to save D2l lesson instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l lesson
				agent.post('/d2l-lessons')
					.send(d2lLesson)
					.expect(200)
					.end(function(d2lLessonSaveErr, d2lLessonSaveRes) {
						// Handle D2l lesson save error
						if (d2lLessonSaveErr) done(d2lLessonSaveErr);

						// Get a list of D2l lessons
						agent.get('/d2l-lessons')
							.end(function(d2lLessonsGetErr, d2lLessonsGetRes) {
								// Handle D2l lesson save error
								if (d2lLessonsGetErr) done(d2lLessonsGetErr);

								// Get D2l lessons list
								var d2lLessons = d2lLessonsGetRes.body;

								// Set assertions
								(d2lLessons[0].user._id).should.equal(userId);
								(d2lLessons[0].name).should.match('D2l lesson Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save D2l lesson instance if not logged in', function(done) {
		agent.post('/d2l-lessons')
			.send(d2lLesson)
			.expect(401)
			.end(function(d2lLessonSaveErr, d2lLessonSaveRes) {
				// Call the assertion callback
				done(d2lLessonSaveErr);
			});
	});

	it('should not be able to save D2l lesson instance if no name is provided', function(done) {
		// Invalidate name field
		d2lLesson.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l lesson
				agent.post('/d2l-lessons')
					.send(d2lLesson)
					.expect(400)
					.end(function(d2lLessonSaveErr, d2lLessonSaveRes) {
						// Set message assertion
						(d2lLessonSaveRes.body.message).should.match('Please fill D2l lesson name');
						
						// Handle D2l lesson save error
						done(d2lLessonSaveErr);
					});
			});
	});

	it('should be able to update D2l lesson instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l lesson
				agent.post('/d2l-lessons')
					.send(d2lLesson)
					.expect(200)
					.end(function(d2lLessonSaveErr, d2lLessonSaveRes) {
						// Handle D2l lesson save error
						if (d2lLessonSaveErr) done(d2lLessonSaveErr);

						// Update D2l lesson name
						d2lLesson.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing D2l lesson
						agent.put('/d2l-lessons/' + d2lLessonSaveRes.body._id)
							.send(d2lLesson)
							.expect(200)
							.end(function(d2lLessonUpdateErr, d2lLessonUpdateRes) {
								// Handle D2l lesson update error
								if (d2lLessonUpdateErr) done(d2lLessonUpdateErr);

								// Set assertions
								(d2lLessonUpdateRes.body._id).should.equal(d2lLessonSaveRes.body._id);
								(d2lLessonUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of D2l lessons if not signed in', function(done) {
		// Create new D2l lesson model instance
		var d2lLessonObj = new D2lLesson(d2lLesson);

		// Save the D2l lesson
		d2lLessonObj.save(function() {
			// Request D2l lessons
			request(app).get('/d2l-lessons')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single D2l lesson if not signed in', function(done) {
		// Create new D2l lesson model instance
		var d2lLessonObj = new D2lLesson(d2lLesson);

		// Save the D2l lesson
		d2lLessonObj.save(function() {
			request(app).get('/d2l-lessons/' + d2lLessonObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', d2lLesson.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete D2l lesson instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new D2l lesson
				agent.post('/d2l-lessons')
					.send(d2lLesson)
					.expect(200)
					.end(function(d2lLessonSaveErr, d2lLessonSaveRes) {
						// Handle D2l lesson save error
						if (d2lLessonSaveErr) done(d2lLessonSaveErr);

						// Delete existing D2l lesson
						agent.delete('/d2l-lessons/' + d2lLessonSaveRes.body._id)
							.send(d2lLesson)
							.expect(200)
							.end(function(d2lLessonDeleteErr, d2lLessonDeleteRes) {
								// Handle D2l lesson error error
								if (d2lLessonDeleteErr) done(d2lLessonDeleteErr);

								// Set assertions
								(d2lLessonDeleteRes.body._id).should.equal(d2lLessonSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete D2l lesson instance if not signed in', function(done) {
		// Set D2l lesson user 
		d2lLesson.user = user;

		// Create new D2l lesson model instance
		var d2lLessonObj = new D2lLesson(d2lLesson);

		// Save the D2l lesson
		d2lLessonObj.save(function() {
			// Try deleting D2l lesson
			request(app).delete('/d2l-lessons/' + d2lLessonObj._id)
			.expect(401)
			.end(function(d2lLessonDeleteErr, d2lLessonDeleteRes) {
				// Set message assertion
				(d2lLessonDeleteRes.body.message).should.match('User is not logged in');

				// Handle D2l lesson error error
				done(d2lLessonDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		D2lLesson.remove().exec();
		done();
	});
});
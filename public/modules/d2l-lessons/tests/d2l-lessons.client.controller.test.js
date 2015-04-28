'use strict';

(function() {
	// D2l lessons Controller Spec
	describe('D2l lessons Controller Tests', function() {
		// Initialize global variables
		var D2lLessonsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the D2l lessons controller.
			D2lLessonsController = $controller('D2lLessonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one D2l lesson object fetched from XHR', inject(function(D2lLessons) {
			// Create sample D2l lesson using the D2l lessons service
			var sampleD2lLesson = new D2lLessons({
				name: 'New D2l lesson'
			});

			// Create a sample D2l lessons array that includes the new D2l lesson
			var sampleD2lLessons = [sampleD2lLesson];

			// Set GET response
			$httpBackend.expectGET('d2l-lessons').respond(sampleD2lLessons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.d2lLessons).toEqualData(sampleD2lLessons);
		}));

		it('$scope.findOne() should create an array with one D2l lesson object fetched from XHR using a d2lLessonId URL parameter', inject(function(D2lLessons) {
			// Define a sample D2l lesson object
			var sampleD2lLesson = new D2lLessons({
				name: 'New D2l lesson'
			});

			// Set the URL parameter
			$stateParams.d2lLessonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/d2l-lessons\/([0-9a-fA-F]{24})$/).respond(sampleD2lLesson);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.d2lLesson).toEqualData(sampleD2lLesson);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(D2lLessons) {
			// Create a sample D2l lesson object
			var sampleD2lLessonPostData = new D2lLessons({
				name: 'New D2l lesson'
			});

			// Create a sample D2l lesson response
			var sampleD2lLessonResponse = new D2lLessons({
				_id: '525cf20451979dea2c000001',
				name: 'New D2l lesson'
			});

			// Fixture mock form input values
			scope.name = 'New D2l lesson';

			// Set POST response
			$httpBackend.expectPOST('d2l-lessons', sampleD2lLessonPostData).respond(sampleD2lLessonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the D2l lesson was created
			expect($location.path()).toBe('/d2l-lessons/' + sampleD2lLessonResponse._id);
		}));

		it('$scope.update() should update a valid D2l lesson', inject(function(D2lLessons) {
			// Define a sample D2l lesson put data
			var sampleD2lLessonPutData = new D2lLessons({
				_id: '525cf20451979dea2c000001',
				name: 'New D2l lesson'
			});

			// Mock D2l lesson in scope
			scope.d2lLesson = sampleD2lLessonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/d2l-lessons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/d2l-lessons/' + sampleD2lLessonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid d2lLessonId and remove the D2l lesson from the scope', inject(function(D2lLessons) {
			// Create new D2l lesson object
			var sampleD2lLesson = new D2lLessons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new D2l lessons array and include the D2l lesson
			scope.d2lLessons = [sampleD2lLesson];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/d2l-lessons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleD2lLesson);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.d2lLessons.length).toBe(0);
		}));
	});
}());
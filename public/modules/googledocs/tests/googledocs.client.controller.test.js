'use strict';

(function() {
	// Googledocs Controller Spec
	describe('Googledocs Controller Tests', function() {
		// Initialize global variables
		var GoogledocsController,
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

			// Initialize the Googledocs controller.
			GoogledocsController = $controller('GoogledocsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Googledoc object fetched from XHR', inject(function(Googledocs) {
			// Create sample Googledoc using the Googledocs service
			var sampleGoogledoc = new Googledocs({
				name: 'New Googledoc'
			});

			// Create a sample Googledocs array that includes the new Googledoc
			var sampleGoogledocs = [sampleGoogledoc];

			// Set GET response
			$httpBackend.expectGET('googledocs').respond(sampleGoogledocs);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.googledocs).toEqualData(sampleGoogledocs);
		}));

		it('$scope.findOne() should create an array with one Googledoc object fetched from XHR using a googledocId URL parameter', inject(function(Googledocs) {
			// Define a sample Googledoc object
			var sampleGoogledoc = new Googledocs({
				name: 'New Googledoc'
			});

			// Set the URL parameter
			$stateParams.googledocId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/googledocs\/([0-9a-fA-F]{24})$/).respond(sampleGoogledoc);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.googledoc).toEqualData(sampleGoogledoc);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Googledocs) {
			// Create a sample Googledoc object
			var sampleGoogledocPostData = new Googledocs({
				name: 'New Googledoc'
			});

			// Create a sample Googledoc response
			var sampleGoogledocResponse = new Googledocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Googledoc'
			});

			// Fixture mock form input values
			scope.name = 'New Googledoc';

			// Set POST response
			$httpBackend.expectPOST('googledocs', sampleGoogledocPostData).respond(sampleGoogledocResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Googledoc was created
			expect($location.path()).toBe('/googledocs/' + sampleGoogledocResponse._id);
		}));

		it('$scope.update() should update a valid Googledoc', inject(function(Googledocs) {
			// Define a sample Googledoc put data
			var sampleGoogledocPutData = new Googledocs({
				_id: '525cf20451979dea2c000001',
				name: 'New Googledoc'
			});

			// Mock Googledoc in scope
			scope.googledoc = sampleGoogledocPutData;

			// Set PUT response
			$httpBackend.expectPUT(/googledocs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/googledocs/' + sampleGoogledocPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid googledocId and remove the Googledoc from the scope', inject(function(Googledocs) {
			// Create new Googledoc object
			var sampleGoogledoc = new Googledocs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Googledocs array and include the Googledoc
			scope.googledocs = [sampleGoogledoc];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/googledocs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGoogledoc);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.googledocs.length).toBe(0);
		}));
	});
}());
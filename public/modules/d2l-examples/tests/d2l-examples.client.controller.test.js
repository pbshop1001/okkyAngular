'use strict';

(function() {
	// D2l examples Controller Spec
	describe('D2l examples Controller Tests', function() {
		// Initialize global variables
		var D2lExamplesController,
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

			// Initialize the D2l examples controller.
			D2lExamplesController = $controller('D2lExamplesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one D2l example object fetched from XHR', inject(function(D2lExamples) {
			// Create sample D2l example using the D2l examples service
			var sampleD2lExample = new D2lExamples({
				name: 'New D2l example'
			});

			// Create a sample D2l examples array that includes the new D2l example
			var sampleD2lExamples = [sampleD2lExample];

			// Set GET response
			$httpBackend.expectGET('d2l-examples').respond(sampleD2lExamples);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.d2lExamples).toEqualData(sampleD2lExamples);
		}));

		it('$scope.findOne() should create an array with one D2l example object fetched from XHR using a d2lExampleId URL parameter', inject(function(D2lExamples) {
			// Define a sample D2l example object
			var sampleD2lExample = new D2lExamples({
				name: 'New D2l example'
			});

			// Set the URL parameter
			$stateParams.d2lExampleId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/d2l-examples\/([0-9a-fA-F]{24})$/).respond(sampleD2lExample);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.d2lExample).toEqualData(sampleD2lExample);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(D2lExamples) {
			// Create a sample D2l example object
			var sampleD2lExamplePostData = new D2lExamples({
				name: 'New D2l example'
			});

			// Create a sample D2l example response
			var sampleD2lExampleResponse = new D2lExamples({
				_id: '525cf20451979dea2c000001',
				name: 'New D2l example'
			});

			// Fixture mock form input values
			scope.name = 'New D2l example';

			// Set POST response
			$httpBackend.expectPOST('d2l-examples', sampleD2lExamplePostData).respond(sampleD2lExampleResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the D2l example was created
			expect($location.path()).toBe('/d2l-examples/' + sampleD2lExampleResponse._id);
		}));

		it('$scope.update() should update a valid D2l example', inject(function(D2lExamples) {
			// Define a sample D2l example put data
			var sampleD2lExamplePutData = new D2lExamples({
				_id: '525cf20451979dea2c000001',
				name: 'New D2l example'
			});

			// Mock D2l example in scope
			scope.d2lExample = sampleD2lExamplePutData;

			// Set PUT response
			$httpBackend.expectPUT(/d2l-examples\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/d2l-examples/' + sampleD2lExamplePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid d2lExampleId and remove the D2l example from the scope', inject(function(D2lExamples) {
			// Create new D2l example object
			var sampleD2lExample = new D2lExamples({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new D2l examples array and include the D2l example
			scope.d2lExamples = [sampleD2lExample];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/d2l-examples\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleD2lExample);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.d2lExamples.length).toBe(0);
		}));
	});
}());
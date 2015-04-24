'use strict';

(function() {
	// Crawlings Controller Spec
	describe('Crawlings Controller Tests', function() {
		// Initialize global variables
		var CrawlingsController,
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

			// Initialize the Crawlings controller.
			CrawlingsController = $controller('CrawlingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Crawling object fetched from XHR', inject(function(Crawlings) {
			// Create sample Crawling using the Crawlings service
			var sampleCrawling = new Crawlings({
				name: 'New Crawling'
			});

			// Create a sample Crawlings array that includes the new Crawling
			var sampleCrawlings = [sampleCrawling];

			// Set GET response
			$httpBackend.expectGET('crawlings').respond(sampleCrawlings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawlings).toEqualData(sampleCrawlings);
		}));

		it('$scope.findOne() should create an array with one Crawling object fetched from XHR using a crawlingId URL parameter', inject(function(Crawlings) {
			// Define a sample Crawling object
			var sampleCrawling = new Crawlings({
				name: 'New Crawling'
			});

			// Set the URL parameter
			$stateParams.crawlingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/crawlings\/([0-9a-fA-F]{24})$/).respond(sampleCrawling);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.crawling).toEqualData(sampleCrawling);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Crawlings) {
			// Create a sample Crawling object
			var sampleCrawlingPostData = new Crawlings({
				name: 'New Crawling'
			});

			// Create a sample Crawling response
			var sampleCrawlingResponse = new Crawlings({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawling'
			});

			// Fixture mock form input values
			scope.name = 'New Crawling';

			// Set POST response
			$httpBackend.expectPOST('crawlings', sampleCrawlingPostData).respond(sampleCrawlingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Crawling was created
			expect($location.path()).toBe('/crawlings/' + sampleCrawlingResponse._id);
		}));

		it('$scope.update() should update a valid Crawling', inject(function(Crawlings) {
			// Define a sample Crawling put data
			var sampleCrawlingPutData = new Crawlings({
				_id: '525cf20451979dea2c000001',
				name: 'New Crawling'
			});

			// Mock Crawling in scope
			scope.crawling = sampleCrawlingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/crawlings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/crawlings/' + sampleCrawlingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid crawlingId and remove the Crawling from the scope', inject(function(Crawlings) {
			// Create new Crawling object
			var sampleCrawling = new Crawlings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Crawlings array and include the Crawling
			scope.crawlings = [sampleCrawling];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/crawlings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCrawling);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.crawlings.length).toBe(0);
		}));
	});
}());
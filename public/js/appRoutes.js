angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/shorten-url', {
			templateUrl: 'views/shorten-url.html',
			controller: 'ShortenController'
		})
                
                .when('/feedback-topic', {
			templateUrl: 'views/feedback-topic.html',
			controller: 'MainController'	
		})

		.when('/contact', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController'	
		});

	$locationProvider.html5Mode(true);

}]);
var app = angular.module('coderFriends', ['ngRoute']);
app.config(function($routeProvider, $httpProvider){
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
	$routeProvider.when('/', {
	     templateUrl: 'templates/login.html'
	}).when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	}).when('/friend/:github_username', {
		templateUrl: 'templates/friend.html'
	})
});

app.factory('myHttpInterceptor', function($q){
	return{
		'responseError': function(rejection){
			if(rejection.status === 403){
				document.location = '/'
				return;
			}
			return $q.reject(rejection);
		}
	};
});
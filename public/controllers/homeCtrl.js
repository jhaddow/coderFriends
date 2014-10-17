var app = angular.module('coderFriends');

app.controller('homeCtrl', function($scope, gitHubService){
	$scope.friends = [];
	gitHubService.getFollowing().then(function(data){
		$scope.friends = data;
	});
})
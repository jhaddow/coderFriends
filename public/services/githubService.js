var app = angular.module('coderFriends');

app.service("gitHubService", function($http, $q){
	this.getFollowing = function(){
		var deferred = $q.defer();
		$http.get('http://localhost:8888/api/github/following').
			then(function(response){
				deferred.resolve(response.data);
			});
		return deferred.promise;
	}
});


// var spinner = function(){
	
// 	var deferred = $q.defer();
// 	$http.get("jess'smom").then(function(jessMom){
// 		deferred.resolve(jessMom)
// 	})
// 	return deferred.promise;
// }

// ctrl
// 		$scope.spinner = true;
//       deferred.promise.then(function(mom){
//        		$scope.spinner = false;
//        		$scope.myDate = mom;
//        });

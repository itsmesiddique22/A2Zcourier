courierApp.config(function($httpProvider) {

	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.factory('mainService',['$http','$rootScope',function($http, $rootScope) {

		$rootScope.urlBase = 'http://166.62.40.162:8080/a2z/';
		$rootScope.header = {header: { "Content-type" : "application/json","Accept" : "application/json" }};
		$rootScope.uploadheader = { headers : { 'Content-Type' : undefined } };

		var dataFetch = {};

		dataFetch.postLogin = function(data) {

		    return $http.post($rootScope.urlBase+'user/login', data, $rootScope.header);		    
		    
		};
		dataFetch.postBoys = function(data) {

		    return $http.post($rootScope.urlBase+ 'courierboy/save', data, $rootScope.uploadheader);		    
		    
		};
		dataFetch.getBoys = function() {

		    return $http.get($rootScope.urlBase +'courierboy/list', $rootScope.header);		    
		    
		};
		dataFetch.deleteBoys = function(id) {

		    return $http.get($rootScope.urlBase +'courierboy/deactivate/'+ id, $rootScope.header);		    
		    
		};
		return dataFetch;
}])
.factory('logCheck',['$http','$rootScope',function($http, $rootScope) {

		
		var credentialFetch = {};

		credentialFetch.checkUser = function(callback) {
			
			if (localStorage.getItem('userLoggedin') !== null) {
    	var currentUser = JSON.parse(localStorage.getItem('userLoggedin'));
    	console.log(currentUser[0].password);
    	callback(currentUser);
    	} 
		    
		};
		return credentialFetch;
}]);
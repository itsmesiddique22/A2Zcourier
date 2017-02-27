var courierApp = angular.module("a2zCouriers", ["ngRoute", "ngMessages", 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

courierApp.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        })
        .when('/logout', {
            controller: 'LogoutController',
            template: '<h1>hi</h1>' //A template or templateUrl is required by AngularJS, even if your controller always redirects.
             
        })
        .when("/registration", {
            controller: 'registrationController',
            templateUrl: "ui/templates/registrationForm.html"
        })
        .when("/list", {
            controller: 'listingController',
            templateUrl: "ui/templates/listofboys.html"
        })
        .when("/center", {
            controller: 'centerRegController',
            templateUrl: "ui/templates/centerRegistration.html"
        })

       .when('/productEntry', {
            controller: 'productEntryController',
            templateUrl: 'ui/templates/productEntry.html' 

        })
        .when('/stockEntry', {
            controller: 'stockEntryController',
            templateUrl: 'ui/templates/stockEntry.html' 
        })
        .when('/employeeDetails', {
            controller: 'employeeDetailsController',
            templateUrl: 'ui/templates/employeeDetails.html' 
        })
        .when("/centerStock", {
            controller: 'centerStockController',
            templateUrl: "ui/templates/centerStock.html"
        })
        .when("/", {
            controller: 'authenticationController',
            templateUrl: "ui/templates/login.html"
        });
        

})
courierApp.run(['logCheck', '$rootScope', function(logCheck, $rootScope) {
    /*console.log('first called');
    var currentUser = logCheck.checkUser();
    console.log(logCheck.checkUser());*/
    //$rootScope.username = currentUser[0].username;
    //$rootScope.password = currentUser[0].password;
    //$scope.login();
}]);

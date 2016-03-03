(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main/main.view.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html'

            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html'

            })
            .when('/result/specialty/:specialty/location/:location', {
                templateUrl: 'views/search/result.view.html',
                controller: 'resultCtrl',
                controllerAs: 'result'
            })
            .when('/detail/:uid', {
                templateUrl: 'views/search/detail.view.html',
                controller: 'DetailCtrl',
                controllerAs: 'detail'
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();
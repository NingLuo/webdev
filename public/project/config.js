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
            .when('/result', {
                templateUrl: 'views/search/result.view.html',
                controller: 'resultCtrl',
                controllerAs: 'result'
            })
            .when('/detail/:uid', {
                templateUrl: 'views/search/detail.view.html',
                controller: 'DetailCtrl',
                controllerAs: 'detail'
            })
    }
})();
(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main/main.view.html'
            })
    }
})();
(function () {
    "use strict";

    angular
        .module("FindDoctorApp")
        .config(configuration);

    function configuration ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main/home.view.html',
                controller: 'MainController',
                controllerAs: 'main'
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginCtrl',
                controllerAs: 'login'
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: "RegisterCtrl",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl: 'views/users/profile.view.html',
                controller: 'ProfileCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/result/specialty/:specialty/location/:location/insurance/:insurance/gender/:gender/name/:name', {
                templateUrl: 'views/search/result.view.html',
                controller: 'resultCtrl',
                controllerAs: 'model'
            })
            .when('/detail/:uid', {
                templateUrl: 'views/search/detail.view.html',
                controller: 'DetailCtrl',
                controllerAs: 'model'
            })
            .when('/rate/:uid', {
                templateUrl: 'views/rate/rate.view.html',
                controller: 'RateCtrl',
                controllerAs: 'model'
            })
            .when('/favorite', {
                templateUrl: 'views/favorites/favorite.view.html',
                controller: 'FavoriteCtrl',
                controllerAs: 'model'
            })
            .when('/favoriteDetail/:index', {
                templateUrl: 'views/favorites/favoriteDetail.view.html',
                controller: 'FavoriteDetailCtrl',
                controllerAs: 'model'
            })
            .when('/review', {
                templateUrl: 'views/reviews/review.view.html',
                controller: 'ReviewCtrl',
                controllerAs: 'model'
            })
            .when('/editReview/:reviewId', {
                templateUrl: 'views/reviews/editReview.view.html',
                controller: 'EditReviewCtrl',
                controllerAs: 'model'
            })
            .when('/message', {
                templateUrl: 'views/messages/message.view.html',
                controller: 'MessageCtrl',
                controllerAs: 'model'
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    function checkLoggedIn(UserService, $q) {
        var deferred = $q.defer();
        UserService
            .getLoggedInUser()
            .then(
                function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                },
                function (err) {
                    console.log(err);
                    deferred.reject();
                }
            );

        return deferred.promise;
    }
})();
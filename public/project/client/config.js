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
                controllerAs: 'main',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/login', {
                templateUrl: 'views/users/login.view.html',
                controller: 'LoginCtrl',
                controllerAs: 'login',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/register', {
                templateUrl: 'views/users/register.view.html',
                controller: "RegisterCtrl",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
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
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/detail/:uid', {
                templateUrl: 'views/search/detail.view.html',
                controller: 'DetailCtrl',
                controllerAs: 'model',
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when('/rate/:uid', {
                templateUrl: 'views/rate/rate.view.html',
                controller: 'RateCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/favorite', {
                templateUrl: 'views/favorites/favorite.view.html',
                controller: 'FavoriteCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/favoriteDetail/:index', {
                templateUrl: 'views/favorites/favoriteDetail.view.html',
                controller: 'FavoriteDetailCtrl',
                controllerAs: 'model'
            })
            .when('/review', {
                templateUrl: 'views/reviews/review.view.html',
                controller: 'ReviewCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/editReview/:reviewId', {
                templateUrl: 'views/reviews/editReview.view.html',
                controller: 'EditReviewCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when('/message', {
                templateUrl: 'views/messages/message.view.html',
                controller: 'MessageCtrl',
                controllerAs: 'model',
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
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
                        $location.url("/login");
                    }
                },
                function (err) {
                    console.log(err);
                    deferred.reject();
                }
            );

        return deferred.promise;
    }

    function getLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getLoggedInUser()
            .then(
                function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                    }
                    deferred.resolve();
                },
                function (err) {
                    console.log(err);
                    deferred.resolve();
                }
            );

        return deferred.promise;
    }
})();
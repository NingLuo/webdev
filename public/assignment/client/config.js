(function () {
    "use strict";

    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/login");
                }
            });

        return deferred.promise;
    }

    function checkAdmin(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .getCurrentUser()
            .then(
                function (response) {
                    var currentUser = response.data;
                    if(currentUser) {
                        UserService.setCurrentUser(currentUser);
                        if(currentUser.roles.indexOf("admin") > 0) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }

                    } else {
                        deferred.reject();
                        $location.url("/login");
                    }
                },
                function (err) {
                    console.log(err);
                }
            );
        return deferred.promise;
    }

    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function (response) {
                if(response.data){
                    UserService.setCurrentUser(response.data);
                }
                deferred.resolve();
            });
        return deferred.promise;
    }

})();
/**
 * Created by ningluo on 2/18/16.
 */
(function(){
    angular.module('FormBuilderApp', ['ngRoute'])
        .controller('MainController', MainController);

    function MainController($scope) {
      console.log("Hello from MainController");

    };
})();
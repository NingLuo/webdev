(function(){
    angular
        .module("DoctorApp",[])
        .controller("DoctorCtrl",DoctorCtrl);

    function DoctorCtrl($scope, $http){
        console.log("Hello from DoctorController");
        $scope.doctorInfo = "Hello from doctorInfo";

        var api_key = '40c243f8c6a0fc1e40457c87418afae4';
        var resource_url = 'https://api.betterdoctor.com/2014-09-12/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' + api_key;


        $http({method: 'GET', url: resource_url}).success(function(data){
            console.log("http success says hello")
            $scope.doctors = data.data;
        });
    }
})();
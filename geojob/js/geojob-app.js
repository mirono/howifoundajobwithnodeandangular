(function() {
	
   var app = angular.module('geojob', ['google-maps']);
	
   app.controller('JobsController', function($scope, $http) {
      $scope.hello = "Hello GeoJob";
      $scope.jobs = {};
      $scope.company = {};
      $scope.map = {
        draggable: true,
        center: {
            latitude: 32.1092255,
            longitude: 34.838992
         },
         zoom: 17
      };
      $scope.circle = {
         center: $scope.map.center,
         radius: 50,
         stroke: {
           color: '#B2081F',
           weight: 1,
           opacity: 1
         },
         fill: {
           color: '#B2081F',
           opacity: 0.5
         },
         geodesic: true, // optional: defaults to false
         draggable: false, // optional: defaults to false
         clickable: false, // optional: defaults to true
         editable: false, // optional: defaults to false
         visible: true // optional: defaults to true
      };
      $scope.markersEvents = {
        click: function (marker, eventName, model) {
          marker.showWindow = true;
        }
      };
      
      
      $http.get("/jobs").success(function(data) {
         $scope.jobs = data;
      }).error(function() {
         alert("Error");
      });
      
      $scope.setCompany = function(company) {
        $scope.company = company;
      };
      
      $scope.isSelected = function(company) {
        return $scope.company == company;
      };
      
      $scope.getRadius = function(job) {
      	return job.value.employees / 10;
      };
      
   });
	
})();  
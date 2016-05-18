angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function($scope, $sce, $http, $location) {

    $scope.tagline = 'Enter your CG Number';
    
    $scope.trustUrl = function(url) {
        var url = "www.google.com"
        console.log("entra");
        return $sce.trustAsResourceUrl(url);
         
    };
    $scope.scoreQuestions = {
        favourite: false,
        known: false,
        winner: false,
        starting: false,
        prop: false,
        setNumber: false
    };
    
    $scope.up = function () {
        console.log("ENTRA");
        $scope.bass+0.1;
    };
    
    $scope.feedback = function () {
        topic : "The topic was very interesting and useful"
    }
    
    $scope.processForm = function(nextView) {
        $http({
        method  : 'POST',
        url     : '/save_deal',
        data    : $scope.vol,  // pass in data as strings
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        })
        .success(function(data) {
          console.log(data);

            if (!data.success) {
              // if not successful, bind errors to error variables
              $scope.errorName = data.errors.name;
              $scope.errorSuperhero = data.errors.superheroAlias;
            } else {
              // if successful, bind success message to message
              $scope.message = data.message;
            }
        });
        $location.path('feedback-topic');
    };
    
    $scope.submitFeedback = function() {
        $location.path('goal');      
    };
    
    $scope.submitGoal = function () {
        $location.path('graphs');      
    };
    
});
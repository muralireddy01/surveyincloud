angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function($scope, $sce) {

    $scope.tagline = 'The best framework...is it not?';
   // $scope.result = result();
    
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
    $scope.stopSilly = {
        
    };

   
    
    $scope.result = function () {
        var question = 0;
        console.log($scope.scoreQuestions);
        if ($scope.scoreQuestions.setNumber === "UNO") {
            
            angular.forEach($scope.scoreQuestions, function(questions) {
                console.log("Q", questions);
                if (questions === true) {
                    question++;
                }
                console.log("QUESTION", question);
                
            });
            if (question >= 5) {
                    console.log("CAMBIA FALSE");
                    return true;  
                } else {
                    console.log("CAMBIA TRUE");
                     return false;
                }
        };
              
    };
    
    $scope.myDiscreteValue = {
        min: 1.0,
        max: 3.9
    };
     $scope.vol = 1.5;
  $scope.bass = 1.6;
  $scope.master = Math.floor(Math.random() * 100);
});
angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function ($scope, $sce, $http, $location) {

    $scope.tagline = 'Enter your CG Number';

    $scope.feedback = function () {
        topic : "The topic was very interesting and useful"
    };

    $scope.answerQuestionA = null;
    $scope.answerQuestionB = null;
    $scope.answerQuestionC = null;
    $scope.freeText = null;

    $scope.infoProvided = {
        answers: [
            {"question": "A", "answer": ''},
            {"question": "B", "answer": ''},
            {"question": "C", "answer": ''}],
        "Feedback": $scope.freeText,
        "CG_id": ''};

    $scope.processForm = function (nextView) {
//        $http({
//        method  : 'POST',
//        url     : '/save_deal',
//        data    : $scope.vol,  // pass in data as strings
//        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
//        })
//        .success(function(data) {
//          console.log(data);
//
//            if (!data.success) {
//              // if not successful, bind errors to error variables
//              $scope.errorName = data.errors.name;
//              $scope.errorSuperhero = data.errors.superheroAlias;
//            } else {
//              // if successful, bind success message to message
//              $scope.message = data.message;
//            }
//        });
        $location.path('feedback-topic');

    };

    $scope.keepCgNumber = function (value) {
        $scope.infoProvided.CG_id = value;
    };

    $scope.keepAnswerA = function (topicA) {
        console.log(topicA);
        $scope.infoProvided.answers[0].question = "A";
        $scope.infoProvided.answers[0].answer = topicA;
        $location.path('goal');
    };
    
    $scope.keepAnswersBandC = function (topicB, topicC) {
        $scope.infoProvided.answers[1].question = "B";
        $scope.infoProvided.answers[1].answer = topicB;
        $scope.infoProvided.answers[2].question = "C";
        $scope.infoProvided.answers[2].answer = topicC;
    };

    $scope.navigationTopicsBandC = function () {
        console.log($scope.infoProvided);
        $location.path('goal');

    };

    $scope.submitGoal = function () {
        $location.path('freetext');
    };
    
    $scope.keepFeeText = function (freetext) {
      $scope.infoProvided.feedback = freetext;
    };
    
    $scope.submitFeedback = function () {
        console.log($scope.infoProvided);
        $location.path('/graphs');

    };

});
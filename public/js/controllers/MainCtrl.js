angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function ($scope, $sce, $http, $location, $httpParamSerializerJQLike, limitToFilter) {

    $scope.tagline = 'Enter your CG Number';

    $scope.feedback = function () {
        topic : "The topic was very interesting and useful"
    };

    
    $scope.infoProvided = {
        "questionA": null,
        "questionB": null,
        "questionC": null,
        "feedback": null,
        "CG_id": null
    };

    $scope.processForm = function (nextView) {
        $location.path('feedback-topic');

    };
    
    $scope.navigateFeedbackTopic = function () {
        $location.path('feedback-topic');
    };

    $scope.keepCgNumber = function (value) {
        $scope.infoProvided.CG_id = value;
    };

    $scope.keepAnswerA = function (topicA) {
        $scope.infoProvided.questionA = topicA;
        $location.path('goal');
    };
    
    $scope.keepAnswersBandC = function (topicB, topicC) {
        $scope.infoProvided.questionB = topicB;
        $scope.infoProvided.questionC = topicC;
    };

    $scope.navigateTopicsBandC = function () {
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
        var data = $httpParamSerializerJQLike({
            url: $scope.infoProvided
        });
        var options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        $http.post("/save_feedback", data, options).then(
                function success(data) {
                    console.log(data);
                },
                function failure(err) {
                    console.log(err);
                    $scope.errormsg = "Missing URL";
                }
        );
    $location.path('/graphs');
    };
        
     $scope.ideas = [
    ['ideas1', 1],
    ['ideas2', 8],
    ['ideas3', 5]
  ];
  
  $scope.limitedIdeas = limitToFilter($scope.ideas, 3);
    
})
  .directive('hcPie', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Browser market shares at a specific website, 2010'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage}%</b>',
          percentageDecimals: 1
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000',
              formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + this.percentage + ' %';
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: scope.items
        }]
      });
      scope.$watch("items", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
      
    }
  }
});    
        
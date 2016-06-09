angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function ($scope, $sce, $http, $location, $httpParamSerializerJQLike, $timeout, limitToFilter) {

    $scope.tagline = 'Enter your CG Number';

    $scope.feedback = function () {
        topic : "The topic was very interesting and useful"
    };

//    $scope.calculatePlayers = null;

    $scope.infoProvided = {
        "questionA": null,
        "questionB": null,
        "questionC": null,
        "feedback": null,
        "CG_id": null
    };

    $scope.graphPlayers = [
        ['Ronaldo', 0],
        ['Messi', 0],
        ['Ronaldinho', 0]
    ];

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
    
    $scope.cron = 0;
    $scope.mess = 0;
    $scope.rona = 0;
    // TODO? Add Lodash to get less lines anyway I love Java style
    $scope.calculatePlayers = function ($scope, data) {

    for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].questionA == 'Cristiano Ronaldo') {
            $scope.cron += 1;
            $scope.graphPlayers = [
                ['Ronaldo', $scope.cron],
                ['Messi', $scope.mess],
                ['Ronaldinho', $scope.rona]
            ];
        } else if (data.data[i].questionA == 'Leo Messi') {
            $scope.mess += 1;
            $scope.graphPlayers = [
                ['Ronaldo', $scope.cron],
                ['Messi', $scope.mess],
                ['Ronaldinho', $scope.rona]
            ];
        } else if (data.data[i].questionA == 'Ronaldinho') {
            $scope.rona += 1;
            $scope.graphPlayers = [
                ['Ronaldo', $scope.cron],
                ['Messi', $scope.mess],
                ['Ronaldinho', $scope.rona]
            ];
        }
        $scope.$apply;
        }
        console.log("DATA",$scope.graphPlayers);
    };

    $scope.submitFeedback = function () {
        //console.log($scope.infoProvided);
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
                    console.log("DATA",data);
                    $scope.calculatePlayers($scope, data);
                },
                function failure(err) {
                    console.log(err);
                    $scope.errormsg = "Missing URL";
                }
        );
        $timeout(function() {
            $scope.limitedIdeas = limitToFilter($scope.graphPlayers, 3);
            $location.path('/graphs');
        }, 2000);         
    };

//    $scope.ideas = [
//        ['ideas1', $scope.cron],
//        ['ideas2', $scope.mess],
//        ['ideas3', $scope.rona]
//    ];

    
    
    
//    $scope.limitedIdeas = limitToFilter($scope.graphPlayers, 3);

    //TODO: move Directive to right path
}).directive('hcPie', function () {
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
                            text: 'Best Football Player in the World'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage}%</b>',
//                            percentageDecimals: 0
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
                                        return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
                                    }
                                }
                            }
                        },
                        series: [{
                                type: 'pie',
                                name: 'Football Players',
                                data: scope.items
                            }]
                    });
                        scope.$watch("items", function (newValue) {
                            console.log("NEWVALUE", newValue);
                            chart.series[0].setData(newValue, true);
                        }, true);
                }
            }
        });
        
angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function ($scope, $sce, $http, $location, $httpParamSerializerJQLike, $timeout, limitToFilter) {

    $scope.tagline = 'Enter your name';

    $scope.taglineFeedback = 'Thank you for your feedback';

    $scope.initDataPlayer = function () {
        $scope.data = [
            ['Matheson House', $scope.cron],
            ['Plaza', $scope.mess],
            ['International House', $scope.rona]
        ];
    }
    $scope.initDataBetter = function () {
        $scope.dataBetter = [
            ['Highly Informative', $scope.choice1],
            ['Interesting', $scope.choice2],
            ['Sitting on the fence', $scope.choice3],
            ['Not relevant to me', $scope.choice4],
            ['Not the best use of my time', $scope.choice5]
        ];
    };
    
    $scope.initDataBetterTv = function () {
        $scope.betterTv = [
            ['Ant', $scope.ant],
            ['Dec', $scope.dec]
        ];
    }
    
//    $scope.loadChart = function () {
//
//        $scope.barChartData = [{
//                name: 'null',
//                data: [60],
//                borderRadius: 0,
//                color: "gray"
//            }, {
//                name: 'Values',
//                data: [40],
//                color: "green",
//                borderRadius: 0
//            }];
//    }
//    $scope.loadChart();


    $scope.infoProvided = {
        "questionA": null,
        "questionB": null,
        "questionC": null,
        "feedback": null,
        "CG_id": null
    };

    $scope.players = [];
    $scope.better = [];
    $scope.betterTv = [];
    $scope.cron = 0;
    $scope.mess = 0;
    $scope.rona = 0;
    $scope.oneHundred = 0;
    $scope.oneElephant = 0;
    $scope.ant = 0;
    $scope.dec = 0;

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
    
    $scope.seeResults = function () {
        $scope.taglineFeedback = '';
        var data = $httpParamSerializerJQLike({
            url: null
        });
        var options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        $http.post("/save_feedback", data, options).then(
                function success(data) {
                    console.log("DATA", data);
                    $scope.createObjetcsFromJSON($scope, data);
                },
                function failure(err) {
                    console.log(err);
                    $scope.errormsg = "Missing URL";
                }
        );
        $timeout(function () {
            $location.path('/graphs');
        }, 1500);
    };

    var calculateStatsPlayers = function () {
        var long = $scope.players.length - 1;
        while (long >= 0) {

            if ($scope.players[long] == 'Matheson') {
                $scope.cron += 1;
            } else if ($scope.players[long] == 'Plaza') {
                $scope.mess += 1;
            } else if ($scope.players[long] == 'IntHouse') {
                $scope.rona += 1;
            }
            long--;
        }
        $scope.initDataPlayer();
    };

    var calculateStatsBetter = function () {
        var long = $scope.better.length - 1;
        while (long >= 0) {
            if ($scope.better[long] == '11') {
                $scope.choice1 += 1;
            } else if ($scope.better[long] == '2') {
                $scope.choice2 += 1;
            } else if ($scope.better[long] == '3') {
                $scope.choice3 += 1;
            } else if ($scope.better[long] == '4') {
                $scope.choice4 += 1;
            } else if ($scope.better[long] == '5') {
                $scope.choice5 += 1;
            }
            
            long--;
        }
        $scope.initDataBetter();
    };

    var calculateStatsBetterTv = function () {
        var long = $scope.betterTv.length - 1;
        while (long >= 0) {
            if ($scope.betterTv[long] == 'Ant') {
                $scope.ant += 1;
            } else if ($scope.betterTv[long] == 'Dec') {
                $scope.dec += 1;
            }
            long--;
        }
        $scope.initDataBetterTv();
    };

    // TODO? Add Lodash to get less lines anyway I love Java style
    $scope.createObjetcsFromJSON = function ($scope, data) {
        console.log("VERDAD", (data.data.length));
        var long = data.data.length - 1;  // cache length 
        var i = long;
        while (i >= 0) {
            $scope.players.push(data.data[i].questionA);
            $scope.better.push(data.data[i].questionB);
            $scope.betterTv.push(data.data[i].questionC);
            i--;
        }
        console.log("COMING");
        calculateStatsPlayers();
        calculateStatsBetter();
        calculateStatsBetterTv();
        $scope.$apply;
    };

    $scope.submitFeedback = function () {
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
                    console.log("DATA", data);
                    $scope.createObjetcsFromJSON($scope, data);
                },
                function failure(err) {
                    console.log(err);
                    $scope.errormsg = "Missing URL";
                }
        );
        $timeout(function () {
            $location.path('/graphs');
        }, 1500);
    };
}).directive('drawPieChart', function () {

    return {
        restrict: 'E',
        scope: {
            chartData: "="
        },
        link: function (scope, element, attrs) {

            scope.$watch('chartData', function (newVal, oldVal) {
                if (newVal) {
                    drawPlot();
                }
            }, true);

            var drawPlot = function () {
                var chart;
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: element[0],
                        margin: [0, 0, 0, 0],
                        spacingTop: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function () {
                             return this.point.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + '%</b>';
                                   }
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            },
                    showInLegend: true
                        }
                    },
                    series: [{
                            type: 'pie',
                            name: 'Browser share',
                            data: scope.chartData
                        }]
                });


            }
        }
    };
    //TODO: move Directive to right path and refactor?
}).directive('drawPieChartBetter', function () {

    return {
        restrict: 'E',
        scope: {
            chartData: "="
        },
        link: function (scope, element, attrs) {

            scope.$watch('chartData', function (newVal, oldVal) {
                if (newVal) {
                    drawPlot();
                }
            }, true);

            var drawPlot = function () {
                var chart;
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: element[0],
                        margin: [0, 0, 0, 0],
                        spacingTop: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function () {
                   return this.point.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + '%</b>';
                         }
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            },
                    showInLegend: true
                        }
                    },
                    series: [{
                            type: 'pie',
                            name: 'Browser share',
                            data: scope.chartData
                        }]
                });


            }
        }
    };
}).directive('drawPieChartBetterTv', function () {

    return {
        restrict: 'E',
        scope: {
            chartData: "="
        },
        link: function (scope, element, attrs) {

            scope.$watch('chartData', function (newVal, oldVal) {
                if (newVal) {
                    drawPlot();
                }
            }, true);

            var drawPlot = function () {
                var chart;
                chart = new Highcharts.Chart({
                    chart: {
                        renderTo: element[0],
                        margin: [0, 0, 0, 0],
                        spacingTop: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0
                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    tooltip: {
                        formatter: function () {
                        return this.point.name + ': <b>' + Highcharts.numberFormat(this.percentage, 1) + '%</b>';
                       }
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            },
                    showInLegend: true
                        }
                    },
                    series: [{
                            type: 'pie',
                            name: 'Browser share',
                            data: scope.chartData
                        }]
                });


            }
        }
    };
});

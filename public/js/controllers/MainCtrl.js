angular.module('MainCtrl', ['ngMaterial']).controller('MainController', function ($scope, $sce, $http, $location, $httpParamSerializerJQLike, $timeout, limitToFilter) {

    $scope.tagline = 'Enter your CG Number';

    $scope.taglineFeedback = 'Thank you for your feedback';

    $scope.initDataPlayer = function () {
        $scope.data = [
            ['CR7', $scope.cron],
            ['Messi', $scope.mess],
            ['Ronaldinho', $scope.rona]
        ];
    }
    $scope.initDataBetter = function () {
        $scope.dataBetter = [
            ['100 chicken sized elephants', $scope.oneHundred],
            ['1 elephant sized chicken', $scope.oneElephant]
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

            if ($scope.players[long] == 'Cristiano Ronaldo') {
                $scope.cron += 1;
            } else if ($scope.players[long] == 'Leo Messi') {
                $scope.mess += 1;
            } else if ($scope.players[long] == 'Ronaldinho') {
                $scope.rona += 1;
            }
            long--;
        }
        $scope.initDataPlayer();
    };

    var calculateStatsBetter = function () {
        var long = $scope.better.length - 1;
        while (long >= 0) {
            if ($scope.better[long] == '100 chicken sized elephants') {
                $scope.oneHundred += 1;
            } else if ($scope.better[long] == '1 elephant sized chicken') {
                $scope.oneElephant += 1;
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
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            }
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
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            }
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
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1
                    },
                    plotOptions: {
                        pie: {
                            size: '100%',
                            dataLabels: {
                                enabled: false
                            }
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
//TODO: move Directive to right path and refactorize??
//}).directive('hcPie', function () {
//    return {
//        restrict: 'C',
//        replace: true,
//        scope: {
//            items: '='
//        },
//        controller: function ($scope, $element, $attrs) {
//
//        },
//        template: '<div id="container" style="margin: 0 auto">not working</div>',
//        link: function (scope, element, attrs) {
//            var chart = new Highcharts.Chart({
//                chart: {
//                    renderTo: 'container',
//                    plotBackgroundColor: null,
//                    plotBorderWidth: null,
//                    plotShadow: false
//                },
//                title: {
//                    text: ''
//                },
//                tooltip: {
//                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
////                            percentageDecimals: 0
//                },
//                plotOptions: {
//                    pie: {
//                        allowPointSelect: true,
//                        cursor: 'pointer',
//                        dataLabels: {
//                            enabled: true,
//                            color: '#000000',
//                            connectorColor: '#000000',
//                            formatter: function () {
//                                return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
//                            }
//                        }
//                    }
//                },
//                series: [{
//                        type: 'pie',
//                        name: 'Football Players',
//                        data: scope.items
//                    }]
//            });
//            scope.$watch("items", function (newValue) {
//                console.log("NEWVALUE", newValue);
//                chart.series[0].setData(newValue, true);
//            }, true);
//        }
//    }
//});
//   .directive('hcPieBetter', function () {
//    return {
//        restrict: 'C',
//        replace: true,
//        scope: {
//            items: '='
//        },
//        controller: function ($scope, $element, $attrs) {
//
//        },
//        template: '<div id="container" style="margin: 0 auto">not working</div>',
//        link: function (scope, element, attrs) {
//            var chart = new Highcharts.Chart({
//                chart: {
//                    renderTo: 'container',
//                    plotBackgroundColor: null,
//                    plotBorderWidth: null,
//                    plotShadow: false
//                },
//                title: {
//                    text: ''
//                },
//                tooltip: {
//                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
////                            percentageDecimals: 0
//                },
//                plotOptions: {
//                    pie: {
//                        allowPointSelect: true,
//                        cursor: 'pointer',
//                        dataLabels: {
//                            enabled: true,
//                            color: '#000000',
//                            connectorColor: '#000000',
//                            formatter: function () {
//                                return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
//                            }
//                        }
//                    }
//                },
//                series: [{
//                        type: 'pie',
//                        name: 'Better',
//                        data: scope.items
//                    }]
//            });
//            scope.$watch("items", function (newValue) {
//                console.log("NEWVALUE", newValue);
//                chart.series[0].setData(newValue, true);
//            }, true);
//        }
//    }
//});
//        .directive('hcPieBetterTV', function () {
//    return {
//        restrict: 'C',
//        replace: true,
//        scope: {
//            items: '='
//        },
//        controller: function ($scope, $element, $attrs) {
//
//        },
//        template: '<div id="container" style="margin: 0 auto">not working</div>',
//        link: function (scope, element, attrs) {
//            var chart = new Highcharts.Chart({
//                chart: {
//                    renderTo: 'container',
//                    plotBackgroundColor: null,
//                    plotBorderWidth: null,
//                    plotShadow: false
//                },
//                title: {
//                    text: ''
//                },
//                tooltip: {
//                    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
////                            percentageDecimals: 0
//                },
//                plotOptions: {
//                    pie: {
//                        allowPointSelect: true,
//                        cursor: 'pointer',
//                        dataLabels: {
//                            enabled: true,
//                            color: '#000000',
//                            connectorColor: '#000000',
//                            formatter: function () {
//                                return '<b>' + this.point.name + '</b>: ' + this.percentage.toFixed(2) + ' %';
//                            }
//                        }
//                    }
//                },
//                series: [{
//                        type: 'pie',
//                        name: 'Football Players',
//                        data: scope.items
//                    }]
//            });
//            scope.$watch("items", function (newValue) {
//                console.log("NEWVALUE", newValue);
//                chart.series[0].setData(newValue, true);
//            }, true);
//        }
//    }
//});
//        
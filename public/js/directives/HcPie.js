app.directive('hcPie', function () {
return {
    restrict: 'E',
    template: '<div></div>',
    replace: true,

    link: function (scope, element, attrs) {
        
        console.log("entra");
        scope.$watch(function () { return attrs.chart; }, function () {
            console.log("entra");
            if (!attrs.chart) return;

//            var charts = JSON.parse(attrs.chart);
//
//            $(element[0]).highcharts(charts);

        });
    }
};
});



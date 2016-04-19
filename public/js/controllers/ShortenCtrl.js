angular.module('ShortenCtrl', []).controller('ShortenController', function ($scope, $http, $httpParamSerializerJQLike) {

    $scope.shorten = function () {
        var data = $httpParamSerializerJQLike({
            url: $scope.url,
            short: $scope.short
        });
        var options = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        $http.post("/create", data, options).then(
                function success(data) {
                    $scope.resulturl = data.data.result.url;
                    $scope.resultshort = data.data.result.baseurl + '/' + data.data.result.short;
                    $scope.url = "";
                },
                function failure(err) {
                    console.log(err);
                    $scope.errormsg = "Missing URL";
                }
        );
    };

    $scope.hideerr = function () {
        $scope.errormsg = false;
    };
});

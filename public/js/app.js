var app = angular.module('app', ['ngRoute', 'ngMessages', 'appRoutes', 'MainCtrl', 'ShortenCtrl', 'ShortenService', 'ContactCtrl', 'ContactService']);
app.run(['$route', '$rootScope', '$location', '$timeout', function ($route, $rootScope, $location, $timeout) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);

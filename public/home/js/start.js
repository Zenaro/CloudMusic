/**
 * Created by zenaro on 16-6-16.
 */
//设置configuration
seajs.config({
    base: "../../Lib",
    alias: {"jquery" : "jquery/jquery.js"}
});

seajs.use('../../public/home/js/common/main');   //引入main.js

angular.module('routingApp', ['ngRoute'])
    .controller('indexCtrl', function ($scope) {
        seajs.use('../../public/home/js/index/main');
    })
    .controller('result', function () {
        seajs.use('../../public/home/js/result/main');
    })
    .config(function ($logProvider, $routeProvider) {
        $logProvider.debugEnabled(true);
        $routeProvider
            .when('/home', {
                templateUrl: 'index.html',
                controller: 'indexCtrl'
            })
            .when('/result', {
                templateUrl: 'result.html',
                controller: 'result'
            })
            .otherwise({redirectTo: '/home'});
});

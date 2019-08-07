var app = angular.module('CarrefourApp', ['ngAnimate', 'ngRoute', 'ui.grid', 'ui.bootstrap', 'ui.grid.edit']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/users',
        {
            template: '<users></users>'
        });

    $routeProvider.when('/employees',
        {
            template: '<employees></employees>'
        });

    $routeProvider.when('/clients',
        {
            template: '<clients></clients>'
        });

    $routeProvider.when('/products',
        {
            template: '<products></products>'
        });

    $locationProvider.html5Mode(true);
});
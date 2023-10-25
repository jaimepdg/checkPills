var app = angular.module('myApp', ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
        templateUrl: "views/calendar.html",
        controller: "calendarController"
    })
    .when("/prueba", {
        templateUrl: "views/prueba.html",
        controller: "pruebaController"
    })
    
    
});
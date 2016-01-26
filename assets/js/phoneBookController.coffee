'use strict';

routerApp = angular.module('phoneBook', ['ui.router']);

routerApp.config( ($stateProvider, $urlRouterProvider) ->

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
        url: '/',
        templateUrl: '/views/phonebook.html'
    })

);
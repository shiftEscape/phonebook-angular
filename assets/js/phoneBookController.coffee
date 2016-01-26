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

routerApp.controller('MainCtrl', ['$scope', ($scope) ->
  $scope.contacts = [];

  notifier = (params) ->
    $scope.notification = {
      message: params.message,
      class: params.class
    };

  notifier({
    message: 'No contacts added. Click "Add New Contact" to get started',
    class: 'info'
  });

  $scope.addContact = () ->

    $scope.contacts.push({
      name: 'Alvin James',
      number: '09162863542'
    });

    notifier({
      message: 'Contact successfully added!',
      class: 'success'
    });

]);

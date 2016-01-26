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

  $scope.notification = {
    message: 'No contacts added. Click "Add New Contact" to get started',
    class: 'info'
  };

  $scope.addContact = () ->
    $scope.contacts.push({
      name: 'Alvin James',
      number: '09162863542'
    });
    $scope.notification = {
      message: 'Contact successfully added!',
      class: 'success'
    };
]);

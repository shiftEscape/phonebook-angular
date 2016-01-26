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
    message: 'Oops! No contacts added. Click "Add New Contact" to get started',
    class: 'info'
  });

  $scope.addContact = () ->

    if !$scope.name or !$scope.number
      $scope.name = $scope.number = '';
      notifier({
        message: 'Oops! Missing contact details. Please complete fields before submitting.',
        class: 'danger'
      });
      return;

    $scope.contacts.push({
      name: $scope.name,
      number: $scope.number
    });

    $scope.name = $scope.number = '';

    notifier({
      message: 'Heads up! Contact successfully added!',
      class: 'success'
    });

  $scope.deleteContact = (ndx, name) ->
    if confirm('Proceed deleting this contact?')
      $scope.contacts.splice(ndx, 1);
      notifier({
        message: 'Heads up! Contact `'+name+'` successfully deleted!',
        class: 'success'
      });
]);

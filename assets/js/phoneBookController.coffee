'use strict';

phoneBookApp = angular.module('phoneBook', ['ui.router'])

appConfig = ($s, $u) ->
  $u.otherwise('/');
  $s
    .state('index', {
        url: '/',
        templateUrl: '/views/phonebook.html'
    })

phoneBookApp.config(appConfig);

appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

MainCtrl = ($s) ->
  $s.contacts = [];

  notifier = (params) ->
    $s.notification = {
      message: params.message,
      class: params.class
    };

  notifier({
    message: 'Oops! No contacts added. Click "Add New Contact" to get started',
    class: 'info'
  });

  $s.clearFields = () ->
    $s.name = $s.number = '';

  $s.addContact = () ->

    if !$s.name or !$s.number
      $s.clearFields();
      notifier({
        message: 'Oops! Missing contact details. Please complete fields before submitting.',
        class: 'danger'
      });
      return;

    $s.contacts.push({
      name: $s.name,
      number: $s.number
    });

    $s.name = $s.number = '';

    notifier({
      message: 'Heads up! Contact successfully added!',
      class: 'success'
    });

  $s.editContact = (ndx) ->
    contactToUpdate = $s.contacts[ndx];
    $s.id = ndx;
    $s.name = contactToUpdate.name;
    $s.number = contactToUpdate.number;

  $s.updateContact = () ->

    if !$s.name or !$s.number
      $s.clearFields();
      notifier({
        message: 'Oops! Can\'t update contact. Missing contact details.',
        class: 'danger'
      });
      return;

    contactNdx = $s.id;
    $s.contacts[contactNdx].name = $s.name;
    $s.contacts[contactNdx].number = $s.number;
    notifier({
      message: 'Heads up! Contact successfully updated!',
      class: 'success'
    });

  $s.deleteContact = (ndx, name) ->
    if confirm('Proceed deleting this contact?')
      $s.contacts.splice(ndx, 1);
      notifier({
        message: 'Heads up! Contact `'+name+'` successfully deleted!',
        class: 'success'
      });

phoneBookApp.controller('MainCtrl', MainCtrl);
MainCtrl.$inject = ['$scope'];
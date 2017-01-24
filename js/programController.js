
var App=angular.module('starter.controllers');
App.controller('programCtrl', function($scope, $ionicModal, $timeout) {

 $scope.groups = [];
  $scope.templateurl='templates/program/includes/';
  $scope.groups = [
    { name: 'Program Overview', id: 1, htmlfile: 'program_overview.html'},
    { name: 'Program Highlights', id: 2, htmlfile: 'Program_Highlights.html'},
    { name: 'Accompanying Person’s Program', id: 3, htmlfile: 'Person_Program.html'},
     { name: 'Scholarships Announced', id: 4, htmlfile: 'Scholarships_Announced.html'},
      { name: 'Guidelines for Abstract Submission', id: 5, htmlfile: 'abstract_guidelines.html'},
   
  ];
  
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };



});
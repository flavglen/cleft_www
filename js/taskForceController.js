
var App=angular.module('starter.controllers');
App.controller('taskForceCtrl', function($scope, $ionicModal, $timeout) {

 $scope.groups = [];
  $scope.templateurl='templates/taskforce/includes/';
  $scope.groups = [
    { name: 'Care of infant with cleft', id: 1, htmlfile: 'care-of-infant-with-cleft.html'},
    { name: 'Cleft Clinical Research', id:2, htmlfile: 'cleft-clinical-research.html'},
    { name: 'Cleft Without Caries',id: 3, htmlfile: 'cleft-without-caries.html'},
    { name: 'CEpidemiology, Aetiology & Prevention',id: 4, htmlfile: 'epidemiology-aetiology-prevention.html'},
    { name: 'Global Cleft Network', id: 5, htmlfile: 'global-cleft-team-work.html'},
    { name: 'Holistic Outcomes',id: 6, htmlfile: 'holistic-outcomes.html'},
    { name: 'Speech', id: 7, htmlfile: 'speech.html'},
    { name: 'TIME LINE',id: 8, htmlfile: 'timeline.html'},
    { name: 'Task Forces Update Jan. 2016',id: 9, htmlfile: 'task-forces-update-jan-2016.html'},
    { name: 'Cleft Without Caries – Philosophy and Goal',id: 10, htmlfile: 'philo.html'},
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
angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('homeController', function($scope,$ionicViewService,cleftdb,$ionicPlatform, $cordovaLocalNotification) {

/*LOCAL NOTIFICATION*/
 $ionicPlatform.ready(function () {

var dateTime = new Date("2017-01-22 20:13:00");
var now = new Date(dateTime);
var _10SecondsFromNow = new Date(now - 60 * 1000);

var dateTime1 = new Date("2017-01-22 20:16:00");
var now1 = new Date(dateTime1);
var _10SecondsFromNow1 = new Date(now1 - 60 * 1000);

  $cordovaLocalNotification.schedule([{
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      },
      {
        id: 2,
        title: 'Title fafawfawfaw',
        text: 'Text afawfawfawfawf',
        at: _10SecondsFromNow1
      }]
      ).then(function (result) {
        // ...
    });


 });

    // cleftdb.all().then(function(result){
                 
    //                 $scope.prayersArr=result;
                      
    //             },function (error) {
    //                 alert(error);
    //                 });
        


  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  /*diable back*/
  $ionicViewService.nextViewOptions({
   disableBack: true
  });

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('PlaylistsCtrl', function($scope, $stateParams) {

})




.controller('loginCtrl', function($ionicHistory,$scope, $state,$stateParams,$ionicViewService,$rootScope,cleftdb) {

 $ionicHistory.nextViewOptions({
    disableBack: true
  });

/*LOGIN FUNCTIONALITY*/
 $scope.doLogin = function() {

    // $scope.loginData.username=
    // $scope.loginData.password=
    $rootScope.usernameRoot=$scope.loginData.username;

    cleftdb.loginByEmail($scope.loginData.username).then(function(result){

      console.log(result);

               if(result[0]['countemail']>=1){
                   $rootScope.userEmail=result[0]['email'];
                   window.localStorage.setItem('USER_EMAIL', result[0]['email']);

                   $rootScope.userName=result[0]['Name'];
                   window.localStorage.setItem('USER_NAME', result[0]['Name']);

                   $rootScope.userType=result[0]['type'];
                   window.localStorage.setItem('USER_TYPE', result[0]['type']);

                   $state.go('app.home');
                }else{
                  alert('Login failed');
                }

      },function (error) {
                    alert(error);
     });

   

    

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
 };



$scope.loginSkip=function(){

  $ionicViewService.nextViewOptions({
   disableBack: true
  });
  $state.go('app.home');


}

})

.controller('aboutCntrl', function($scope, $state,$stateParams,$ionicViewService) {


})



.controller('HalllistsCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb) {

    cleftdb.getHallList().then(function(result){
         $scope.halls=result;
      },function (error) {
            alert(error);
     });

    /*ONCLICK HALL*/
    $scope.getConfByhall=function(hallName){


    }

})


.controller('ConHallCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb,$rootScope) {

  $scope.talkList={};

       $scope.loadTalks=function(dates){

           cleftdb.getConfDatesByHallName($stateParams.hallname,dates,$rootScope.userEmail).then(function(result){
                 $scope.talkList=result;
                 console.log(result);
            },function (error) {
                alert(error);
           });
       }

})

/*BY HALL*/
.controller('talkListCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb,$rootScope) {

       $scope.talkList={};
       $scope.loadTalks=function(dates){
           cleftdb.getConfDatesByHallName('',dates,$rootScope.userEmail).then(function(result){
                 $scope.talkList=result;
                 console.log(result);
            },function (error) {
                alert(error);
           });
       }

})

.controller('MyattendCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb,$rootScope) {

/*GET ALL MY ATTENDINF TALKS*/
  cleftdb.myAttend().then(function(result){
                   $scope.myAttendingList=result;
                   console.log(result);
              },function (error) {
                  alert(error);
   });


})


.controller('singleTalkDetailCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb) {

  var pk_talk=$stateParams.talkid;
  $scope.attendingTalk=false;

  cleftdb.getSingleTalkDetail(pk_talk).then(function(result){
         $scope.talkDetail=result;
      },function (error) {
          alert(error);
     });


  /*CHECK ALREADY ATTENDING*/
     cleftdb.alreadyAttending(pk_talk).then(function(result){
           if(result[0]['counts']>0){
            $scope.attendingTalk=true;
           }
        },function (error) {
            alert(error);
    });

 /*WHEN USER CLICKS ATTTENDING**/
  $scope.attendTalk=function(pk_cleft){
    
     /*INSERT INTO ATTENDING*/
      cleftdb.attendTalk(pk_cleft).then(function(result){
        $scope.attendingTalk=true;
      },function (error) {
          alert(error);
     });


  }


function checkAttending(pk_cleft){
  /*CHECK ALREADY ATTENDING*/

  cleftdb.alreadyAttending(pk_cleft).then(function(result){

         console.log(result);

      },function (error) {
          alert(error);
  });
}


})

.controller('speakerListCtrl', function($scope, $state,$stateParams,$ionicViewService,cleftdb) {


    cleftdb.getAllSpeakersList().then(function(result){

         $scope.speakers=result;

      },function (error) {
                    alert(error);
     });
})


.controller('menuContrl', function($scope, $state,$stateParams,$ionicViewService,mainService,$rootScope) {



 $scope.logout=function(){
     
      $rootScope.userEmail='';
      $rootScope.userName='';
      $rootScope.userType='';
      mainService.logout();
 }


})


.controller('SessionDetailCntl', function($scope, $state,$stateParams,$ionicViewService,cleftdb,$rootScope) {


    cleftdb.getSpeakersSessions($rootScope.userEmail).then(function(result){

         $scope.mySesionList=result;
         console.log(result);

      },function (error) {
                    alert(error);
     });

})


.controller('facultyCtrl', function($scope, $state,$stateParams,$ionicViewService,$http) {

  console.log(window.localStorage.getItem('LOCAL_TOKEN_KEY'));

  $http.get('js/json/faculty.json')
       .then(function(res){
          $scope.facultyArray = res.data;                
   });

})





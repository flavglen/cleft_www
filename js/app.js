// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db;
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.constant('TASK_FORCE_URL','templates/taskforce/includes/')

.run(function($ionicPlatform,$rootScope,$state,$cordovaSQLite,$timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      var email=window.localStorage.getItem('USER_EMAIL');

      if(email)
          $state.go('app.home');

/*DATABSE*/
if (window.cordova) {

    window.plugins.sqlDB.copy("cleft1.db", 0, copysuccess,copyerror);    
    }else{
      window.plugins.sqlDB.copy("cleft1.db", 0, copysuccess,copyerror);  
    }
  
                  function copysuccess()
                   {
                       db = $cordovaSQLite.openDB({ name: "cleft1.db"  ,location:'default' });
                   }

                   function copyerror(e)
                   {
        
                       db = $cordovaSQLite.openDB({ name: "cleft1.db"  ,location:'default' });
                   }
  




  });

  /*CHECK USER LOGGED IN*/
   $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){

    var email=window.localStorage.getItem('USER_EMAIL');
    var username=window.localStorage.getItem('USER_NAME');
    var usertype=window.localStorage.getItem('USER_TYPE');

    if(email){
       $rootScope.userEmail=email;
       $rootScope.userName=username;
       $rootScope.userType=usertype;
      
    }else{
      /*Redirect him to Login*/
    }

             // if (toState.authenticate){

             //    console.log($state.current.name);

             //     if (typeof token==='undefined' || token==null ){
                       
             //          $state.transitionTo("app.login");
             //          event.preventDefault(); 
             //       }
             // }
  });






})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  /*TASK T*/
  .state('app.taskforce', {
      url: '/taskforce',
      views: {
        'menuContent': {
          templateUrl: 'templates/taskforce/index.html',
          controller: 'taskForceCtrl'
        }
      }
    })

/*Prajwal*/
      .state('app.program', {
      url: '/program',
      views: {
        'menuContent': {
          templateUrl: 'templates/program/index.html',
          controller: 'programCtrl'
        }
      }
    })
    
    .state('app.venue', {
      url: '/venue',
      views: {
        'menuContent': {
          templateUrl: 'templates/venue.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    /*******ends */

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeController'
        }
      }
    })

  /* prajwal 19-01-2017 */
  
  .state('app.scientific', {
      url: '/scientific',
      views: {
        'menuContent': {
          templateUrl: 'templates/scientific.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
  .state('app.hall', {
      url: '/hall',
      views: {
        'menuContent': {
          templateUrl: 'templates/hall.html',
          controller: 'HalllistsCtrl'
        }
      }
    })
    
    .state('app.speaker_listing', {
      url: '/speaker_listing',
      views: {
        'menuContent': {
          templateUrl: 'templates/speaker_listing.html',
          controller: 'speakerListCtrl'
        }
      }
    })
    
    .state('app.talk_all_listing', {
      url: '/talk_all_listing',
      views: {
        'menuContent': {
          templateUrl: 'templates/talk_all_listing.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    .state('app.talk_full_detail', {
      url: '/talk_full_detail/:talkid',
      views: {
        'menuContent': {
          templateUrl: 'templates/talk_full_detail.html',
          controller: 'singleTalkDetailCtrl'
        }
      }
    })
    
    .state('app.hall_talk_list', {
      url: '/hall_talk_list/:hallname',
      views: {
        'menuContent': {
          templateUrl: 'templates/hall_talk_list.html',
          controller: 'ConHallCtrl'
        }
      }
    })
    
    .state('app.my_fav_detail', {
      url: '/my_fav_detail',
      views: {
        'menuContent': {
          templateUrl: 'templates/my_fav_detail.html',
          controller: 'MyattendCtrl'
        }
      }
    })
   
   
   .state('app.my_session_detail', {
      url: '/my_session_detail',
      views: {
        'menuContent': {
          templateUrl: 'templates/my_session_detail.html',
          controller: 'SessionDetailCntl'
        }
      }
    })
   
    
    /* prajwal 19-01-2017 ends*/
  
  
  .state('app.membership', {
      url: '/membership',
      views: {
        'menuContent': {
          templateUrl: 'templates/membership.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCntrl'
      }
    }
  })
    
    .state('app.reg', {
      url: '/reg',
      views: {
        'menuContent': {
          templateUrl: 'templates/reg.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    
    
    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
     .state('app.hospi', {
      url: '/hospi',
      views: {
        'menuContent': {
          templateUrl: 'templates/hospi.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    
    .state('app.tours', {
      url: '/tours',
      views: {
        'menuContent': {
          templateUrl: 'templates/tours.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
  .state('app.conference', {
      url: '/conference',
      views: {
        'menuContent': {
          templateUrl: 'templates/conference.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
  .state('app.ibe', {
      url: '/ibe',
      views: {
        'menuContent': {
          templateUrl: 'templates/ibe.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  
  .state('app.journalandresearch', {
      url: '/journalandresearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/journalandresearch.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      },
      authenticate: false
    })
    
    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
          controller: 'PlaylistsCtrl'
        }
      },
      authenticate: true
    })
    
     .state('app.usefullinks', {
      url: '/usefullinks',
      views: {
        'menuContent': {
          templateUrl: 'templates/usefullinks.html',
          controller: 'PlaylistsCtrl'
        }
      },
      authenticate: true
    })

       .state('app.orgcommittee', {
      url: '/usefullinks/orgcommittee',
      views: {
        'menuContent': {
          templateUrl: 'templates/organisingCommittee.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
       
    
     .state('app.speakers', {
      url: '/speakers',
      views: {
        'menuContent': {
          templateUrl: 'templates/speakers.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    
    .state('app.exhibit', {
      url: '/exhibit',
      views: {
        'menuContent': {
          templateUrl: 'templates/exhibit.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    .state('app.abstract', {
      url: '/abstract',
      views: {
        'menuContent': {
          templateUrl: 'templates/abstract.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
    
    .state('app.downloads', {
      url: '/downloads',
      views: {
        'menuContent': {
          templateUrl: 'templates/downloads.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  //new page controllers for Cleft added from here 25-12-2016 starts
  
  .state('app.Congress_Committee', {
    url: '/Congress_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Congress_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.Organizing_Committees', {
    url: '/Organizing_Committees',
    views: {
      'menuContent': {
        templateUrl: 'templates/Organizing_Committees.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  
  .state('app.Finance_Committee', {
    url: '/Finance_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Finance_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.Reception_Committees', {
    url: '/Reception_Committees',
    views: {
      'menuContent': {
        templateUrl: 'templates/Reception_Committees.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.Web_Committee', {
    url: '/Web_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Web_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  
  .state('app.Executive_Committee', {
    url: '/Executive_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Executive_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.Scientific_Committee', {
    url: '/Scientific_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Scientific_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  .state('app.Advisory_Committee', {
    url: '/Advisory_Committee',
    views: {
      'menuContent': {
        templateUrl: 'templates/Advisory_Committee.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.faculty', {
    url: '/faculty',
    views: {
      'menuContent': {
        templateUrl: 'templates/faculty.html',
        controller: 'facultyCtrl'
      }
    }
  });

  
  
  //new page controllers for Cleft added from here 25-12-2016 ends
  
  
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});




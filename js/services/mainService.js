App.factory('mainService', function() {
var  orgCom={};

/*FOR LOGIN*/
var LOCAL_TOKEN_KEY = 'yourTokenKey';
var username = '';
var isAuthenticated = false;
var role = '';
var authToken;

var organisingCommittee = [
    { name: 'Congress Committee',url:'/organisers', id: 1, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Executive Committee of Confederation',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Executive Committee of Confederation',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Scientific Committee',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Advisory Committee',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Organizing Committees',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Finance Committee',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Reception, Registration & Education Committees',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
    { name: 'Web and Communication Committee',url:'/organisers', id: 2, items: [{ subName: 'SubBubbles1', subId: '1-1' }]},
  ];

 orgCom.organisers=function(){
 		return organisingCommittee;
 },

 orgCom.login=function($user){

       isAuthenticated=true;
       window.localStorage.setItem('LOCAL_TOKEN_KEY', 'gsggdrgdrgdrgr');
       return true;
 },

orgCom.logout=function($user,$pass){
       isAuthenticated=false;
       window.localStorage.removeItem('USER_EMAIL');
       window.localStorage.removeItem('USER_TYPE');
       window.localStorage.removeItem('USER_NAME');

 }
 

 orgCom.isLoggedIn=function(){
    return isAuthenticated;
 }


  return orgCom;

});

App.factory('DB', function($cordovaSQLite, $q, $ionicPlatform) {
  var self = this;

  // Handle query's and potential errors
  self.query = function (query, parameters) {

    parameters = parameters || [];
    var q = $q.defer();

    $ionicPlatform.ready(function () {
        
      $cordovaSQLite.execute(db, query, parameters)
        .then(function (result) {
          q.resolve(result);
        }, function (error) {
          console.warn('I found an error');
          console.warn(error);
          q.reject(error);
        });
    });
    return q.promise;
  };

  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  };

  return self;
});


/*QUERIES*/
App.factory('cleftdb', function($cordovaSQLite, DB) {
  var self = this;
  self.all = function() {
    return DB.query("SELECT * FROM cleft_master")
      .then(function(result){
        return DB.getAll(result);
      });
  },

  /*LOGIN FUNCTIONALITY*/
  self.loginByEmail = function(email) {
     var parameters = [email];
    return DB.query("SELECT email,Name,type,count('email') as countemail FROM cleft_master WHERE email=(?)",parameters)
      .then(function(result){
         return DB.getAll(result);
      });
  },

  /*GET ALL SPEAKER LIST*/
  self.getAllSpeakersList = function(email) {
    return DB.query("SELECT Name,email FROM cleft_master WHERE type=\'SPEAKER\'")
      .then(function(result){
         return DB.getAll(result);
      });
  },
  
  /*GET ALL HALL LIST*/
  self.getHallList = function() {
    return DB.query("select hall,pk_cleft from cleft_master group by hall  order by  hall ASC")
      .then(function(result){
         return DB.getAll(result);
      });
  },

  /*GET CONF DATES BY HALL NAME*/
  self.getConfDatesByHallName = function(hallName,dates,email) {
     var hall = hallName || false;
     var parameters = [];
     var query='';

     if(hall){
      query="select *  from cleft_master  CM LEFT JOIN attending ATN ON ATN.fk_cleft = CM.pk_cleft where CM.Hall=(?) AND CM.datetimev=(?) AND CM.email!=(?)";
      parameters = [hall,dates,email];
     }
     else{
      query="select *  from cleft_master  CM LEFT JOIN attending ATN ON ATN.fk_cleft = CM.pk_cleft where  CM.datetimev=(?) AND CM.email!=(?)";
      parameters = [dates,email];
    }
    
    /*return DB.query("select *  from cleft_master where Hall=(?) AND datetimev=(?)",parameters)*/
    return DB.query(query,parameters)
      .then(function(result){
         return DB.getAll(result);
      });
  },

  /*GET SINGLE TALK DETAIL */
  self.getSingleTalkDetail = function(pk_cleft) {
     var parameters = [pk_cleft];
    return DB.query("select *  from cleft_master where pk_cleft=(?)",parameters)
      .then(function(result){
         return DB.getAll(result);
      });
  },
  
 /*GET SINGLE TALK DETAIL */
 self.getSpeakersSessions = function(email) {
     var parameters = [email];
    return DB.query("select *  from cleft_master where email=(?) AND type=\'SPEAKER\' AND Session!=\'\'",parameters)
      .then(function(result){
         return DB.getAll(result);
      });
  }

  /*ADD TO ATTENDING TABLE*/
   self.attendTalk = function(pk_cleft) {
     var parameters = [pk_cleft];
     return DB.query("insert into attending (fk_cleft) VALUES(?) ",parameters);
  }

  /*CHECK ALREADY ATTENDING EVENT/TALKK*/
  self.alreadyAttending = function(pk_cleft) {
     var parameters = [pk_cleft];
    return DB.query("select count(*) as counts  from attending where fk_cleft=(?)",parameters)
      .then(function(result){
         return DB.getAll(result);
      });
  }

  /*FETCH ALL MY ATTENDING TALKS*/
  self.myAttend = function() {
     var parameters = [];
    return DB.query("select *  from cleft_master  CM JOIN attending ATN ON ATN.fk_cleft = CM.pk_cleft")
      .then(function(result){
         return DB.getAll(result);
      });
  }


  


  return self;

});

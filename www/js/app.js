// this is where you call the menus

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  openFB.init('436651686459670');


  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: "/login",
      views: {
          'menuContent' :{
              templateUrl: "templates/login.html",
              controller: "LoginCtrl"
          }
      }
    })

      .state('app.profile', {
          url: "/profile",
          views: {
              'menuContent' :{
                  templateUrl: "templates/profile.html",
                  controller: "ProfileCtrl"
              }
          }
      })

      .state('app.sessions', {
          url: "/sessions",
          views: {
              'menuContent': {
                  templateUrl: "templates/sessions.html",
                  controller: 'SessionsCtrl'
              }
          }
      })

      .state('app.session', {
          url: "/sessions/:sessionId",
          views: {
              'menuContent': {
                  templateUrl: "templates/session.html",
                  controller: 'SessionCtrl'
              }
          }
      })
    .state('app.debate', {
        url: "/debate",
    views: {
      'menuContent' :{
          templateUrl: "templates/debate.html",
          controller: "DebateCtrl"
      }
  }
    })
        .state('app.interest', {
            url: "/interest",
            views: {
                'menuContent': {
                    templateUrl: "templates/interest.html",
                    controller: "CardsCtrl"
                }
            }
        })
    .state('app.NemesisPage', {
        url: "/NemesisOage",
        views: {
            'menuContent': {
                templateUrl: "templates/NemesisPage.html",
                controller: "mainctrl"
            }
        }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/debate');
})
.value('MLAnalyzer', {
    "auth": "1XwmFh3bJ3mshUQOb2L4hCFOXWdhp19vAxKjsnMQHOYDQ77z4J",
    "appId": "",
    "baseUrl": "https://nehac-ml-analyzer.p.mashape.com/",
    "X-Mashape-Key": "1XwmFh3bJ3mshUQOb2L4hCFOXWdhp19vAxKjsnMQHOYDQ77z4J",
    "Accept": "application/json"
})
.value('Parse', {
    "appId": "3ZkneJbReSRAjaYZecTmYl8XHTjInRKOaHQJnFXu",
    "baseUrl": "https://api.parse.com",
    "clientKey": "UKHztduYPmPMpl1ZMMPjdOxPEUXapCL6tB9IQHMO",
    "jsKey": "TNwTR5lbQdZVR2eodDNpGmuYLNoeapuXJoUkfDhl",  //JavaScript Key
    "dotNetKey": "xDTFlYIRGvHBshDUg3T8SIppPGDAP2w1JelgNgz8",
    "webhookKey": "zMZnCOdmmccHMfxlMy264CAaqQwnDpKLhGrCKdso",
    "restKey": "ZKVVtRJpNtk16lgYHPxURJIBn1T9vuVFKGq50KXi",
});


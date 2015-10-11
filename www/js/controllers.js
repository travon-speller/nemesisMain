// this is where all the controllers are
angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope) {
})

.controller('SessionsCtrl', function($scope, Session) {
    $scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
})

.controller('LoginCtrl', function($scope) {
    $scope.login = function() {
        openFB.login('email',
            function() {
                alert('Facebook login succeeded');
            },
            function(error) {
                alert('Facebook login failed: ' + error.error_description);
            });
    };
})
.controller('mainctrl', function($scope){


    // var images = ['http://placehold.it/350x149', 'http://placehold.it/350x148', 'http://placehold.it/350x147'];
    var images = [
		{	
		    name: "Tom",
		    photo: "http://placehold.it/350x149"
		},
		{
		    name: "Jim",
		    photo: 'http://placehold.it/350x148'
		},
		{
		    name:"Chris",
		    photo: "http://placehold.it/350x147"
		}
    ]

    $scope.images = images; 
    $scope.do= function(){console.log('Magic')};
})

.controller('ProfileCtrl', function($scope, $q) {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            console.log(user);
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            console.log(error);
            alert('Facebook error: ' + error.error_description);
        }
    });
    

})
.controller('DebateCtrl', ['$scope', '$cordovaCapture', '$state', 'PARSE', function ($scope, $cordovaCapture, $state, PARSE) {
    $scope.topic = "The Cowboys suck!";
    $scope.recordVideo = $cordovaCapture.captureVideo().then(function (videoData) {
        var propValue, propIn;
        for (var propName in videoData) {
            propValue = videoData[propName]
            console.log(propName, propValue);
            for (var prop in propValue) {
                propIn = propValue[prop];
                console.log(prop, propIn);
            }
        }
        console.log("Print Test");
        var filePath = videoData[0].fullPath.slice('file:'.length);
        $scope.vidPath = PARSE.getVideo().then(function (result) {
            console.log('SUCCESS 47:');
            $scope.vidPath = result;
            for (var propName in result) {
                propValue = result[propName]
                console.log(propName, propValue);
                for (var prop in propValue) {
                    propIn = propValue[prop];
                    console.log(prop, propIn);
                }
            }
        }, function (error) {
            console.log('ERROR 57:');
            for (var propName in error) {
                propValue = error[propName]
                console.log(propName, propValue);
                for (var prop in propValue) {
                    propIn = propValue[prop];
                    console.log(prop, propIn);
                }
            }
        });
        // PARSE.save({_filename: videoData[0].fullPath, _type: videoData[0].type}, function(result) {
        //   console.log(result);
        //   console.log('Inside Post function');
        // });
        PARSE.uploadVideo(filePath, videoData[0].type);
        $state.go('tab.account');
    }, function (err) {
        console.log('75 Error');
        console.log(err);
    });

}])

.directive('noScroll', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            $element.on('touchmove', function (e) {
                e.preventDefault();
            });
        }
    }
})
.controller('CardsCtrl', function ($scope) {
    var cardTypes = [
        { image: 'foot.jpg', title: 'So much grass #hippster' },
        { image: 'foot.jpg', title: 'Way too much Sand, right?' },
        { image: 'foot.jpg', title: 'Beautiful sky from wherever' }
    ];

    $scope.cards = cardTypes;

    $scope.addCard = function (i) {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for (var i = 0; i < 3; i++) $scope.addCard();

    $scope.cardSwipedLeft = function (index) {
        console.log('Left swipe');
    }

    $scope.cardSwipedRight = function (index) {
        console.log('Right swipe');
    }

    $scope.cardDestroyed = function (index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
});

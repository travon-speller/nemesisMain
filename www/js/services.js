angular.module('starter.services', ['ngResource'])

// Conference sessions service
.factory('Session', function ($resource) {
    return $resource('http://localhost:4400/sessions/:sessionId');
})
.factory('Sentiment', ['$resource', 'MLAnalyzer', function($resource, MLAnalyzer) {
    var reqHeaders = {
        'X-Mashape-Key': MLAnalyzer.auth,
        'Content-Type':  MLAnalyzer.Accept
    };

    var _sentiment = $resource(MLAnalyzer.baseUrl + 'sentiment', {text: '@text'},
    {
        'get': {
            headers: reqHeaders
        }
    });
    return _sentiment;
}])
.factory('Classifier', ['$resource', 'MLAnalyzer', function($resource, MLAnalyzer) {
    //BEWARE this factory some classifiers do not return objects.
    var reqHeaders = {
        'X-Mashape-Key': MLAnalyzer.auth,
        'Content-Type': MLAnalyzer.Accept
    };

    var _classifier = $resource(MLAnalyzer.baseUrl + 'classifier', {text: '@text'},
    {
        'get': {
            headers: reqHeaders
        }
    });
    return _classifier;
}])
.factory('Camera', ['$cordovaCapture', '$q', function($cordovaCapture, $q) {

    return {
        getPicture: function(options) {
            var q = $q.defer();

            navigator.camera.getPicture(function(result) {
                //Do magical things.
                q.resolve(result);
            }, function(err) {
                q.reject(err);
            }, options)
            return q.promise;
        }
    }
}])
.factory('Video', ['$cordovaCapture', '$state', function($cordovaCapture, $state) {
    var options = {duration: 15};

    return {
        getVideo: function() {
            $cordovaCapture.captureVideo(options).then(function(videoData) {
                console.log(videoData);
                $state.go('/tab/dash');
            }, function (err) {
                console.log(err);
            });
        }, uploadVideo: function() {
            //console.log(Upload)
        }
    }
}])
.factory('PARSE', ['$http', 'Parse', function ($http, Parse) {
    var debugMessage = function(data) {
        var propValue, propIn;
        for(var propName in data) {
            propValue = data[propName]
            console.log(propName, propValue);
            for (var prop in propValue) {
                propIn = propValue[prop];
                console.log(prop, propIn);
            }
        }
    }

    var uploadHeaders = {
        'X-Parse-Application-Id': Parse.appId,
        'X-Parse-REST-API-Key': Parse.restKey,
        'Content-Type': 'video/mp4'
    };
    var postHeaders = uploadHeaders;
    postHeaders['Content-Type'] = 'application/json';

    var uploadUrl = Parse.baseUrl + '/1/files/';
    var postUrl = Parse.baseUrl + '/1/classes/Videos/';

    var file = {
        'from': 'UserA',
        'to': 'UserB',
        'file': '',
        'filename': '',
        'topic': '',
        'prompt': '',
        'name': '',
        'location': ''
    };

    //Save video takes the row data to store video information
    function _saveVideo(_file, _info) {
        return $http.post(postUrl, _info, {
            headers: uploadHeaders
        }).then(function(result) {
            console.log('Video Saved');
            console.log(result);
        }, function(error) {
            console.log('155 Error');
            console.log(error);
            debugMessage(error);
        });
    };

    return {
        uploadVideo: function(_filename, _user) {
            //Save video
            return $http.post(uploadUrl + 'video.mp4', _filename, {
                headers: uploadHeaders
            }).then(function(result) {
                console.log('Video Uploaded');
                console.log(result);
                _user.file_name = 'video.mp4';
                _user.video_save = result.data;
                _saveVideo('video_01', _user);
            }, function(error) {
                console.log('Error 145');
                debugMessage(data);
            });
        }, getVideo: function(_video) {
            return $http.get(postUrl + 'video.mp4', {
                headers: postHeaders
            });
        }, queryVideo: function() {
            return $http.get(postUrl, {
                headers: postHeaders,
                isArray: true
            })
        }, saveVideo: _saveVideo
    }
}]);


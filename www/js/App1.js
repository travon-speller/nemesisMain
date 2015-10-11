angular.module('nemesis', ['angurlar-carousel'])

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
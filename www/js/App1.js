angular.module('nemesis', ['angurlar-carousel'])

.controller('mainctrl', function($scope){


    // var images = ['http://placehold.it/350x149', 'http://placehold.it/350x148', 'http://placehold.it/350x147'];
    var images = [
		{	
		    name: "Tom",
		    photo: 'foot.jpg'
		},
		{
		    name: "Jim",
		    photo: 'ionic.png'
		},
		{
		    name:"Chris",
		    photo: "foot.jpg"
		}
    ]

    $scope.images = images; 
    $scope.do= function(){console.log('Magic')};
})
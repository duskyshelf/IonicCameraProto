angular.module('starter', ['ionic', 'ngCordova'])

.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
  $scope.images = JSON.parse(window.localStorage.images || '[]');

  $scope.placeheldgallery = [];

  for(var i=0; i < 12; i++) {
    if($scope.images[i]) {
      $scope.placeheldgallery[i] = $scope.images[i];
    }
    else {
      $scope.placeheldgallery[i] = {url: "img/pigeonplaceholder.gif"};
    }
  }

  $scope.addImage = function(photoIndex) {

    var options = {
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
     };

    $cordovaCamera.getPicture(options).then(function(imageData) {

    $scope.images[photoIndex] = {url: imageData};
    $scope.placeheldgallery[photoIndex] = {url: imageData};

    window.localStorage.images = JSON.stringify($scope.images);



    }, function(err) {
      console.log(err);
    });

  };

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,$scope, $cordovaBarcodeScanner) {
  $scope.chat = Chats.get($stateParams.chatId);
        $scope.ex=function(){
            alert("entre");
            document.addEventListener("deviceready", function () {

                $cordovaBarcodeScanner
                    .scan()
                    .then(function(barcodeData) {
                        // Success! Barcode data is here
                        alert(barcodeData);
                    }, function(error) {
                        // An error occurred
                        alert(error);
                    });


                // NOTE: encoding not functioning yet
                /* $cordovaBarcodeScanner
                 .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
                 .then(function(success) {
                 // Success!
                 }, function(error) {
                 // An error occurred
                 });*/

            }, false);

        };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

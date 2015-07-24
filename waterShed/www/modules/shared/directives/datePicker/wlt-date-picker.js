(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltDatePicker', wltDatePicker);
    wltDatePicker.$inject = ['$mdDialog'];
    function wltDatePicker($mdDialog) {
        return {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/datePicker/main.html',
            scope: {
                valueDate:"=valueDate"
            },
            controller:['$scope', function ($scope) {
                $scope.showAdvanced = function(ev) {
                    $mdDialog.show({
                        controller:['$scope', '$mdDialog' ,DialogControllerDatePicker],
                        templateUrl: 'modules/shared/directives/datePicker/date-picker.html',
                        targetEvent: ev

                    })
                        .then(function(answer) {
                            $scope.alert = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.alert = 'You cancelled the dialog.';
                        });
                };


            }],
            link: function (scope, element, attrs) {

            }
        };
    };
    function DialogControllerDatePicker($scope, $mdDialog) {
        /*      console.log( location);
         $scope.location=location;*/

        $scope.getId = function() {
            console.log("getid");
            //return $scope.id;
        };
        $scope.hide = function() {

            $mdDialog.hide();
        };
        $scope.cancel = function() {
            console.log("cancel");
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

})();
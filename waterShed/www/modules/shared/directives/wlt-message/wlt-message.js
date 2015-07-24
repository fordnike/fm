(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltMessage', wltMessage);

    wltMessage.$inject = ['$mdToast', '$translate'];

    function wltMessage($mdToast, $translate) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/wlt-message/message.html',
            scope: {
                show: '@',
                message: '='
            },
            link: MessageLink,
            controller: [ '$scope', function ($scope) {
            $scope.close = function() {
                $scope.showMessage = false;
              }
           }]
        };

        return directive;

        function MessageLink(scope, element, attrs) {
            var sData = attrs;

            function getToastPosition() {
                var toastPosition = {
                    bottom: true,
                    top: false,
                    left: true,
                    right: false
                };

                return Object.keys(toastPosition)
                    .filter(function (pos) {
                        return toastPosition[pos];
                    })
                    .join(' ');
            }

            attrs.$observe(
                'show',
                function (showAttribute) {
                    if ( scope.message !== undefined && scope.message !== "" ) {

                        $translate(scope.message.id)
                            .then(function (message) {

                                switch( scope.message.type ){
                                    case 'danger':
                                    case 'error':
                                        if (scope.message.text == undefined || scope.message.text == ''){
                                            scope.message.text = message;
                                        }
                                        scope.showMessage = true;
                                        break;
                                    case 'success':
                                        scope.showMessage = false;
                                        break;
                                    default:
                                        break;
                                }

                                $mdToast.show(
                                    $mdToast.simple()
                                        .content(message)
                                        .position(getToastPosition())
                                        .hideDelay(1000)
                                );
                            })
                            .catch(function(reason){
                                console.log('Warning - no translation found for (' + scope.message.id + '): ' + reason);
                            })
                    }
                }
            );
        }

    }


})();
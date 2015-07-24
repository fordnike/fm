(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltTimeZone', wltTimeZone);

    wltTimeZone.$inject = ['$stateParams', 'timeZoneFactory', 'globalFactory', '$timeout','$http'];

    function wltTimeZone($stateParams, timeZoneFactory, globalFactory, $timeout,$http) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/wlt-time-zone/time-zone.html',
            scope: {timeZone: '='},
            link: TimeZoneLink
        };

        return directive;

        function TimeZoneLink(scope, element, attrs) {

            scope.loadTimeZoneSelector = loadTimeZoneSelector
            scope.timeZone = scope.timeZone || "";

            init();

            function init() {
                if (scope.timeZone != "") {
                    scope.selectTimeZone = scope.timeZone;

                } else {
                    getTimeZoneLocal();
                }
            }

            scope.$watch('timeZone', function (current, original) {
                if (angular.isDefined(scope.timeZone)) {
                    scope.selectTimeZone = (scope.timeZone == "") ? "" : (scope.timeZone);
                }
            });
            scope.$watch('selectTimeZone', function (current, original) {
                if (angular.isDefined(scope.timeZone)) {
                    scope.timeZone = (angular.isUndefined(scope.selectTimeZone) == true) ? "" : scope.selectTimeZone;
                }
            });

            function getTimeZone() {
                timeZoneFactory.getTimeZoneList()
                    .then(function (response) {
                        scope.listTimeZone = angular.copy(response.data);
                        scope.timeZone = scope.selectTimeZone;
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function loadTimeZoneSelector() {
                return $timeout(function () {
                    getTimeZone();

                }, 650);
            }

            function getTimeZoneLocal() {
                timeZoneFactory.getTimeZoneLocal()
                    .then(function (response) {
                        scope.selectTimeZone = response;
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

        }
    }

})();
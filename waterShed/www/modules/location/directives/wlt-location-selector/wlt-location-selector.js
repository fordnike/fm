(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationSelector', wltLocationSelector);

    wltLocationSelector.$inject = ['locationFactory', '$mdDialog', 'globalFactory'];

    function wltLocationSelector(locationFactory, $mdDialog, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-selector/location-selector.html',
            scope: {
                eventId: "@eventId",
                locationId: "=",
                locationName: "=locationName",
                myForm: '=myForm'
            },
            link: LocationSelectorLink
        };

        return directive;

        function LocationSelectorLink(scope, element, attrs) {

            scope.newLocation = newLocation;
            scope.showAdvanced = showAdvanced;
            scope.showList = false;

            init();

            function init() {
                globalFactory.loadTranslation('location');
                scope.locations = [];
                getListLocation();

            }

            scope.$watch('selectLocation', function (current, original) {
                scope.locationId = (angular.isUndefined(scope.selectLocation) == true) ? scope.locationId  : scope.selectLocation.id;
            });
            scope.$watch('locationId', function (current, original) {
                if(scope.locationId){
                    getListLocation();
                }
            });

            function getListLocation() {
                return locationFactory.getList()
                    .then(function (response) {
                        if (response.length > 0) {
                            scope.showList = true;
                            scope.locations = angular.copy(response);
                            if (scope.locationId != '' && scope.locationId != undefined) {
                                getLocation(scope.locationId);
                            } else if (response.length === 1) {
                                scope.locationId = response[0].id;
                            }
                        } else {
                            scope.selectLocation = 0;
                            scope.locationId = 0;
                        }
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function getLocation(locationId) {
                locationFactory.get(locationId)
                    .then(function (response) {
                        scope.selectLocation = angular.copy(response);
                        scope.locationId = scope.selectLocation.id;
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function newLocation(ev) {
                scope.showAdvanced(ev, true);
            }

            function showAdvanced(ev, isNew) {
                var temp;
                if (isNew) {

                } else {
                    temp = scope.selectLocation;
                }
                $mdDialog.show({
                    locals: {location: temp, locationId: scope.selectLocation},
                    controller: ['$scope', '$mdDialog', 'location', DialogController],
                    templateUrl: 'modules/location/directives/wlt-location-selector/location-selector-modal.html',
                    targetEvent: ev

                })
                    .then(function (answer) {
                        scope.locations.push(answer);
                        scope.selectLocation = answer;
                    }, function () {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error');
                    });
            }

            function DialogController(scope, $mdDialog, location) {

                scope.location = location;
                scope.getId = function () {
                    return scope.id;
                };
                scope.hide = function () {
                    location = scope.location;
                    scope.showEdit = true;
                    $mdDialog.hide(location);
                };
                scope.cancel = function () {
                    $mdDialog.cancel();
                };
                scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        }

    }

})();
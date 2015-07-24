(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationEditPage', wltLocationEditPage);

    wltLocationEditPage.$inject = ['$stateParams', 'locationFactory', '$timeout', 'globalValues', 'globalFactory'];

    function wltLocationEditPage($stateParams, locationFactory, $timeout, globalValues, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-edit-page/location-edit-page.html',
            scope: {
                isNew: "=",
                location: "="
            },
            link: LocationEditPageLink
        };

        return directive;

        function LocationEditPageLink(scope, element, attrs) {

            scope.updateLocation = updateLocation;
            scope.addLocation = addLocation;
            scope.deleteLocation = deleteLocation;
            scope.getLocation = getLocation;
            scope.selectTimeZone = 0;
            scope.showNew = (!angular.isDefined(scope.location));
            scope.showNew = scope.isNew;
            scope.cancelLocation = cancelLocation;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            var locationId = parseInt($stateParams.id, 10);

            scope.$watch('selectTimeZone', function (current, original) {
                if (angular.isDefined(scope.location)) {
                    scope.location.timezone = (angular.isUndefined(scope.selectTimeZone) == true) ? "" : scope.selectTimeZone;
                }
            });

            init();

            function init() {
                globalFactory.loadTranslation('location');
                if (!scope.isNew) {
                    scope.receivedResponse = false;
                    scope.responseSuccess = false;
                    getLocation(locationId);
                }
                else {
                    scope.receivedResponse = true;
                    scope.responseSuccess = true;
                }
            }



            function getLocation(locationId) {
                locationFactory.get(locationId)
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.location = angular.copy(response);
                        scope.selectTimeZone = angular.copy(response.timezone);
                        scope.message = globalFactory.formatMessage('success', 'shared.success.fetch');
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function updateLocation() {
                if (scope.formLocationUpdate.$valid) {
                    locationFactory.update(scope.location)
                        .then(function (response) {
                            scope.message = globalFactory.formatMessage('success', 'shared.success.save');
                            scope.cancel();
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.save', error);
                        });
                } else {
                    angular.forEach(scope.formLocationUpdate.$error.required, function (field) {
                        field.$setDirty();
                    });
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired');
                }
            }

            function addLocation() {
                if (scope.formLocationUpdate.$valid) {
                    locationFactory.add(scope.location)
                        .then(function (response) {
                            scope.location.id = response;
                            scope.message = globalFactory.formatMessage('success', 'shared.success.add');
                            scope.doHide();
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.add', error);
                        });
                } else {
                    angular.forEach(scope.formLocationUpdate.$error.required, function (field) {
                        field.$setDirty();
                    });
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired');
                }
            }

            function deleteLocation() {
                locationFactory.delete(scope.location)
                    .then(function (response) {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.delete');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.delete', error);
                    });
            }

            function cancelLocation() {
                locationFactory.goBack();
            }

        }
    }

})();
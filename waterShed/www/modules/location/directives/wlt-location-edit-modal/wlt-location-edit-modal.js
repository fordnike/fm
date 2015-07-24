(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationEditModal', wltLocationEditModal);

    wltLocationEditModal.$inject = ['$stateParams', 'locationFactory', '$timeout', 'globalFactory','accountFactory'];

    function wltLocationEditModal($stateParams, locationFactory, $timeout, globalFactory,accountFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-edit-modal/location-edit-modal.html',
            scope: {
                isNew: "@isNew",
                location: "=location",
                receivedResponse: "=receivedResponse",
                responseSuccess: "=responseSuccess",
                isModal: "@isModal",
                id: "@id",
                cancel: "&cancel",
                doHide: "&doHide"
            },
            link: LocationEditModalLink
        };

        return directive;

        function LocationEditModalLink(scope, element, attrs) {

            scope.updateLocation = updateLocation;
            scope.addLocation = addLocation;
            scope.deleteLocation = deleteLocation;
            scope.getLocation = getLocation;
            scope.selectTimeZone = 0;
            scope.showNew = (!angular.isDefined(scope.location));
            scope.cancelLocation = cancelLocation;

            init();

            function init() {
                globalFactory.loadTranslation('location');
                if (scope.showNew) {
                    getAccount();
                }
            }

            function getLocation(locationId) {
                locationFactory.get(locationId)
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.location = angular.copy(response);
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
            function getAccount() {
                accountFactory.get()
                    .then(function (response) {
                        scope.account = angular.copy(response);
                        scope.location.timezone=scope.account.website.timezone;
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function cancelLocation() {
                locationFactory.goBack();
            }

        }
    }

})();
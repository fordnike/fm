(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationView', wltLocationView);

    wltLocationView.$inject = ['$stateParams', 'locationFactory', 'globalFactory', 'globalValues'];

    function wltLocationView($stateParams, locationFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-view/location-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: LocationViewLink
        };

        return directive;

        function LocationViewLink(scope, element, attrs) {

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('location');

                var locationId = parseInt($stateParams.id, 10);
                if ((locationId != "undefined") && (locationId > 0)) {

                    locationFactory.get(locationId)
                        .then(function (response) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = true;
                            scope.location = angular.copy(response);
                        })
                        .catch(function (error) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = false;
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                }
            }
        }
    }

})();
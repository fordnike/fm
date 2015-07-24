(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationList', wltLocationList);

    wltLocationList.$inject = ['locationFactory', 'globalFactory', 'globalValues'];

    function wltLocationList(locationFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-list/location-list.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: LocationListLink
        };

        return directive;

        function LocationListLink(scope, element, attrs) {
            scope.goLocationNew = goLocationNew;
            scope.setSearchMode = setSearchMode;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.showSearchBox = false;
            scope.filtered = '';

            init();

            function init() {
                globalFactory.loadTranslation('location');

                locationFactory.getList()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.locations = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function goLocationNew(){
                locationFactory.goLocationNew();
            }

            function setSearchMode() {
                scope.showSearchBox = !scope.showSearchBox;
                scope.search = '';
            }

        }
    }

})();
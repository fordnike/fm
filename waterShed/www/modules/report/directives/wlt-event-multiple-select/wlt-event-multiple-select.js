(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltEventMultipleSelect', wltEventMultipleSelect);

    wltEventMultipleSelect.$inject = ['eventFactory', 'globalFactory', 'globalValues'];

    function wltEventMultipleSelect(eventFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-event-multiple-select/event-multiple-select.html',
            scope: {
                events: '='
            },
            link: EventMultipleSelectLink
        };

        return directive;

        function EventMultipleSelectLink(scope, element, attrs) {
            scope.setSearchMode = setSearchMode;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.showSearchBox = false;

            init();

            function init() {
                globalFactory.loadTranslation('event');

                eventFactory.getList()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.events = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function setSearchMode() {
                scope.showSearchBox = !scope.showSearchBox;
                scope.search = '';
            }

        }
    }

})();
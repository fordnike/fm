(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltEventList', wltEventList);

    wltEventList.$inject = ['eventFactory', 'globalFactory', 'globalValues'];

    function wltEventList(eventFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/event/directives/wlt-event-list/event-list.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: EventListLink
        };

        return directive;

        function EventListLink(scope, element, attrs) {
            scope.goEventNew = goEventNew;
            scope.setSearchMode = setSearchMode;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.showSearchBox = false;
            scope.filtered = '';

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

            function goEventNew(){
                eventFactory.goEventNew();
            }

            function setSearchMode() {
                scope.showSearchBox = !scope.showSearchBox;
                scope.search = '';
            }

        }
    }

})();
(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltEventView', wltEventView);

    wltEventView.$inject = ['$stateParams', 'eventFactory', 'globalFactory', 'globalValues'];

    function wltEventView($stateParams, eventFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/event/directives/wlt-event-view/event-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: EventViewLink
        };

        return directive;

        function EventViewLink(scope, element, attrs) {
            scope.goEventEdit = goEventEdit;
            scope.publishEvent = publishEvent;
            scope.unpublishEvent = unpublishEvent;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.isMerchantAccountSet = false;
            scope.isUserEmailValid = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('event');
                globalFactory.loadTranslation('user');
                globalFactory.loadTranslation('account');

                scope.eventId = parseInt($stateParams.id, 10);
                if ((scope.eventId != "undefined") && (scope.eventId > 0)) {

                    eventFactory.get(scope.eventId)
                        .then(function (response) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = true;
                            scope.event = angular.copy(response);
                        })
                        .catch(function (error) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = false;
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                }

                eventFactory.isMerchantAccountSet()
                    .then(function (response) {
                        scope.isMerchantAccountSet = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });

                eventFactory.isUserEmailValid()
                    .then(function (response) {
                        scope.isUserEmailValid = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function goEventEdit(eventId){
                eventFactory.goEventEdit(eventId);
            }

            function publishEvent() {
                eventFactory.publishEvent(scope.event.id)
                    .then(function () {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success', null);
                        init();
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function unpublishEvent() {
                eventFactory.unpublishEvent(scope.event.id)
                    .then(function () {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success', null);
                        init();
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

        }
    }

})();
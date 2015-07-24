(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltEventEdit', wltEventEdit);

    wltEventEdit.$inject = ['$state', '$stateParams', 'eventFactory', 'accountFactory', 'globalValues', 'globalFactory','$filter'];

    function wltEventEdit($state, $stateParams, eventFactory, accountFactory, globalValues, globalFactory,$filter) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/event/directives/wlt-event-edit/event-edit.html',
            scope: {
                isNew: "="
            },
            link: EventEditLink
        };

        return directive;

        function EventEditLink(scope, element, attrs) {
            scope.addEvent = addEvent;
            scope.cancelEvent = cancelEvent;
            scope.saveEvent = saveEvent;
            scope.updateEvent = updateEvent;
            scope.eventId = parseInt($stateParams.id, 10);
            var helpCode = $stateParams.help;
            scope.showHelp = (helpCode === 'help');
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.isNew = !(scope.eventId > 0);

            init();

            function init() {
                globalFactory.loadTranslation('event');

                if (!scope.isNew) {
                    scope.receivedResponse = false;
                    scope.responseSuccess = false;
                    getEvent(scope.eventId);
                    accountFactory.get()
                        .then(function (response) {
                            scope.merchantAccount = response.merchandAccount;
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                }
                else {
                    scope.receivedResponse = true;
                    scope.responseSuccess = true;
                }
            }

            function addEvent() {
                eventFactory.add(scope.event)
                    .then(function (response) {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.save', null);
                        $state.go('private.ticket-edit-help', {id: response, help: helpCode});
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.save', error);
                    });
            }

            function cancelEvent() {
                eventFactory.goBack();
            }

            function saveEvent() {
                if (scope.eventForm.$valid) {
                    if (scope.eventId > 0) {
                        updateEvent();
                    } else {
                        addEvent();
                    }

                } else {
                    angular.forEach(scope.eventForm.$error.required, function (field) {
                        field.$setDirty();
                    });
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired', null);
                }
            }

            function updateEvent() {
                eventFactory.update(scope.event)
                    .then(function () {
                        getEvent();
                        scope.message = globalFactory.formatMessage('success', 'shared.success.update', null);
                        $state.go('private.account.event-view', {id: scope.eventId});
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.update', error);
                    });
            }

            function getEvent() {
                eventFactory.get(scope.eventId)
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.event = angular.copy(response);
                        scope.url = scope.event.urlPublished;
                        scope.iframe = scope.event.iFrame;
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                        scope.errorMessage = error;
                    });
            }


        }
    }

})();
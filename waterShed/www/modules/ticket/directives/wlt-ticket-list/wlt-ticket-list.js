(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltTicketList', wltTicketList);

    wltTicketList.$inject = ['ticketFactory', 'eventFactory', '$stateParams', 'globalFactory'];

    function wltTicketList(ticketFactory, eventFactory, $stateParams, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/ticket/directives/wlt-ticket-list/ticket-list.html',
            scope: {
                eventId: '@eventId',
                afficher: '@afficher'
            },
            link: TicketListLink
        };

        return directive;

        function TicketListLink(scope, element, attrs) {
            scope.addRowTicket = addRowTicket;
            scope.cancelTickets = cancelTickets;
            scope.deleteTicket = deleteTicket;
            scope.goTicketEdit = goTicketEdit;
            scope.saveTickets = saveTickets;

            init();

            function init() {
                globalFactory.loadTranslation('event');
                globalFactory.loadTranslation('ticket');

                scope.tickets = new Array();
                var helpCode = $stateParams.help;
                scope.showHelp = (helpCode === 'help');
                loadEvent();
                loadTicketList(scope.eventId);

                scope.receivedResponse = false;
                scope.responseSuccess = false;
            }

            function addRowTicket() {
                var temp = {
                    'id': -1,
                    'priceLevel': '',
                    'name': '',
                    'price': '',
                    'serviceFees': 0,
                    'limit': 0,
                    'promoCode': ''
                };
                (scope.tickets).push(temp);
            }

            function cancelTickets() {
                ticketFactory.goBack();
            }

            function deleteTicket(idTicket) {
                if (idTicket != -1) {
                    ticketFactory.delete(scope.eventId, idTicket)
                        .then(function () {
                            loadTicketList(scope.eventId);
                            scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                } else {
                    (scope.tickets).splice(idTicket, 1);
                }
            }

            function goTicketEdit(eventId){
                ticketFactory.goTicketEdit(eventId);
            }

            function saveTickets() {

                var formValid = true;
                for (var i = 0; i < scope.tickets.length; i++) {
                    if (scope.tickets[i].name === '') {
                        formValid = false;
                    }
                }
                if (formValid) {
                    ticketFactory.update(scope.event.id, scope.tickets)
                    .then(function () {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.save', error);
                    });
                } else {
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired', null);
                }

            }

            function loadEvent() {
                if (scope.afficher == 'edit') {
                    scope.eventId = parseInt($stateParams.id, 10);
                    eventFactory.get(scope.eventId)
                        .then(function (response) {
                            scope.event = angular.copy(response);
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                        });
                }
            }

            function loadTicketList(eventId) {
                ticketFactory.getList(eventId)
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.tickets = angular.copy(response);
                        scope.isNew = !(scope.tickets.length > 0);
                        if (scope.isNew) {
                            addRowTicket();
                        }
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

        }
    }

})();
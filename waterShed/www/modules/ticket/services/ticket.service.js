(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('ticketFactory', ticketFactory);

    ticketFactory.$inject = ['$q', '$state', 'httpFactory', 'accountFactory', 'globalValues', 'globalFactory','$window'];

    function ticketFactory($q, $state, httpFactory, accountFactory, globalValues, globalFactory, $window) {

        return {
            delete: deleteTicket,
            getList: getListTickets,
            goBack: goBack,
            goTicketEdit: goTicketEdit,
            update: updateTicket
        };

        function deleteTicket(idEvent, idTecket) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event/' + idEvent + '/tickets/' + idTecket;

            httpFactory.HTTP(url, {}, 'DELETE')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getListTickets(eventId) {
            var deferred = $q.defer();
            var dataForm = {};
            var account = globalValues.account;
            var url = account + '/event/' + eventId + '/tickets';

            httpFactory.HTTP(url, dataForm, 'GET')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function goBack() {
            $window.history.back();
        }

        function goTicketEdit(eventId){
            $state.go('private.ticket-edit', {id: eventId});
        }

        function updateTicket(id, dataForm) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event/' + id + '/tickets';

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function () {
                    accountFactory.get()
                        .then(function (response) {
                            if (response.website.correspondenceEmail === null) {
                                $state.go('private.account-edit-help', {help: 'help'});
                            }
                            else {
                                $state.go('private.account.event-view', {id: id});
                            }
                            deferred.resolve(response);
                        })
                        .catch(function () {
                            $state.go('private.account.event-view', {id: id});
                        });
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

    }

})();

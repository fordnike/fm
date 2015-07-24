(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('eventFactory', eventFactory);

    eventFactory.$inject = ['$q', '$window', 'httpFactory', 'globalValues', 'globalFactory', '$filter', '$state', 'userFactory', 'accountFactory'];

    function eventFactory($q, $window, httpFactory, globalValues, globalFactory, $filter, $state, userFactory, accountFactory) {

        var event, eventList;

        return {
            add: addEvent,
            get: getEvent,
            getList: getListEvents,
            goBack: goBack,
            goEventEdit: goEventEdit,
            goEventNew: goEventNew,
            isMerchantAccountSet: isMerchantAccountSet,
            isUserEmailValid: isUserEmailValid,
            publishEvent: publishEvent,
            unpublishEvent: unpublishEvent,
            update: updateEvent
        };

        function addEvent(dataForm) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event';

            dataForm.eventStart=dateToString(dataForm.eventStartDate);

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    var path = response.headers('content-location');
                    var pathSplit = path.split('/');
                    var eventId = pathSplit[4];

                    event = undefined;
                    deferred.resolve(eventId);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getEvent(id) {
            id = parseInt(id, 10);
            var deferred = $q.defer();
            var dataForm = {};
            var account = globalValues.account;

            if (event !== undefined){
                if (event.id === id){
                    deferred.resolve(event);
                    return deferred.promise;
                }
            }

            if (isAccountValid(account)) {
                var url = account + '/event/' + id;

                httpFactory.HTTP(url, dataForm, 'GET')
                    .then(function (response) {
                        var temp=(response.data.eventStart).split("T");
                        var dateLocal= new Date(temp[0]);
                        response.data.eventStart=response.data.eventStart+formatOffsetToHour(dateLocal.getTimezoneOffset());
                        if (!angular.isUndefined(response.data.eventStart)) {
                            response.data.eventStartDate = new Date(response.data.eventStart);
                        }

                        eventListComplement(response.data);

                        event = response.data;
                        deferred.resolve(response.data);
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });

            } else {
                deferred.reject({
                    id: 'shared.error.noAccount'
                });
            }
            return deferred.promise;
        }

        function getListEvents() {
            var deferred = $q.defer();
            var dataForm = {};
            var account = globalValues.account;

            if (isAccountValid(account)) {
                var url = account + '/events';

                httpFactory.HTTP(url, dataForm, 'GET')
                    .then(function (response) {
                        var i;
                        for (i = 0; i < response.data.events.length; i++) {
                            eventListComplement(response.data.events[i]);
                        }

                        deferred.resolve(response.data.events);
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });

            } else {
                deferred.reject({id: 'shared.error.noAccount'});
            }
            return deferred.promise;
        }

        function goBack() {
            $window.history.back();
        }

        function goEventEdit(eventId){
            $state.go('private.account.event-edit', {id: eventId});
        }

        function goEventNew(){
            $state.go('private.account.event-new');
        }

        function publishEvent(id) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event/' + id + '/publish';

            httpFactory.HTTP(url, {}, 'PUT')
                .then(function (response) {
                    event = undefined;
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function unpublishEvent(id) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event/' + id + '/unpublish';

            httpFactory.HTTP(url, {}, 'PUT')
                .then(function (response) {
                    event = undefined;
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function updateEvent(dataForm) {
            var deferred = $q.defer();
            var account = globalValues.account;
            var url = account + '/event/' + dataForm.id;

            dataForm.eventStart=dateToString(dataForm.eventStartDate);

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    event = undefined;
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function isAccountValid(account) {
            if ((account != "undefined") && (account != "")) {
                return true;
            } else {
                return false;
            }
        }

        function formatOffsetToHour(temp){
            temp=temp/60;
            if(temp>0 && temp<10){
                temp='-0'+temp+':00';
                return temp;
            }else{
                if(temp<=0 && temp>-10){
                    temp='+0'+temp+':00';
                    return temp;
                }
            }
            return (temp*-1)+':00';
        }

        function dateToString(date){
            var val="";
            val= $filter('date')( date, "yyyy-MM-ddTHH:mm:ssZ");
            val=(val).substring(0,19);
            return val;
        }

        function eventListComplement(eventTemp){
            if (eventTemp.published) {
                if (!angular.isUndefined(eventTemp.eventStart)) {
                    eventTemp.eventStartDate = new Date(eventTemp.eventStart);
                }

                var myDateEnd = new Date(eventTemp.eventStartDate);
                myDateEnd.setHours(eventTemp.eventStartDate.getHours() + 6);

                if (myDateEnd < Date.now()) {
                    eventTemp.saleState = "event.over";
                    eventTemp.saleStateColor = 'grey';
                } else if (myDateEnd > Date.now() && eventTemp.onsale < Date.now()) {
                    eventTemp.saleState = "event.isOnSale";
                    eventTemp.saleStateColor = 'green';
                } else {
                    eventTemp.saleState = "event.published";
                    eventTemp.saleStateColor = 'yellow';
                }
            }
            else {
                eventTemp.saleState = "event.unpublished";
                eventTemp.saleStateColor = 'red';
            }

        }

        function isMerchantAccountSet() {
            var deferred = $q.defer();

            accountFactory.get()
                .then(function (response) {
                    deferred.resolve(response.merchandAccount.isPaymentMethodConfig || response.merchandAccount.stripe);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function isUserEmailValid(){
            var deferred = $q.defer();

            userFactory.get()
                .then(function (response) {
                    deferred.resolve(response.emailvalid);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

    }

})();

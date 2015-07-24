(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('accountFactory', accountFactory);

    accountFactory.$inject = ['$rootScope', '$q', 'httpFactory', 'globalValues', 'sessionFactory', '$state', 'globalFactory'];

    function accountFactory($rootScope, $q, httpFactory, globalValues, sessionFactory, $state, globalFactory) {

        var account, accountList;

        return {
            changeSubdomain: changeSubdomain,
            get: getAccount,
            getIdClientStripe: getIdClientStripe,
            getList: getListAccounts,
            goAccountEdit: goAccountEdit,
            update: updateAccount,
            connectStripeAccount: connectStripeAccount
        };

        function changeSubdomain(subdomain) {
            sessionFactory.putSync('account', '/admin/' + subdomain, false);
            globalValues.account = '/admin/' + subdomain;
            sessionFactory.putSync('subdomain', subdomain, false);
            globalValues.subdomain = subdomain;
            account = undefined;

            $rootScope.$broadcast('accountChange');
            $state.go('private.account.event-list');
        }

        function getAccount() {
            var deferred = $q.defer();
            var dataForm = {};
            var url = globalValues.account;

            if (account !== undefined){
                if ('/admin/' + account.website.subdomain === globalValues.account){
                    deferred.resolve(account);
                    return deferred.promise;
                }
            }

            if (url !== '') {
                httpFactory.HTTP(url, dataForm, 'GET')
                    .then(function (response) {
                        if (response.data.website.logo.typeImage === null){
                            response.data.website.logo.url = '';
                        }
                        account = response.data;
                        deferred.resolve(response.data);
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });
            }
            else {
                var returnError = {'id': 'shared.error.noAccount'};
                deferred.reject(returnError );
            }
            return deferred.promise;
        }

        function getIdClientStripe() {
            var dataForm = {};
            var url = '/admin/account/' + globalValues.userId + '/payment/stripe/config';
            return httpFactory.HTTP(url, dataForm, 'GET');
        }

        function getListAccounts() {
            var deferred = $q.defer();
            var dataForm = {};
            var url = '/admin/accounts';

            if (accountList !== undefined){
                deferred.resolve(accountList);
                return deferred.promise;
            }

            httpFactory.HTTP(url, dataForm, 'GET')
                .then(function (response) {
                    accountList = response.data.AccountJson;
                    deferred.resolve(response.data.AccountJson);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function goAccountEdit(accountId){
            $state.go('private.account-edit', {id: accountId});
        }

        function updateAccount(dataForm) {
            var deferred = $q.defer();
            var url = globalValues.account + '/account';

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    account = undefined;
                    var url = '/admin/' + dataForm.website.subdomain;
                    sessionFactory.putSync("account", url, false);
                    globalValues.account = url;
                    globalValues.subdomain = dataForm.website.subdomain;

                    $rootScope.$broadcast('accountChange');
                    $state.go('private.account-view');
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function connectStripeAccount(code) {
            var deferred = $q.defer();
            var dataForm = {};
            dataForm.code = code;
            var url =  globalValues.account + '/connectStripe';

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    account = undefined;
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

    }

})();

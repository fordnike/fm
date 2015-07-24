(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltAccountList', wltAccountList);

    wltAccountList.$inject = ['accountFactory', 'globalValues', 'globalFactory', 'configValues'];

    function wltAccountList(accountFactory, globalValues, globalFactory, configValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/account/directives/wlt-account-list/account-list.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: AccountListLink
        };

        return directive;

        function AccountListLink(scope, element, attrs) {
            scope.changeSubdomain = changeSubdomain;
            scope.setSearchMode = setSearchMode;

            scope.showHelp = false;
            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.showSearchBox = false;
            scope.filtered = '';
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('account');

                if (configValues.salesDomain !== null && configValues.salesDomain !== undefined) {
                    scope.domain = configValues.salesDomain;
                } else {
                    scope.domain = configValues.domain;
                }

                accountFactory.getList()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.accounts = angular.copy(response);
                        scope.message = globalFactory.formatMessage('success', 'shared.success.fetch');
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function changeSubdomain(subdomain) {
                accountFactory.changeSubdomain(subdomain);
            }

            function setSearchMode() {
                scope.showSearchBox = !scope.showSearchBox;
                scope.search = '';
            }

        }
    }

})();
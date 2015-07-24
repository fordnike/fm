(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltAccountView', wltAccountView);

    wltAccountView.$inject = ['accountFactory', 'globalValues', 'globalFactory', 'configValues'];

    function wltAccountView(accountFactory, globalValues, globalFactory, configValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/account/directives/wlt-account-view/account-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: AccountViewLink
        };

        return directive;

        function AccountViewLink(scope, element, attrs) {
            scope.goAccountEdit = goAccountEdit;

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

                getAccount();
            }

            function getAccount() {
                accountFactory.get()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.account = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function goAccountEdit(){
                accountFactory.goAccountEdit(scope.account.id);
            }

        }
    }

})();
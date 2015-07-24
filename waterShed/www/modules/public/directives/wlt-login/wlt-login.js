(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLogin', wltLogin);

    wltLogin.$inject = ['authenticationFactory', 'systemValues', 'globalFactory'];

    function wltLogin(authenticationFactory, systemValues, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/public/directives/wlt-login/login.html',
            scope: {},
            link: LoginLink
        };

        return directive;

        function LoginLink(scope, element, attrs) {
            scope.login = login;
            scope.logout = logout;
            scope.goBack = goBack;

            scope.langCurrent = globalFactory.getCurrentLanguage();
            scope.systemValues = systemValues;
            scope.user = {
                "access_token": null
            };
            scope.receivedResponse = false;
            scope.responseSuccess = false;

            init();

            function init() {
                globalFactory.loadTranslation('public');

                authenticationFactory.redirectIfLoggedIn()
                    .then(function (){
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    })
            }

            function login() {
                authenticationFactory.login(angular.copy(scope.user))
                    .then(function () {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function logout() {
                authenticationFactory.logout();
            }

            function goBack(){
                authenticationFactory.goBack();
            }

        }
    }

})();
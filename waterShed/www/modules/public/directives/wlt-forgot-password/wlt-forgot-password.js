(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltForgotPassword', wltForgotPassword);

    wltForgotPassword.$inject = ['systemValues', 'emailService', 'globalFactory', 'authenticationFactory'];

    function wltForgotPassword(systemValues, emailService, globalFactory, authenticationFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/public/directives/wlt-forgot-password/forgot-password.html',
            scope: {},
            link: ForgotPasswordLink
        };

        return directive;

        function ForgotPasswordLink(scope, element, attrs) {
            scope.goBack = goBack;
            scope.sendMail = sendMail;

            scope.langCurrent = globalFactory.getCurrentLanguage();
            scope.systemValues = systemValues;
            scope.user = {
                email: null,
                "access_token": ""
            };

            init();

            function init() {
                globalFactory.loadTranslation('public');
            }

            function goBack() {
                authenticationFactory.goBack();
            }

            function sendMail() {
                var mail = angular.copy(scope.user);
                emailService.resetPasswordRequest(mail.email)
                    .then(function () {
                        $state.go('public.login');
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

        }
    }

})();
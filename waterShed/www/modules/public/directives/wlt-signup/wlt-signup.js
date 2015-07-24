(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltSignup', wltSignup)
         /*  .constant('angularMomentConfig', {
              //  preprocess: 'unix', // optional
                timezone: 'Europe/London' // optional
            });*/

    wltSignup.$inject = ['authenticationFactory', 'systemValues', 'globalFactory','locationFactory','$http','$timeout'];

    function wltSignup(authenticationFactory, systemValues, globalFactory,locationFactory,$http,$timeout) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/public/directives/wlt-signup/signup.html',
            scope: {},
            link: SignupLink
        };
       // angularMomentConfig.timezone='Europe/Paris';
        return directive;

        function SignupLink(scope, element, attrs) {
            scope.goBack = goBack;
            scope.register = register;
            scope.langCurrent = globalFactory.getCurrentLanguage();
            scope.systemValues = systemValues;

            scope.user = {
                "email": null,
                "password": null,
                "passwordConfirm": null,
                "firstname": null,
                "lastname": null
            };
            scope.test = 'test';

            init();

            function init() {
                globalFactory.loadTranslation('public');

            }
            function goBack() {
                authenticationFactory.goBack();
            }


            function register() {
                console.log(scope.user);
                //scope.user.timezone=scope.selectTimeZone;
                authenticationFactory.register(angular.copy(scope.user))
                    .then(function () {
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }
        }
    }

})();
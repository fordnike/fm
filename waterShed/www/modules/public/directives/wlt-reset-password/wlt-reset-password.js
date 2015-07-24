(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltResetPassword', wltResetPassword);

    wltResetPassword.$inject = [];

    function wltResetPassword() {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/public/directives/wlt-reset-password/reset-password.html',
            scope: {},
            link: ResetPasswordLink
        };

        return directive;

        function ResetPasswordLink(scope, element, attrs) {

        }
    }

})();
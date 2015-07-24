(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltChangePassword', wltChangePassword);

    wltChangePassword.$inject = ['userFactory', 'globalFactory'];

    function wltChangePassword(userFactory, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/user/directives/wlt-change-password/changePassword.html',
            scope: {
                message: '=',
                resetFromTokenUrl: '='
            },
            link: ChangePasswordLink
        };

        return directive;

        function ChangePasswordLink(scope, element, attrs) {
            scope.changePassword = changePassword;

            scope.password = {};

            init();

            function init() {
                globalFactory.loadTranslation('user');

                scope.password.token = userFactory.loadPasswordTokenFromUrl(scope.resetFromTokenUrl);
            }

            function changePassword() {
                if (scope.resetFromTokenUrl) {
                    publicChangePassword()
                } else {
                    privateChangePassword()
                }
            }

            function privateChangePassword() {
                if (scope.password.newPassword != scope.password.oldPassword) {
                    if (scope.password.newPassword === scope.password.confirm) {
                        userFactory.changePassword(scope.password)
                            .then(function () {
                                scope.message = globalFactory.formatMessage('success', 'shared.success.update');
                            })
                            .catch(function (error) {
                                scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                            });
                    } else {
                        scope.message = globalFactory.formatMessage('danger', 'user.error.passwordsMustBeSame');
                    }
                } else {
                    scope.message = globalFactory.formatMessage('danger', 'user.error.newVersusOld');
                }
            }

            function publicChangePassword() {
                if (scope.password.newPassword === scope.password.confirm) {
                    userFactory.publicChangePassword(scope.password)
                        .then(function () {
                            scope.message = globalFactory.formatMessage('success', 'shared.success.update');
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                } else {
                    scope.message = globalFactory.formatMessage('danger', 'user.error.passwordsMustBeSame');
                }
            }

        }
    }

})();
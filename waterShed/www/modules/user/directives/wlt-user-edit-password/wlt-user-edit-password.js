(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltUserEditPassword', wltUserEditPassword);

    wltUserEditPassword.$inject = ['userFactory', 'globalFactory', 'globalValues'];

    function wltUserEditPassword(userFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/user/directives/wlt-user-edit-password/user-edit-password.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: UserEditPasswordLink
        };

        return directive;

        function UserEditPasswordLink(scope, element, attrs) {
            scope.updateUser = updateUser;
            scope.cancelUser = cancelUser;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('user');

                getUser();
            }

            function updateUser() {
                if (scope.formProfile.$valid) {
                    userFactory.update(scope.user)
                        .then(function () {
                            scope.message = globalFactory.formatMessage('success', 'shared.success.update');
                        })
                        .catch(function (error) {
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.update', error);
                        });
                } else {
                    angular.forEach(scope.formProfile.$error.required, function (field) {
                        field.$setDirty();
                    });
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired');
                }
            }

            function cancelUser() {
                userFactory.goBack();
            }

            function getUser() {
                userFactory.get()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.user = angular.copy(response);
                        scope.tempEmail = angular.copy(scope.user.email);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

        }
    }

})();
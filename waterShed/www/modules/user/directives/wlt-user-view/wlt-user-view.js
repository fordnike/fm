(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltUserView', wltUserView);

    wltUserView.$inject = ['userFactory', 'globalFactory', 'globalValues'];

    function wltUserView(userFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/user/directives/wlt-user-view/user-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: UserViewLink
        };

        return directive;

        function UserViewLink(scope, element, attrs) {
            scope.goUserEdit = goUserEdit;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('user');

                getUser();
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

            function goUserEdit(userId){
                userFactory.goUserEdit(userId);
            }

        }
    }

})();
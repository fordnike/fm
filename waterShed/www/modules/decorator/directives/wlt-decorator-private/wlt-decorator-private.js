(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltDecoratorPrivate', wltDecoratorPrivate);

    wltDecoratorPrivate.$inject = ['$translate', '$translatePartialLoader', 'authenticationFactory', '$state', '$mdSidenav', 'decoratorFactory', 'systemValues', 'userFactory', 'jwtHelper', 'accountFactory', 'globalValues', 'configValues', 'globalFactory'];

    function wltDecoratorPrivate($translate, $translatePartialLoader, authenticationFactory, $state, $mdSidenav, decoratorFactory, systemValues, userFactory, jwtHelper, accountFactory, globalValues, configValues, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/decorator/directives/wlt-decorator-private/decorator-private.html',
            scope: {},
            link: DecoratorPrivateLink
        };

        return directive;

        function DecoratorPrivateLink(scope, element, attrs) {

            $translatePartialLoader.addPart('decorator');
            $translate.refresh();

            scope.logout = logout;
            scope.toggleLeft = toggleLeft;
            scope.toggleRight = toggleRight;
            scope.close = close;
            scope.getFirstPage = getFirstPage;
            scope.hideMenuItem = hideMenuItem;
            scope.toggleSelect = toggleSelect;
            scope.getClass = getClass;

            scope.langCurrent = $translate.use();
            scope.admin = globalValues.admin;
            scope.account = globalValues.account;
            scope.selectedIndex = -1;
            globalFactory.loadSystemValues();
            scope.systemValues = systemValues;

            var data = globalValues.token;
            var userDecode = jwtHelper.decodeToken(data.access_token);
            userFactory.get(userDecode.id)
                .then(function (response) {
                    scope.firstName = response.firstname;
                    scope.lastName = response.lastname;
                })
                .catch(function () {
                    scope.firstName = '';
                    scope.lastName = '';
                });

            accountFactory.get()
                .then(function (response) {
                    scope.accountName = response.website.boxOfficeName;
                    scope.accountLogo = response.website.logo.url;
                })
                .catch(function () {
                    scope.accountName = '';
                    scope.accountLogo = '';
                });

            decoratorFactory.getDecoratorMenu()
                .then(function (response) {
                    scope.receivedResponse = true;
                    scope.responseSuccess = true;
                    scope.menuLeft = angular.copy(response.menuLeft);
                    scope.menuRight = angular.copy(response.menuRight);
                })
                .catch(function (error) {
                    scope.receivedResponse = true;
                    scope.responseSuccess = false;
                    scope.errorMessage = error;
                });

            scope.$on('accountChange', function () {
                scope.account = globalValues.account;

                accountFactory.get()
                    .then(function (response) {
                        scope.accountName = response.website.boxOfficeName;
                        scope.accountLogo = response.website.logo.url;
                    })
                    .catch(function () {
                        scope.accountName = '';
                        scope.accountLogo = '';
                    });
            });

            function logout() {
                authenticationFactory.logout();
            }

            function hideMenuItem(menu) {
                return ((menu.requireAccount === true) && (scope.account === '')) || ((menu.requireAdmin === true) && (scope.admin != true));
            }

            function toggleLeft() {
                $mdSidenav('left').toggle()
                    .then(function () {
                    });
            }

            function toggleRight() {
                $mdSidenav('right').toggle()
                    .then(function () {
                    });
            }

            function close() {
                $mdSidenav('left').close()
                    .then(function () {
                    });
                $mdSidenav('right').close()
                    .then(function () {
                    });
            }

            function getFirstPage() {
                authenticationFactory.getFirstPage()
                    .then(function (response) {
                        $state.go(response.data);
                    })
                    .catch(function (error) {
                        scope.message = {
                            "updated": new Date(),
                            "type": 'danger',
                            "id": 'shared.error.error',
                            "text": error.data.error.message,
                            "httpStatus": error.status
                        };
                    });

            }


            function toggleSelect(ind, link) {
                //if (link.substr(0, 4) == 'http') {
                //    $window.open(link, '_blank');
                //} else {
                //    $state.go(link);
                //}
                if (ind === scope.selectedIndex) {
                    scope.selectedIndex = -1;
                } else {
                    scope.selectedIndex = ind;
                }
                decoratorFactory.goToItem(link);
                this.close();
            }


            function getClass(ind) {
                if (ind === scope.selectedIndex) {
                    return "decoratorMenuSelected";
                } else {
                    return "";
                }
            }

        }
    }

})();
(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('tabItem', [
            '$stateParams',
            '$http',
            '$compile',
            '$sce',
            '$templateCache',
            TabDirective
        ]);

    function TabDirective($stateParams, $http, $compile, $sce, $templateCache) {
        return {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/components/tab/partial.html',
            scope: {
                title: '@',
                default: '=?',
                template: '@templateurl',
                name: '@',
                state: '@?'
            },
            transclude: true,
            replace: true,
            require: '^tabSet',
            compile: function (elm, attrs, transclude) {
                return function postLink(scope, elm, attrs, tabsCtrl) {
                    // define public methods
                    scope.select = function () {
                        tabsCtrl.select(scope);
                        scope.selected = true;
                        scope._render();
                    }

                    scope.deselect = function () {
                        scope.selected = false;
                    }

                    scope.isActive = function () {
                        return scope.selected === true ||
                            angular.equals(scope.name, $stateParams.step) ||
                            scope.default === true;
                    }
                    // define private methods
                    scope._init = function () {
                        scope.rendered = false;
                        scope.selected = scope.isActive();
                    }
                    // render method for remote tempaltes
                    scope._render = function () {
                        if (!scope.rendered) {
                            if (angular.isDefined(scope.template)) {
                                var tpl = $sce.getTrustedResourceUrl(scope.template);
                                $http.get(tpl, {cache: $templateCache}).then(function (response) {
                                    elm.html(response.data);
                                    $compile(elm.contents())(scope.$parent || scope);
                                }).finally(function () {
                                    scope.rendered = true;
                                });
                            } else {
                                scope.rendered = true;
                            }
                        }
                    }

                    // define destroy event callback
                    scope.$on('$destroy', function () {
                        tabsCtrl.remove(scope);
                    });

                    scope._init();
                    tabsCtrl.add(scope);
                }
            }
        }
    }

})();

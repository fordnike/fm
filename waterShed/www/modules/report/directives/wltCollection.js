(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('collection', function () {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    collection: '='
                },
                template: "<ul><member ng-repeat='member in collection' member='member'></member></ul>"
            }
        })

        .directive('member'['$compile',function ($compile) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    member: '='
                },
                template: "<li>{{member.title}}<a ui-sref='private.reportview({id: member.code})'>  {{member.title}}</a><br>" +
                "{{member.description}}</li>",
                link: function (scope, element, attrs) {
                    if (angular.isArray(scope.member.menus)) {
                        element.append("<collection collection='member.menus'></collection>");
                        $compile(element.contents())(scope)
                    }
                    if (angular.isArray(scope.member.reports)) {
                        element.append("<collection collection='member.reports'></collection>");
                        $compile(element.contents())(scope)
                    }
                }
            }
        }])

})();

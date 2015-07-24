(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltInjectScript', wltInjectScript);
    wltInjectScript.$inject = ['$parse', '$rootScope', '$compile'];
    function wltInjectScript($parse, $rootScope, $compile) {

        var updateScripts = function (element) {
            return function (scripts) {
                element.empty();
                angular.forEach(scripts, function (source, key) {
                    var scriptTag = angular.element(
                        document.createElement("script"));
                    source = "//@ sourceURL=" + key + "\n" + source;
                    scriptTag.text(source)
                    element.append(scriptTag);
                });
            };
        };
        return {
            restrict: 'EA',
            scope: {},
            terminal: true,
            controller: function () {
            },
            link: function (scope, element, attrs) {
                //scope.$watch("scripts", updateScripts(element));
                if (attrs.ngSrc) {
                    var domElem = '<script type="application/javascript" src="'+attrs.ngSrc+'" async defer></script>';
                    element.append($compile(domElem)(scope));
                }

            }
        };
    }

})();
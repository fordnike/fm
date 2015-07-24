(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('langControl',[ 'configValues',function (configValues) {
            return {
                restrict: 'EA',
                template: [
                    '<div class="btn-group pull-right" dropdown>',
                    '	<button type="button" class="btn btn-default">{{selected}}</button>',
                    '	<button type="button" class="btn btn-default dropdown-toggle">',
                    '		<span class="caret"></span>',
                    '	</button>',
                    '	<ul class="dropdown-menu" role="menu">',
                    '		<li ng-repeat="lang in locales"><a href="" ng-click="changeLang(lang)">',
                    '			<span ng-show="selected === lang" class="glyphicon glyphicon-ok"></span>',
                    '			{{lang}}</a>',
                    '		</li>',
                    '	</ul>',
                    '</div>'
                ].join(''),
                // link: function(scope, el, attrs) {
                // 	scope.locales = configValues.locales;
                // 	scope.selected = configValues.defaultLocale;
                // },
                scope: {},
                link: function (scope) {
                    scope.locales = configValues.locales;

                    scope.changeLang = function (lang) {
                        if (scope.selected !== lang) {
                            scope.$emit('language:change', lang);
                            scope.selected = lang;
                        }
                    }

                }
            }
        }]);

})();

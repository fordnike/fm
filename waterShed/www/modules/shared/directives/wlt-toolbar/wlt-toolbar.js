(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltToolbar', wltToolbar);

    wltToolbar.$inject = ['globalValues'];

    function wltToolbar(globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/wlt-toolbar/toolbar.html',
            scope: {
                showType: '@showType',
                title: '@title',
                toggleLeft:'&toggleLeft',
                toggleRight:'&toggleRight',
                setSearch:'&setSearch',
                showSearch: '@showSearch',
                cancel:'&cancel',
                save:'&save'
                },
            link: ToolbarLink
        };

        return directive;

        function ToolbarLink(scope, element, attrs) {
            scope.subdomain = globalValues.subdomain;
            scope.admin = globalValues.admin;
        }
    }

})();
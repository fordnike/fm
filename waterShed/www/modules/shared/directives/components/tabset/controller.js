(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .controller('TabSetController', [
            '$scope',
            TabSetController
        ]);

    function TabSetController($scope) {
        var ctrl = this,
            tabs = $scope.tabs = [];

        // deselect all tabs less selected tab
        ctrl.select = function (selectedTab) {
            angular.forEach(tabs, function (tab) {
                if (!angular.equals(selectedTab, tab)) {
                    tab.deselect();
                }
            });
        }

        ctrl.add = function (tab) {
            tabs.push(tab);
            if (tab.isActive()) {
                tab.select(tab);
            }
        }

        ctrl.remove = function (tab) {
            var index = tabs.indexOf(tab);
            if (tab.isActive() && tabs.length > 1) {
                var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        }
    }

})();

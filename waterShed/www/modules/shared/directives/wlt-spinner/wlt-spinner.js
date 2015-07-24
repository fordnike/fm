(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltSpinner', wltSpinner);
    wltSpinner.$inject = [];
    function wltSpinner() {
        return {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/wlt-spinner/spinner.html'
        };
    }

})();

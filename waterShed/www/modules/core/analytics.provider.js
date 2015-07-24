(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$analyticsProvider', function ($analyticsProvider) {
            $analyticsProvider.settings.ga.additionalAccountNames = ['feq'];
            $analyticsProvider.virtualPageviews(false);
        }]);

})();

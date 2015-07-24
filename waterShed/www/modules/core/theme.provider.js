(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$mdThemingProvider',function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('orange', {
                    'default': '900', // by default use shade 700 from the red palette for primary intentions
                    'hue-2': '900'
                })
                .accentPalette('grey')
                .warnPalette('grey')
                .backgroundPalette('grey');
            $mdThemingProvider.theme('red')
                .primaryPalette('red', {
                    'default': '900', // by default use shade 700 from the red palette for primary intentions
                    'hue-2': '900'
                })
                .accentPalette('grey')
                .warnPalette('grey')
                .backgroundPalette('grey');
            $mdThemingProvider.theme('blue')
                .primaryPalette('blue', {
                    'default': '900', // by default use shade 700 from the red palette for primary intentions
                    'hue-2': '900'
                });
            $mdThemingProvider.theme('green')
                .primaryPalette('green', {
                    'default': '900', // by default use shade 700 from the red palette for primary intentions
                    'hue-2': '900'
                });
            $mdThemingProvider.alwaysWatchTheme(true);
        }]);

})();

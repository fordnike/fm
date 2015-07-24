(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$translateProvider', '$provide', '$translatePartialLoaderProvider', function ($translateProvider, $provide, $translatePartialLoaderProvider) {
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: '/{part}/translations/{lang}.translation.json'
            });
            // Tell the module what language to use by default
            $translateProvider.preferredLanguage('en');
            // Generic translations
            $translatePartialLoaderProvider.addPart('shared');
        }]);

})();

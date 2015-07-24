(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'http://localhost:9001',
            locales: ['en', 'fr', 'pl', 'cs'],
            defaultLocale: 'en',
            widget: false,
            systemValues: 'wlt',
            domain: ':8080/darwin'
        });

})();

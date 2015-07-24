(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'https://api.9tix.com',
            locales: ['en', 'fr', 'pl', 'cs'],
            defaultLocale: 'en',
            widget: false,
            systemValues: 'wlt',
            domain: '9tix.com'
        });

})();


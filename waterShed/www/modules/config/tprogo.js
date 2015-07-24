(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'https://api.9tix.com',
            locales: ['en', 'fr', 'pl'],
            defaultLocale: 'en',
            widget: false,
            systemValues: 'tprogo',
            domain: '9tix.com'
        });

})();

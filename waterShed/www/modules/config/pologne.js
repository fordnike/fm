(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'https://api.wlt-pl.com',
            locales: ['en', 'pl'],
            defaultLocale: 'pl',
            widget: false,
            systemValues: 'poland',
            domain: 'wlt-pl.com'
        });

})();

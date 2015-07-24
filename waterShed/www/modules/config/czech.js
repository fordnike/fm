(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'https://api.wlt-cz.com',
            locales: ['en', 'cs'],
            defaultLocale: 'en',
            widget: false,
            systemValues: 'czech',
            domain: 'wlt-cz.com'
        });

})();

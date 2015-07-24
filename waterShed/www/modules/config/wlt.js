(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('configValues', {
            backend: 'https://api.whitelabeltickets.com',
            locales: ['en', 'fr'],
            defaultLocale: 'en',
            widget: false,
            systemValues: 'wlt',
            domain: 'whitelabeltickets.com',
            salesDomain: 'wltix.com'
        });

})();

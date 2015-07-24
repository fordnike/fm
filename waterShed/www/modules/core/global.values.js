(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('globalValues', {
            account: '',
            token: '',
            admin: 'false',
            userId: '',
            subdomain: '',
            merchandAccount:''
        });
})();


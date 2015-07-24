(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .value('constants',
        {
            permission:{
                ACHATRAPIDE:2,
                ACHATPRODUITS:3,
                ACHATPOSTES:4,
                ADMIN_FULL:100
            }
        });
})();
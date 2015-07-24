(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** ACCOUNT ****/
                .state('private.account-list', {
                    url: '/accounts',
                    template: '<wlt-account-list toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-account-list>',
                    onEnter:['$state' ,'globalValues' ,function($state ,globalValues){
                        try {
                       // console.log(globalValues.admin);
                            if(!globalValues.admin){
                                $state.go('public.login');
                            }
                        }
                        catch(err) {
                            console.log(err.message);

                        }
                    }]

                })
                .state('private.account-view', {
                    url: '/account',
                    template: '<wlt-account-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-account-view>'
                })
                .state('private.account-edit', {
                    url: '/account/edit',
                    template: '<wlt-account-edit></wlt-account-edit>'
                })
                .state('private.account-edit-help', {
                    url: '/account/edit/:help',
                    template: '<wlt-account-edit ></wlt-account-edit>'
                })

        }]);

})();

(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('decoratorFactory', decoratorFactory);

    decoratorFactory.$inject = ['$q', 'configValues', 'globalValues', '$window', 'httpFactory', 'globalFactory', '$state'];

    function decoratorFactory($q, configValues, globalValues, $window, httpFactory, globalFactory, $state) {
        var domain = (configValues.backend).replace("https://api.", "");
        var urlReports = "https://admin." + domain + "/rapport/dashboard.html";
        //var urlReports = "https://webreports." + domain + "/rapport/dashboard.html?access_token=" + globalValues.token.access_token;
        return {
            getDecoratorMenu: getDecoratorMenu,
            goToItem: goToItem
        };

        function getDecoratorMenu() {
            var deferred = $q.defer();
            var decoratorMenus =
            {
                "menuLeft": [
                    {
                        "title": "decorator.accounts",
                        "link": "private.account-list",
                        "icon": "home",
                        "requireAccount": false,
                        "requireAdmin": true
                    },
                    {
                        "title": "decorator.events",
                        "link": "private.account.event-list",
                        "icon": "group",
                        "requireAccount": true,
                        "requireAdmin": false
                    },
                    {
                        "title": "decorator.scan",
                        "link": "private.scan-view",
                        "icon": "group",
                        "requireAccount": true,
                        "requireAdmin": false
                    },
                    {
                        "title": "decorator.locations",
                        "link": "private.account.location-list",
                        "icon": "place",
                        "requireAccount": true,
                        "requireAdmin": true
                    },
                    {
                        "title": "decorator.reports",
                        "link": urlReports,
                        "icon": "assessment",
                        "requireAccount": false,
                        "requireAdmin": false
                    },
                    //{
                    //    "title": "decorator.reports",
                    //    "link": "private.report-list",
                    //    "icon": "report",
                    //    "requireAccount": false,
                    //    "requireAdmin": true
                    //},
                    {
                        "title": "decorator.account",
                        "icon": "settings",
                        "link": "private.account-view",
                        "requireAccount": true,
                        "requireAdmin": false
                    }
                ],
                "menuRight": [
                    {
                        "title": "decorator.userProfile",
                        "icon": "person",
                        "link": "private.user-view",
                        "requireAccount": false,
                        "requireAdmin": false
                    },
                    {
                        "title": "decorator.changePassword",
                        "icon": "lock",
                        "link": "private.changePassword",
                        "requireAccount": false,
                        "requireAdmin": false
                    }
                ]
            };
            deferred.resolve(decoratorMenus);

            return deferred.promise;
        }

        function goToItem(link){
            var deferred = $q.defer();
            if (link.substr(0, 4) == 'http') {
                //$window.open(link, '_blank');

                httpFactory.HTTP(link, {}, 'GET')
                    .then(function (response) {
                        $window.open(link, '_self');

                        deferred.resolve(response);
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });
                return deferred.promise;

                //$window.open(link, '_blank');
            } else {
                $state.go(link);
            }
        }

    }

})();

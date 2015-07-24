(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .run(runBlock);

    runBlock.$inject = ['$ionicPlatform','$rootScope', '$http', 'globalValues', '$q', 'jwtHelper', 'userFactory', 'sessionFactory', '$translate', 'tmhDynamicLocale', 'securityFactory'];

    function runBlock($ionicPlatform,$rootScope, $http, globalValues, $q, jwtHelper, userFactory, sessionFactory, $translate, tmhDynamicLocale, securityFactory) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
        //load language in session storage if any
        var sessionLanguage = sessionFactory.getSync('language', false);
        if (sessionLanguage !== null) {
            $translate.use(sessionLanguage);
            var localeValue;
            switch(sessionLanguage) {
                case 'fr':
                    localeValue = 'fr-ca';
                    break;
                case 'pl':
                    localeValue = 'pl';
                    break;
                default:
                    localeValue = 'en-us';
            }
            tmhDynamicLocale.set(localeValue);
        }

        //load account in session storage if any
        var sessionAccount = sessionFactory.getSync('account', false);
        if (sessionAccount !== null) {
            globalValues.account = sessionAccount;
        }

        //load subdomain is session storage if any
        var sessionSubdomain = sessionFactory.getSync('subdomain', false);
        if (sessionSubdomain !== null) {
            globalValues.subdomain = sessionSubdomain;
        }

        //load token in session storage if any, along with userId and language
        var sessionToken = sessionFactory.getSync('token', false);
        if ( (sessionToken !== null) && (sessionToken !== undefined) ) {
            globalValues.token = sessionToken;
            $http.defaults.headers.common.Authorization = 'Bearer ' + globalValues.token.access_token;  // jshint ignore:line
            /* jshint ignore:start */
            var userDecode = jwtHelper.decodeToken(sessionToken.access_token);
            globalValues.userId = userDecode.id;

            /* jshint ignore:end */
            var deferred = $q.defer();
            userFactory.get(globalValues.userId)
                .then(function (response){
                    var user = angular.copy(response);
                    if (user.language !== '') {
                        $translate.use(user.language);
                        sessionFactory.putSync('language', user.language, false);
                    }
                    deferred.resolve(response);
                })
                .catch(function(error){
                    deferred.reject(error);
                });
        }

        //load admin in session storage if any
        var sessionAdmin = sessionFactory.getSync('admin', false);
        if (sessionAdmin !== null) {
            globalValues.admin = sessionAdmin;
        }

        $rootScope.$on('$stateChangeStart', function (event, to, toParams) {
            $rootScope.$state = to;
            $rootScope.$scopeParams = toParams;
            securityFactory.redirectAccess(event, to, toParams);
        });
    }

})();

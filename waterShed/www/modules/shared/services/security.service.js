(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('securityFactory', securityFactory);

    securityFactory.$inject = ['globalValues', '$http', 'oauthFactory', '$state', 'previousStateFactory'];

    function securityFactory(globalValues, $http, oauthFactory, $state, previousStateFactory) {
        return {
            isRequiredAuth: isRequiredAuth,
            redirectAccess: redirectAccess

        };

        function redirectAccess(event, to, toParams) {

            var isAuthenticated = oauthFactory.isAuthenticated();
            if (isRequiredAuth(to) && !isAuthenticated) {
                previousStateFactory.memo('loginRequire', to, toParams);
                event.preventDefault();
                setHttpHeadersForServerRequests();
                $state.go('public.login');
            } else if (isAuthenticated) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + oauthFactory.getAuthenticationToken();

            }
        }

        function setHttpHeadersForServerRequests() {
            $http.defaults.headers.common.Authorization = 'Bearer ' + globalValues.token.access_token;  // jshint ignore:line
        }

        function isRequiredAuth(to) {
            if (!isStructureValid(to)) return false;
            if (!angular.isDefined(to.data.auth)) return false;
            return to.data.auth;
        }

        function isStructureValid(to) {
            if (to == null) return false;
            if (angular.isUndefined(to.data)) return false;
            return true;
        }

    }

})();

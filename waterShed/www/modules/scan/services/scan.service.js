(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('scanFactory', scanFactory);

    scanFactory.$inject = ['$q', '$window', '$state', 'httpFactory', 'sessionFactory', 'jwtHelper', 'globalValues', 'globalFactory', '$translate'];

    function scanFactory($q, $window, $state, httpFactory, sessionFactory, jwtHelper, globalValues, globalFactory, $translate) {

        return {

            get: getUser
         
        };


        function getUser() {
            var deferred = $q.defer();
            var token = sessionFactory.getSync("token", false);
            if (token !== null) {
                var userDecode = jwtHelper.decodeToken(token.access_token);
                var userId = userDecode.id;
                if ((userId !== 'undefined') && (userId > 0)) {

                    var url = '/admin/user/' + userId;
                    var dataForm = {};
                    httpFactory.HTTP(url, dataForm, 'GET')
                        .then(function (response) {
                            deferred.resolve(response.data);
                        })
                        .catch(function (error) {
                            deferred.reject(globalFactory.formatError(error));
                        });
                }
                else {
                    deferred.reject({'id': 'shared.error.error'});
                }
            }
            else {
                deferred.reject({'id': 'shared.error.error'});
            }
            return deferred.promise;
        }



    }

})();

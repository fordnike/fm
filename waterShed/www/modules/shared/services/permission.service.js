(function () {
    'use strict';
    angular
        .module('nodiumApp')
        .factory('permissionFactory', permissionFactory);

    permissionFactory.$inject = ['constants', 'jwtHelper', 'globalValues'];

    function permissionFactory(constants, jwtHelper, globalValues) {
        return {
            userRight: userRight,
            isAdminFull: isAdminFull
        };

        function isAdminFull() {
            return userRight(constants.permission.ADMIN_FULL);
        }

        function userRight(Right) {
            try {
                var sessionToken = globalValues.token;
                var userDecode = jwtHelper.decodeToken(sessionToken.access_token);
                var dd = atob(userDecode.per);
                var s = "";
                for (var i = 0; i < dd.length; i++) {
                    var b = parseInt(dd.charCodeAt(i), 10).toString(2);
                    while (b.length != 8) {
                        b = "0" + b;
                    }
                    s += b.split("").reverse().join("");
                }
                console.log(s.charAt(Right) == 1);
                return (s.charAt(Right) == 1);
            }
            catch (err) {
                return false;
            }

        }
    }
})();
'use strict';

angular
    .module('nodiumApp')
    .factory('sessionFactory', sessionFactory);

sessionFactory.$inject = ['$http', '$q'];

function sessionFactory($http, $q) {
    // Case where localStorage nor sessionStorage is not supported by browser,
    // save key-value pairs in 'sessions' private storage
    var session = {};

    var storeLoadSync = function (key, persistent) {
        var storeMethod = persistent === true ? localStorage : sessionStorage;
        var value = null, read;
        try {
            read = storeMethod.getItem(key);
            if (read === null) {
                // will be return undefined when key not be found
                if (key in session) {
                    value = session[key];
                }
            } else {
                session[key] = angular.fromJson(read);
                value = session[key];
            }
        } catch (err) {
        }

        return value;
    };

    /**
     * sessionFactory.get(key, data, persist)
     * key
     * data
     * persist (optionnal) if true, use localstorage instead of sessionstorage
     */
     var storeSaveSync = function (key, data, persistent) {
        var storeMethod = sessionStorage;
        if (persistent) {
            storeMethod = localStorage;
        }
        if (!key) {
            throw('key is missing');
        }
        session[key] = data;
        storeMethod.setItem(key, angular.toJson(data));
    };

    /**
     * sessionFactory.destroy()
     * remove all memory objects from session clear localStorage and sessionStorage
     */
    var destroy = function () {
        session = {};
        localStorage.clear();
        sessionStorage.clear();
    };

    return {
        //get: storeload,  // Never async
        getSync: storeLoadSync,
        //put: storesave,  // Never async
        putSync: storeSaveSync,
        destroy: destroy

    };
}

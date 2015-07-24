(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('authenticationFactory', authenticationFactory);

    authenticationFactory.$inject = ['$q', 'httpFactory', 'sessionFactory', 'jwtHelper', 'userFactory', 'eventFactory', '$http', 'globalValues', '$state', 'previousStateFactory', '$window', 'globalFactory', 'permissionFactory'];

    function authenticationFactory($q, httpFactory, sessionFactory, jwtHelper, userFactory, eventFactory, $http, globalValues, $state, previousStateFactory, $window, globalFactory, permissionFactory) {
        return {
            goBack: goBack,
            login: login,
            logout: logout,
            redirectIfLoggedIn: redirectIfLoggedIn,
            register: register
        };

        function goBack() {
            $window.history.back();
        }

        function login(credentials) {
            var deferred = $q.defer();
            var url = '/oauth/token';

            angular.extend(credentials, {
                'grant_type': 'password',
                'client_id': 'Orpheus',
                'use_refresh_token': true,
                'language': "en"
            });

            httpFactory.HTTP(url, credentials, 'POST')
                .then(function (response) {
                    var deferred = $q.defer();
                    sessionFactory.putSync('token', response.data);
                    globalValues.token = response.data;
                    var userDecode = jwtHelper.decodeToken(response.data.access_token);
                    globalValues.userId = userDecode.id;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;  // jshint ignore:line
                    globalValues.admin = permissionFactory.isAdminFull();
                    sessionFactory.putSync('admin', globalValues.admin);
                    userFactory.loadUserAccount(globalValues.userId)
                        .then(function (response) {
                            var to = previousStateFactory.get('loginRequire');
                            if (to) {
                                $state.go(to.state.name, to.stateParams);
                            } else {
                                getFirstPage()
                                    .then(function (response) {
                                        $state.go(response);
                                        deferred.resolve(response);
                                    })
                                    .catch(function (error) {
                                        deferred.reject(globalFactory.formatError(error));
                                    });
                            }
                        })
                        .catch(function (error) {
                            deferred.reject(globalFactory.formatError(error));
                        });

                })
                .catch(function (error) {

                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function logout() {
            sessionFactory.destroy();
            globalValues.account = '';
            globalValues.token = '';
            globalValues.admin = 'false';
            globalValues.userId = '';
            $state.go('public.login');
        }

        function redirectIfLoggedIn() {
            var deferred = $q.defer();
            if (globalValues.token !== '') {
                getFirstPage()
                    .then(function (response) {
                        $state.go(response);
                        deferred.resolve(response);
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });
            }
            else {
                deferred.resolve('success');
            }
            return deferred.promise;
        }

        function register(data) {
            var deferred = $q.defer();
            /* var dataForm = {
             email: data.email,
             password: data.password,
             firstname: data.firstname,
             lastname: data.lastname
             }*/
            ;

            var url = '/admin/accounts';

            httpFactory.HTTP(url, data, 'POST')
                .then(function () {
                    var credentials = {
                        access_token: null,
                        password: data.password,
                        username: data.email
                    };
                    login(credentials)
                        .then(function (response) {
                            getFirstPage()
                                .then(function (response) {
                                    $state.go(response);
                                    deferred.resolve(response);
                                })
                                .catch(function (error) {
                                    deferred.reject(globalFactory.formatError(error));
                                });
                        })
                        .catch(function (error) {
                            deferred.reject(globalFactory.formatError(error));
                        });
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getFirstPage() {
            var deferred = $q.defer();
            var admin = globalValues.admin;

            if (admin) {
                deferred.resolve('private.account-list');
            }
            else {
                eventFactory.getList()
                    .then(function (response) {
                        if (response.length === 0) {
                            deferred.resolve('private.tutorial');
                        } else {
                            deferred.resolve('private.account.event-list')
                        }
                    })
                    .catch(function (error) {
                        deferred.reject(globalFactory.formatError(error));
                    });
            }
            return deferred.promise;
        }

    }

})();

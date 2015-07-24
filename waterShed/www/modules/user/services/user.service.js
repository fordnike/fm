(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$q', '$window', '$state', 'httpFactory', 'sessionFactory', 'jwtHelper', 'globalValues', 'globalFactory', '$translate'];

    function userFactory($q, $window, $state, httpFactory, sessionFactory, jwtHelper, globalValues, globalFactory, $translate) {

        return {
            changePassword: changePassword,
            get: getUser,
            goBack: goBack,
            goUserEdit: goUserEdit,
            isEmailExisting: isEmailExisting,
            loadUserAccount: loadUserAccount,
            loadPasswordTokenFromUrl: loadPasswordTokenFromUrl,
            publicChangePassword: publicChangePassword,
            emailValidationRequest: emailValidationRequest,
            update: updateUser
        };

        function changePassword(dataForm) {
            var deferred = $q.defer();
            var url = '/admin/user/' + globalValues.userId + '/change-password';

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

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

        function goBack() {
            $window.history.back();
        }

        function goUserEdit(userId){
            $state.go('private.user-edit', {id: userId});
        }

        function isEmailExisting(email) {
            var deferred = $q.defer();
            var dataForm = {};
            dataForm.email = email;
            var url = '/admin/user/' + globalValues.userId + '/email/email-existing';

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    deferred.resolve(response.data.isEmailExisting);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function loadUserAccount(id) {
            var deferred = $q.defer();
            this.get(id)
                .then(function (response) {
                    var user = angular.copy(response);
                        sessionFactory.putSync('account', user.account);
                        globalValues.account = user.account;

                    if (user.language !== '') {
                        $translate.use(user.language);
                        sessionFactory.putSync('language', user.language, false);
                    }
                    deferred.resolve(response);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function loadPasswordTokenFromUrl(val) {
            var passwordToken = '';
            if (val) {
                var url = $window.location.href;
                passwordToken = getVariableFromUrl("?tokenEmail=", url);
            }
            return passwordToken;
        }

        function publicChangePassword(dataForm) {
            var deferred = $q.defer();
            var url =  '/admin/reset-password-request';

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    $state.go('public.login');
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function emailValidationRequest(email) {
            var deferred = $q.defer();
            isEmailExisting(email)
                .then(function (response) {
                    if (!response) {
                        var dataForm = {};
                        dataForm.email = email;
                        var url = '/admin/user/' + globalValues.userId + '/email-validation-request';

                        httpFactory.HTTP(url, dataForm, 'POST')
                            .then(function (response) {
                                deferred.resolve(response.data);
                            })
                            .catch(function (error) {
                                deferred.reject(globalFactory.formatError(error));
                            });
                    } else {
                        deferred.reject({id: 'user.error.emailAlreadyExists'});
                    }
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function updateUser(data) {
            var deferred = $q.defer();
            var dataForm = data;
            var url = '/admin/user/' + data.id;

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    $state.go('private.user-view');
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getVariableFromUrl(val, url) {
            var temp = "";
            var res = url.split(val);
            if (res.length > 1) {
                var code = res[1].split("/#");
                temp = code[0];
            }
            return temp;
        }

    }

})();

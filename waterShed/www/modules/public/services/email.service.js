(function () {
    'use strict';
    angular
        .module('nodiumApp')
        .factory('emailService', emailService);

    emailService.$inject = ['httpFactory', '$q', 'globalFactory'];

    function emailService(httpFactory, $q, globalFactory) {

        return {
            emailValidation: emailValidation,
            resetPasswordRequest: resetPasswordRequest
        };

        function emailValidation(token) {
            var deferred = $q.defer();
            var url = '/admin/email-validation';
            var dataForm = {};
            dataForm.token = token;

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function resetPasswordRequest(email) {
            var deferred = $q.defer();
            var url = '/admin/reset-password-request';
            var dataForm = {};
            dataForm.email = email;

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

    }
})();
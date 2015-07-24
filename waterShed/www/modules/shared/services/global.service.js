(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('globalFactory', globalFactory);

    globalFactory.$inject = ['$translate', '$translatePartialLoader', 'httpFactory', 'configValues', 'systemValues'];

    function globalFactory($translate, $translatePartialLoader, httpFactory, configValues, systemValues) {
        return {
            formatError: formatError,
            formatMessage: formatMessage,
            loadTranslation: loadTranslation,
            loadSystemValues: loadSystemValues,
            getCurrentLanguage: getCurrentLanguage,
            isNullUndefinedEmpty:isNullUndefinedEmpty
        };

        function formatError(error)
        {
            var formattedError = {
                'message': '',
                'status': ''
            };

            if (error !== undefined && error !== null) {
                if (error.data !== undefined && error.data !== null) {
                    if (error.data.error !== undefined && error.data.error !== null) {
                        if (error.data.error.message !== undefined && error.data.error.message !== '') {
                            formattedError.message = error.data.error.message;
                        }
                    }
                    else {
                        if (error.data !== ''){
                            formattedError.message = error.data;
                        }
                    }
                }
                if (error.status != undefined) {
                    formattedError.status = error.status;
                }
            }
            return formattedError;
        }

        function formatMessage(type, id, error)
        {
            var formattedMessage = {
                updated: new Date(),
                "type": type,
                "id": id,
                "text": '',
                "status": ''
            };

            if (error != undefined && error != null ) {
                if (error.id != undefined) {
                    formattedMessage.id = error.id;
                }

                if (error.status != undefined) {
                    formattedMessage.status = error.status;
                }

                if (error.message != undefined) {
                    formattedMessage.text = error.message;
                }
            }

            return formattedMessage;

        }

        function loadTranslation(module)
        {
            $translatePartialLoader.addPart(module);
            $translate.refresh();

            return true;
        }

        function getCurrentLanguage()
        {
            return ($translate.use());
        }

        function loadSystemValues() {
            //override system values with shared config
            var url = '/shared/config/' + configValues.systemValues + '.config.json';
            httpFactory.HTTP(url, {}, 'GET')
                .then(function (response) {
                    systemValues.theme = response.data.theme;
                    systemValues.logo = response.data.logo;
                    systemValues.companyName = response.data.companyName;
                    systemValues.showTagLine = response.data.showTagLine;
                });
        }
        function isNullUndefinedEmpty(val){
            return angular.isUndefined(val) || val==null || val==='';
        }
        function isEmpty(val){
            return val=="";
        }


    }

})();


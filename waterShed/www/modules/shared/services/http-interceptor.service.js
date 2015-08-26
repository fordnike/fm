(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('httpInterceptorFactory', httpInterceptorFactory);

    httpInterceptorFactory.$inject = ['$location', 'configValues', '$translate'];

    function httpInterceptorFactory($location, configValues, $translate) {

        return {
            request: request
        };

        function request(config) {

               if (isModuleConfigCall(config.url)) {
                   config.url = 'modules' + config.url;
                   console.log("modules :"+config.url);
               } else if (isBackEndOrMockCall(config.url)) {

                   var host = $location.host();
                   if (isLocalhost(host)) {
                       config.url = 'mock' + config.url + '.json';
                       console.log("mock :"+config.url);
                     /*  config.url = configValues.backend + config.url;
                       config.url = addUrlParam(config.url, {
                           language: $translate.use()
                       });*/
                       console.log("host :"+config.url);
                   } else if (!isLocalhost(host)) {
                       config.url = configValues.backend + config.url;
                       config.url = addUrlParam(config.url, {
                           language: $translate.use()
                       });
                       console.log("host :"+config.url);
                   }
               }

            return config;
        }

        //functional groups
        function isModuleConfigCall(url) {
            return (isTranslationCall(url) || isConfigCall(url));
        }

        function isBackEndOrMockCall(url){
            return (!isHtmlCall(url) && !isModuleConfigCall(url)  && !isHttps(url));
        }


        //unit tests
        function isTranslationCall(url) {
            return /.*\.translation\.json/i.test(url);
        }

        function isConfigCall(url) {
            return /.*\.config\.json/i.test(url);
        }

        function isHtmlCall(url) {
            return /.*\.html/i.test(url);
        }

        function isLocalhost(host) {
            return host === 'localhost' || host === '0.0.0.0' || host === '127.0.0.1';
        }

        function isTemplateCall(url) {
            return (/.*\.tpl\.html/i.test(url) || /^template\/.+\.html$/i.test(url));
        }
        function isHttps(url){
            return (/^https/i.test(url));
        }

        //other functions
        function addUrlParam(url, params) {
            for (var node in params) {
                // we check for...[param]=[fr|en|sp]...
                var regex = new RegExp('[^a-z]' + node + '=[^&]+', 'gi');
                if (regex.test(url)) {
                    //url is okay
                } else {
                    // add '?' or '&' based on existing url
                    url += url.indexOf('?') === -1 ? '?' : '&';
                    // then add key [clé]=[value]
                    url += node + '=' + params[node];
                }
            }
            return url;
        }

    }

})();

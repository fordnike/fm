(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLanguage', wltLanguage);

    wltLanguage.$inject = [];

    function wltLanguage() {
        return {
            restrict: 'EA',
            templateUrl: 'modules/shared/directives/wlt-language/language.html',
            scope: {
                langCurrent: '=langCurrent',
                showLabel: '=showLabel'
            },
            controller: LanguageController
        };
    }

    LanguageController.$inject = ['$scope', '$translate', 'sessionFactory', 'configValues', 'tmhDynamicLocale'];

    function LanguageController($scope, $translate, sessionFactory, configValues, tmhDynamicLocale) {

        $scope.languages = configValues.locales;

        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            $translate.refresh();
            var localeValue;
            switch(langKey) {
                case 'fr':
                    localeValue = 'fr-ca';
                    break;
                case 'pl':
                    localeValue = 'pl';
                    break;
                case 'cs':
                    localeValue = 'cs-cz';
                    break;
                default:
                    localeValue = 'en-us';
            }
            tmhDynamicLocale.set(localeValue);
            sessionFactory.putSync('language', langKey, false);
            $scope.$broadcast('langChange');
        };

    }
})();
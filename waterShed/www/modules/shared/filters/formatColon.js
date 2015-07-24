(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .filter('formatColon', [function () {
            return function (text, lang) {
                if (lang == "fr") {
                    return " :";
                } else {
                    return ":";
                }
            };
        }]);

})();

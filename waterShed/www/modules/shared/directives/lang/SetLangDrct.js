(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('setlang', function () {
            return {
                restrict: 'EA',
                replace: 'true',
                template: '<div >  <h1> test</h1></div>'

            };
        });

})();

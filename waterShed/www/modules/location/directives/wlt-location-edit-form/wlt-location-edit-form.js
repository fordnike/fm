(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltLocationEditForm', wltLocationEditForm);

    wltLocationEditForm.$inject = ['globalFactory'];

    function wltLocationEditForm(globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/location/directives/wlt-location-edit-form/location-edit-form.html',
            scope: {
                location: "=location",
                formLocationUpdate: "=formLocationUpdate"
            },
            link: LocationEditFormLink
        };

        return directive;

        function LocationEditFormLink(scope, element, attrs) {

            init();

            function init() {
                globalFactory.loadTranslation('location');
            }
        }
    }

})();
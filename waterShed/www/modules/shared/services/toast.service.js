(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('toastFactory', toastFactory);

    toastFactory.$inject = ['$mdToast', '$translate'];

    function toastFactory($mdToast, $translate) {

        return {
            getToastPosition: getToastPosition,
            showToast: showToast
        };

        function getToastPosition() {

            var toastPosition = {
                bottom: true,
                    top: false,
                    left: true,
                    right: true
            };

            return Object.keys(toastPosition)
                .filter(function (pos) {
                    return toastPosition[pos];
                })
                .join(' ');
        }

        function showToast(messageId) {
            $translate(messageId)
                .then( function(message){
                    $mdToast.show(
                        $mdToast.simple()
                            .content(message)
                            .position(getToastPosition())
                            .hideDelay(1000)
                    );
                })
                .catch( function( error ){

                });
        }

    }

})();

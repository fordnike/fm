(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltScanView', wltScanView);

    wltScanView.$inject = [ 'globalFactory', 'globalValues','$cordovaBarcodeScanner'];

    function wltScanView( globalFactory, globalValues,$cordovaBarcodeScanner) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/scan/directives/wlt-scan-view/scan-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: ScanViewLink
        };

        return directive;

        function ScanViewLink(scope, element, attrs) {


            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.scanResult="";
            init();

            function init() {
                globalFactory.loadTranslation('user');

            }
            scope.scan=function(){
                alert("afficher Barcode Scanner");
                document.addEventListener("deviceready", function () {
                    $cordovaBarcodeScanner
                        .scan()
                        .then(function(barcodeData) {
                            // Success! Barcode data is here
                            scope.scanResult=barcodeData;
                            alert(angular.toJson(barcodeData));
                        }, function(error) {
                            // An error occurred
                            alert(error);
                        });


                    // NOTE: encoding not functioning yet
                   /*  $cordovaBarcodeScanner
                     .encode(BarcodeScanner.Encode.TEXT_TYPE, "http://www.nytimes.com")
                     .then(function(success) {
                     // Success!
                     }, function(error) {
                     // An error occurred
                     });*/

                }, false);

            };
        }
    }

})();
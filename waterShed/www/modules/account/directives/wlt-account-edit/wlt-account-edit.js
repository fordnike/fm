(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltAccountEdit', wltAccountEdit);

    wltAccountEdit.$inject = ['accountFactory', 'globalValues', '$window', '$stateParams', 'globalFactory', 'configValues'];

    function wltAccountEdit(accountFactory, globalValues, $window, $stateParams, globalFactory, configValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/account/directives/wlt-account-edit/account-edit.html',
            scope: {},
            link: AccountEditLink
        };

        return directive;

        function AccountEditLink(scope, element, attrs) {
            scope.cancelAccount = cancelAccount;
            scope.saveAccount = saveAccount;
            scope.confirmImage = confirmImage;
            scope.cancelImage = cancelImage;

            scope.myImage = '';
            scope.myCroppedImage = '';
            scope.imageSelected = false;
            scope.imageLoaded = false;
            scope.newImage = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('account');

                if (configValues.salesDomain !== null && configValues.salesDomain !== undefined) {
                    scope.domain = configValues.salesDomain;
                } else {
                    scope.domain = configValues.domain;
                }

                var helpCode = $stateParams.help;
                scope.showHelp = (helpCode === 'help');
                getAccount();

                var handleFileSelect = function (evt) {
                    var file = evt.currentTarget.files[0];
                    var reader = new FileReader();
                    scope.file = evt.currentTarget;
                    reader.onload = function (evt) {
                        scope.$apply(function (scope) {
                            scope.myImage = evt.target.result;
                            resizeImage();
                            scope.imageSelected = true;
                        });
                    };
                    reader.readAsDataURL(file);
                };
                angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
            }

            function getAccount() {
                accountFactory.get()
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.account = angular.copy(response);
                        if (scope.account.website.logo.typeImage) {
                            scope.imageLoaded = true;
                        }
                        scope.myCroppedImage = angular.copy(scope.account.website.logo.url);
                        scope.myImage = angular.copy(scope.account.website.logo.url);
                        stripeIsActive(scope.account.merchandAccount.stripe);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function stripeIsActive(val) {
                if (!val) {
                    getCodeStripeFromUrl();
                }
            }

            function cancelAccount() {
                $window.history.back();
            }

            function confirmImage(val) {
                scope.myCroppedImage = val;
                scope.account.website.logo.url = val;
                splitMyCroppedImage();
                scope.imageLoaded = true;
                scope.imageSelected = false;
                scope.newImage = true;
                document.getElementById('fileInput').value = null;
            }

            function cancelImage() {
                scope.myImage = '';
                document.getElementById('fileInput').value = null;
                scope.imageSelected = false;
            }

            function saveAccount(val) {
                if (scope.formAccountUpdate.correspondenceEmail.$valid && scope.formAccountUpdate.subdomain.$valid) {
                    splitMyCroppedImage();
                    accountFactory.update(scope.account)
                        .then(function () {
                            scope.message = globalFactory.formatMessage('success', 'shared.success.fetch');
                        })
                        .catch(function (error) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = true;
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                        });
                } else {
                    angular.forEach(scope.formAccountUpdate.$error.required, function (field) {
                        field.$setDirty();
                    });
                    scope.message = globalFactory.formatMessage('danger', 'shared.error.fillRequired');
                }
            }

            function getCodeStripeFromUrl() {
                var url = $window.location.href;
                var res = url.split("code=");
                if (res.length > 1) {
                    var code = res[1].split("#");
                    console.log(code[0]);
                    connectStripeAccount(code[0]);
                }
            }

            function connectStripeAccount(code) {
                accountFactory.connectStripeAccount(code).then(
                    function (data) {
                        console.log(data);
                        scope.account.merchandAccount.stripe = true;
                    },
                    function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    }
                );
            }

            function splitMyCroppedImage() {
                if (scope.myImage != '') {
                    var arr = (scope.myCroppedImage).split(":");
                    var arr2 = arr[1].split(";");
                    var typeImage = arr2[0];
                    var arr3 = arr2[1].split(",");
                    var base64 = arr3[1];

                    scope.account.website.logo = {
                        "base64": base64,
                        "typeImage": typeImage,
                        "url": ""
                    }
                }
            }

            function resizeImage(){
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');

                var startimg=scope.myImage;
                scope.image=startimg;

                var source =  new Image();
                source.src = startimg;
                if (canvas.width < canvas.height) {
                    canvas.width = source.width * 3;
                    canvas.height = canvas.width / 2;
                } else if (canvas.height < canvas.width) {
                    canvas.height = source.height;
                    canvas.width = canvas.height * 3;
                }

                context.drawImage(source,(canvas.width-source.width)/2,(canvas.height-source.height)/2);

                var imgURI = canvas.toDataURL();

                scope.myImage = imgURI;
            }

        }
    }

})();
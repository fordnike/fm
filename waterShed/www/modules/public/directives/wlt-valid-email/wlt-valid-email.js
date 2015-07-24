(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltValidEmail', wltValidEmail);

    wltValidEmail.$inject = ['emailService', '$window', 'globalFactory'];

    function wltValidEmail(emailService, $window, globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/public/directives/wlt-valid-email/valid-email.html',
            scope: {},
            link: ValidEmailLink
        };

        return directive;

        function ValidEmailLink(scope, element, attrs) {
            scope.emailValide=false;

            init();

            function init() {
                var url = $window.location.href;
                scope.token=getVariableFromUrl("?tokenEmail=",url);
                emailValidation(scope.token);
            }

            function emailValidation(val) {
                emailService.emailValidation(val)
                    .then(function () {
                        scope.emailValid=true;
                        scope.message = globalFactory.formatMessage('success', 'shared.success.success');
                    })
                    .catch(function (error) {
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                    });
            }

            function getVariableFromUrl(val,url){
                var temp="";
                var res= url.split(val);
                if(res.length>1){
                    var code= res[1].split("/#");
                    console.log(code[0]);
                    temp= code[0];
                }
                return temp;
            }

        }
    }

})();
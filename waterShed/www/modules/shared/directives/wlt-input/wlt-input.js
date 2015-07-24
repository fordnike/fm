(function () {
    'use strict';

    angular
        .module('nodiumApp')
        //.compileProvider
        .directive('wltInput', [
            '$timeout',
            InputValidatorDirective
        ])
        //.compileProvider
        .directive('dynamicName', DynamicNameDirective)
        //.compileProvider
        .directive('validationType', ValidationTypeDirective);

    DynamicNameDirective.$inject = ['$compile'];
    ValidationTypeDirective.$inject = ['$timeout'];

    function InputValidatorDirective($timeout) {
        return {
            templateUrl: 'modules/shared/directives/wlt-input/input.html',
            restrict: 'EA',
            require: '^form',
            scope: {
                input: '@input',
                errorMessage: '@errorMessage',
                type: '@type',
                label: '@label',
                placeholder:'@placeholder',
                model: '=model',
                regex:'@',
                key: '@key',
                glyphicon: '@glyphicon',
                glyphiconUrl: '@glyphiconUrl',
                isRequired: '@isRequired',
                requiredMessage: "@",
                vtype: '@',
                customValidation: '&onBlur',
                value:'@value',
                name:'@name'
            },
            link: InputValidatorLink
        };
    }

    function InputValidatorLink(scope, element, attrs, form) {

        scope.getState = function () {
            var state = "default";
            if (form[scope.key]) {
                var input = form[scope.key];
                if (input.$invalid && input.$dirty) {
                    state = 'invalid';
                    return state;
                }
                if (input.$valid) {
                    state = 'success';
                    return state;
                }
            }
            return state;
        };
        scope.getStyleClass = function () {
            if (form[scope.key]) {
                var input = form[scope.key];
                if (input.$invalid && input.$dirty) {
                    return 'has-error';
                }
                if (input.$valid && !input.$pristine) {
                    return 'has-success';
                }
            }
            return '';
        };
        scope.getClass = function () {
            if (form[scope.key]) {
                var input = form[scope.key];
                if (input.$invalid && input.$dirty && !input.$pristine) {
                    return 'has-error';
                }
                if (input.$valid) {
                    return 'has-success';
                }
            }
            return '';
        };
        scope.isRequiredStyleTest = function () {

            return false;
        };
        scope.isRequiredStyle = function () {

            try {
                if (form[scope.key]) {
                    var input = form[scope.key];
                    //console.log("key -- "+ scope.key+"  ---req="+input.$error.required+" dirt="+input.$dirty + " isReq="+scope.isRequired);
                    if (input.$dirty && scope.isRequired==='true' && input.$error.required) {
                        return input.$error.required
                    }
                }
            }
            catch(err) {
                console.log("inputValidator "+err);
            }

            return false;
        };
        scope.isValidStyle = function () {
            if (form[scope.key]) {
                var input = form[scope.key];

                if (input.$invalid && !input.$error.required) {
                    return true;
                }
                return false;
            }
        };
        scope.isValidClass = function () {
            if (form[scope.key]) {
                var input = form[scope.key];
                if (input.$invalid && input.$dirty) {
                    return 'glyphicon-remove';
                }
                if (input.$valid && !input.$pristine) {
                    return 'glyphicon-ok';
                }
            }
            return '';
        };
    }

    function DynamicNameDirective($compile) {
        return {
            restrict: 'A',
            terminal: true,
            priority: 1000,
            link: function (scope, element, attrs) {
                var name = scope.$eval(attrs.dynamicName);
                if (name) {
                    element.attr('name', name);
                    element.removeAttr('dynamic-name');
                    $compile(element)(scope);
                }
            }
        };
    }

    function ValidationTypeDirective($timeout) {
        return {
            restrict: 'A',
            require: ['^form', '^ngModel'],
            link: function (scope, element, attrs, ctrls) {
                var modelCtrl = ctrls[1],
                    formCtrl = ctrls[0],
                    timer, vtype;
                vtype = scope.$eval(attrs.validationType) || attrs.validationType;
                // if vtype is defined
                if (vtype) {
                    scope.$watch(attrs.ngModel, function (value) {
                        if (timer) {
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function () {
                            scope.validate(value, vtype);
                            scope.$apply();
                        }, 500);
                    });
                }

                element.bind('blur', function () {
                    $timeout.cancel(timer);
                    scope.validate(modelCtrl.$viewValue, vtype);
                    // force redrawind view
                    scope.$apply();
                    if (modelCtrl.$dirty) {
                        var promise = scope.customValidation();
                        if (promise && promise.then) {
                            promise.then(function (response) {
                                //console.log(data);
                                    modelCtrl.$setValidity('isMailExisting', (!response.data.isMailExisting));


                            });
                        }
                    }
                });

                scope.validate = function (value, vtype) {
                    if (angular.isString(vtype)) {
                        if (modelCtrl.$dirty && vtype === 'email') {
                            modelCtrl.$setValidity('email', scope._emailValidate(value));
                        }
                    } else if (angular.isObject(vtype)) {
                        var type = vtype.type, key = vtype.value;
                        if (modelCtrl.$dirty && type === 'same') {
                            modelCtrl.$setValidity('sameAs', scope._validateSame(value, key));
                        }
                    }
                }

                scope._emailValidate = function (email) {
                    if (email) {
                        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(email);
                    }
                    return false;
                }

                scope._validateSame = function (value, sameAs) {
                    return formCtrl[sameAs] && angular.equals(value, formCtrl[sameAs].$modelValue);
                }
            }
        }
    }

    /**
     * @ngdoc directive
     * @name nodiumApp.directive:inputValidatorDirective
     * @description
     * # inputValidatorDirective formatte la quantité et valeur d'un set de billets
     */

})();

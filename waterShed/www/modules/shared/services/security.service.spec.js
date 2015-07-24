'use strict';

describe('security.service.js', function () {
    var eventMock=jasmine.createSpyObj('event', ['preventDefault']),
        previousStateMock= jasmine.createSpyObj('previousStateFactory', ['memo']),
        httpMock= { defaults: { headers: {common: { Authorization: 'security.service.spec: any'}}}};

    beforeEach(function(){
        module('nodiumApp');

        module('ui.router', function ($provide) {
            $provide.provider('$state', function () {
                this.state = function () {
                    console.log('state()!!!');
                };
                this.$get = function () {
                    return {
                        get: function () {
                            return [];
                        },
                        go: jasmine.createSpy('go')
                    };
                };
            });
        });

        module(function ($provide) {
            $provide.value('previousStateFactory', previousStateMock);
            $provide.value('$http', httpMock);
        });

        //inject(function ($state) {
        //   $state.go = function(d){};
        //   spyOn($state, 'go').and.callThrough();
        //});
    });

/*    it('isRequiredAccount() success', inject(function (securityFactory) {
        expect(securityFactory.isRequiredAccount).toBeDefined();
        var to = {
                data: {
                    auth: true,
                    isAdmin: true
                }
            };
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(true);
    }));*/

/*    it('isRequiredAccount() error / when [to] is null ', inject(function (securityFactory) {
        var to = null;
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(false);
    }));

    it('isRequiredAccount() error / when [to] is undefined ', inject(function (securityFactory) {
        var to = undefined;
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(false);
    }));

    it('isRequiredAccount() error / when no data is defined in route structure ', inject(function (securityFactory) {
        expect(securityFactory.isRequiredAccount).toBeDefined();
        var to = {};
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(false);
    }));

    it('isRequiredAccount() error / when data.isRequiredAccount flag is not defined in route structure ', inject(function (securityFactory) {
        var to = {
                data: {
                    auth: true
                }
            };
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(false);
    }));*/

/*    it('isRequiredAccount() error / when data.isRequiredAccount flag is set to false in route structure ', inject(function (securityFactory) {
        var to = {
                data: {
                    auth: true,
                    isRequiredAccount: false
                }
            };
        var routeAccess = securityFactory.isRequiredAccount(to);
        expect(routeAccess).toBe(false);
    }));

    it('isRequiredAuth() success', inject(function (securityFactory) {
        expect(securityFactory.isRequiredAuth).toBeDefined();
        var to = {
                data: {
                    auth: true
                }
            };
        var routeAccess = securityFactory.isRequiredAuth(to);
        expect(routeAccess).toBe(true);
    }));*/

  /*  it('isAccountSet() is false when not Set', inject(function (securityFactory, globalValues) {
        expect(securityFactory.isAccountSet).toBeDefined();
        globalValues.account='';
        var accountSet = securityFactory.isAccountSet();
        expect(accountSet).toBe(false);
    }));

    it('isAccountSet() is true when Set', inject(function (securityFactory, globalValues) {
        globalValues.account='anyAccount';
        var accountSet = securityFactory.isAccountSet();
        expect(accountSet).toBe(true);
    }));

    it('isAccountSet() is false when Undefined', inject(function (securityFactory, globalValues) {
        delete globalValues.account;
        var accountSet = securityFactory.isAccountSet();
        expect(accountSet).toBe(false);
    }));*/


    it('redirectAccess() / authentication not required, public success', inject(function (securityFactory, $http, globalValues, $state) {
        expect(securityFactory.redirectAccess).toBeDefined();
        globalValues.token='mytoken';
        var to = {
                data: {
                }
            },
            anyDefinedValue = "any",
            toParams=null;
        $http.defaults.headers.common.Authorization = anyDefinedValue;
        securityFactory.redirectAccess(eventMock, to, toParams);
    }));

    it('redirectAccess() / authentication required, redirect to login', inject(function (securityFactory, $http, globalValues, $state) {
        globalValues.token = '';
        var to = {
                data: {
                    auth: true
                }
            },
            anyDefinedValue = "any",
            toParams=null;
        $http.defaults.headers.common.Authorization = anyDefinedValue;

        securityFactory.redirectAccess(eventMock, to, toParams);

        expect(eventMock.preventDefault).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('public.login');
        expect($http.defaults.headers.common.Authorization).not.toEqual(anyDefinedValue);
    }));

    it('redirectAccess() / authentication required, account required, redirect to private.account-list', inject(function (securityFactory, $http, globalValues, $state) {
        globalValues.token = { access_token : '' };
        globalValues.account = '';
        var to = {
                data: {
                    auth: true,
                    isAdmin: true
                }
            },
            anyDefinedValue = "any",
            toParams=null;
        $http.defaults.headers.common.Authorization = anyDefinedValue;
        securityFactory.redirectAccess(eventMock, to, toParams);
    }));

    it('redirectAccess() / authentication required, no redirect to private.account-list', inject(function (securityFactory, $http, globalValues, $state) {
        globalValues.token = { access_token : '' };
        globalValues.account = '';
        var to = {
            },
            anyDefinedValue = "any",
            toParams=null;
        $http.defaults.headers.common.Authorization = anyDefinedValue;

        securityFactory.redirectAccess(eventMock, to, toParams);
        expect($http.defaults.headers.common.Authorization).not.toEqual(anyDefinedValue);
    }));

});


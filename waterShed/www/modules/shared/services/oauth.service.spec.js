'use strict';

describe('oauth.service.js', function () {

    beforeEach(module('nodiumApp'));


    it('isAuthenticated() success', inject(function (globalValues, oauthFactory) {
        expect(oauthFactory.isAuthenticated).toBeDefined();
        globalValues.token = {
            access_token: 'eyJ0eXA',
            refresh_token: 'allo',
            token_type: '',
            expires_in: 10
        };
        var authentication = oauthFactory.isAuthenticated();
        expect(authentication).toBe(true);
    }));

    it('isAuthenticated() default not authenticated / when token undefined', inject(function (globalValues, oauthFactory) {
        delete globalValues.token;
        var authentication = oauthFactory.isAuthenticated();
        expect(authentication).toBe(false);
    }));

    it('isAuthenticated() default not authenticated / when token null', inject(function (globalValues, oauthFactory) {
        globalValues.token = null;
        var authentication = oauthFactory.isAuthenticated();
        expect(authentication).toBe(false);
    }));

    it('deleteAuthentication() success', inject(function (globalValues, oauthFactory) {
        globalValues.token = 'anyData';
        oauthFactory.deleteAuthentication();
        expect(globalValues.token).toBeUndefined();
    }));

    it('isAuthenticated() default not authenticated / when token.access_token undefined', inject(function (globalValues, oauthFactory) {
        globalValues.token = {};
        var authentication = oauthFactory.isAuthenticated();
        expect(authentication).toBe(false);
    }));

    it('isAuthenticated() default not authenticated / when token.access_token null', inject(function (globalValues, oauthFactory) {
        globalValues.token = {access_token : null};
        var authentication = oauthFactory.isAuthenticated();
        expect(authentication).toBe(false);
    }));

    it('isAuthenticated() default not authenticated / when token === "" ', inject(function (globalValues, oauthFactory) {
        globalValues.token = '';
        var authentication = oauthFactory.isAuthenticated();
        expect(!authentication).toBe(true);
    }));


});

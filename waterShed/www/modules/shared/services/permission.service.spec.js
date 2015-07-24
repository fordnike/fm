/**
 * Created by mohammed on 01/07/15.
 */
'use strict';

describe('permission.service.js', function () {

    var
        globalValues,
        permissionFactory,
        jwtHelper;


    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            permissionFactory = $injector.get('permissionFactory');
            globalValues = $injector.get('globalValues');
            jwtHelper = $injector.get('jwtHelper');


        });
    });


    it('userRight() is admin success', inject(function (globalValues, oauthFactory,permissionFactory) {
        expect(oauthFactory.isAuthenticated).toBeDefined();
        globalValues.token = {
            access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJPcnBoZXVzIiwic2ciOjc2MDY3NTAxLCJ1c3IiOiJmcmFoaWxpYSsxQGdtYWlsLmNvbSIsImlzcyI6Ik9ycGhldXMiLCJpZCI6NzYwNzc1MDEsImV4cCI6MTQzNTg1NTkyNDc4NSwicGVyIjoiR2dDQUFBREFBUUVBQUFBQUVBPT0iLCJpYXQiOjE0MzU3Njk1MjQ3ODV9.aPRqYlqP-CrVUnqVCorv6h7i5Z6MAg7_QZLex8rEcOk',
            refresh_token: 'allo',
            token_type: '',
            expires_in: 10
        };
        var permission = permissionFactory.userRight(100);
        expect( permission).toBe(true);
    }));

    it('userRight() is not admin ', inject(function (globalValues, oauthFactory,permissionFactory) {
        expect(oauthFactory.isAuthenticated).toBeDefined();
        globalValues.token = {
            access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJPcnBoZXVzIiwic2ciOjQ5MTc0MTEyNTAsInVzciI6InRlc3QyQGdtYWlsLmNvbSIsImlzcyI6Ik9ycGhldXMiLCJpZCI6NDkxNzQyMTI1MCwiZXhwIjoxNDI2ODc1NzI4MzkzLCJwZXIiOiJHZ0NBQUFEQUFRRT0iLCJpYXQiOjE0MjY3ODkzMjgzOTN9.yTp1osKZ8DQqM6Qj6O1O6REaMFbXpO_Z7hquB6F7fKU',
            refresh_token: 'allo',
            token_type: '',
            expires_in: 10
        };
        var permission = permissionFactory.userRight(100);
        expect( permission).toBe(false);
    }));

    it('userRight() is defined', inject(function (permissionFactory) {
        expect(permissionFactory.userRight()).toBeDefined();
    }));







});
'use strict';

describe('session.service.js', function () {
    beforeEach(module('nodiumApp'));


    it('put()/get() success', inject(function (sessionFactory, $rootScope) {

        var key = 'subdomain';
        var domainInTest = 'TICKETS7';
        var useLocalStorageFromBrowser = true;
        expect(sessionFactory.putSync).toBeDefined();
        sessionFactory.putSync(key, domainInTest, null);

        expect(sessionFactory.getSync).toBeDefined();
        expect(sessionFactory.getSync(key, null)).toBe(domainInTest);

    }));

});

'use strict';
describe('account.service.js', function () {
    var accountFactory,
        $httpBackend,
        globalValues,
        sessionFactory,
        $state,
        $rootScope,
        jsonAccount = {
            "applicationFee": 100,
            "currency": "CAD",
            "website": {
                "correspondenceEmail": "test@test.com",
                "googleAnalyticsTracker": "ADFSDGLSKH",
                "logo": "logoTSD.png",
                "boxOfficeName": "Demo",
                "subdomain": "demo",
                "correspondenceEmailValid": true
            },
            "address": {
                "country": "Canada",
                "zipCode": "H0H 0H0",
                "firstname": "John",
                "city": "Montreal",
                "phone": "514-555-5555",
                "addressLine1": "303 Devil Lane",
                "addressLine2": "",
                "provinceState": "Quebec",
                "lastname": "Doe"
            },
            "configuration": {
                "boxOfficeAllowed": true
            },
            "networkId": 0,
            "merchandAccount": {
                "payPalEmail": "",
                "payPalEmailVerified": true,
                "stripe": true,
                "currency": "CAD"
            }
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        },
        jsonResponseGetIdClientStripe = {
            id: 'ok'
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            accountFactory = $injector.get('accountFactory');
            globalValues = $injector.get('globalValues');
            sessionFactory = $injector.get('sessionFactory');
            $httpBackend = $injector.get('$httpBackend');

            $rootScope = $injector.get("$rootScope");
            spyOn($rootScope, '$broadcast').and.callThrough();

            $state = $injector.get("$state");
            $state.go = function (d) {
            };
            spyOn($state, 'go').and.callThrough();
            sessionFactory.destroy();
        });
    });

    it('new()', inject(function (accountFactory) {
        expect(accountFactory.changeSubdomain).toBeDefined();
        expect(accountFactory.get).toBeDefined();
        expect(accountFactory.getIdClientStripe).toBeDefined();
        expect(accountFactory.getList).toBeDefined();
        expect(accountFactory.update).toBeDefined();
        expect(accountFactory.connectStripeAccount).toBeDefined();
    }));

    it('changeSubdomain()', inject(function (sessionFactory) {
        globalValues.account = '';
        globalValues.subdomain = '';
        accountFactory.changeSubdomain('test');

        expect(globalValues.account).toBe('/admin/test');
        var account = sessionFactory.getSync('account');
        expect(account).toBe('/admin/test');

        expect(globalValues.subdomain).toBe('test');
        var subdomain = sessionFactory.getSync('subdomain');
        expect(subdomain).toBe('test');

        expect($rootScope.$broadcast).toHaveBeenCalledWith('accountChange');
        expect($state.go).toHaveBeenCalledWith('private.account.event-list');
    }));

    it('get() success', function (done) {
        $httpBackend.whenGET('getSuccess')
            .respond(201, jsonAccount);
        globalValues.account = 'getSuccess';
        var promise = accountFactory.get();
        promise.then(function (response) {
            expect(response.website.subdomain).toBe('demo');
            done();
        });
        $httpBackend.flush();
    });

    it('get() error http', function (done) {
        $httpBackend.whenGET('getError')
            .respond(500, jsonError);
        globalValues.account = 'getError';
        var promise = accountFactory.get();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('get() error account not set', function (done) {
        globalValues.account = '';
        var promise = accountFactory.get();
        promise.catch(function (error) {
            expect(error.id).toBe('shared.error.noAccount');
            done();
        });
        $httpBackend.flush();
    });

    it('getIdClientStripe() success', function (done) {
        globalValues.userId = '1';

        $httpBackend.whenGET('/admin/account/' + globalValues.userId + '/payment/stripe/config')
            .respond(201, jsonResponseGetIdClientStripe);
        var promise = accountFactory.getIdClientStripe();
        promise.then(function (response) {
            expect(response.data.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('getIdClientStripe() error', function (done) {
        globalValues.userId = '1';

        $httpBackend.whenGET('/admin/account/' + globalValues.userId + '/payment/stripe/config')
            .respond(500, jsonError);
        var promise = accountFactory.getIdClientStripe();
        promise.catch(function (error) {
            expect(error.data.error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() success', function (done) {
        $httpBackend.whenGET('/admin/accounts')
            .respond(201, jsonAccount);
        var promise = accountFactory.getList();
        promise.then(function (response) {
            console.log(response);
           // expect(response.website.subdomain).toBe('demo');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() error http', function (done) {
        $httpBackend.whenGET('/admin/accounts')
            .respond(500, jsonError);
        var promise = accountFactory.getList();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('update() success', function (done) {
        globalValues.account = '/admin/test';

        $httpBackend.whenPUT('/admin/test/account')
            .respond(201, jsonAccount);
        var promise = accountFactory.update(jsonAccount);
        promise.then(function () {
            var url = '/admin/' + jsonAccount.website.subdomain;
            var account = sessionFactory.getSync('account');
            expect(account).toBe(url);

            expect(globalValues.account).toBe(url);
            expect(globalValues.subdomain).toBe(jsonAccount.website.subdomain);
            expect($state.go).toHaveBeenCalledWith('private.account-view');
            done();
        });
        $httpBackend.flush();
    });

    it('update() error http', function (done) {
        globalValues.account = '/admin/test';

        $httpBackend.whenPUT('/admin/test/account')
            .respond(500, jsonError);
        var promise = accountFactory.update(jsonAccount);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('connectStripeAccount() success', function (done) {
        globalValues.userId = '1';
        globalValues.account = '/admin/test';
        var account = globalValues.account;
        var url =  account + '/connectStripe'

        $httpBackend.whenPOST(url)
            .respond(201, jsonResponseGetIdClientStripe);
        var promise = accountFactory.connectStripeAccount();
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('connectStripeAccount() error http', function (done) {
        globalValues.userId = '1';
        globalValues.account = '/admin/test';
        var account = globalValues.account;
        var url =  account + '/connectStripe';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = accountFactory.connectStripeAccount();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});


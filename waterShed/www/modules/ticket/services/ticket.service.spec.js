'use strict';
describe('ticket.service.js', function () {
    var $httpBackend,
        globalValues,
        ticketFactory,
        $window,
        $state,
        jsonTickets = [
            {
                "id": 123,
                "priceLevel": "1",
                "name": "General",
                "price": 3613,
                "serviceFees": 0,
                "limit": 40,
                "promoCode": null
            },
            {
                "id": 456,
                "priceLevel": "1",
                "name": "Super vip seat",
                "price": 7744,
                "serviceFees": 0,
                "limit": 400,
                "promoCode": null
            }
        ],
        jsonResponse = {
            id: 'ok'
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        },
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
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            ticketFactory = $injector.get('ticketFactory');
            globalValues = $injector.get('globalValues');
            $httpBackend = $injector.get('$httpBackend');

            $window = $injector.get("$window");
            $window.history.back = function (d) {
            };
            spyOn($window, 'history').and.callThrough();
            $state = $injector.get("$state");
            $state.go = function (d) {
            };
            spyOn($state, 'go').and.callThrough();
        });
    });

    it('new()', inject(function (ticketFactory) {
        expect(ticketFactory.delete).toBeDefined();
        expect(ticketFactory.getList).toBeDefined();
        expect(ticketFactory.goBack).toBeDefined();
        expect(ticketFactory.update).toBeDefined();
    }));

    it('delete() success', function (done) {
        globalValues.account = '/admin/test';
        var idEvent = '1';
        var url = globalValues.account + '/event/' + idEvent + '/tickets/' + jsonTickets[0].id;

        $httpBackend.whenDELETE(url)
            .respond(201, jsonResponse);
        var promise = ticketFactory.delete(idEvent, jsonTickets[0].id);
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('delete() error http', function (done) {
        globalValues.account = '/admin/test';
        var idEvent = '1';
        var url = globalValues.account + '/event/' + idEvent + '/tickets/' + jsonTickets[0].id;

        $httpBackend.whenDELETE(url)
            .respond(500, jsonError);
        var promise = ticketFactory.delete(idEvent, jsonTickets[0].id);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() success', function (done) {
        globalValues.account = '/admin/test';
        var eventId = '1';
        var url = globalValues.account + '/event/' + eventId + '/tickets';

        $httpBackend.whenGET(url)
            .respond(201, jsonTickets);
        var promise = ticketFactory.getList(eventId);
        promise.then(function (response) {
            expect(response[0].id).toBe(123);
            done();
        });
        $httpBackend.flush();
    });

    it('getList() error http', function (done) {
        globalValues.account = '/admin/test';
        var eventId = '1';
        var url = globalValues.account + '/event/' + eventId + '/tickets';

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = ticketFactory.getList(eventId);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('goBack()', inject(function (ticketFactory) {
        ticketFactory.goBack();
        //expect($window.history).toHaveBeenCalled();
    }));

    it('update() success', function (done) {
        globalValues.account = '/admin/test';
        var eventId = '1';
        var url = globalValues.account + '/event/' + eventId + '/tickets';

        $httpBackend.whenGET(globalValues.account)
            .respond(201, jsonAccount);
        $httpBackend.whenPOST(url)
            .respond(201, jsonTickets);

        var promise = ticketFactory.update(eventId, jsonTickets);
        promise.then(function () {
            expect($state.go).toHaveBeenCalledWith('private.account.event-view', Object({ id: '1' }));
            done();
        });
        $httpBackend.flush();
    });

    it('update() error http', function (done) {
        globalValues.account = '/admin/test';
        var eventId = '1';
        var url = globalValues.account + '/event/' + eventId + '/tickets';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = ticketFactory.update(eventId, jsonTickets);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});

'use strict';
describe('event.service.js', function () {
    var $httpBackend,
        globalValues,
        eventFactory,
        $window,
        jsonEvent = {
            "id": 6,
            "title": "Hommage Santana - avec Persuasion",
            "published": true,
            "saleState": "ONSALE",
            "venueId": 1,
            "venue": "Kelso Beach Park",
            "cityProvince": "Owen Sound, ON",
            "eventStart": "2015-06-23T18:00:00.511Z",
            "eventStartDate": "2015-06-23T18:00:00.511Z",
            "eventEnd": "2015-06-23T22:00:00.511Z",
            "onsale": "2015-03-01T12:00:00.511Z",
            "image": "6.jpg",
            "capacity": 100,
            "prices": {
                "123": {
                    "id": 123,
                    "priceLevel": "1",
                    "name": "General",
                    "price": 36.13,
                    "serviceFees": 0,
                    "limit": 40,
                    "promoCode": null
                },
                "456": {
                    "id": 456,
                    "priceLevel": "1",
                    "name": "Super vip seat",
                    "price": 77.44,
                    "serviceFees": 0,
                    "limit": 400,
                    "promoCode": null
                }
            }
        },
        jsonEvents = {
            "events": [
                {
                    "id": 6,
                    "title": "Hommage Santana - avec Persuasion",
                    "published": true,
                    "saleState": "ONSALE",
                    "venueId": 1,
                    "venue": "Kelso Beach Park",
                    "cityProvince": "Owen Sound, ON",
                    "eventStart": "2015-06-23T18:00:00.511Z",
                    "eventStartDate": "2015-06-23T18:00:00.511Z",
                    "eventEnd": "2015-06-23T22:00:00.511Z",
                    "onsale": "2015-03-01T12:00:00.511Z",
                    "image": "6.jpg",
                    "prices": {
                        "123": {
                            "priceType": "General",
                            "price": "36,13 $",
                            "serviceCharges": "inclus",
                            "promo": false,
                            "order": 40,
                            "soldout": false
                        },
                        "456": {
                            "priceType": "General + free hotdog",
                            "price": "36,03 $",
                            "serviceCharges": "8,07 $",
                            "promo": false,
                            "order": 50,
                            "soldout": false
                        },
                        "789": {
                            "priceType": "Super vip seat",
                            "price": "12,73 $",
                            "serviceCharges": "inclus",
                            "promo": false,
                            "order": 50,
                            "soldout": true
                        },
                        "999": {
                            "priceType": "FREE ENTRY",
                            "price": "0,00 $",
                            "serviceCharges": "0,00 $",
                            "promo": false,
                            "order": 50,
                            "soldout": false
                        }
                    }
                }
            ]
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        },
        jsonSuccess = {
            id: 'ok'
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            eventFactory = $injector.get('eventFactory');
            globalValues = $injector.get('globalValues');
            $httpBackend = $injector.get('$httpBackend');

            $window = $injector.get("$window");
            $window.history.back = function (d) {
            };
            spyOn($window, 'history').and.callThrough();
        });
    });

    it('new()', inject(function (eventFactory) {
        expect(eventFactory.add).toBeDefined();
        expect(eventFactory.get).toBeDefined();
        expect(eventFactory.getList).toBeDefined();
        expect(eventFactory.goBack).toBeDefined();
        expect(eventFactory.publishEvent).toBeDefined();
        expect(eventFactory.unpublishEvent).toBeDefined();
        expect(eventFactory.update).toBeDefined();
    }));

    it('add() success', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/event';

        $httpBackend.whenPOST(url)
            .respond(201, jsonEvent, {'content-location': '/admin/test/event/1'});
        var promise = eventFactory.add(jsonEvent);
        promise.then(function (response) {
            expect(response).toBe('1');
            done();
        });
        $httpBackend.flush();
    });

    it('add() error http', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/event';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError, {'content-location': '/admin/test/event/1'});
        var promise = eventFactory.add(jsonEvent);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('get() success', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id;

        $httpBackend.whenGET(url)
            .respond(201, jsonEvent);
        var promise = eventFactory.get(id);
        promise.then(function (response) {
            expect(response.id).toBe(6);
            done();
        });
        $httpBackend.flush();
    });

    it('get() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id;

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = eventFactory.get(id);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('get() error account not set', function (done) {
        globalValues.account = '';
        var promise = eventFactory.get('1');
        promise.catch(function (error) {
            expect(error.id).toBe('shared.error.noAccount');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() success', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/events';

        $httpBackend.whenGET(url)
            .respond(201, jsonEvents);
        var promise = eventFactory.getList();
        promise.then(function (response) {
            expect(response[0].id).toBe(6);
            done();
        });
        $httpBackend.flush();
    });

    it('getList() error http', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/events';

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = eventFactory.getList();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() error account not set', function (done) {
        globalValues.account = '';
        var promise = eventFactory.getList();
        promise.catch(function (error) {
            expect(error.id).toBe('shared.error.noAccount');
            done();
        });
        $httpBackend.flush();
    });

    it('goBack()', inject(function (eventFactory) {
        eventFactory.goBack();
        //expect($window.history).toHaveBeenCalled();
    }));

    it('publishEvent() success', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id + '/publish';

        $httpBackend.whenPUT(url)
            .respond(201, jsonSuccess);
        var promise = eventFactory.publishEvent(id);
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('publishEvent() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id + '/publish';

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = eventFactory.publishEvent(id);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('unpublishEvent() success', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id + '/unpublish';

        $httpBackend.whenPUT(url)
            .respond(201, jsonSuccess);
        var promise = eventFactory.unpublishEvent(id);
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('unpublishEvent() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/event/' + id + '/unpublish';

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = eventFactory.unpublishEvent(id);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('update() success', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/event/' + jsonEvent.id;
        $httpBackend.whenPUT(url)
            .respond(201, jsonEvent);
        var promise = eventFactory.update(jsonEvent);
        promise.then(function (response) {
            expect(response.id).toBe(6);
            done();
        });
        $httpBackend.flush();
    });

    it('update() error http', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/event/' + jsonEvent.id;
        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = eventFactory.update(jsonEvent);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});


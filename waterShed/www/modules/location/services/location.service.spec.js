'use strict';
describe('location.service.js', function () {
    var $httpBackend,
        globalValues,
        locationFactory,
        $window,
        jsonLocation = {
            "id": 1,
            "networkId": 1,
            "name": "Théâtre St-Denis",
            "addressLine1": "123 rue des Betteraves",
            "addressLine2": "",
            "city": "Montréal",
            "province": "Québec",
            "country": "Canada",
            "postalCode": "H3L 1A4",
            "timezone": "GMT -5, New York, Montréal"
        },
        jsonLocations = {
            "locations": [
                {
                    "id": 1,
                    "networkId": 1,
                    "name": "Théâtre St-Denis",
                    "addressLine1": "123 rue des Betteraves",
                    "addressLine2": "",
                    "city": "Montréal",
                    "province": "Québec",
                    "country": "Canada",
                    "postalCode": "H3L 1A4",
                    "timezone": "-5"
                }
            ]
        },
        jsonResponse = {
            id: 'ok'
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            locationFactory = $injector.get('locationFactory');
            globalValues = $injector.get('globalValues');
            $httpBackend = $injector.get('$httpBackend');

            $window = $injector.get("$window");
            $window.history.back = function (d) {
            };
            spyOn($window, 'history').and.callThrough();
        });
    });

    it('new()', inject(function (locationFactory) {
        expect(locationFactory.add).toBeDefined();
        expect(locationFactory.delete).toBeDefined();
        expect(locationFactory.get).toBeDefined();
        expect(locationFactory.getList).toBeDefined();
        expect(locationFactory.goBack).toBeDefined();
        expect(locationFactory.update).toBeDefined();
    }));

    it('add() success', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/location';

        $httpBackend.whenPOST(url)
            .respond(201, jsonLocation, {'content-location': '/admin/test/location/1'});
        var promise = locationFactory.add(jsonLocation);
        promise.then(function (response) {
            expect(response).toBe('1');
            done();
        });
        $httpBackend.flush();
    });

    it('add() error http', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/location';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError, {'content-location': '/admin/test/location/1'});
        var promise = locationFactory.add(jsonLocation);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('delete() success', function (done) {
        globalValues.account = '/admin/test';
        var id = jsonLocation.id;
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenDELETE(url)
            .respond(201, jsonLocation);
        var promise = locationFactory.delete(jsonLocation);
        promise.then(function (response) {
            expect(response.id).toBe(1);
            done();
        });
        $httpBackend.flush();
    });

    it('delete() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = jsonLocation.id;
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenDELETE(url)
            .respond(500, jsonError);
        var promise = locationFactory.delete(jsonLocation);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('get() success', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenGET(url)
            .respond(201, jsonLocation);
        var promise = locationFactory.get(id);
        promise.then(function (response) {
            expect(response.id).toBe(1);
            done();
        });
        $httpBackend.flush();
    });

    it('get() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = '1';
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = locationFactory.get(id);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('getList() success', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/locations';

        $httpBackend.whenGET(url)
            .respond(201, jsonLocations);
        var promise = locationFactory.getList();
        promise.then(function (response) {
            expect(response[0].id).toBe(1);
            done();
        });
        $httpBackend.flush();
    });

    it('getList() error http', function (done) {
        globalValues.account = '/admin/test';
        var url = globalValues.account + '/locations';

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = locationFactory.getList();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('goBack()', inject(function (locationFactory) {
        locationFactory.goBack();
        //expect($window.history).toHaveBeenCalled();
    }));

    it('update() success', function (done) {
        globalValues.account = '/admin/test';
        var id = jsonLocation.id;
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenPUT(url)
            .respond(201, jsonLocation);
        var promise = locationFactory.update(jsonLocation);
        promise.then(function (response) {
            expect(response.id).toBe(1);
            done();
        });
        $httpBackend.flush();
    });

    it('update() error http', function (done) {
        globalValues.account = '/admin/test';
        var id = jsonLocation.id;
        var url = globalValues.account + '/location/' + id;

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = locationFactory.update(jsonLocation);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});

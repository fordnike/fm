'use strict';

describe('http.service.js', function () {

    beforeEach(module('nodiumApp'));

    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('http()', function () {

        it('success', inject(function (httpFactory, $httpBackend) {
            $httpBackend.whenGET('/shared/config/wlt.config.json')
                .respond(200, {

                        'id': 1,
                        'networkId': 1,
                        'name': 'Théâtre St-Denis',
                        'addressLine1': '123 rue des Betteraves',
                        'addressLine2': '',
                        'city': 'Montréal',
                        'province': 'Québec',
                        'country': 'Canada',
                        'postalcode': 'H3L 1A4',
                        'timezone': '-5'

                });
            var location = httpFactory.HTTP('/shared/config/wlt.config.json', {}, 'GET');
            $httpBackend.flush();

            expect(location.$$state.value.data.id).toBe(1);
            expect(location.$$state.value.data.networkId).toBe(1);
            expect(location.$$state.value.data.name).toBe('Théâtre St-Denis');
            expect(location.$$state.value.data.addressLine1).toBe('123 rue des Betteraves');
            expect(location.$$state.value.data.addressLine2).toBe('');
            expect(location.$$state.value.data.city).toBe('Montréal');
            expect(location.$$state.value.data.province).toBe('Québec');
            expect(location.$$state.value.data.country).toBe('Canada');
            expect(location.$$state.value.data.postalcode).toBe('H3L 1A4');
            expect(location.$$state.value.data.timezone).toBe('-5');

        }));

        it('error', inject(function (httpFactory, $httpBackend) {
            $httpBackend.whenGET('/shared/config/wlt.config.json')
                .respond(500, 'Valid Error message from server');
            var location = httpFactory.HTTP('/shared/config/wlt.config.json', {}, 'GET');
            $httpBackend.flush();

            expect(location.$$state.value.status).toBe(500);
            expect(location.$$state.value.data).toBe('Valid Error message from server');
        }));


    });

});

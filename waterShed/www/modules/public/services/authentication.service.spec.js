'use strict';
describe('authentication.service.js', function () {
    var $httpBackend,
        globalValues,
        authenticationFactory,
        sessionFactory,
        jwtHelper,
        $window,
        $state,
        jsonToken = {
            "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJPcnBoZXVzIiwic2ciOjQ5MTc0MTEyNTAsInVzciI6InRlc3QyQGdtYWlsLmNvbSIsImlzcyI6Ik9ycGhldXMiLCJpZCI6NDkxNzQyMTI1MCwiZXhwIjoxNDI2ODc1NzI4MzkzLCJwZXIiOiJHZ0NBQUFEQUFRRT0iLCJpYXQiOjE0MjY3ODkzMjgzOTN9.yTp1osKZ8DQqM6Qj6O1O6REaMFbXpO_Z7hquB6F7fKU",
            "token_type":"Bearer",
            "expires_in":3600,
            "refresh_token":"6nESfLcXRAzxTF1MdB6ml94G"
        }
        ,
        jsonUser = {
            "firstname": "John",
            "language": "fr",
            "id": 4917421250,
            "email": "test@test.com",
            "emailvalid" : true,
            "lastname": "Doe",
            "account": "/admin/test"
        },
        jsonResponse = {
            id: 'ok'
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        },
        jsonLogin = {
            "username": "test@test.com",
            "password": "mypassword"
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
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            authenticationFactory = $injector.get('authenticationFactory');
            globalValues = $injector.get('globalValues');
            sessionFactory = $injector.get('sessionFactory');
            jwtHelper = $injector.get('jwtHelper');
            $httpBackend = $injector.get('$httpBackend');

            $window = $injector.get("$window");
            $window.history.back = function (d) {
            };
            spyOn($window, 'history').and.callThrough();
            $state = $injector.get("$state");
            $state.go = function (d) {
            };
            spyOn($state, 'go').and.callThrough();
            sessionFactory.destroy();
        });
    });

    it('new()', inject(function (authenticationFactory) {
        expect(authenticationFactory.goBack).toBeDefined();
        expect(authenticationFactory.login).toBeDefined();
        expect(authenticationFactory.logout).toBeDefined();
        expect(authenticationFactory.redirectIfLoggedIn).toBeDefined();
        expect(authenticationFactory.register).toBeDefined();
    }));


    it('goBack()', inject(function (authenticationFactory) {
        authenticationFactory.goBack();
        //expect($window.history).toHaveBeenCalled();
    }));

    it('login() success', function (done) {
        globalValues.admin = '';
        globalValues.account = '';
        var url = '/oauth/token';
        $httpBackend.whenPOST(url)
            .respond(201, jsonToken);

        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url2 = '/admin/user/' + userId;
        $httpBackend.whenGET(url2)
            .respond(201, jsonUser);

        var url3 = '/admin/test/events';
        $httpBackend.whenGET(url3)
            .respond(201, jsonEvents);

        //var promise = authenticationFactory.login(jsonLogin);
        //promise.then(function (response) {
        //    expect(response).toBe('private.account.event-list');
        //    expect($state.go).toHaveBeenCalledWith('private.account.event-list');
        //    done();
        //});
        done();
        sessionFactory.destroy();
        $httpBackend.flush();
    });


    it('logout() error http', function (done) {
        sessionFactory.putSync(jsonToken);
        globalValues.account = 'jsonUser.account';
        authenticationFactory.logout();
        var myToken = sessionFactory.getSync('token');
        expect(myToken).toBe(null);
        expect(globalValues.account).toBe('');
        expect($state.go).toHaveBeenCalledWith('public.login');
        done();
    });

    it('redirectIfLoggedIn() success', function (done) {
        globalValues.token = jsonToken;
        globalValues.admin = '';
        globalValues.account = jsonUser.account;

        var url3 = '/admin/test/events';
        $httpBackend.whenGET(url3)
            .respond(201, jsonEvents);

        var promise = authenticationFactory.redirectIfLoggedIn();
        promise.then(function (response) {
            expect(response).toBe('private.account.event-list');
            expect($state.go).toHaveBeenCalledWith('private.account.event-list');
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('register() success', function (done) {
        globalValues.admin = '';
        globalValues.account = '';

        var url = '/admin/accounts';
        $httpBackend.whenPOST(url)
            .respond(201, jsonUser);

        var url = '/oauth/token';
        $httpBackend.whenPOST(url)
            .respond(201, jsonToken);

        //var promise = authenticationFactory.register(jsonUser);
        //promise.then(function (response) {
        //    expect(response).toBe('private.account.event-list');
        //    expect($state.go).toHaveBeenCalledWith('private.account.event-list');
            done();
        //});
        $httpBackend.flush();
    });

});

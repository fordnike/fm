'use strict';
describe('user.service.js', function () {
    var $httpBackend,
        globalValues,
        userFactory,
        sessionFactory,
        jwtHelper,
        $window,
        $state,
        jsonUser = {
            "firstname": "John",
            "language": "fr",
            "id": 4917421250,
            "email": "test@test.com",
            "emailvalid" : true,
            "lastname": "Doe",
            "account": "/admin/demo"
        },
        jsonUserAdmin = {
            "firstname": "John",
            "language": "fr",
            "id": 4917421250,
            "email": "test@test.com",
            "emailvalid" : true,
            "lastname": "Doe",
            "account": ""
        },
        jsonToken = {
            "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJPcnBoZXVzIiwic2ciOjQ5MTc0MTEyNTAsInVzciI6InRlc3QyQGdtYWlsLmNvbSIsImlzcyI6Ik9ycGhldXMiLCJpZCI6NDkxNzQyMTI1MCwiZXhwIjoxNDI2ODc1NzI4MzkzLCJwZXIiOiJHZ0NBQUFEQUFRRT0iLCJpYXQiOjE0MjY3ODkzMjgzOTN9.yTp1osKZ8DQqM6Qj6O1O6REaMFbXpO_Z7hquB6F7fKU",
            "token_type":"Bearer",
            "expires_in":3600,
            "refresh_token":"6nESfLcXRAzxTF1MdB6ml94G"
        },
        jsonResponse = {
            id: 'ok'
        },
        jsonResponseisEmailExisting = {
            isEmailExisting: false
        },
        jsonError = {
            "error": {
                "message": "an error"
            }
        };

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            userFactory = $injector.get('userFactory');
            globalValues = $injector.get('globalValues');
            sessionFactory = $injector.get('sessionFactory');
            jwtHelper = $injector.get('jwtHelper');
            $httpBackend = $injector.get('$httpBackend');

            $window = $injector.get("$window");
            $window.history.back = function (d) {
            };
            spyOn($window, 'history').and.callThrough();
            //$window.location.href = function (d) {
            //};
            //spyOn($window, 'location').and.callThrough();
            $state = $injector.get("$state");
            $state.go = function (d) {
            };
            spyOn($state, 'go').and.callThrough();
            sessionFactory.destroy();
        });
    });

    it('new()', inject(function (userFactory) {
        expect(userFactory.changePassword).toBeDefined();
        expect(userFactory.emailValidationRequest).toBeDefined();
        expect(userFactory.get).toBeDefined();
        expect(userFactory.goBack).toBeDefined();
        expect(userFactory.isEmailExisting).toBeDefined();
        expect(userFactory.loadUserAccount).toBeDefined();
        expect(userFactory.loadPasswordTokenFromUrl).toBeDefined();
        expect(userFactory.publicChangePassword).toBeDefined();
        expect(userFactory.update).toBeDefined();
    }));

    it('changePassword() success', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/change-password';

        $httpBackend.whenPUT(url)
            .respond(201, jsonUser);
        var promise = userFactory.changePassword(jsonUser);
        promise.then(function (response) {
            expect(response.id).toBe(4917421250);
            done();
        });
        $httpBackend.flush();
    });

    it('changePassword() error http', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/change-password';

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = userFactory.changePassword(jsonUser);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('get() success', function (done) {
        sessionFactory.destroy();
        sessionFactory.putSync('token', jsonToken);
        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url = '/admin/user/' + userId;

        $httpBackend.whenGET(url)
            .respond(201, jsonUser);
        var promise = userFactory.get();
        promise.then(function (response) {
            expect(response.id).toBe(4917421250);
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('get() error http', function (done) {
        sessionFactory.destroy();
        sessionFactory.putSync('token', jsonToken);
        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url = '/admin/user/' + userId;

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = userFactory.get();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('get() error token not set', function (done) {
        //var promise = userFactory.get();
        //promise.catch(function (error) {
        //    expect(error.id).toBe('shared.error.error');
            done();
        //});
        //$httpBackend.flush();
    });

    it('goBack()', inject(function (userFactory) {
        userFactory.goBack();
        //expect($window.history).toHaveBeenCalled();
    }));

    it('isEmailExisting() success', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email/email-existing';

        $httpBackend.whenPOST(url)
            .respond(201, jsonResponseisEmailExisting);
        var promise = userFactory.isEmailExisting(jsonUser.email);
        promise.then(function (response) {
            expect(response).toBe(false);
            done();
        });
        $httpBackend.flush();
    });

    it('isEmailExisting() error http', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email/email-existing';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = userFactory.isEmailExisting(jsonUser.email);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('loadUserAccount() admin user success', function (done) {
        sessionFactory.destroy();
        sessionFactory.putSync('token', jsonToken);
        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url = '/admin/user/' + userId;

        globalValues.account = '';
        globalValues.admin = '';
        $httpBackend.whenGET(url)
            .respond(201, jsonUserAdmin);
        var promise = userFactory.loadUserAccount();
        promise.then(function (response) {
            expect(globalValues.account).toBe(jsonUserAdmin.account);

            var currentAccount = sessionFactory.getSync('account');
            expect(currentAccount).toBe("");

            expect(response.id).toBe(4917421250);

            var isAdmin = sessionFactory.getSync('admin');


            var currentLanguage = sessionFactory.getSync('language');
            expect(currentLanguage).toBe(jsonUserAdmin.language);
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('loadUserAccount() standard user success', function (done) {
        sessionFactory.destroy();
        sessionFactory.putSync('token', jsonToken);
        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url = '/admin/user/' + userId;

        globalValues.account = '';
        globalValues.admin = '';
        $httpBackend.whenGET(url)
            .respond(201, jsonUser);
        var promise = userFactory.loadUserAccount();
        promise.then(function (response) {
            expect(globalValues.account).toBe(jsonUser.account);

            var currentAccount = sessionFactory.getSync('account');
            expect(currentAccount).toBe(jsonUser.account);

            expect(response.id).toBe(4917421250);
            expect(globalValues.admin).toBe('');

            var isAdmin = sessionFactory.getSync('admin');
            expect(isAdmin).toBe(null);

            var currentLanguage = sessionFactory.getSync('language');
            expect(currentLanguage).toBe(jsonUser.language);
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('loadUserAccount() error http', function (done) {
        sessionFactory.destroy();
        sessionFactory.putSync('token', jsonToken);
        var userDecode = jwtHelper.decodeToken(jsonToken.access_token);
        var userId = userDecode.id;
        var url = '/admin/user/' + userId;

        $httpBackend.whenGET(url)
            .respond(500, jsonError);
        var promise = userFactory.loadUserAccount();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        sessionFactory.destroy();
        $httpBackend.flush();
    });

    it('loadPasswordTokenFromUrl()', inject(function (userFactory) {
        //$window.location.href = '';
        var passwordToken = userFactory.loadPasswordTokenFromUrl('true');
        expect(passwordToken).toBe('');
    }));

    it('publicChangePassword() success', function (done) {
        var url =  '/admin/reset-password-request';

        $httpBackend.whenPUT(url)
            .respond(201, jsonResponse);
        var promise = userFactory.publicChangePassword(jsonUser.password);
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            expect($state.go).toHaveBeenCalledWith('public.login');
            done();
        });
        $httpBackend.flush();
    });

    it('publicChangePassword() error http', function (done) {
        var url =  '/admin/reset-password-request';

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = userFactory.publicChangePassword(jsonUser.password);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('emailValidationRequest() success', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email/email-existing';
        $httpBackend.whenPOST(url)
            .respond(201, jsonResponseisEmailExisting);

        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email-validation-request';
        $httpBackend.whenPOST(url)
            .respond(201, jsonResponse);
        var promise = userFactory.emailValidationRequest(jsonUser.email);
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('emailValidationRequest() error http', function (done) {
        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email/email-existing';
        $httpBackend.whenPOST(url)
            .respond(201, jsonResponseisEmailExisting);

        globalValues.userId = jsonUser.id;
        var url = '/admin/user/' + globalValues.userId + '/email-validation-request';
        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = userFactory.emailValidationRequest(jsonUser.email);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('update() success', function (done) {
        var url = '/admin/user/' + jsonUser.id;

        $httpBackend.whenPUT(url)
            .respond(201, jsonUser);
        var promise = userFactory.update(jsonUser);
        promise.then(function (response) {
            expect(response.id).toBe(jsonUser.id);
            expect($state.go).toHaveBeenCalledWith('private.user-view');
            done();
        });
        $httpBackend.flush();
    });

    it('update() error http', function (done) {
        var url = '/admin/user/' + jsonUser.id;

        $httpBackend.whenPUT(url)
            .respond(500, jsonError);
        var promise = userFactory.update(jsonUser);
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});

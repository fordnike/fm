'use strict';
describe('email.service.js', function () {
    var $httpBackend,
        emailService,
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
            emailService = $injector.get('emailService');
            $httpBackend = $injector.get('$httpBackend');
        });
    });

    it('new()', inject(function (emailService) {
        expect(emailService.emailValidation).toBeDefined();
        expect(emailService.resetPasswordRequest).toBeDefined();
    }));

    it('emailValidation() success', function (done) {
        var url = '/admin/email-validation';

        $httpBackend.whenPOST(url)
            .respond(201, jsonResponse);
        var promise = emailService.emailValidation();
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('emailValidation() error http', function (done) {
        var url = '/admin/email-validation';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = emailService.emailValidation();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

    it('resetPasswordRequest() success', function (done) {
        var url = '/admin/reset-password-request';

        $httpBackend.whenPOST(url)
            .respond(201, jsonResponse);
        var promise = emailService.resetPasswordRequest();
        promise.then(function (response) {
            expect(response.id).toBe('ok');
            done();
        });
        $httpBackend.flush();
    });

    it('resetPasswordRequest() error http', function (done) {
        var url = '/admin/reset-password-request';

        $httpBackend.whenPOST(url)
            .respond(500, jsonError);
        var promise = emailService.resetPasswordRequest();
        promise.catch(function (error) {
            expect(error.message).toBe('an error');
            done();
        });
        $httpBackend.flush();
    });

});

'use strict';
describe('wlt-spinner.js', function () {

    // WARNING: Contains testing experiments, not finalized
    // See other: https://github.com/vojtajina
    //                  /ng-directive-testing/blob/start
    //                  /test/tabsSpec.js

    beforeEach(module('nodiumApp'));

    afterEach(inject(function ($httpBackend) {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('new() as Attribute; success2', inject(function ($compile,
                                                       $rootScope,
                                                       $http, $httpBackend) {

        $httpBackend.whenGET('modules/shared/directives/wlt-spinner/spinner.html')
            .respond(200, {
                'value': '<div><img src="/images/spinner.gif" alt="spinner"></div>'
            });

        // Solution #1 - Without DOM
        var element = angular.element('<div wlt-spinner></div>');
        var compiled = $compile(element)($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
        var img = element.find('img');
        //expect(img.attr('src')).toBe("/images/spinner.gif");
        //expect(compiled.hasClass(''));
    }));

    it('new() as Attribute; success3', inject(function ($compile,
                                                       $rootScope,
                                                       $document, $httpBackend) {

        $httpBackend.whenGET('modules/shared/directives/wlt-spinner/spinner.html')
            .respond(200, {
                'value': '<div><img src="/images/spinner.gif" alt="spinner"></div>'
            });

        // Solution #2 - With DOM
        var element = angular.element('<div wlt-spinner></div>');
        var c = $compile(element)($rootScope);
        var a = angular.element($document[0].body).append(element);
        //    var body = angular.element($document[0].body);
        //    body.append(element);
        $rootScope.$digest();
        $httpBackend.flush();
        expect(document.querySelectorAll('[wlt-spinner]')).toBeDefined();
        var found = document.querySelectorAll('[wlt-spinner]');
        expect(found.length).toEqual(1);

    }));

});

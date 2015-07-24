'use strict';

describe('decorator.service.js', function () {

    var decoratorFactory,
        $rootScope;

    beforeEach(function () {
        module('nodiumApp');
        inject(function ($injector) {
            decoratorFactory = $injector.get('decoratorFactory');
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('getDecoratorMenu() success', inject(function ($rootScope) {

        expect(decoratorFactory.getDecoratorMenu).toBeDefined();
        var response = decoratorFactory.getDecoratorMenu();
        $rootScope.$digest();
        expect(response.$$state.value.menuLeft).toBeDefined();
        expect(response.$$state.value.menuLeft.length).toBeGreaterThan(3);
        expect(response.$$state.value.menuLeft[0].title).toBe('decorator.accounts');

    }));

});

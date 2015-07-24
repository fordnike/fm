'use strict';
describe('account.controller.js', function () {

    var $controller, createController, lscope, testParams, state, translatePartialSpy, translate, accountFactory, sessionFactoryMock, sessionFactory = {};

    beforeEach(module('nodiumApp'));

    //AccountController.$inject = [];
    beforeEach(inject(function (locationFactory, $injector, _$controller_, $q, $rootScope, accountFactoryMock, sessionFactoryMock) {

        $rootScope = $injector.get('$rootScope');
        lscope = $rootScope.$new();
        $controller = _$controller_;
        createController = function () {

            translatePartialSpy = jasmine.createSpyObj('translatePartialLoader', ['addPart']);
            spyOn(lscope, '$on').and.callThrough();
            translate = jasmine.createSpyObj('translate', ['refresh', 'use']);

            sessionFactory = sessionFactoryMock;
            sessionFactoryMock.installSpies();

            state = jasmine.createSpyObj('$state', ['go']);

            accountFactory = accountFactoryMock;
            accountFactoryMock.installSpies();

            //sessionFactoryMock = jasmine.createSpyObj('sessionFactoryMock', ['putSync']);
            var ctrl = $controller('AccountController', {

                $scope: lscope,
                $state: state,
                $stateParams: testParams,
                $translate: translate,
                $translatePartialLoader: translatePartialSpy,
                userFactory: {},
                sessionFactory: sessionFactoryMock,
                accountFactory: accountFactoryMock

            });
            return ctrl;
        };

    }));

    //it('new() success', inject(function ($rootScope) {

        // From ui-router documentation found, (https://github.com/angular-ui/ui-router/wiki/URL-Routing)
        // $stateParams object seems to exist.  ':id' might not be set, but the $stateParams object does exist
        //testParams = {};
        //createController();
        //$rootScope.$digest();
        //expect(lscope.update).toBeDefined();
        //expect(lscope.changeSubdomain).toBeDefined();
        //expect(translatePartialSpy.addPart).toHaveBeenCalledWith('account');
        //expect(translate.refresh).toHaveBeenCalled();
        //expect(lscope.receivedResponse).toEqual(true);
        //expect(lscope.responseSuccess).toEqual(true);
        //expect(accountFactory.getList).toHaveBeenCalled();
        //expect(lscope.$on).toHaveBeenCalled();

    //}));

    //it('changeSubdomain() success', inject(function ($rootScope) {
    //
    //    var testSubDomain = 'mySubDomain5232';
    //    testParams = {};
    //    createController();
    //    lscope.changeSubdomain(testSubDomain);
    //    expect(state.go).toHaveBeenCalledWith('private.event-list');
    //    //$rootScope.$broadcast('subdomainChange');
    //    expect(sessionFactory.putSync).toHaveBeenCalledWith('account', '/admin/' + testSubDomain, false);
    //
    //}));


});


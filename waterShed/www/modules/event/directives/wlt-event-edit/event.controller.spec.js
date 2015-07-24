//'use strict';
//
//describe('event.controller.js', function () {
//
//    var lscope,
//        createController,
//        $controller,
//        decoratorFactory,
//        translateSpy,
//        mdSidenav,
//        logSpy,
//        initSpy,
//        toggleSpy,
//        closeSpy,
//        stateSpy,
//        eventFactory,
//        stateParamsSpy,
//        translatePartialSpy,
//        listOfMenus = 'list of menus';
//
//    beforeEach(module('nodiumApp'));
//
//    beforeEach(inject(function ($injector,
//                                _$controller_,
//                                $rootScope,
//                                $q,
//                                sessionFactoryMock,
//                                eventFactoryMock) {
//
//        $rootScope = $injector.get('$rootScope');
//        lscope = $rootScope.$new();
//        $controller = _$controller_;
//
//        decoratorFactory = {};
//        decoratorFactory.getDecoratorMenu = function () {
//            var deferred = $q.defer();
//            deferred.resolve({menus: listOfMenus});
//            return deferred.promise;
//        };
//
//        sessionFactory = jasmine.createSpyObj('sessionFactory', ['getSync']);
//
//        eventFactory = eventFactoryMock;
//        eventFactoryMock.installSpies();
//
//        createController = function () {
//            translateSpy = jasmine.createSpyObj('translate', ['refresh', 'use']);
//            stateSpy = jasmine.createSpyObj('$state', ['go']);
//            logSpy = jasmine.createSpyObj('$log', ['log']);
//            stateParamsSpy = {id: 34};
//            translatePartialSpy = jasmine.createSpyObj('translatePartialLoader', ['addPart']);
//            spyOn(lscope, '$broadcast').and.callThrough();
//            spyOn(lscope, '$on').and.callThrough();
//
//            var ctrl = $controller('EventController', {
//
//                $scope: lscope,
//                $log: logSpy,
//                $stateParams: stateParamsSpy,
//                $state: stateSpy,
//                eventFactory: eventFactory,
//                $http: null,
//                $translate: translateSpy,
//                $translatePartialLoader: translatePartialSpy,
//                sessionFactory: sessionFactory
//
//            });
//            return ctrl;
//        };
//
//    }));
//
//
//    //it('new() success ', function () {
//    //
//    //    eventFactory.setData({
//    //        data: {
//    //            "attr": "value"
//    //        }
//    //    });
//    //    createController();
//    //    expect(lscope.updateEvent).toBeDefined();
//    //    expect(lscope.cancelEvent).toBeDefined();
//    //    expect(lscope.publishEvent).toBeDefined();
//    //    //expect(lscope.addPrice).toBeDefined();
//    //    expect(translatePartialSpy.addPart).toHaveBeenCalledWith('event');
//    //    expect(translateSpy.refresh).toHaveBeenCalled();
//    //    expect(lscope.receivedResponse).toBeFalsy();
//    //    expect(lscope.responseSuccess).toBeFalsy();
//    //
//    //    lscope.$root.$digest();
//    //
//    //    //expect(lscope.$on).toHaveBeenCalled();
//    //
//    //});
//    //
//    //it('$on() message received ', inject(function ($rootScope) {
//    //
//    //    createController();
//    //    //expect(lscope.$on).toHaveBeenCalled();
//    //    $rootScope.$broadcast('accountChange');
//    //    //expect(sessionFactory.getSync).toHaveBeenCalledWith('language', false);
//    //
//    //}));
//    //
//    //it('updateEvent() success', inject(function ($rootScope) {
//    //
//    //    lscope.event = {};
//    //    lscope.event.eventStart = "01/01/2015, 00:00";
//    //    createController();
//    //    lscope.updateEvent();
//    //    lscope.$root.$digest();
//    //
//    //}));
//
//});
//
//

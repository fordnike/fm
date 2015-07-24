//'use strict';
//
//describe('decorator.controller.js', function () {
//
//    var lscope, createController, $controller, decoratorFactory, translate,
//        mdSidenav, initSpy, toggleSpy, closeSpy, stateSpy, translatePartialSpy, resolvedWithData, mockSuccess,
//        listOfMenus = 'list of menus', sessionFactory = {}, element;
//
//    beforeEach(module('nodiumApp'));
//
//    beforeEach(inject(function ($injector, _$controller_, $rootScope, $q, sessionFactoryMock, userFactory,
//                                accountFactory, authenticationFactory, _$compile_) {
//
//        $rootScope = $injector.get('$rootScope');
//        var $compile = _$compile_;
//        lscope = $rootScope.$new();
//        //element = $compile('wlt-decorator-private')(lscope);
//        //lscope.digest();
//        $controller = _$controller_;
//
//        authenticationFactory = {};
//        authenticationFactory.logout = function () {
//        };
//
//        decoratorFactory = {};
//        decoratorFactory.getDecoratorMenu = function () {
//            var deferred = $q.defer();
//            deferred.resolve({menuLeft: listOfMenus});
//            return deferred.promise;
//        };
//
//        sessionFactory = sessionFactoryMock;
//        sessionFactoryMock.installSpies();
//
//        userFactory.get = function () {
//            var deferred = $q.defer();
//            if (mockSuccess == true) {
//                deferred.resolve(resolvedWithData);
//            } else {
//                deferred.reject('Error');
//            }
//            return deferred.promise;
//        };
//
//        accountFactory.get = function () {
//            var deferred = $q.defer();
//            if (mockSuccess == true) {
//                deferred.resolve({ website: { logo: ""}});
//            } else {
//                deferred.reject('Error');
//            }
//            return deferred.promise;
//        };
//
//        lscope.changeLanguage = function() {
//            return ('ok');
//        };
//
//        createController = function () {
//            translate = jasmine.createSpyObj('translate', ['refresh', 'use']);
//            initSpy = jasmine.createSpy('iniMd');
//            toggleSpy = jasmine.createSpy('toggleSpy');
//            //changeLanguage = jasmine.createSpy('changeLanguage');
//            closeSpy = jasmine.createSpy('closeSpy');
//            stateSpy = jasmine.createSpyObj('$state', ['go']);
//            translatePartialSpy = jasmine.createSpyObj('translatePartialLoader', ['addPart']);
//            spyOn(lscope, '$broadcast').and.callThrough();
//            spyOn(lscope, '$on').and.callThrough();
//            spyOn(decoratorFactory, 'getDecoratorMenu').and.callThrough();
//
//            mdSidenav = function (data) {
//                initSpy(data);
//                return {
//                    toggle: function () {
//                        var deferred = $q.defer();
//                        deferred.resolve('Done');
//                        return deferred.promise;
//                    },
//                    close: function () {
//                        var deferred = $q.defer();
//                        deferred.resolve('Done');
//                        return deferred.promise;
//                    }
//                }
//            }
//
//            var service ={
//                decodeToken: function(a){
//                    return { id: 5 };
//                }
//            };
//
//            var ctrl = $controller('DecoratorPrivateController', {
//
//                $scope: lscope,
//                $translate: translate,
//                $translatePartialLoader: translatePartialSpy,
//                sessionFactory: sessionFactory,
//                accountFactory: accountFactory,
//                $state: stateSpy,
//                $mdSidenav: mdSidenav,
//                jwtHelper: service,
//                decoratorFactory: decoratorFactory,
//                authenticationFactory: authenticationFactory,
//                userFactory: userFactory
//            });
//            return ctrl;
//        };
//
//    }));
//
//
//    it('new() success ', function () {
//        //resolvedWithData = {
//        //    data: {
//        //        'firstname': 1,
//        //        'lastname': 1,
//        //        'name': 'Théâtre St-Denis'
//        //    }
//        //};
//        //
//        //mockSuccess = true;
//        //createController();
//        //lscope.$root.$digest();
//        //expect(lscope.logout).toBeDefined();
//        //expect(lscope.changeLanguage).toBeDefined();
//        //expect(lscope.toggleLeft).toBeDefined();
//        //expect(lscope.toggleRight).toBeDefined();
//        //expect(lscope.close).toBeDefined();
//        //expect(lscope.subdomain).toMatch('');
//        //expect(translatePartialSpy.addPart).toHaveBeenCalledWith('decorator');
//        //expect(lscope.$on).toHaveBeenCalled();
//        //expect(decoratorFactory.getDecoratorMenu).toHaveBeenCalled();
//        //expect(lscope.menuLeft).toMatch(listOfMenus);
//
//    });
//
//    //it('$on() message received ', inject(function ($rootScope) {
//    //
//    //    createController();
//    //    expect(lscope.$on).toHaveBeenCalled();
//    //    $rootScope.$broadcast('accountChange');
//    //    //expect(sessionFactory.getSync).toHaveBeenCalledWith('account', false);
//    //
//    //}));
//    //
//    //it('toggleLeft() success ', function () {
//    //
//    //    createController();
//    //    lscope.$root.$digest();
//    //    lscope.toggleLeft();
//    //    expect(initSpy).toHaveBeenCalledWith('left');
//    //
//    //});
//    //
//    //it('toggleRight() success ', function () {
//    //
//    //    createController();
//    //    lscope.$root.$digest();
//    //    lscope.toggleRight();
//    //    expect(initSpy).toHaveBeenCalledWith('right');
//    //
//    //});
//    //
//    //it('close() success ', function () {
//    //
//    //    createController();
//    //    lscope.$root.$digest();
//    //    lscope.close();
//    //    expect(initSpy).toHaveBeenCalledWith('right');
//    //    expect(initSpy).toHaveBeenCalledWith('left');
//    //
//    //});
//    //
//    //it('logout() success ', function () {
//    //
//    //    createController();
//    //    lscope.$root.$digest();
//    //    lscope.logout();
//    //    //expect(stateSpy.go).toHaveBeenCalledWith('public.login');
//    //    expect(lscope.$on).toHaveBeenCalledWith('accountChange', jasmine.any(Function));
//    //
//    //});
//
//});
//

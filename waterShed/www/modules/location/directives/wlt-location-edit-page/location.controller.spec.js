'use strict';
describe('location.controller.js', function () {

    var $controller, $controller, resolvedWithData, rejectWithError, createController, locationFactory,
        testParams, state, http, translatePartialLoader, $rootScope, lscope, mockSuccess;

    beforeEach(module('nodiumApp'));

    // locationFactory must be mocked to properly test the LocationController
    beforeEach(inject(function (locationFactory, $injector, _$controller_, $q) {

        //$rootScope = $injector.get('$rootScope');
        //lscope = $rootScope.$new();
        //
        //// Fetching the AngularJS service provider to instantiate a controller
        //$controller = _$controller_;
        //
        //
        //locationFactory.get = function () {
        //    var deferred = $q.defer();
        //    if (mockSuccess == true) {
        //        deferred.resolve(resolvedWithData);
        //    } else {
        //        deferred.reject(rejectWithError);
        //    }
        //    return deferred.promise;
        //};
        //
        //spyOn(locationFactory, 'getList').and.callFake(function () {
        //    var deferred = $q.defer();
        //    if (mockSuccess == true) {
        //        deferred.resolve( { data : 'List of locations' });
        //    } else {
        //        deferred.reject(rejectWithError);
        //    }
        //    return deferred.promise;
        //});
        //
        //createController = function () {
        //    var ctrl = $controller('LocationController', {
        //
        //        $scope: lscope,
        //        $log: console.log,
        //        $stateParams: testParams,
        //        $state: state,
        //        locationFactory: locationFactory,
        //        $http: http,
        //        $translate: jasmine.createSpyObj('translate', ['refresh']),
        //        $translatePartialLoader: jasmine.createSpyObj('translatePartialLoader', ['addPart'])
        //
        //    });
        //    return ctrl;
        //};

    }));

    // Angular overwrites components of the same name with a last-come first-served strategy OR last wins.
    //it('get() success ', function () {
    //    testParams = {id: 10};
    //    resolvedWithData = {
    //        data: {
    //            'id': 1,
    //            'networkId': 1,
    //            'name': 'Théâtre St-Denis'
    //        }
    //    };
    //    mockSuccess = true;
    //    createController();
    //    lscope.$root.$digest();
    //    expect(lscope.receivedResponse).toBe(true);
    //    expect(lscope.responseSuccess).toBe(true);
    //    expect(lscope.location.id).toBe(1);
    //    expect(lscope.location.networkId).toBe(1);
    //    expect(lscope.location.name).toMatch('Théâtre St-Denis');
    //
    //});
    //
    //it('get() error', function () {
    //    testParams = {id: 10};
    //    mockSuccess = false;
    //    rejectWithError = {
    //        data: {
    //            error: {
    //                message: 'Error text'
    //            }
    //        },
    //        status: 404
    //    };
    //    createController();
    //    lscope.$root.$digest();
    //    expect(lscope.receivedResponse).toBe(true);
    //    expect(lscope.responseSuccess).toBe(false);
    //    expect(lscope.location).toBeUndefined();
    //});
    //
    //
    //it('getList() success ', function () {
    //    testParams = {id: 0};
    //    mockSuccess = true;
    //
    //    createController();
    //    lscope.$root.$digest();
    //    expect(lscope.receivedResponse).toBe(true);
    //    expect(lscope.responseSuccess).toBe(true);
    //    expect(lscope.locations.data).toMatch('List of locations');
    //});
    //
    //
    //it('getList() error ', function () {
    //    testParams = {id: 0};
    //    mockSuccess = false;
    //    rejectWithError = {
    //        data: {
    //            error: {
    //                message: 'Error text'
    //            }
    //        },
    //        status: 404
    //    };
    //    createController();
    //    lscope.$root.$digest();
    //    expect(lscope.receivedResponse).toBe(true);
    //    expect(lscope.responseSuccess).toBe(false);
    //    expect(lscope.location).toBeUndefined();
    //});

});

(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$log', '$stateParams', '$state', 'reportFactory', '$http', '$translate', '$translatePartialLoader', 'globalValues'];

    function ReportController($scope, $log, $stateParams, $state, reportFactory, $http, $translate, $translatePartialLoader, globalValues) {

        $translatePartialLoader.addPart('report');
        $translate.refresh();

        $scope.admin = globalValues.admin;
        $scope.subdomain = globalValues.subdomain;

        var reportId = parseInt($stateParams.id, 10);

        $scope.startDate = "2015-02-02";
        $scope.endDate = "2015-04-02";

        if (reportId > 0) {

            reportFactory.get(reportId)
                .then(function (response) {
                if (response.data !== null) {
                    $scope.isVisible = true;
                    $scope.loaded = true;
                    $scope.report = angular.copy(response.data);
                }
                else {
                    $scope.isVisible = true;
                    $scope.loaded = true;
                    $scope.errMsg = response.data.error || response.data;
                    console.log('no data available');
                }
            });
        }

        $scope.submit = function () {
            reportFactory.getResult();
        }
    }

})();

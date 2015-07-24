(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltReportList', wltReportList);

    wltReportList.$inject = ['reportFactory', 'globalFactory', 'globalValues'];

    function wltReportList(reportFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-report-list/report-dashboard.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: ReportListLink
        };

        return directive;

        function ReportListLink(scope, element, attrs) {
            scope.setSearchMode = setSearchMode;
            scope.showReport = showReport;
            scope.submitReport = submitReport;
            scope.cancelReport = cancelReport;

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;
            scope.showSearchBox = false;
            scope.hideList = false;
            scope.search = '';
            scope.reportType = '';
            scope.filtered = '';

            scope.events = [];
            scope.startDate = "2015-02-02";
            scope.endDate = "2015-06-02";

            init();

            function init() {
                globalFactory.loadTranslation('report');

                //reportFactory.getList()
                //    .then(function (response) {
                //        scope.receivedResponse = true;
                //        scope.responseSuccess = true;
                //        scope.reports = angular.copy(response);
                //    })
                //    .catch(function (error) {
                //        scope.receivedResponse = true;
                //        scope.responseSuccess = false;
                //        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                //    });
            }

            function setSearchMode() {
                scope.showSearchBox = !scope.showSearchBox;
                cancelReport();
            }

            function showReport(report){
                scope.hideList = true;
                scope.search = report.searchable;
                scope.showSearchBox = false;
                scope.reportType = report.reportType;
                scope.selectedReport = report;
            }

            function submitReport(){
                reportFactory.postReport(scope.selectedReport, scope.startDate, scope.endDate, scope.events, scope.output)
                    .then(function (response) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = true;
                        scope.result = angular.copy(response);
                    })
                    .catch(function (error) {
                        scope.receivedResponse = true;
                        scope.responseSuccess = false;
                        scope.message = globalFactory.formatMessage('danger', 'shared.error.fetch', error);
                    });
            }

            function cancelReport(){
                scope.search = '';
                scope.hideList = false;
                scope.reportType = '';
                scope.selectedReport = '';
            }
        }
    }

})();
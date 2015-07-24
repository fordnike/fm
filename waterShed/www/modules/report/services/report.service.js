(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('reportFactory', reportFactory);

    reportFactory.$inject = ['$q', 'httpFactory', '$window'];

    function reportFactory($q, httpFactory, $window) {
        return {
            getList: getListReport,
            getResult: getResult,
            postReport: postReport
        };

        function postReport(selectedReport, startDate, endDate, events, output) {
            var deferred = $q.defer();
            var dataForm = {
                debut2: startDate,
                fin2: endDate,
                output: output,
                page: '/rapport/report-' + selectedReport.code,
                timezone: 'Canada/Eastern',
                reportParams: true,
                finalStep: true
            };

            console.log(dataForm);
            console.log(events);

            for (var i = 0; i < events.length; i++) {
                dataForm.push('performances: ' + events.id);
            }
            console.log(dataForm);
            //var url = '/rapport/dashboard.html';
            //var url = 'https://9tix.com/rapport/dashboard.html';
            var url = '/report/dashboard';
            var url2 = '/report/getProgression';
            var url3 = 'modules/report/partials/retrieveReport.html';

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    //console.log(response);
                    var dataForm2 = {
                        id: response
                    };

                    httpFactory.HTTP(url2, dataForm2, 'POST')
                        .then(function (response2) {
                            //console.log(response2);
                            if (response2.data === 100) {
                                deferred.resolve(response2.data);
                                $window.open(url3,'_blank');
                            }
                        })
                        .catch(function (error) {
                            deferred.reject(error);
                        });
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getListReport() {
            var deferred = $q.defer();
            var dataForm = {};
            var url = '/report/listReports_newUser';
            //var url = 'https://9tix.com/rapport/reports';
            //var url = '/rapport/reports';

            httpFactory.HTTP(url, dataForm, 'GET')
                .then(function (response) {

                    var tab = [];
                    if (response.data !== null) {
                        var listReports = angular.copy(response.data);
                        //console.log(listReports);
                        if (angular.isArray(listReports.menus)) {
                            angular.forEach(listReports.menus, function (value1) {
                                //console.log("Menu 1 : " + value1.title);
                                if (angular.isArray(value1.menus)) {
                                    angular.forEach(value1.menus, function (value2) {
                                        //console.log("Menu 2 : " + value2.title);
                                        if (angular.isArray(value2.reports)) {
                                            angular.forEach(value2.reports, function (value3) {
                                                //console.log("Report 2 : " + value3.title);
                                                //console.log("Report 1 : " + value3.title + ' - ' + value2.title);
                                                value3.category = value1.title;
                                                value3.subCategory = value2.title;
                                                value3.searchable = value3.code + ' ' + value3.title + ' ' + value3.category + ' ' + value3.subCategory + ' ' + value3.description;
                                                //console.log(value3);
                                                tab.push(value3);
                                            });
                                        }
                                    });
                                }
                                if (angular.isArray(value1.reports)) {
                                    angular.forEach(value1.reports, function (value4) {
                                        //console.log("Report 1 : " + value4.title + ' - ' + value1.title);
                                        value4.category = value1.title;
                                        value4.searchable = value4.code + ' ' + value4.title + ' ' + value4.category + ' ' + value4.description;
                                        tab.push(value4);
                                    });
                                }
                            });
                        }
                    }
                    else {
                        console.log('no data available');
                    }
                    deferred.resolve(tab);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getResult() {
            var deferred = $q.defer();
            var dataForm = {};
            //var url = "localhost:8080/rapport/dashboardReport.html?lang=fr&reportNumber=50&timezone=5&DateDebut=20/03/2015";
            var url = "/rapport/dashboardReport.html?lang=fr&reportNumber=50&timezone=5&DateDebut=20/03/2015";

            return httpFactory.HTTP(url, dataForm, 'GET');
        }

    }

})();

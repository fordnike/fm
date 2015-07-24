(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('previousStateFactory', previousStateFactory);

    previousStateFactory.$inject = ['$rootScope', '$state'];

    function previousStateFactory($rootScope, $state) {
        var previous,
            lastPrevious,
            memos = {};


        $rootScope.$on('$stateChangeStart', function (evt, to, toParams, from, fromParams) {
            lastPrevious = previous;
            previous = {state: from, params: fromParams};
        });

        $rootScope.$on('$stateChangeSuccess', function () {
            previous = lastPrevious;
            lastPrevious = null;
        });

        $rootScope.$on('$stateChangeError', function () {
            lastPrevious = null;
        });

        var provider = {
            get: function (memoName) {
                return memoName ? memos[memoName] : previous;
            },
            go: function (memoName) {
                console.log('previousStateFactory.go');
                var to = provider.get(memoName);
                console.log(to);
                return $state.go(to.state.name, to.params);
            },
            memo: function (memoName, state, stateParams) {
                if (memoName) {
                    if (arguments.length > 1) {
                        memos[memoName] = {state: state, params: stateParams};
                    } else {
                        memos[memoName] = previous;
                    }
                }
            }
        };

        return provider;
    }

})();

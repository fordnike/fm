'use strict';

angular
    .module('nodiumApp')
    .factory('oauthFactory', oauthFactory);

oauthFactory.$inject = ['globalValues', '$http'];

function oauthFactory(globalValues) {
    return {
        isAuthenticated: isAuthenticated,
        getAuthenticationToken: getAuthenticationToken,
        deleteAuthentication: deleteAuthentication,
        isPublicAuthorizationAllowed:isPublicAuthorizationAllowed
    };


    function isAuthenticated() {
        if (isOauthStructureInitializedAndNotNull()
            && isAccessTokenDefinedAndNotNull()
            && isPrivateAuthorizationAllowed() ){
            return true;
        }
        return false;
    }

    function deleteAuthentication(){
        delete globalValues.token;
    }

    function isPublicAuthorizationAllowed(){
        if (isOauthStructureInitializedAndNotNull() && isAccessTokenSet() ){
            return true;
        }
        return false;
    }

    function isPrivateAuthorizationAllowed(){
        if ( angular.isDefined(globalValues.token.access_token) && globalValues.token.access_token !== null ){ // Or matching a certain pattern
            return true;
        }
        return false;
    }


    function isOauthStructureInitializedAndNotNull(){
        if ( globalValues.token !== undefined && globalValues.token !== null ){
            return true;
        } else  {
            return false;
        }

    }

    function isAccessTokenDefinedAndNotNull(){
        if ( angular.isDefined(globalValues.token.access_token) && globalValues.token.access_token !== null ) {
            return true;
        }
        return false;
    }

    function isAccessTokenSet(){
        if ( angular.isDefined(globalValues.token.access_token) && globalValues.token.access_token !== '') {
            return true;
        }
        return false;
    }

    function getAuthenticationToken(){
        if (isAuthenticated()) return globalValues.token.access_token;
    }



}

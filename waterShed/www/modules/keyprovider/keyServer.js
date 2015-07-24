

function KeyServer(a, b){

    this.maxKeysPerSecond = 0;
    this.keysInCurrentSecond = 0;
}

KeyServer.prototype.getKey = function(request){
    var response = {
        key: 0,
        queue: 0,
        waitId: 0,
        eta: 0
    };

    if ( this.keysInCurrentSecond <= this.maxKeysPerSecond ){
        response.key = 0;
        response.queue = 0;
        return response;
    }
    this.keysInCurrentSecond++;
    response.key = this.createKey(request);
    return
};


KeyServer.prototype.setNumberOfClients = function(qte){
    this.maxKeysPerSecond = qte;
};

KeyServer.prototype.getEvent = function(request){
    var response = {
        queueNumber: 0,
        aheadOfYou: 0,
        queueMessage: 0,
        onsale: new Date(),
        onsaleMessage: 0,
        key: 0
    };
    return response;
};

KeyServer.prototype.createKey = function(request){
    var key  = "key [" + request.ip + "+" + request.userAgent;
    return key;
};


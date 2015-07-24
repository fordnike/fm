'use strict';
describe('key.service.js', function () {

    it('Server refuse a request', function() {
        var keyServer = new KeyServer("", "");
        var request = {
            ip:"192.168.2.120",
            userAgent: "Mozilla/5.0...Mobile Safari..."
        };
        keyServer.setNumberOfClients(0);
        var response = keyServer.getKey(request);
        expect(response.key).toBe(0);
        expect(response.queue).toBe(0);

    });


    it('Server response to a request with a key', function() {
        var keyServer = new KeyServer("", "");
        var request = {
            ip:"192.168.2.120",
            userAgent: "Mozilla/5.0...Mobile Safari..."
        };
        keyServer.setNumberOfClients(1);
        var response = keyServer.getKey(request);
        expect(response.key).toBe(0);
        expect(response.queue).toBe(0);

        var eventRequest = {
            eventId: 234,
            key: response.queue
        };
        var eventGet = keyServer.getEvent(eventRequest);

    });
});

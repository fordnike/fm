// VENUE //
Venue.prototype = jor;
function Venue(json, kineticParent) {
    var self = this;
    this.json = json;
    this.nodeType = "venue";
    this.kinetic = {};
    this.seatCount = 0;
    this.parent = {
        kinetic : {
            group : kineticParent
        }
    };
    // this.canContain = [ "images => Picture", "levels => Level", "labels =>
    // Label" ];
    this.canContain = [ "levels => Level", "labels => Label" ];
    this.createListeners = noFunction;
    this.createKinetics = function() {
        debug("Venue createKinetics");
        self.kinetic.poly = new Kinetic.Line({
            points : [ 0, 300, 0, 0, 300, 0 ],
            stroke : 'white',
            strokeWidth : 2,
            lineCap : 'round',
            lineJoin : 'round'
        });
        self.kinetic.group.add(self.kinetic.poly);
        try {
            window.Editor.init();
        } catch (e) {
            debug(e);
        }
    };
    this.updateSelf = function() {
        if (self.json.zoomable === undefined) {
            self.json.zoomable = true;
        }
        if (self.json.name !== undefined) {
            document.title = self.json.name;
        } else {
            document.title = "Untitled";
        }
    };
    this.addLevel = function() {
        var newLevel = {
            name : "New level",
            x : "1",
            y : "1"
        };
        if (self.json.levels === undefined) {
            self.json.levels = [];
        }
        self.json.levels.push(newLevel);
        self.updateChildren();
        Editor.addToSelect(newLevel.editor);
    };
}

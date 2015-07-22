/**
 * Created by frah-nabil on 2015-07-19.
 */
SectionGroups.prototype = jor;
function SectionGroups(arraySrc, arrayIndex, parent) {
    var self = this;
    this.nodeType = "sectionGroups";
    this.canContain = [ "sections => Section", "images => Picture", "labels => Label" ];
    this.arraySrc = arraySrc;
    this.arrayIndex = arrayIndex;
    this.parent = parent;
    this.kinetic = {};
    this.relative = {};
    this.json = this.arraySrc[this.arrayIndex];
    this.createKinetics = function() {
        self.kinetic.label = new Kinetic.Text({
            x : 0,
            y : 0,
            fontFamily : 'IMPACT',
            fontSize : 22,
            text : self.json.name || "?",
            selectable : false,
            fill : 'white',
            // stroke: 'black',
            // strokeWidth: 0.5,
            editor : self
        });
        self.kinetic.poly = new Kinetic.Polygon({
            points : [ -10, -30, 0, 0, -30, -10 ],
            fill : Constants.seat.levelColor,
            // stroke: 'black',
            // strokeWidth: 1,
            selectable : false,
            opacity : 0,
            editor : self
        });
        self.kinetic.group.add(self.kinetic.poly);
        self.kinetic.label.setOffset({
            x : 0,
            y : self.kinetic.label.getHeight() * 2
        });
        self.kinetic.group.add(self.kinetic.label);
    };

}

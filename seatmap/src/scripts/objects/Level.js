Level.prototype = jor;
function Level(arraySrc, arrayIndex, parent) {
    var self = this;
    this.nodeType = "level";
    this.canContain = ["sectionGroups => SectionGroups",  "images => Picture", "labels => Label" ];
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
    this.addSection = function() {
        Main.showSectionLabels = true;
        if (self.json.sections === undefined) {
            self.json.sections = [];
        }
        self.json.sections.push({
            name : "S" + (self.json.sections.length + 1),
            y : (self.json.sections.length > 0 ? "+1" : "0")
        });
        var index = self.json.sections.length - 1;
        var no = self.json.sections[index];
        no.editor = new Section(self.json.sections, index, self);
        no.editor.build();
        Editor.addToSelect(no.editor);
        Editor.addToSelect(no.editor.parent);
        return no.editor;
    };
}

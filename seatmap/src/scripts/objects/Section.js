Section.prototype = jor;
function Section(arraySrc, arrayIndex, parent) {
    var self = this;
    this.nodeType = "section";
    this.canContain = [ "rows => Row", "tables => Table", "images => Picture", "labels => Label" ];
    this.arraySrc = arraySrc;
    this.arrayIndex = arrayIndex;
    this.json = this.arraySrc[this.arrayIndex];
    this.selected = false;
    this.parent = parent;
    this.relative = {};
    this.kinetic = {};
    this.createKinetics = function() {
        self.kinetic.label = new Kinetic.Text({
            x : 0,
            y : 0,
            fontFamily : 'IMPACT',
            fontSize : 18,
            text : self.json.name || "?",
            selectable : false,
            fill : '#fff',
            // stroke: '#000',
            // strokeWidth: 0.5,
            editor : self
        });
        self.kinetic.label.setOffset({
            x : 0,
            y : self.kinetic.label.getHeight() * 1
        });
        self.kinetic.group.add(self.kinetic.label);
        self.kinetic.poly = new Kinetic.Rect({
            x : 0,
            y : 0,
            width : Constants.seat.spacing,
            height : Constants.seat.spacing,
            selectable : false,
            draggable : false,
            fill : "rgba(255,200,64,.1)",
            // stroke: "#fff",
            opacity : 0,
            name : "sectionArea",
            editor : self
        });
        if (!Main.visibility.editorPolygons) {
            self.kinetic.poly.hide();
        }
        self.kinetic.group.add(self.kinetic.poly);
    };
    this.addRows = function() {
        if (self.json.rows !== undefined) {
            for (var i = 0; i < self.json.rows.length; i++) {
                new Row(self.json.rows, i, self.kinetic.group);
            }
        }
    };
    this.clone = function() {
        notif("Copy of " + self.json.name + "...", "#88f");
        var clone = self.parent.addSection();
        clone.json.name = "Copy of " + self.json.name;
        clone.json.x = "0";
        clone.json.y = "0";
        clone.json.rows = JSON.parse(JSON.stringify(self.json.rows, Main.orpheusJsonMode));
        clone.addRows();
        Main.rebuildFromJson();
        notif("New section " + clone.json.name, "#0f0");
    };
    this.addRow = function() {
        var input = prompt("Row names (ex R1..16 ; G..B; RowZ..T)", "A..J");
        var regex = /^([^\.0-9]*)([A-Z]|[0-9]+)\.\.([A-Z]|[0-9]+)$/;
        var rLabel = input + "";
        var rStart = 1;
        var rEnd = 1;
        var rMode = "Plain";
        if (regex.test(input)) {
            var get = regex.exec(input);
            rLabel = get[1];
            rStart = get[2];
            rEnd = get[3];
            rMode = "Number";
            if (!/^[0-9]+$/.test(rStart)) {
                rMode = "String";
                rStart = Constants.preset.alpha.indexOf(rStart);
                rEnd = Constants.preset.alpha.indexOf(rEnd);
            } else {
                rStart = parseFloat(rStart);
                rEnd = parseFloat(rEnd);
            }
        }
        Main.showRowLabels = true;
        if (self.json.rows === undefined) {
            self.json.rows = [];
        }
        var step = rStart;
        // console.log(rLabel, rStart, rEnd, rMode);
        var doLoop = (function() {
            var newName = rLabel;
            try {
                if (rMode === "String")
                    newName += Constants.preset.alpha[step];
                else
                    newName += "" + step;
            } catch (e) {
            }
            var ty = "0";
            if (self.json.rows.length === 1)
                ty = "+1";
            if (self.json.rows.length > 1)
                ty = undefined;
            self.json.rows.push({
                name : newName,
                y : ty
            });
            var index = self.json.rows.length - 1;
            new Row(self.json.rows, index, self.kinetic.group);
            step += mathDir(rEnd - rStart);
        });
        while (step !== rEnd) {
            doLoop();
        }
        doLoop();
        Main.rebuildFromJson();
        try {
            Editor.addToSelect(self.json.rows[index + 1 - rEnd].editor);
            Editor.addToSelect(self.json.rows[index + 1 - rEnd].editor.parent);
            Editor.addToSelect(self.json.rows[index + 1 - rEnd].editor.parent.parent);
        } catch (e) {

        }
    };
}

function noFunction() {
}
var jor = new JsonObjectsReferences();
function JsonObjectsReferences() {
    this.allObjects = {};
    this.childrenOf = {};
    this.selected = false;
    this.firstBuild = true;
    this.getParams = function(params) {
        if (params === undefined)
            params = {};
        for ( var i in params) {
            this[i] = params[i];
        }
    };
    this.build = function() {
        this.childrenOf[this.nodeType] = {
            x : "1",
            y : "1",
            rotation : "0",
            radius : "0",
            magicRow : "",
            index : 0
        };
        this.moveSingleObjectToArray("image", "images");
        this.moveSingleObjectToArray("label", "labels");
        if (this.firstBuild === true) {
            // debug([ "creation " + this.nodeType, this ]);
            this.createKineticAnchor();
            this.createKinetics();
            this.createListeners();
            if (this.allObjects[this.nodeType] === undefined) {
                this.allObjects[this.nodeType] = [];
            }
            this.allObjects[this.nodeType].push(this);
        } else {
            // debug([ "updating " + this.nodeType, this ]);
        }
        this.updateSelf();
        this.updateChildren();
        this.firstBuild = false;
        return this;
    };
    this.createKineticAnchor = function() {
        this.kinetic.pivot = new Kinetic.Group({
            x : this.midX,
            y : this.midY
        });
        this.kinetic.group = new Kinetic.Group({
            x : 0,
            y : 0,
            draggable : true,
            name : this.json.name || "?",
            editor : this
        });
        this.kinetic.pivot.add(this.kinetic.group);
        this.parent.kinetic.group.add(this.kinetic.pivot);
    };
    this.moveSingleObjectToArray = function(singleObj, targetArray) {
        if (this.json === undefined) {
            return;
        }
        if (this.json[singleObj] !== undefined) {
            if (this.json[targetArray] === undefined) {
                this.json[targetArray] = [];
            }
            this.json[targetArray].push(this.json[singleObj]);
            delete this.json[singleObj];
        }
    };
    this.paintSelection = function(color) {
        var shapes = this.kinetic.group.find('.seatCircle');
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].parent.paint(color);
        }
    };
    this.createListeners = function() {
        var self = this;
        self.kinetic.group.on('click', function(evt) {
            Editor.addToSelect(self);
        });
        self.kinetic.group.on('mouseover', function(evt) {
            document.body.style.cursor = 'pointer';
            if (self.kinetic.label !== undefined) {
                self.kinetic.label.setOpacity(1);
                self.kinetic.label.setFill("#ff0");
            }
            if (self.kinetic.poly !== undefined) {
                self.kinetic.poly.setOpacity(0.75);
            }
            Main.layer.draw();
        });
        self.kinetic.group.on('mouseout', function(evt) {
            document.body.style.cursor = 'default';
            if (self.kinetic.label !== undefined) {
                self.kinetic.label.setOpacity(0.8);
                self.kinetic.label.setFill("#fff");
            }
            if (self.kinetic.poly !== undefined) {
                self.kinetic.poly.setOpacity(0);
            }
            Main.layer.draw();
        });
        self.kinetic.group.on('dragstart', function() {
            Editor.addToSelect(self);
            document.body.style.cursor = 'move';
        });
        self.kinetic.group.on('dragmove', function(evt) {
            var grid = 0.001;
            if (evt.shiftKey) {
                grid = 1;
            }
            var x = roundBy(self.kinetic.group.attrs.x / Constants.seat.spacing, grid);
            var y = roundBy(self.kinetic.group.attrs.y / Constants.seat.spacing, grid);
            self.kinetic.group.setPosition(x * Constants.seat.spacing, y * Constants.seat.spacing);
            self.json.x = "" + x;
            self.json.y = "" + y;
        });
        self.kinetic.group.on('dragend', function() {
            document.body.style.cursor = 'default';
            var next = self.arraySrc[self.arrayIndex + 1];
            if (next !== undefined && next.editor.json.y === undefined) {
                next.editor.json.y = "+1";
            }
            Editor.prepareToBuildFromJson();
        });
    };
    this.updateSelf = function() {
        this.childrenOf[this.nodeType] = {
            x : "0",
            y : "0",
            rotation : "0",
            radius : "0",
            magicRow : ""
        };
        delete this.minX;
        delete this.minY;
        delete this.midX;
        delete this.midY;
        delete this.maxX;
        delete this.maxY;

        this.relative = {
            editor : {}
        };
        if (this.arrayIndex > 0) {
            this.relative = this.arraySrc[this.arrayIndex - 1].editor;
        }

        // this.childrenOf[this.parent.nodeType].index += 1;
        mergeObjectVars(this.json, this.childrenOf[this.parent.nodeType], [ 'index', 'x', 'y', 'rotation', 'radius' ]);
        this.x = relativeMath(this.childrenOf[this.parent.nodeType].x, this.relative.x);
        this.y = relativeMath(this.childrenOf[this.parent.nodeType].y, this.relative.y);
        this.radius = relativeMath(this.childrenOf[this.parent.nodeType].radius, this.relative.radius);
        this.rotation = this.json.rotation || 0;
        this.seatCount = 0;
        if (this.nodeType === "level") {
            this.updateChildren();
            updateParentSize(this.parent, this.minX + this.x * Constants.seat.spacing, this.minY + this.y * Constants.seat.spacing);
            updateParentSize(this.parent, this.maxX + this.x * Constants.seat.spacing, this.maxY + this.y * Constants.seat.spacing);
        }
        if (this.nodeType === "section") {
            this.updateChildren();
            updateParentSize(this.parent, this.minX + this.x * Constants.seat.spacing, this.minY + this.y * Constants.seat.spacing);
            updateParentSize(this.parent, this.maxX + this.x * Constants.seat.spacing, this.maxY + this.y * Constants.seat.spacing);
            this.kinetic.poly.setPosition(this.minX + 1, this.minY + 1);
            this.kinetic.poly.setSize(this.maxX - this.minX, this.maxY - this.minY);
        }
        if (this.nodeType === "row") {
            this.rotation = relativeMath(this.childrenOf[this.parent.nodeType].rotation, this.relative.rotation);
            this.updateChildren();
            updateParentSize(this.parent, this.minX + this.x * Constants.seat.spacing, this.minY + this.y * Constants.seat.spacing);
            updateParentSize(this.parent, this.maxX + (this.x + 1) * Constants.seat.spacing, this.maxY + (this.y + 1) * Constants.seat.spacing);
        }
        this.parent.seatCount += this.seatCount || 0;

        this.midX = (this.minX + this.maxX) / 2 || 0;
        this.midY = (this.minY + this.maxY) / 2 || 0;
        this.kinetic.pivot.setPosition(this.midX, this.midY);
        this.kinetic.group.setOffset(this.midX, this.midY);

        var name = this.json.name || "?";
        if(this.seatCount !== undefined && this.nodeType !== 'row'){
            name += ' (' + this.seatCount + ' seats)';
        }
        this.kinetic.label.setText(name);
        this.kinetic.group.setPosition(this.x * Constants.seat.spacing, this.y * Constants.seat.spacing);
        this.updateRotation();
    };
    this.updateRotation = function() {
        this.kinetic.group.setRotationDeg(this.rotation);
    };
    this.updateChildren = function() {
        this.childrenOf[this.nodeType] = {
            x : "0",
            y : "0",
            rotation : "0",
            radius : "0",
            magicRow : ""
        };
        for (var c = 0; c < this.canContain.length; c++) {
            var get = this.canContain[c].split(/ ?\=\> ?/);
            var jsonNodeVarName = get[0];
            var editorObjectType = get[1];
            if (this.json[jsonNodeVarName] !== undefined) {
                for (var i = 0; i < this.json[jsonNodeVarName].length; i++) {
                    var o = this.json[jsonNodeVarName][i];
                    if (o.editor === undefined) {
                        o.editor = new window[editorObjectType](this.json[jsonNodeVarName], i, this);
                    }
                    o.editor.build();
                }
            }
        }
    };
    this.addPicture = function() {
        var newPicture = {
            url : "images/image-add.png",
            x : "0",
            y : "0",
            width : "2",
            height : "2"
        };
        if (this.json.images === undefined) {
            this.json.images = [];
        }
        this.json.images.push(newPicture);
        this.updateChildren();
        Editor.addToSelect(newPicture.editor);
    };
    this.addLabel = function() {
        var newLabel = {
            text : "[Enter text here]",
            x : "0",
            y : "0"
        };
        if (this.json.labels === undefined) {
            this.json.labels = [];
        }
        this.json.labels.push(newLabel);
        this.updateChildren();
        Editor.addToSelect(newLabel.editor);
    };
    this.destroy = function() {
        this.destroyChildren();
        // debug([this, this.nodeType, this.kinetic.label.attrs.name]);

        this.kinetic.group.destroy(this.kinetic.group);
        delete this.arraySrc.splice(this.arrayIndex, 1);
        var arr = this.allObjects[this.nodeType];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === this) {
                this.allObjects[this.nodeType].splice(i, 1);
            }
        }
        Editor.unselectOldItems();
        Editor.hydrateSelection();
        Editor.prepareToBuildFromJson();
        this.rebuildIndex();
    };
    this.rebuildIndex = function() {
        for (var i = 0; i < this.arraySrc.length; i++) {
            this.arraySrc[i].editor.arrayIndex = i;
        }
        this.parent.updateChildren();
    };
    this.destroyChildren = function() {
        for (var c = 0; c < this.canContain.length; c++) {
            var get = this.canContain[c].split(/ ?\=\> ?/);
            var jsonNodeVarName = get[0];
            var editorObjectType = get[1];
            if (this.json[jsonNodeVarName] !== undefined) {
                while (this.json[jsonNodeVarName].length > 0) {
                    var o = this.json[jsonNodeVarName][0];
                    if (o.editor !== undefined) {
                        o.editor.destroy();
                    }
                }
            }
        }
    };
}

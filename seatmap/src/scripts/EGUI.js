//dat.GUI.TEXT_CLOSED = 'Close';
//dat.GUI.TEXT_OPEN = 'Ouvrir';

function EGUI() {
    'use strict';
    var self = this;
    this.changeTimer = null;
    this.currentSelection = {};
    this.lastClickedSeat = null;
    this.folders = [];
    this.controls = [];
    this.millisecDelayBeforeBuildingFromJson = 300;
    this.menuAnimSpeed = 150;
    this.loaded = false;
    this.init = function() {
        self.GUI = new dat.GUI();
        self.roomVisuals = self.GUI.addFolder('Visuel');
        self.roomSettings = self.GUI.addFolder('Import & Export');
        self.addButtonControl("roomSettings.SaveToLocal", self, "saveToLocalStorage", "Save JSON in local storage");
        self.addButtonControl("roomSettings.setjson", self, "importJson", "Import JSON");
        self.addButtonControl("roomSettings.json", Main, "getJson", "Export JSON");
        self.addButtonControl("roomSettings.DeleteToLocal", self, "deleteToLocalStorage", "Delete all local storage data");
        self.roomVisuals.add(Main, 'zoomAmount', 1, 50).name("Zoom").listen().onChange(function(v) {
            Main.zoom();
        });

        var visualChangeListener = function() {
            // rowName
            if (Main.visibility.rowName) {
                Main.json.editor.kinetic.group.find(".rowLabel").show();
            } else {
                Main.json.editor.kinetic.group.find(".rowLabel").hide();
            }
            // seatlabel
            if (Main.visibility.seatName) {
                Main.json.editor.kinetic.group.find(".seatLabel").show();
            } else {
                Main.json.editor.kinetic.group.find(".seatLabel").hide();
            }
            // editor polygons
            if (Main.visibility.editorPolygons) {
                Main.json.editor.kinetic.group.find(".sectionArea").show();
            } else {
                Main.json.editor.kinetic.group.find(".sectionArea").hide();
            }
            Main.stage.draw();
        };

        for ( var attr in Main.visibility) {
            self.roomVisuals.add(Main.visibility, attr, attr).listen().onChange(visualChangeListener);
        }

        self.roomVisuals.addColor(Main.canvas.style, "background");
        self.roomVisuals.addColor(Constants.seat, "seatColor");
        self.roomVisuals.add(Constants.seat, "spacing", 3, 50);
        self.roomVisuals.add(Constants.seat, "size", 1, 48);

        self.venue = self.GUI.addFolder("Room");
        self.level = self.GUI.addFolder("Level");
        self.section = self.GUI.addFolder("Section");
        self.row = self.GUI.addFolder("Row");
        self.label = self.GUI.addFolder("Label");
        self.picture = self.GUI.addFolder("Image");

        $(self.level.__ul).hide();
        $(self.section.__ul).hide();
        $(self.row.__ul).hide();
        $(self.label.__ul).hide();
        $(self.picture.__ul).hide();
        // self.roomSettings.open();
        self.loaded = true;
        self.loadRoom();
    };
    this.addToSelect = function(add) {
        add.isDirty = true;
        //debug([ add ]);
        if (self.currentSelection.active === undefined) {
            self.currentSelection.active = true;
            self.unselectOldItems();
            self.currentSelection.sourceType = add.nodeType;
        }
        self.currentSelection[add.nodeType] = add;
        add.selected = true;
        if (add.nodeType === "level") {
            self.hydrateSelection();
            self.selectionClean();
        }
    };
    this.unselectOldItems = function() {
        if (self.currentSelection.sourceType !== undefined) {
            self.currentSelection[self.currentSelection.sourceType].paintSelection(null);
        }
        delete self.currentSelection.sourceType;
        delete self.currentSelection.level;
        delete self.currentSelection.section;
        delete self.currentSelection.row;
        delete self.currentSelection.label;
        delete self.currentSelection.picture;
    };
    this.selectionClean = function() {
        delete self.currentSelection.active;
    };
    this.hydrateSelection = function() {
        var objectTypes = ['level', 'section', 'row', 'picture', 'label'];
        var t;
        for(var i in objectTypes){
            t = objectTypes[i];
            if (self.currentSelection[t] !== undefined) {
                self.setMenuTitle(t);
                switch(t){
                    case 'level':
                        self.addStringControl(t + ".Name", self.currentSelection[t].json, "name", "Level");
                        self.addStringControl(t + ".PX", self.currentSelection[t].json, "x", "Position X");
                        self.addStringControl(t + ".PY", self.currentSelection[t].json, "y", "Position Y");
                        self.addButtonControl(t + ".AddSection", self.currentSelection[t], "addSection", "New section");
                        self.addButtonControl(t + ".AddLabel", self.currentSelection[t], "addLabel", "New label");
                        self.addButtonControl(t + ".AddPicture", self.currentSelection[t], "addPicture", "New image");
                        break;
                    case 'section':
                        self.addStringControl(t + ".Name", self.currentSelection[t].json, "name", "Section");
                        self.addStringControl(t + ".PX", self.currentSelection[t].json, "x", "Position X");
                        self.addStringControl(t + ".PY", self.currentSelection[t].json, "y", "Position Y");
                        self.addStringControl(t + ".Rotation", self.currentSelection[t].json, "rotation", "Rotation");
                        self.addButtonControl(t + ".AddRow", self.currentSelection[t], "addRow", "New row");
                        self.addButtonControl(t + ".Clone", self.currentSelection[t], "clone", "Clone this section");
                        self.addButtonControl(t + ".AddLabel", self.currentSelection[t], "addLabel", "New label");
                        self.addButtonControl(t + ".AddPicture", self.currentSelection[t], "addPicture", "New image");
                        break;
                    case 'row':
                        self.addStringControl(t + ".Name", self.currentSelection[t].json, "name", "Name");
                        self.addStringControl(t + ".MagicRow", self.currentSelection[t].json, "magicRow", "Row");
                        self.addStringControl(t + ".PX", self.currentSelection[t].json, "x", "Position X");
                        self.addStringControl(t + ".PY", self.currentSelection[t].json, "y", "Position Y");
                        self.addStringControl(t + ".Radius", self.currentSelection[t].json, "radius", "Radius");
                        self.addStringControl(t + ".Rotation", self.currentSelection[t].json, "rotation", "Rotation");
                        self.addCheckControl(t + ".Table", self.currentSelection[t].json, "table", "Is table");
                        break;
                    case 'picture':
                        self.addStringControl(t + ".Url", self.currentSelection[t].json, "url", "Source");
                        self.addStringControl(t + ".PX", self.currentSelection[t].json, "x", "Position X");
                        self.addStringControl(t + ".PY", self.currentSelection[t].json, "y", "Position Y");
                        self.addStringControl(t + ".W", self.currentSelection[t].json, "width", "Width");
                        self.addStringControl(t + ".H", self.currentSelection[t].json, "height", "Height");
                        self.addStringControl(t + ".Rotation", self.currentSelection[t].json, "rotation", "Rotation");
                        break;
                    case 'label':
                        self.addStringControl(t + ".Text", self.currentSelection[t].json, "text", "Text");
                        self.addStringControl(t + ".PX", self.currentSelection[t].json, "x", "Position X");
                        self.addStringControl(t + ".PY", self.currentSelection[t].json, "y", "Position Y");
                        self.addStringControl(t + ".Rotation", self.currentSelection[t].json, "rotation", "Rotation");
                        break;
                }
                self.addButtonControl(t + ".Destroy", self.currentSelection[t], "destroy", "Destroy " + t + self.arrayIndexIndicator(t));
                if (self.currentSelection.sourceType === t) {
                    self[t].open();
                    self.currentSelection[t].paintSelection(Constants.selection[t]);
                } else {
                    self[t].close();
                }
                $(self[t].__ul).slideDown(self.menuAnimSpeed);
            } else {
                $(self[t].__ul).slideUp(self.menuAnimSpeed);
            }
        }
        Main.stage.draw();
    };
    this.setMenuTitle = function(t) {
        $(self[t].__ul).hide().find(".title").html(t + self.arrayIndexIndicator(t) + " " + self.currentSelection[t].json.name);
    };
    this.arrayIndexIndicator = function(t) {
        return '<i style="color:#ff8;">(' + self.currentSelection[t].arrayIndex + ')</i>';
    };
    this.addStringControl = function(arch, object, variable, label, forceNumber) {
        function getRelativeValue(object, variable){
            try{
                if( object.editor.childrenOf[object.editor.parent.nodeType] && object.editor.childrenOf[object.editor.parent.nodeType][variable]!== undefined){
                    return object.editor.childrenOf[object.editor.parent.nodeType][variable];
                }
                if( object.editor && object.editor[variable] !== undefined){
                    return object.editor[variable];
                }
                if( object.editor.relative && object.editor.relative[variable] !== undefined){
                    return object.editor.relative[variable];
                }
                if( object.editor.relative && object.editor.relative.json && object.editor.relative.json[variable] !== undefined){
                    return object.editor.relative.json[variable] || '';
                }
            }catch(e){
                error(e, 'unable to read relative value (addStringControl)');
            }
            return '';
        }
        forceNumber = forceNumber || false;
        var get, parent, target;
        try {
            get = arch.split(".");
            parent = get[0];
            target = get[0] + get[1];
            if (object[variable] === undefined || object[variable] === '' || (forceNumber && isNaN(object[variable]))) {
                object[variable] = '';
            }
            if (typeof self[target] === 'object') {
                try{
                    self[parent].remove(self[target]);
                }catch(e){
                    error(e, 'unable to remove old field');
                }
            }

            try{
                self[target] = self[parent].add(object, variable);
            }catch(e){
                error(e, 'error finding property ' + variable + '(addStringControl)');
            }
            self[target].name(label);
            self[target].listen();
            self[target].__input.onclick = function() {
                self[target].__input.focus();
            };
            self[target].__input.onfocus = function() {
                self[target].__input.placeholder = getRelativeValue(object, variable);
                if(self[target].__input.value ==='undefined'){
                    self[target].__input.value = getRelativeValue(object, variable);
                }
                self.resetBuildTimer();
            };

            self[target].__input.onblur = function() {
                self[target].__input.placeholder = '';
                self.resetBuildTimer();
            };

            if (object[variable] === "") {
                delete object[variable];
            }

            self[target].onFinishChange(function(e) {
                if (e === "" || e === "undefined" || (forceNumber && isNaN(object[variable]))) {
                    delete object[variable];
                }
                self.prepareToBuildFromJson();
            });

            self[target].onChange(function(e) {
                if (e === "" || e === "undefined" || (forceNumber && isNaN(object[variable]))) {
                    delete object[variable];
                }
                self.prepareToBuildFromJson();
            });
        } catch (e) {
            error(e, "addStringControl()");
        }
    };
    this.addButtonControl = function(arch, object, variable, label) {
        try {
            var get = arch.split(".");
            var parent = get[0];
            var target = get[0] + get[1];
            if (object[variable] === undefined) {
                object[variable] = function() {
                    error({
                        stack : "Fonction <" + variable + "> n'existe pas"
                    }, "addButtonControl()");
                };
            }
            if (self[target] !== undefined) {
                self[parent].remove(self[target]);
            }

            self[target] = self[parent].add(object, variable);
            self[target].name(label);
            self[target].onChange(function(e) {
                if (e === "") {
                    delete object[variable];
                }
            });
            $(self[target].__li).find("span.property-name").attr("title", label);
            $(self[target].__li).find("span.property-name").css({
                "width" : "100%",
                "text-align" : "left",
                "padding" : "0 0 0 .5em"
            });
        } catch (e) {
            error(e, "addButtonControl()");
        }
    };
    this.addCheckControl = function(arch, object, variable, label) {
        try {
            var get = arch.split(".");
            var parent = get[0];
            var target = get[0] + get[1];
            if (object[variable] === undefined) {
                object[variable] = "";
            }
            if (self[target] !== undefined) {
                self[parent].remove(self[target]);
            }

            self[target] = self[parent].add(object, variable);
            self[target].listen();
            if (object[variable] === "") {
                delete object[variable];
            }
            self[target].onChange(function(e) {
                self.prepareToBuildFromJson();
            });
            $(self[target].__li).find('span.property-name').html(label);
        } catch (e) {
            error(e, "addCheckControl()");
        }
    };
    this.uniqueControl = function(arch, control) {
        try {
            var get = arch.split(".");
            var parent = get[0];
            var target = get[0] + get[1];
            if (self[target] !== undefined) {
                self[parent].remove(self[target]);
            }
            self[target] = control;
            return control;
        } catch (e) {
            error(e, "Editor.uniqueControl()");
        }
    };
    this.resetBuildTimer = function(){
        document.getElementById('loading').style.display = 'none';
        if (self.changeTimer !== null) {
            clearTimeout(self.changeTimer);
        }
    };
    this.prepareToBuildFromJson = function() {
        self.resetBuildTimer();
        if(Main.visibility.autoUpdate){
            document.getElementById('loading').style.display = 'block';
            self.changeTimer = setTimeout(function() {
                Main.rebuildFromJson();
            }, self.millisecDelayBeforeBuildingFromJson);
        }
    };
    this.importJson = function() {
        var val = prompt("Paste your JSON", "{}");
        var self = this;
        if (val !== null && val !== "") {
            Main.json = JSON.parse(val);
            self.saveToLocalStorage();
            document.location.reload();
        }
    };
    this.loadRoom = function() {
        if (self.loaded) {
            if (Main.json.version === undefined) {
                Main.json.version = Main.jsonVersion;
                error({
                    stack : "JSON version of " + Main.venue + " is inferior to " + Main.jsonVersion + ",\n\rsome functionnalities may not work correctly."
                }, "Warning!");
            }
            self.uniqueControl("venue.Version", self.venue.add(Main.json, 'version', {
                "Choisir version..." : "0",
                "Version 1" : "1",
                "Version 2" : "2",
                "Version 3" : "3",
                "Version 4 (Beta)" : "4"
                //...
            }).name("Version JSON").onChange(function() {
                self.prepareToBuildFromJson();
            }));
            self.addStringControl("venue.theaterName", Main.json, "name", "Room's name");
            self.addButtonControl("venue.refresh", Main, "rebuildFromJson", "Refresh");
            self.addButtonControl("venue.NewLevel", Main.json.editor, "addLevel", "New level");
            self.venue.open();
            self.roomVisuals.open();
            self.roomSettings.open();
        }
    };
    this.saveToLocalStorage = function() {
        Main.rebuildFromJson();
        var get = Main.getJson(false, false);
      /*  get.config = {
            x : Main.stage.attrs.x,
            y : Main.stage.attrs.y,
            zoom : Main.zoomAmount
        };*/
        try{
            localStorage[Main.venue] = get;
            notif('<h2>Saved in browser local storage</h2>', "#8f8");
        }catch(e){
            notif('<h2>Error while saving</h2>', "#f40");
        }
    };
    this.deleteToLocalStorage = function() {
        if(confirm('Are you sure you want to destroy this room?')){
            if (delete localStorage[Main.venue]) {
                notif("<h2>Local JSON '" + Main.venue + ' have been erased</h2>', "#df0");
            } else {
                notif("<h2>local JSON '" + Main.venue + ' does not exist</h2>', "#ff0");
            }
            document.location.reload();
        }
    };
}

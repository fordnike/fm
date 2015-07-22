window.countAllSeat = 0;
function Main() {
    var self = this;
    this.stage = null;
    this.canvasElement;
    this.venue = "#blank";
    this.jsonVersion = 1.0;
    this.visibility = Constants.preset.visibility
    this.showLevelLabels = true;
    this.showSectionLabels = true;
    this.showRowLabels = true;
    this.showSeatLabels = false;
    this.showBlanks = true;
    this.json = {};
    this.textarea = null;
    this.zoomAmount = 10;
    this.defaultVersion = Constants.preset.version;
    this.init = function() {
        self.stage = new Kinetic.Stage({
            container : 'kinetic-container',
            width : $("#kinetic-container").width(),
            height : $(window).height(),
            draggable : true
        });
        self.layer = new Kinetic.Layer();
        self.stage.add(self.layer);
        self.canvas = self.layer.getCanvas()._canvas;
        self.canvas.addEventListener("mousewheel", function(e) {
            self.zoomAmount += e.wheelDeltaY * 0.005;
            self.zoom();
        }, false);
        self.canvas.addEventListener("mousemove", self.updateInfo, false);
        self.canvas.addEventListener("mouseclick", self.updateInfo, false);
        try {
            self.canvas.style.background = Constants.editor.bgColor;
        } catch (e) {
            debug(e);
        }

        // text area
        self.textarea = document.createElement('textarea');
        self.textarea.style.cssText = 'position:fixed;left:3em;top:4em;width:40%;height:80%;border:none;padding:1em;border-radius:.8em;display:none;box-shadow:0 0 2em #000';
        self.textarea.placeholder = 'JSON data';
        document.body.appendChild(self.textarea);
        self.textarea.onclick = self.textarea.select;
        self.canvas.onclick = function(){
            self.textarea.style.display = 'none';
        };
    };
    this.updateInfo = function(e) {
        var mx = e.layerX - (Main.stage.attrs.x || 0);
        var my = e.layerY - (Main.stage.attrs.y || 0);
        var ux = Math.floor(mx / Constants.seat.spacing * 10) / 10;
        var uy = Math.floor(my / Constants.seat.spacing * 10) / 10;
        var selection = "";
        for ( var key in Editor.currentSelection) {
            var obj = Editor.currentSelection[key];
            if (key !== "sourceType") {
                if (key == Editor.currentSelection.sourceType) {
                    if (key === "picture") {
                        selection += " | " + key + " : " + obj.json.url || "?";
                    } else {
                        selection += " | " + key + " : " + obj.json.name || "?";
                    }
                }
            }
        }
        notif("(" + ux + ", " + uy + ")" + selection);
    };
    this.zoom = function() {
        self.zoomAmount = Math.min(Math.max(self.zoomAmount, 1), 50);
        self.layer.setScale(self.zoomAmount / 10);
        self.layer.draw();
    };
    this.rebuildFromJson = function() {
        // console.clear();
        debug("refresh " + self.venue + "...");
        var buildTimeStart = new Date();
        if (self.json.editor === undefined) {
            self.json.editor = new Venue(self.json, self.layer);
        }
        self.json.editor.build();
        self.stage.draw();
        var buildTimeEnd = new Date();
        var buildTimeDeta = buildTimeEnd - buildTimeStart;

        notif("<i>built-time is </i><b>" + (buildTimeDeta/1000) + "</b><i> seconds</i>", '#ff0');
        Editor.loadRoom();
        document.getElementById('loading').style.display = 'none';
    };
    this.getJson = function(longMonde, showWindow) {
        get = JSON.stringify(self.json, self.orpheusJsonMode);
        get = JSON.stringify(self.json, self.orpheusJsonMode);
        if (showWindow !== false) {
            self.textarea.value = get;
            self.textarea.style.display = 'block';
            self.textarea.select();
            notif('<h2>Press Ctrl-C to copy</h2>','#def');
        }
        return get;
    };
    this.getJsonLong = function() {
        return self.getJson(true);
    };
    this.orpheusJsonMode = function(key, value) {
        switch (key) {
        case "editor":
        case "seats":
        case "selected":
        case "config":
            return undefined;
        case "table":
            return value === true ? true : undefined;
        case "magicRow":
            return value.replace(/#([0-9]+)/gi, "#blank $1");
        default:
            return value;
        }
    };
    this.loadJson = function(room) {
        if (Editor.loaded) {
            Editor.unselectOldItems();
            Editor.hydrateSelection();
        }
        if (room !== undefined) {
            self.venue = room;
        }
        var url = "salles/" + self.venue + ".jsp";
        debug(url);
        if (localStorage[self.venue] !== undefined) {
            debug([ "Data was loaded from localStorage", localStorage[self.venue] ]);
            self.json = JSON.parse(localStorage[self.venue]);
        } else {
            if (self.venue === "#blank") {
                self.json = {
                    name : "New room",
                    version : self.defaultVersion
                };
                self.rebuildFromJson();
                return;
            }
            debug([ "Data will be loaded from remote url", url ]);
            $.ajax({
                dataType : "json",
                url : url
            }).done(function(data) {
                self.json = data;
            });
        }
        try {
            self.stage.attrs.x = self.json.config.stage.x;
            self.stage.attrs.y = self.json.config.stage.y;
            self.zoomAmount = self.json.config.stage.zoom;
        } catch (e) {
        }
        self.rebuildFromJson();
        var sx = self.json.editor.minX + (self.json.editor.maxX - self.json.editor.minX) / 2;
        var sy = self.json.editor.minY + (self.json.editor.maxY - self.json.editor.minY) / 2;
        Main.stage.attrs.x = sx;
        Main.stage.attrs.y = sy;
        self.stage.draw();
    };
    self.init();
}

Picture.prototype = jor;
function Picture(arraySrc, arrayIndex, parent) {
    var self = this;
    this.nodeType = "picture";
    this.arraySrc = arraySrc;
    this.arrayIndex = arrayIndex;
    this.json = this.arraySrc[this.arrayIndex];
    this.canContain = [];
    this.parent = parent;
    this.kinetic = {};
    this.interact = true;
    this.updateSelf = function() {
        this.image.src = this.json.url;
        self.x = (self.json.x || 0);
        self.y = (self.json.y || 0);
        self.width = (self.json.width || 1);
        self.height = (self.json.height || 1);
        self.rotation = (self.json.rotation || 0);
        self.updateRotation();
        self.kinetic.group.setPosition(self.x * Constants.seat.spacing, self.y * Constants.seat.spacing);
        self.kinetic.image.setSize(self.width * Constants.seat.spacing, self.height * Constants.seat.spacing);
    };
    this.createKinetics = function() {
        this.image = new Image();
        this.image.onload = function() {
            Main.stage.draw();
        };
        this.kinetic.image = new Kinetic.Image({
            x : 0,
            y : 0,
            width : 1,
            height : 1,
            image : this.image
        });
        if (this.parent.nodeType === "venue") {
            this.kinetic.image.attrs.opacity = 0.3;
            this.kinetic.image.attrs.draggable = false;
            this.kinetic.group.attrs.draggable = false;
            this.createListeners = function() {};
        }
        this.kinetic.group.add(self.kinetic.image);
    };
    this.paintSelection = function(color) {
        if (color === null) {
            delete self.kinetic.image.attrs.strokeWidth;
            delete self.kinetic.image.attrs.stroke;
        } else {
            self.kinetic.image.setStroke(color);
            self.kinetic.image.setStrokeWidth(Constants.seat.pad);
        }
    };
}

Seat.prototype = jor;
function Seat(name, node) {
    var self = this;
    this.node = node;
    this.seat = null;
    this.nodeType = "seat";
    this.canContain = [];
    this.kinetic = {};
    this.kinetic.group = new Kinetic.Group({
        x : 0,
        y : 0,
        draggable : false,
        selectable : false,
        name : "seatGroup",
        node : node,
        self : this
    });
    this.kinetic.group.setOffset({
        x : Constants.seat.spacing / 2,
        y : Constants.seat.spacing / 2
    });

    switch (Constants.seat.geometry) {
    case "Image":
        self.seat = new Kinetic.Rect({
            x : Constants.seat.pad / 2,
            y : Constants.seat.pad / 2,
            width : Constants.seat.size,
            height : Constants.seat.size,
            fill : Constants.seat.seatColor,
            name : "seatCircle"
        });
        self.mask = new Kinetic.Image({
            x : Constants.seat.pad / 2,
            y : Constants.seat.pad / 2,
            image : imageObj,
            width : Constants.seat.size,
            height : Constants.seat.size
        });
        this.kinetic.group.add(self.seat);
        this.kinetic.group.add(self.mask);
        break;
    case "Rect":
        self.seat = new Kinetic.Rect({
            x : Constants.seat.pad / 2,
            y : Constants.seat.pad / 2,
            width : Constants.seat.size,
            height : Constants.seat.size,
            fill : Constants.seat.seatColor,
            name : "seatCircle"
        });
        this.kinetic.group.add(self.seat);
        break;
    case 'Circle':
    default:
        self.seat = new Kinetic.Circle({
            x : Constants.seat.spacing / 2,
            y : Constants.seat.spacing / 2,
            radius : Constants.seat.size / 2,
            fill : Constants.seat.seatColor,
            // stroke: 'black',,
            // strokeWidth: 1
            name : "seatCircle"
        });
        this.kinetic.group.add(self.seat);
    }
    this.label = new Kinetic.Text({
        x : Constants.seat.spacing / 2,
        y : Constants.seat.spacing / 2,
        fontFamily : 'impact',
        fontSize : Constants.seat.size / 1.6,
        text : name,
        name : "seatLabel",
        selectable : false,
        fill : 'white'
    });
    this.label.setOffset({
        x : this.label.getWidth() / 2,
        y : this.label.getHeight() / 2
    });
    this.label.setListening(false);
    if (!Main.visibility.seatName) {
        this.label.hide();
    }
    this.kinetic.group.add(this.label);
    this.kinetic.group.paint = function(color) {
        if (self.kinetic.group.isASeat) {
            if (color !== null) {
                self.kinetic.group.children[0].setFill(color);
            } else {
                self.kinetic.group.children[0].setFill(Constants.seat.seatColor);
            }
        }
    };
    return this.kinetic.group;
}

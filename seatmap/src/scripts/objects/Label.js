Label.prototype = jor;
function Label(arraySrc, arrayIndex, parent) {
	var self = this;
    this.nodeType = "label";
	this.arraySrc = arraySrc;
	this.arrayIndex = arrayIndex;
	this.json = this.arraySrc[this.arrayIndex];
	this.canContain = [];
	this.parent = parent;
	this.kinetic = {};
	this.updateSelf = function() {
		self.kinetic.text.setText(self.json.text || "?");
		self.x = (self.json.x || 0);
		self.y = (self.json.y || 0);
		self.width = (self.json.width || 1) * Constants.seat.spacing;
		self.height = (self.json.height || 1) * Constants.seat.spacing;
		self.rotation = (self.json.rotation || 0);
		self.updateRotation();
		self.kinetic.group.setPosition(self.x * Constants.seat.spacing, self.y * Constants.seat.spacing);
	};
	this.createKinetics = function() {
		this.kinetic.text = new Kinetic.Text({
			x: 0,
			y: 0,
			fontFamily: 'impact',
			fontSize: Constants.seat.size / 1.6,
			text: "",
			name: "labelText",
			fill: 'white'
		});
		this.kinetic.group.add(self.kinetic.text);
	}
	this.paintSelection = function(color) {
		if (color == null) {
			self.kinetic.text.setFill("#FFF");
		} else {
			self.kinetic.text.setFill(color);
		}
	}
}
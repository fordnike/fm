Row.prototype = jor;
function Row(arraySrc, arrayIndex, parent, params) {
    var self = this;
    this.nodeType = "row";
    this.canContain = [ "seats => Seat", "images => Picture", "labels => Label" ];
    this.arraySrc = arraySrc;
    this.arrayIndex = arrayIndex;
    this.json = this.arraySrc[this.arrayIndex];
    this.parent = parent;
    this.relative = {};
    this.kinetic = {};
    this.getParams(params);
    if (this.json.table === undefined) {
        this.json.table = false;
    } else if (this.json.table === true && this.radius === undefined) {
        this.radius = "0.01";
    }
    if (this.arrayIndex === 0 && this.json.magicRow === undefined) {
        this.json.magicRow = prompt("MagicRow", "1..10..1");
    }
    if (this.arrayIndex > 0 && this.arraySrc[this.arrayIndex - 1].table == "true"){
        this.json.table = true;
    }
    this.updateChildren = function() {
        mergeObjectVars(this.json, this.childrenOf[this.parent.nodeType], [ 'magicRow' ]);
        this.magicRow = this.childrenOf[this.parent.nodeType].magicRow;
        self.seats = self.makeSeatsArrayFromMagicRowString(self.json);
        self.magicRow = self.updateSeatPositions();
    };
    this.createKinetics = function() {
        self.kinetic.seatGroup = new Kinetic.Group({});
        self.kinetic.label = new Kinetic.Text({
            x : 0,
            y : 0,
            fontFamily : 'IMPACT',
            fontSize : 16,
            text : self.json.name || "?",
            selectable : false,
            fill : '#fff',
            editor : self,
            name: 'rowLabel'
        });
        self.kinetic.poly = new Kinetic.Polygon({
            points : [ -25, 5, 0, Constants.seat.spacing/2, -25, Constants.seat.spacing-5 ],
            fill : '#484',
            selectable : false,
            opacity : 0,
            editor : self
        });
        self.kinetic.group.add(self.kinetic.poly);
        self.kinetic.group.add(self.kinetic.seatGroup);
        self.kinetic.label.setOffset({
            x : self.kinetic.label.getWidth() + Constants.seat.pad / 2,
            y : self.kinetic.label.getWidth() / 2 - Constants.seat.spacing / 2
        });
        self.kinetic.group.add(self.kinetic.label);
    };
    this.makeSeatsArrayFromMagicRowString = function() {
        var regex = {
            magicRowRange : /^([0-9\.]+)\.\.([0-9\.]+)\.\.([0-9\.]+)$/i,
            magicRowSingle : /^([0-9]+(\.[0-9]+)?$)/i,
            magicRowBlank : /^#(blank )?([0-9\.]+)$/i
        };
        try {
            if (self.magicRow === undefined || self.magicRow === null) {
                self.magicRow = Main.lastValidMagicRow;
            }
            Main.lastValidMagicRow = self.magicRow;
            // LOOP MAGICMAP
            var magicMap = self.magicRow.split(",");
            var rowPlace = 0;
            var seatArray = [];
            for (var mm = 0; mm < magicMap.length; mm++) {
                var eMap = magicMap[mm].trim();
                switch (true) {
                case regex.magicRowRange.test(eMap): // SEAT RANGE //
                    var stepMethod = regex.magicRowRange.exec(eMap);
                    var from = parseFloat(stepMethod[1]);
                    var to = parseFloat(stepMethod[2]);
                    var step = parseFloat(stepMethod[3]);
                    var m;
                    // LOOP SEATS
                    if (from > to) {
                        for (m = from; m >= to; m -= step) {
                            rowPlace++;
                            seatArray.push({
                                name : '' + m
                            });
                        }
                    } else {
                        for (m = from; m <= to; m += step) {
                            rowPlace++;
                            seatArray.push({
                                name : '' + m
                            });
                        }
                    }
                    break;
                case regex.magicRowSingle.test(eMap): // SINGLE SEAT //
                    rowPlace++;
                    var name = regex.magicRowSingle.exec(eMap)[1];
                    seatArray.push({
                        name : name
                    });
                    break;
                case regex.magicRowBlank.test(eMap): // NO SEAT //
                    var jumps = parseFloat(regex.magicRowBlank.exec(eMap)[2]);
                    for (var l = 0; l < jumps; l++) {
                        rowPlace++;
                        seatArray.push({
                            name : null/*,
                            width : 1-(jumps % 1)*/
                        });
                    }
                    break;
                default:
                    debug('magicRow', 'error, index ' + mm + " of '" + eMap + "'.", self );
                }
            }
            var ol = seatArray.length;
            // add an equal number of blanks to right padding
            if (ol === 0) {
                return [];
            }
            // create kinetic objects
            var out = [];
            self.kinetic.seatGroup.destroyChildren();
            self.seatCount = 0;
            for (var i = 0; i < seatArray.length; i++) {
                if (seatArray[i].name !== undefined && seatArray[i].name !== null) {
                    self.seatCount++;
                    out.push(new Seat(seatArray[i].name, self));
                    out[i].isASeat = true;
                    self.kinetic.seatGroup.add(out[i]);
                } else {
                    out.push({});
                    out[i].isASeat = false;
                }
            }
            return out;
        } catch (e) {
            debug( 'GenerateMagicRowSeats', e );
        }
    };
    this.updateSeatPositions = function() {
        try {
            var i, radialOffset;
            if (this.json.table) {
                radialOffset = getTablePositions(self.radius, self.seats.length);
                for (i = 0; i < self.seats.length; i++) {
                    if (self.seats[i].isASeat) {
                        self.seats[i].setPosition(radialOffset.positions[i].x + Constants.seat.spacing / 2, radialOffset.positions[i].y + Constants.seat.spacing / 2);
                        self.seats[i].setRotation(radialOffset.positions[i].a + toRadians(self.rotation));
                        //updateParentSize(self, radialOffset.positions[i].x, radialOffset.positions[i].y);
                        updateParentSize(self, i * Constants.seat.spacing, 0);
                    }
                }
            } else if (self.radius > 0 || self.radius < 0) {
                radialOffset = getRadialPositions(self.radius, self.seats.length);
                for (i = 0; i < self.seats.length; i++) {
                    if (self.seats[i].isASeat) {
                        self.seats[i].setPosition(radialOffset.positions[i].x, radialOffset.positions[i].y + Constants.seat.spacing / 2);
                        self.seats[i].setRotation(toRadians(radialOffset.positions[i].a + self.rotation));
                        updateParentSize(self, radialOffset.positions[i].x - Constants.seat.spacing / 2, radialOffset.positions[i].y );
                    }
                }
            } else {
                for (i = 0; i < self.seats.length; i++) {
                    if (self.seats[i].isASeat) {
                        self.seats[i].setPosition(i * Constants.seat.spacing + Constants.seat.spacing / 2, Constants.seat.spacing / 2);
                        self.seats[i].setRotation(toRadians(self.rotation));
                        updateParentSize(self, i * Constants.seat.spacing, 0);
                    }
                }
            }
        } catch (e) {
            error(e, "updateSeatPositions");
        }
    };
    this.updateRotation = function() {
        for (var i = 0; i < self.seats.length; i++) {
            if (self.seats[i].isASeat) {
                self.seats[i].setRotationDeg(self.rotation);
            }
        }
    };
    this.destroyChildren = noFunction;
}

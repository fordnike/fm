var PI2 = Math.PI * 2;
function debug() {
    'use strict';
    try {
        console.log.apply(console, arguments);
    } catch (e) {
        alert(arguments + "\n\r\n\r" + e);
        // debugger
        // console.error(e)
        // console.log(arguments.callee.caller.toString())
    }
}
function notif(str, color) {
    'use strict';
    if (color === undefined){
        color = '#ddd';
    }
    document.getElementById('debug').innerHTML = str;
    document.getElementById('debug').style.background = color;
}
function notifAdd(str, color) {
    'use strict';
    if (color !== undefined)
        document.getElementById("debug").style.background = color;
    document.getElementById("debug").innerHTML += " | " + str;
}
function error(e, info) {
    'use strict';
    try {
      var title;
      title = info || "Error...";
        console.debug(title);
        console.error.apply(console, [e.stack]);
    } catch (err) {
        alert(title + "\n\r\n\r" + err);
        console.error(err);
    }
}
function roundBy(val, round) {
    'use strict';
    round = 1 / round;
    return Math.floor(val * round) / round;
}
function mathDir(value) {
    'use strict';
    return value === 0 ? 0 : value / Math.abs(value);
}
function updateParentSize(parent, x, y, radius) {
    'use strict';
    if (radius === undefined){
        radius = 0;
    }
    if (parent.minX === undefined || parent.minX > x - radius) {
        parent.minX = x - radius;
    }
    if (parent.minY === undefined || parent.minY > y - radius) {
        parent.minY = y - radius;
    }
    // x = x;
    // y = y;
    if (parent.maxX === undefined || parent.maxX < x + radius) {
        parent.maxX = x + radius;
    }
    if (parent.maxY === undefined || parent.maxY < y + radius) {
        parent.maxY = y + radius;
    }
}
/**
 * if obj1 value is set, overwrite obj2 value with it
 *
 * @param {type}
 *            obj1
 * @param {type}
 *            obj2
 * @param {type}
 *            vars to merge
 * @returns {undefined}
 */
function mergeObjectVars(obj1, obj2, vars) {
    'use strict';
    for (var i = 0; i < vars.length; i++) {
        if (obj1[vars[i]] !== undefined) {
            obj2[vars[i]] = obj1[vars[i]];
        }
    }
}
function dist2d(x, y) {
    'use strict';
    return Math.sqrt( Math.pow(x,2) + Math.pow(y, 2));
}
function circumference(rad) {
    'use strict';
    return 2 * (Math.PI * rad);
}
function foreach(arr, callback) {
    'use strict';
    if (arr !== null) {
        for (var eachObjectItteration = 0; eachObjectItteration < arr.length; eachObjectItteration++) {
            callback(arr[eachObjectItteration], eachObjectItteration);
        }
    }
}

function alignFloor(val, step) {
    'use strict';
    return Math.floor(val / step) * step;
}
function alignCeil(val, step) {
    'use strict';
    return Math.ceil(val / step) * step;
}
function alignRound(val, step) {
    'use strict';
    return Math.round(val / step) * step;
}

function relativeMath(val, base) {
    'use strict';
    if (base === undefined) {
        base = '0';
    }
    if (val === undefined) {
        val = '0';
    }
    if (('' + val).startsWith('+')) {
        val = parseFloat(base) + parseFloat(val.substring(1));
    }
    // TODO window.json.version 2+ n'utilisera plus cette feature
    if (('' + val).startsWith('+') && (Main.json.version === undefined || Main.json.version < 3)) {
        val = parseFloat(base) + parseFloat(val.substring(0));
    }
    return parseFloat(val);
}

function getTablePositions(radius, colCount) {
    'use strict';
    var tableMid = {
        x : Math.abs(radius) * Constants.seat.spacing,
        y : 0
    };

    // prepare output
    var out = {
        radius : radius,
        positions : []
    };

    // assign each positions
    for (var i = 0; i < colCount; i++) {
        var ang = (i) * (-PI2 / colCount) + PI2 / 2;
        var x = tableMid.x + Math.sin(ang) * radius * Constants.seat.spacing;
        var y = tableMid.y + Math.cos(ang) * radius * Constants.seat.spacing;
        out.positions.push({
            x : x,
            y : y,
            a : -ang + PI2 / 2
        });

    }
    return out;
}

function getCathetus(num1, num2){
    var catheus1 = Math.min(num1, num2);
    var hypotenuse = Math.max(num1, num2);
    return Math.sqrt( Math.pow(hypotenuse, 2) - Math.pow(catheus1, 2) );
}
function getAngle(x, y){
    var rad = Math.atan2(x, y);
    return {
        rad: rad,
        deg: rad / Math.PI * 180
    };
}
function cos(ang){
    return Math.cos(ang * Math.PI / 180);
}
function sin(ang){
    return Math.sin(ang * Math.PI / 180);
}
/**
 * [getRadialPositions description]
 *   A    C
 *    ___
 *   |  /
 *   | /
 *   |/
 *
 *   B
 * @param {[type]} radius   [description]
 * @param {[type]} colCount [description]
 */
function getRadialPositions(radius, colCount) {
    var orientation = radius < 0 ? -1 : 1;

    radius = Math.abs(radius) * Constants.seat.spacing;

    var radCenterX = colCount * Constants.seat.spacing / 2;
    var radCenterY = getCathetus(radius, radCenterX)

    var angleMid = getAngle(radCenterX, radCenterY).deg;
    var angleDelta = angleMid * 2 / colCount;

    var out = {
        radius: radius,
        positions: []
    };
    // assign each positions
    for (var i = 0; i < colCount; i++) {
        ang = -angleMid + (i + 0.5) * angleDelta;
        var x = radCenterX + sin(ang) * radius;
        var y = orientation < 0 ?
            - radCenterY * -1 - cos(ang) * radius :
            - radCenterY + cos(ang) * radius;

        out.positions.push({
            x : x,
            y : y,
            a : ang * - orientation
        });

    }
    return out;
}

if (typeof String.prototype.startsWith !== 'function') {
    String.prototype.startsWith = function(str) {
        return this.slice(0, str.length) === str;
    };
}
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(str) {
        return this.slice(-str.length) === str;
    };
}
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

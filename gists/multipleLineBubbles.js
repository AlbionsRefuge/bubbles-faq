/*
To create animation with many lines you have to pass array (one element = one line) as a first parameter to function drawName, example:
var myName = ["I", "<3", "codecademy"];
var letterColors = [[204, 70, 53], [48, 89, 50], [6, 78, 57], [283, 39, 53]];
drawName(myName, letterColors);
bounceBubbles();
*/

function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.set = function(x, y) {
        this.x = x;
        this.y = y;
    };
}

function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;
    this.points = [];
    this.update = function() {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var d = Math.sqrt((dx * dx) + (dy * dy));
            point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
            point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;
            point.update();
        }
    };
    this.shake = function() {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var d = Math.sqrt((dx * dx) + (dy * dy));
            if (d < 50) {
                this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
                this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
            }
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };
    this.draw = function(bubbleShape, reset) {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            if (point === null)
                continue;
            if (window.reset) {
                this.pointCollectionX = 0;
                this.pointCollectionY = 0;
                this.mousePos = new Vector(0, 0);
            }
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY, reset);
        }
    };
}

function Point(x, y, z, size, color) {
    this.curPos = new Vector(x, y, z);
    this.color = color;
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = document.springStrength;
    this.originalPos = new Vector(x, y, z);
    this.radius = size;
    this.size = size;
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);
    this.update = function() {
        var dx = this.targetPos.x - this.curPos.x;
        var dy = this.targetPos.y - this.curPos.y;
        var ax = dx * this.springStrength - this.rotationForce * dy;
        var ay = dy * this.springStrength + this.rotationForce * dx;
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;
        var dox = this.originalPos.x - this.curPos.x;
        var doy = this.originalPos.y - this.curPos.y;
        var d = Math.sqrt((dox * dox) + (doy * doy));
        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;
        this.radius = this.size * this.curPos.z;
        if (this.radius < 1) this.radius = 1;
    };
    this.draw = function(bubbleShape, dx, dy) {
        ctx.fillStyle = this.color;
        if (bubbleShape == "square") {
            ctx.beginPath();
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else {
            ctx.beginPath();
            ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };
}

function makeColor(hslList, fade) {
    var hue = hslList[0];
    var sat = hslList[1];
    var lgt = hslList[2];
    return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}

function phraseToHex(phrase) {
    var hexphrase = "";
    for (var i = 0; i < phrase.length; i++) {
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    return hexphrase;
}

function initEventListeners() {
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
    canvas.ontouchmove = function(e) {
        e.preventDefault();
        onTouchMove(e);
    };
    canvas.ontouchstart = function(e) {
        e.preventDefault();
    };
}

function updateCanvasDimensions() {
    canvas.attr({
        height: 500,
        width: 1000
    });
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();
    draw();
}

function onMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}

function onTouchMove(e) {
    if (pointCollection) {
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}

function bounceName() {
    shake();
    setTimeout(bounceName, 30);
}

function bounceBubbles() {
    draw();
    update();
    setTimeout(bounceBubbles, 30);
}

function draw(reset) {
    var tmpCanvas = canvas.get(0);
    if (tmpCanvas.getContext === null) {
        return;
    }
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
    if (pointCollection) {
        pointCollection.draw(bubbleShape, reset);
    }
}

function shake() {
    var tmpCanvas = canvas.get(0);
    if (tmpCanvas.getContext === null) {
        return;
    }
    ctx = tmpCanvas.getContext('2d');
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";
    if (pointCollection) {
        pointCollection.shake(bubbleShape);
    }
}

function update() {
    if (pointCollection)
        pointCollection.update();
}

function drawName(text, letterColors) {
    if (!$.isArray(text)) {
        text = [text];
    }
    updateCanvasDimensions();
    var g = [];
    var gIndex = 0;
    var offset = 0;

    function addLetter(cc_hex, ix, letterCols) {
        if (typeof letterCols !== 'undefined') {
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && Object.prototype.toString.call(letterCols[0]) === '[object Array]') {
                letterColors = letterCols;
            } else if (Object.prototype.toString.call(letterCols) === '[object Array]' && typeof letterCols[0] === "number") {
                letterColors = [letterCols];
            }
        } else {
            letterColors = [
                [0, 0, 27]
            ];
        }
        if (document.alphabet.hasOwnProperty(cc_hex)) {
            var chr_data = document.alphabet[cc_hex].P;
            var bc = letterColors[ix % letterColors.length];
            for (var i = 0; i < chr_data.length; ++i) {
                point = chr_data[i];
                gIndex++;
                g.push(new Point(point[0] + offset,
                    point[1],
                    0.0,
                    point[2],
                    makeColor(bc, point[3])));
            }
            offset += document.alphabet[cc_hex].W;
        }
    }
    for (var lineIndex = 0; lineIndex < text.length; lineIndex++) {
        offset = 0;
        var startIndex = gIndex;
        var hexphrase = phraseToHex(text[lineIndex]);
        var col_ix = 0;
        for (var i = 0; i < hexphrase.length; i += 2) {
            var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
            addLetter(cc_hex, col_ix, letterColors);
            if (cc_hex != "A20") {
                col_ix++;
            }
        }
        for (var j = startIndex; j < g.length; j++) {
            g[j].curPos.x += (canvasWidth / 2 - offset / 2);
            g[j].curPos.y += (canvasHeight / text.length / 2 + lineIndex * canvasHeight / text.length - 105);
            g[j].originalPos.x += (canvasWidth / 2 - offset / 2);
            g[j].originalPos.y += (canvasHeight / text.length / 2 + lineIndex * canvasHeight / text.length - 105);
        }
    }
    pointCollection = new PointCollection();
    pointCollection.points = g;
    initEventListeners();
}
window.reset = false;
$(window).mouseleave(function() {
    window.reset = true;
});
$(window).mouseenter(function() {
    window.reset = false;
});
var canvas = $("#myCanvas");
var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;
document.rotationForce = 0.0;
document.Friction = 0.85;
document.springStrength = 0.1;
var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];
setTimeout(updateCanvasDimensions, 30);

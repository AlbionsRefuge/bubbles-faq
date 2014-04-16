// Vector is a data structure used to represent a point in 3d space
function Vector(x, y, z) {
    // properties x, y, z are representing every coordinate of the point
    this.x = x;
    this.y = y;
    this.z = z;
    // method set is used to change x and y coordinates of given point
    this.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
}

function PointCollection() {
    this.mousePos = new Vector(0, 0);
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;
    this.points = [];
 
    this.update = function () {
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
 
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
 
            point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
            point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;
 
            point.update();
        }
    };
 
    this.shake = function () {
        var randomNum = Math.floor(Math.random() * 5) - 2;
 
        for (var i = 0; i < this.points.length; i++) {
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var dd = (dx * dx) + (dy * dy);
            var d = Math.sqrt(dd);
            if (d < 50) {
                this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
                this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
            }
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };
 
    this.draw = function (bubbleShape, reset) {
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
 
    this.reset = function (bubbleShape) {};
}

// Point is a data structure used to represent single bubbles in our animation
function Point(x, y, z, size, color) {
    // property curPos stores current position of our bubble in 3d space, predefined value is equal to coordinates defined in alphabet.js (parameters x, y, z)
    this.curPos = new Vector(x, y, z);
    // property color stores color of our bubble defined by us in main.js
    this.color = color;
    
    // load settings from document [add]
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = document.springStrength;
    
    // property originalPos stores Vector (point) with coordinates defined in alphabet.js (parameters x, y, z)
    this.originalPos = new Vector(x, y, z);
    // basic value of radius and size is value defined in alphabet.js (parameter size)
    this.radius = size;
    this.size = size;
    // property targetPos stores direction where bubble goes, predefined value is equal to originalPos
    this.targetPos = new Vector(x, y, z);
    // velocity in our script is represented by a vector, predefined velocity is equal to 0
    this.velocity = new Vector(0.0, 0.0, 0.0);
 
    this.update = function () {
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
        var dd = (dox * dox) + (doy * doy);
        var d = Math.sqrt(dd);
 
        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;
 
        this.radius = this.size * this.curPos.z;
        if (this.radius < 1) this.radius = 1;
    };
 
    this.draw = function (bubbleShape, dx, dy) {
        // set the fill color to color of bubble
        ctx.fillStyle = this.color;
        if (bubbleShape == "square") {
            // begin path
            ctx.beginPath();
            /* draw filled square, this.radius * 1.5 heigh and wide at
             * vertex with coordinates (this.curPos.x + dx, this.curPos.y + dy)
             */
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else {
            // begin path
            ctx.beginPath();
            /* draw circle with radius equal to this.radius * 1.5 with
             * center at coordinates (this.curPos.x + dx, this.curPos.y + dy)
             */
            ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
            // fill path and end path
            ctx.fill();
        }
    };
}

/* function makeColor is used to convert array of values
 * for example [196, 77, 55] into color in HSL color model.
 * More about color models you can read at:
 * http://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL
 */
function makeColor(hslList, fade) {
    var hue = hslList[0] /*- 17.0 * fade / 1000.0*/ ;
    var sat = hslList[1] /*+ 81.0 * fade / 1000.0*/ ;
    var lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/ ;
    return "hsl(" + hue + "," + sat + "%," + lgt + "%)";
}

// function phraseToHex is used to convert ASCII text into HEX coded text
function phraseToHex(phrase) {
    // assign empty string to hexphrase
    var hexphrase = "";
    // for every char in parameter phrase (...)
    for (var i = 0; i < phrase.length; i++) {
        // (...) add to hexphrase hexadecimal value of this character
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    // return converted string
    return hexphrase;
}

// this function initialize event listeners
function initEventListeners() {
    /* this statement triggers function updateCanvasDimensions [add] if our page is resized by user
     * and triggers function onMove [add] when cursor is moved
     */
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);
    
    // this function will be triggered if user touch a scrren and move his finger (for example in smartphones)
    canvas.ontouchmove = function (e) {
        // preventDefault statement terminates default action of the event
        e.preventDefault();
        // trigger function onTouchMove [add]
        onTouchMove(e);
    };
    // this function will be triggered if usert touch a screen
    canvas.ontouchstart = function (e) {
        // preventDefault statement terminates default action of the event
        e.preventDefault();
    };
}
 
// function updateCanvasDimensions is used to control the size of the canvas
function updateCanvasDimensions() {
    // basic variables, you can change them to resize canvas element
    canvas.attr({
        height: 500,
        width: 1000
    });
    // assign to variables values defined above
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();
    // trigger function draw [add]
    draw();
}

// function onMove checks position of coursor and accordingly affects the animation
function onMove(e) {
    // if pointCollection exists (...)
    if (pointCollection) {
        /* (...) set value of property mousePos of pointCollection to mouse coordinates
         * relative to canvas element
         */
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}

// function onTouchMove checks position of finger on touch screen and accordingly affects the animation
function onTouchMove(e) {
    // if pointCollection exists (...)
    if (pointCollection) {
        /* (...) set value of property mousePos of pointCollection to mouse coordinates
         * relative to canvas element
         */
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}
 
function bounceName() {
    // trigger function shake [add]
    shake();
    // trigger again this function (bounceName) after 30 ms
    setTimeout(bounceName, 30);
}
 
function bounceBubbles() {
    // trigger function draw [add]
    draw();
    // trigger function update [add]
    update();
    // trigger again this function (bounceBubbles) after 30 ms
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
 
function drawName(name, letterColors) {
    updateCanvasDimensions();
    var g = [];
    var offset = 0;
 
    function addLetter(cc_hex, ix, letterCols) {
        if (typeof letterCols !== 'undefined') {
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && Object.prototype.toString.call(letterCols[0]) === '[object Array]') {
                letterColors = letterCols;
            }
            if (Object.prototype.toString.call(letterCols) === '[object Array]' && typeof letterCols[0] === "number") {
                letterColors = [letterCols];
            }
        } else {
            // if undefined set black
            letterColors = [[0, 0, 27]];
        }
 
        if (document.alphabet.hasOwnProperty(cc_hex)) {
            var chr_data = document.alphabet[cc_hex].P;
            var bc = letterColors[ix % letterColors.length];
 
            for (var i = 0; i < chr_data.length; ++i) {
                point = chr_data[i];
 
                g.push(new Point(point[0] + offset,
                    point[1],
                    0.0,
                    point[2],
                    makeColor(bc, point[3])));
            }
            offset += document.alphabet[cc_hex].W;
        }
    }
 
    var hexphrase = phraseToHex(name);
 
    var col_ix = -1;
    for (var i = 0; i < hexphrase.length; i += 2) {
        var cc_hex = "A" + hexphrase.charAt(i) + hexphrase.charAt(i + 1);
        if (cc_hex != "A20") {
            col_ix++;
        }
        addLetter(cc_hex, col_ix, letterColors);
    }
 
    for (var j = 0; j < g.length; j++) {
        g[j].curPos.x = (canvasWidth / 2 - offset / 2) + g[j].curPos.x;
        g[j].curPos.y = (canvasHeight / 2 - 105) + g[j].curPos.y;
        g[j].originalPos.x = (canvasWidth / 2 - offset / 2) + g[j].originalPos.x;
        g[j].originalPos.y = (canvasHeight / 2 - 105) + g[j].originalPos.y;
    }
 
    pointCollection = new PointCollection();
    pointCollection.points = g;
    initEventListeners();
}
 
window.reset = false;
 
$(window).mouseleave(function () {
    window.reset = true;
});
 
$(window).mouseenter(function () {
    window.reset = false;
});

// assign to variable canvas element with id `myCanvas` 
var canvas = $("#myCanvas");

// declaration of the basic variables
var canvasHeight;
var canvasWidth;
var ctx;
var pointCollection;

// settings of our animation, you can try to change them, have fun :)
document.rotationForce = 0.0;
document.Friction = 0.85;
document.springStrength = 0.1;

/* basic, predefined colors, used for example in exercise:
 * http://www.codecademy.com/courses/animate-your-name/2/3
 */
var white = [0, 0, 100];
var black = [0, 0, 27];
var red = [0, 100, 63];
var orange = [40, 100, 60];
var green = [75, 100, 40];
var blue = [196, 77, 55];
var purple = [280, 50, 60];

// this statement will trigger function updateCanvasDimensions after 30 ms [add]
setTimeout(updateCanvasDimensions, 30);

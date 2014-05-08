// Vector is a data structure used to represent a point in 3d space
function Vector(x, y, z) {
    // properties x, y, z represent each coordinate of the point
    this.x = x;
    this.y = y;
    this.z = z;
    // method set is used to change x and y coordinates of the given point
    this.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
}

// PointCollection is a data structure used to represent all points forming our animation
function PointCollection() {
    /* mousePos property stores coordinates of cursor
     * predefined value is a point in upper left corner of 2d plane
     */
    this.mousePos = new Vector(0, 0);

    /* properties pointCollectionX and pointCollectionY stores
     * additional deviation to the position of the point,
     * initial value is 0
     */
    this.pointCollectionX = 0;
    this.pointCollectionY = 0;

    /* property points stores all points forming our animation
     * initial value is a empty array
     */
    this.points = [];

    // method update is used to track position of cursor and accordingly influence each point
    this.update = function () {
        // for every element in array points (...)
        for (var i = 0; i < this.points.length; i++) {
            /* Assign:
             * - to variable point current point (element at index i in array points)
             * - to variable dx horizontal distance between cursor and current point
             * - to variable dy horizontal distance between cursor and current point
             * - to variable d distance in a straight line between cursor and current point,
             *   this variable is calculated using the Pythagorean theorem
             */
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var d = Math.sqrt((dx * dx) + (dy * dy));

            /* Statements below are assignation operations combined with ternary operators [add_doc]
             * If distance between cursor and current point is less than 150 assign to property
             * targetPos [add_lines] of current point difference between current position of point and
             * distance between cursor and current position of point. [add_better_explanation] [optimize_code]
             * Otherwise assign to property targetPos [add_lines] of current point original position of this point.
             */
            point.targetPos.x = d < 150 ? point.curPos.x - dx : point.originalPos.x;
            point.targetPos.y = d < 150 ? point.curPos.y - dy : point.originalPos.y;

            // trigger method update [add_line_numbers] for current point
            point.update();
        }
    };

    /* method shake is used to shake our collection of points. This method a significant part of the
     * bounceName function [add_lines] used, for example, in this exercise:
     * http://www.codecademy.com/courses/animate-your-name/2/7
     */
    this.shake = function () {
        // for every element in array points (...)
        for (var i = 0; i < this.points.length; i++) {
            /* Assign:
             * - to variable point current point (element at index i in array points)
             * - to variable dx horizontal distance between cursor and current point
             * - to variable dy horizontal distance between cursor and current point
             * - to variable d distance in a straight line between cursor and current point,
             *   this variable is calculated using the Pythagorean theorem
             */
            var point = this.points[i];
            var dx = this.mousePos.x - point.curPos.x;
            var dy = this.mousePos.y - point.curPos.y;
            var d = Math.sqrt((dx * dx) + (dy * dy));

            // if distance between cursor and current point is less than 50 (...)
            if (d < 50) {
                /* (...) Assign to properties pointCollectionX and pointCollectionY two random integer numbers
                 * from set [-2, -1, 0, 1, 2]
                 */
                this.pointCollectionX = Math.floor(Math.random() * 5) - 2;
                this.pointCollectionY = Math.floor(Math.random() * 5) - 2;
            }

            /* trigger method draw [add_lines] for current point with parameters
             * pointCollectionX and pointCollectionY which affect the position of point
             */
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY);
        }
    };

    // method draw is used to draw our collection of points
    this.draw = function (bubbleShape, reset) {
        // for every element in array points (...)
        for (var i = 0; i < this.points.length; i++) {
            // (...) assign to variable point current point (element at index i in array points)
            var point = this.points[i];

            // if current point does not exist (...)
            if (point === null)
                // (...) go to the next iteration, next point
                continue;

            // if property reset of window object is set to true (...)
            if (window.reset) {
                // (...) assign default, initial values to variables listed below
                this.pointCollectionX = 0;
                this.pointCollectionY = 0;
                this.mousePos = new Vector(0, 0);
            }

            // trigger method draw for current points [add]
            point.draw(bubbleShape, this.pointCollectionX, this.pointCollectionY, reset);
        }
    };
}

// Point is a data structure used to represent single bubbles in our animation
function Point(x, y, z, size, color) {
    /* property curPos stores the current position of our bubble in 3d space,
     * predefined value is equal to the coordinates defined in alphabet.js (parameters x, y, z)
     */
    this.curPos = new Vector(x, y, z);
    // property color stores the color of our bubble defined by us in main.js
    this.color = color;

    // load settings from document [add_line_numbers]
    this.friction = document.Friction;
    this.rotationForce = document.rotationForce;
    this.springStrength = document.springStrength;

    // property originalPos stores a Vector (point) with the coordinates defined in alphabet.js (parameters x, y, z)
    this.originalPos = new Vector(x, y, z);
    // basic value of radius and size is a value defined in alphabet.js (parameter size)
    this.radius = size;
    this.size = size;
    // property targetPos stores the direction where bubble goes, predefined value is equal to originalPos
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

        /* Assign: [todo]
         * - to variable dx horizontal distance between cursor and current point
         * - to variable dy horizontal distance between cursor and current point
         * - to variable d distance in a straight line between cursor and current point,
         *   this variable is calculated using the Pythagorean theorem
         */
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

    // method draw is used to draw single point / bubble
    this.draw = function (bubbleShape, dx, dy) {
        // set the fill color to the color of the bubble
        ctx.fillStyle = this.color;
        
        if (bubbleShape == "square") {
            // begin path
            ctx.beginPath();
             /* To draw a rectangle filled with the current fillStyle we use
             *  fillRect(x, y, width, height)
             *  where x, y is the upper, left corner of the rectangle.
             *  In this case, we use this.radius * 1.5 for height and width, and
             *  the upper, left vertex has coordinates (this.curPos.x + dx, this.curPos.y + dy)
             */
            ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
        } else { // the default bubbleShape will be circles
            // begin path
            ctx.beginPath();
             /* To draw a circle filled with the current fillStyle we use
             *  arc(x, y, radius, startAngle, endAngle, anticlockwise)
             *  where x, y is the center point of the circle.
             *  In this case, the radius is equal to this.radius with
             *  center at coordinates (this.curPos.x + dx, this.curPos.y + dy)
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
    // assign an empty string to hexphrase
    var hexphrase = "";
    // for every char in parameter phrase (...)
    for (var i = 0; i < phrase.length; i++) {
        // (...) add to hexphrase hexadecimal the value of this character
        hexphrase += phrase.charCodeAt(i).toString(16);
    }
    // return converted string
    return hexphrase;
}

// this function initialize event listeners
function initEventListeners() {
    /* this statement triggers function updateCanvasDimensions [add_line_numbers] if our page is resized by the user
     * and triggers function onMove [add_line_numbers] when the cursor is moved
     */
    $(window).bind('resize', updateCanvasDimensions).bind('mousemove', onMove);

    // this function will be triggered if the user touches a screen and moves their finger (for example in smartphones)
    canvas.ontouchmove = function (e) {
        // preventDefault statement terminates default action of the event
        e.preventDefault();
        // trigger function onTouchMove [add_line_numbers]
        onTouchMove(e);
    };
    // this function will be triggered if the user touches a screen
    canvas.ontouchstart = function (e) {
        // preventDefault statement terminates default action of the event
        e.preventDefault();
    };
}

// function updateCanvasDimensions is used to control the size of the canvas
function updateCanvasDimensions() {
    // basic variables, you can change them to resize the canvas element
    canvas.attr({
        height: 500,
        width: 1000
    });
    // assign to variables the values defined above
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();
    // trigger function draw [add_line_numbers]
    draw();
}

// function onMove checks position of cursor and accordingly affects the animation
function onMove(e) {
    // if pointCollection exists (...)
    if (pointCollection) {
        /* (...) set value of the property mousePos of pointCollection to mouse coordinates
         * relative to the canvas element
         */
        pointCollection.mousePos.set(e.pageX - canvas.offset().left, e.pageY - canvas.offset().top);
    }
}

// function onTouchMove checks position of a finger on touch screen and accordingly affects the animation
function onTouchMove(e) {
    // if pointCollection exists (...)
    if (pointCollection) {
        /* (...) set value of property mousePos of pointCollection to the mouse coordinates
         * relative to canvas element
         */
        pointCollection.mousePos.set(e.targetTouches[0].pageX - canvas.offset().left, e.targetTouches[0].pageY - canvas.offset().top);
    }
}

// function bounceName is used to repeatedly bounce our name
function bounceName() {
    // trigger function shake [add_line_numbers]
    shake();
    // trigger again this function (bounceName) after 30 ms
    setTimeout(bounceName, 30);
}

// [add]
function bounceBubbles() {
    // trigger function draw [add_line_numbers]
    draw();
    // trigger function update [add_line_numbers]
    update();
    // trigger again this function (bounceBubbles) after 30 ms
    setTimeout(bounceBubbles, 30);
}

// function draw is used to draw all points / bubbles forming the animation
function draw(reset) {
    // assign to local variable tmpCanvas our canvas (element at index 0 of our canvas object)
    var tmpCanvas = canvas.get(0);

    // if property getContext of our canvas is not defined (...)
    if (tmpCanvas.getContext === null) {
        // (...) end function
        return;
    }

    // assign to variable ctx context of the canvas element
    ctx = tmpCanvas.getContext('2d');
    
    // statement below is used to erase everything from canvas element
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    /* syntax below is example of ternary operator - shorthand for if ... else construction
     * if shape of our bubbles is not defined use "circle" shaped
     * otherwise use current shape
     */
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";

    // if pointCollection exist (...)
    if (pointCollection) {
        // (...) trigger function draw of pointCollection object [add_line_numbers]
        pointCollection.draw(bubbleShape, reset);
    }
}

function shake() {
    // assign to local variable tmpCanvas our canvas (element at index 0 of our canvas object)
    var tmpCanvas = canvas.get(0);

    // if property getContext of our canvas is not defined (...)
    if (tmpCanvas.getContext === null) {
        // (...) end function
        return;
    }
    
    // assign to variable ctx context of the canvas element
    ctx = tmpCanvas.getContext('2d');
    
    // statement below is used to erase everything from canvas element
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    /* syntax below is example of ternary operator - shorthand for if ... else construction
     * if shape of our bubbles is not defined use "circle" shaped
     * otherwise use current shape
     */
    bubbleShape = typeof bubbleShape !== 'undefined' ? bubbleShape : "circle";

    // if pointCollection exist (...)
    if (pointCollection) {
        // (...) trigger function shake of pointCollection object [add_line_numbers]
        pointCollection.shake(bubbleShape);
    }
}

/* fumction update is used to safely (only if object exist)
 * method update of pointCollection object
 */
function update() {
    // if pointCollection exists (...)
    if (pointCollection)
        // (...) trigger method update of pointCollection object [add_line_numbers]
        pointCollection.update();
}

/* function drawName is the main function in this script, it is used to
 * draw string (parameter name) on canvas in colors defined in parameter
 * letterColors and to init event listeners
 */
function drawName(name, letterColors) {
    // trigger function updateCanvasDimensions [add_lines]
    updateCanvasDimensions();
    // variable g will store all points forming our animation, init value is a empty array
    var g = [];
    // variable offset will store current width of our animation
    var offset = 0;

    /* Function addLetter is used to retrieve data from alhpabet.js
     * for given letter and transform them into Point objects.
     * Before reading comments to this function it is recommended to
     * read this article -> http://www.codecademy.com/forum_questions/53385f2d52f8631f4200b18b
     */
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
    
    // 
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

/* Set property reset of window object to false, this is
 * predefined value. This property is used only in
 * method draw of pointCollection object [add_line_numbers]
 */
window.reset = false;

// when the cursor leaves the site / document (...)
$(window).mouseleave(function () {
    // (...) set property reset of window object to true
    window.reset = true;
});

// when the cursor enters the site / document (...)
$(window).mouseenter(function () {
    // (...) set property reset of window object to false
    window.reset = false;
});

// assign to a variable the canvas element with id `myCanvas`
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

// this statement will trigger function updateCanvasDimensions after 30 ms [add_line_numbers]
setTimeout(updateCanvasDimensions, 30);

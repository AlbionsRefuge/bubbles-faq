Customization
===

### Can I make more colors?


There are many ways to define colors. In this project we are using **HSL** (**H**ue, **S**aturation, **L**ightness). You can read about HSL and other color models [here](http://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL).

In this project you take an array with 3 numbers and assign it a name. You are free to use any words as your array names. 

    var red = [0, 100, 63];
    var tomato = [0, 100, 63];
    var punchBuggy = [0, 100, 63];

In the case of **red**, **H**ue is 0, **S**aturation is 100% and **L**ightness is 63%. 

There are many online tools to help you choose new colors. [here is one](http://hslpicker.com/), and [here is another](http://www.workwithcolor.com/cyan-blue-color-hue-range-01.htm)

![More Colors](https://db.tt/iBUINdOQ)

If you make a new color like this:

    var tardis = [230, 58, 24];

Then you can use your new color in your `letterColors` array. If you want more than one letter of each color, in a row, then you can build up a pattern like this:

    letterColors = [tardis, tardis, tardis, punchBuggy];

### How to change background of animation?
To add extra style to our animation we will use inline (written in `.html` file) `CSS` code. If you want to know more about that language, please take a [HTML & CSS](http://www.codecademy.com/tracks/web) course.

In this operation, the property `background-color` will be useful. The value of this property, a color, might be  presented in different ways:

- RGB (`rgb(255,255,0)`)
- HEX (`#40E0D0`)
- HSL (`hsl(275, 100%, 25%)`)
- name of color (`slateblue`)

We can change the background color of our animation or of the whole page. In the first case we have to add our `CSS` code to the `<canvas>` element in this way:

```
<canvas style="background-color: #B0C4DE;" id="myCanvas"></canvas>
```

![background!](https://db.tt/N2IxsKYj) 


If you want to apply changes to the whole page you have to style the `<body>` element, for example:

```
<body style="background-color: thistle;">
```

But, if you do not like solid colors, instead of `background-color` you can use the property `background-image`. The value of this propety should be a link to an image. As before, you can apply this style to `<canvas>` or `<body>` element. Sample usage:

```
<canvas style="background-image: url('http://thepatternlibrary.com/img/a.jpg');" id="myCanvas"></canvas>
```

More amazing patterns to use freely in your projects you can find at [Pattern Library](http://thepatternlibrary.com/).

### Can I have more shapes?

All shapes are implemented inside `bubbles.js` file. Unfortunately, there are only squares and circles. Fortunately, nothing stands in the way we have added a new one!

Code on which we will work:

```
this.draw = function (bubbleShape, dx, dy) {
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
```

Circle shape is implemented inside `else` statement.

In this post I will show you how to create triangle shape! First we need to create a place where we add our new type, we have to add one `else if` statement:

```
this.draw = function (bubbleShape, dx, dy) {
    ctx.fillStyle = this.color;
    if (bubbleShape == "square") {
        ctx.beginPath();
        ctx.fillRect(this.curPos.x + dx, this.curPos.y + dy, this.radius * 1.5, this.radius * 1.5);
    } else if (bubbleShape == "triangle") {
        
        // description of our new shape
        
    } else {
        ctx.beginPath();
        ctx.arc(this.curPos.x + dx, this.curPos.y + dy, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
};
```

Now, we have to write code that will create triangles. Let's see which variables we can use:

- `this.radius` - value assigned to each single point, it described how big should be our shape. Note that in `circle` and `square` shape this value is used with `1.5` multiplicator to make points a little bigger, we will use it to.
- `this.curPos.x + dx` - horizontal coordinate where our point should be placed
- `this.curPos.y + dy` - vertical coodinate where our point should be placed

Here you can see my planned shape on canvas surface (the lower the greater y):
![canvas](https://copy.com/thumbs_public/CYPd1amLEmUh/canvas.jpg?revision=8381&size=1024)

Code:

```
// start our path
ctx.beginPath();
// move to vertex A
ctx.moveTo(this.curPos.x + dx, this.curPos.y + dy);
// move to vertex B
ctx.lineTo(this.curPos.x + dx, this.curPos.y + dy + this.radius * 1.5);
// move to vertex C
ctx.lineTo(this.curPos.x + dx + this.radius * 1.5, this.curPos.y + dy + this.radius * 1.5);
// fill our shape
ctx.fill();
```

Last thing, in our `main.js` file we should let know `bubbles.js` that we want to use new shape:

```
bubbleShape = 'triangle';
```

The method described above shows a way to create any new shape ready to use with our animation. But to know more about drawing you should check [Draw with JavaScript](http://www.codecademy.com/courses/web-beginner-en-SWM11/0/1) course. After that you should be able to create complex shapes like this one below:

```
else if (bubbleShape == "heart") {
    ctx.beginPath();
    ctx.moveTo(this.curPos.x + dx + 0.8655 * this.radius, this.curPos.y + dy + 0.462 * this.radius);
    ctx.bezierCurveTo(this.curPos.x + dx + 0.8655 * this.radius, this.curPos.y + dy + 0.4275 * this.radius, this.curPos.x + dx + 0.807 * this.radius, this.curPos.y + dy + 0.288 * this.radius, this.curPos.x + dx + 0.5775 * this.radius, this.curPos.y + dy + 0.288 * this.radius);
    ctx.bezierCurveTo(this.curPos.x + dx + 20 / 130 * this.radius * 1.5, this.curPos.y + dy + 0.288 * this.radius, this.curPos.x + dx + 20 / 130 * this.radius * 1.5, this.curPos.y + dy + 62.5 / 130 * this.radius * 1.5, this.curPos.x + dx + 20 / 130 * this.radius * 1.5, this.curPos.y + dy + 62.5 / 130 * this.radius * 1.5);
    ctx.bezierCurveTo(this.curPos.x + dx + 20 / 130 * this.radius * 1.5, this.curPos.y + dy + 80 / 130 * this.radius * 1.5, this.curPos.x + dx + 0.462 * this.radius, this.curPos.y + dy + 102 / 130 * this.radius * 1.5, this.curPos.x + dx + 0.8655 * this.radius, this.curPos.y + dy + 120 / 130 * this.radius * 1.5);
    ctx.bezierCurveTo(this.curPos.x + dx + 110 / 130 * this.radius * 1.5, this.curPos.y + dy + 102 / 130 * this.radius * 1.5, this.curPos.x + dx + this.radius * 1.5, this.curPos.y + dy + 80 / 130 * this.radius * 1.5, this.curPos.x + dx + this.radius * 1.5, this.curPos.y + dy + 62.5 / 130 * this.radius * 1.5);
    ctx.bezierCurveTo(this.curPos.x + dx + this.radius * 1.5, this.curPos.y + dy + 62.5 / 130 * this.radius * 1.5, this.curPos.x + dx + this.radius * 1.5, this.curPos.y + dy + 0.288 * this.radius, this.curPos.x + dx + 100 / 130 * this.radius * 1.5, this.curPos.y + dy + 0.288 * this.radius);
    ctx.bezierCurveTo(this.curPos.x + dx + 0.9808 * this.radius, this.curPos.y + dy + 0.288 * this.radius, this.curPos.x + dx + 0.8655 * this.radius, this.curPos.y + dy + 0.4275 * this.radius, this.curPos.x + dx + 0.8655 * this.radius, this.curPos.y + dy + 0.462 * this.radius);
    ctx.fill();
}
```

![the dots are hearts](https://db.tt/Y9wXERQd)

### Can I change the font size?
Of course you can! But you will have to dig into `bubbles.js` file and change it a bit. Before we start it is highly recommended to read: [How does alphabet.js work?][1].

This piece of code in `bubbles.js` is responsible for drawing all the dots in our project:

```
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
```

`point[0]` corresponds to the x coordinate of each point, `point[1]` is the y coordinate and `document.alphabet[cc_hex].W` is the width of our whole letter. These three values affects the size of our font. So we have to modify them.

It is very important to understand that we should keep correct proportions. We do not want to make a weird looking animation where every letter is three times wider than normal but height of letter is without any change - or maybe you do!.

To make sure that we are keeping aspect ratio we will create a special variable to store a multiplier - `fontSizeMultiplier`. It will work in very intuitive way. If the multiplier is equal to `2` then letters are two times larger. If it is equal to `0.5` then they are two times smaller.

To reach our goal we simply have to define our variable and assign to it desired value (in our example - `0.5`) and then multiply every decisive variable (`point[0]`, `point[1]` and `document.alphabet[cc_hex].W`). This is the code after adjustments:

```
if (document.alphabet.hasOwnProperty(cc_hex)) {

    // definition of our variable
    var fontSizeMultiplier = 0.5;

    var chr_data = document.alphabet[cc_hex].P;
    var bc = letterColors[ix % letterColors.length];

    for (var i=0; i<chr_data.length; ++i) {
        point = chr_data[i];

        g.push(
            // multiplication of x and y coordinates by defined value
            new Point(point[0] * fontSizeMultiplier + offset,
            point[1] * fontSizeMultiplier,
            
            0.0,
            point[2],
            makeColor(bc,point[3])));
    }
    
    // multiplication of letter width by our multiplier
    offset += document.alphabet[cc_hex].W * fontSizeMultiplier;
}
```

#### Can I change size of the dots?

As you should know from [How does alphabet.js work?][1], the third value (with index `2`, because we are counting from `0`) of every `point` object corresponds to the size of the dot. So we have to multiply or add desired value to `point[2]`. If you change the size of the font then you probably want to multiply it by `fontSizeMultiplier`, this is very good idea! You have only to change this parameter of `g.push` method:
```
point[2],
```
into:
```
point[2] * fontSizeMultiplier,
```

But if you want to change only size of the dots - feel free to do that as well. If you want to make dots two times bigger your code should look like this:

```
if (document.alphabet.hasOwnProperty(cc_hex)) {
    var chr_data = document.alphabet[cc_hex].P;
    var bc = letterColors[ix % letterColors.length];

    for (var i = 0; i < chr_data.length; ++i) {
        point = chr_data[i];

        g.push(new Point(point[0] + offset,
            point[1],
            0.0,
            
            // because of this multiplication our dots will be two times bigger 
            point[2] * 2,
        
            makeColor(bc, point[3])));
    }
    offset += document.alphabet[cc_hex].W;
}
```

![example of big dots](https://db.tt/N99H05O5)

### Any more tricks? Yes, color fading!

In [How does alphabet.js work?][1] I mentioned about one mysterious value of every point - the fourth value coresponding to hue of a color. But as I said there, this option was not used in our projects, but there is no reason we can't turn it on if we want to!

Function `makeColor` is responsible for making color (who would have guessed?) so let's look at it closer:

```
function makeColor(hslList, fade) {
    var hue = hslList[0] /*- 17.0 * fade / 1000.0*/;
    var sat = hslList[1] /*+ 81.0 * fade / 1000.0*/;
    var lgt = hslList[2] /*+ 58.0 * fade / 1000.0*/;
    return "hsl("+hue+","+sat+"%,"+lgt+"%)";
}
```

You probably noticed a few comments. We only have to uncomment the code and our animations will gain some depth!

```
function makeColor(hslList, fade) {
    var hue = hslList[0] - 17.0 * fade / 1000.0;
    var sat = hslList[1] + 81.0 * fade / 1000.0;
    var lgt = hslList[2] + 58.0 * fade / 1000.0;
    return "hsl("+hue+","+sat+"%,"+lgt+"%)";
}
```

![An example of more colors, bigger dots, and fading!](https://db.tt/kDgLXNO8)

### How to resize animation?

If you want to use this animation in your own project then the predefined size (500px x 1000px) might be unsuitable. To resize the animation (`canvas` element in fact) you have to change only two parts of `bubbles.js`.

First one is part of the code that is executed just when the script is loaded:

```
var canvas = $("#myCanvas");
// change canvasHeight and canvasWidth to desired values
var canvasHeight = 500;
var canvasWidth = 1000;
```

Second one is `updateCanvasDimensions` function:

```
function updateCanvasDimensions() {
    canvas.attr({
        // change height and width to desired value
        height: 500,
        width: 1000
    });
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();

    draw();
}
```

Important note - values in both snippets should be the same.

### How to vertically center the animation?

If you change the background color of `canvas` you might notice that our animation is horizontally centered, but not vertically. And when we change the size of the canvas or the size of the font it might be really annoying. So, we will fix that!

For the vertical position of our animation, lines 3 and 5 of this code are responsible:

```
for (var j = 0; j < g.length; j++) {
    g[j].curPos.x = (canvasWidth / 2 - offset / 2) + g[j].curPos.x;
    g[j].curPos.y = (canvasHeight / 2 - 180) + g[j].curPos.y;
    g[j].originalPos.x = (canvasWidth / 2 - offset / 2) + g[j].originalPos.x;
    g[j].originalPos.y = (canvasHeight / 2 - 180) + g[j].originalPos.y;
}
```

I really do not know why developers had used `180` here. Height of letters (difference between lowest and highest second coordinate in whole `alphabet.js`) with additional buffer area (difference between `0` and lowest second coordinate in `alphabet.js` * `2`) is equal to `210`  and we will use this value (in fact, half ot it) to place our animation in middle of canvas:

```
for (var j = 0; j < g.length; j++) {
    g[j].curPos.x = (canvasWidth / 2 - offset / 2) + g[j].curPos.x;
    g[j].curPos.y = (canvasHeight / 2 - 105) + g[j].curPos.y;
    g[j].originalPos.x = (canvasWidth / 2 - offset / 2) + g[j].originalPos.x;
    g[j].originalPos.y = (canvasHeight / 2 - 105) + g[j].originalPos.y;
}
```

But as you probably noticed we are using here a hard coded value corresponding to height of letters... what if we change size of the font? We have to multiply `105` by our `fontSizeMultiplier`, but we can not use that variable here, because it was defined in scope of another function. We have to use here only value. So if our `fontSizeMultiplier` was equal to `0.5` our code should be:

```
for (var j = 0; j < g.length; j++) {
    g[j].curPos.x = (canvasWidth / 2 - offset / 2) + g[j].curPos.x;
    g[j].curPos.y = (canvasHeight / 2 - 105 * 0.5) + g[j].curPos.y;
    g[j].originalPos.x = (canvasWidth / 2 - offset / 2) + g[j].originalPos.x;
    g[j].originalPos.y = (canvasHeight / 2 - 105 * 0.5) + g[j].originalPos.y;
}
```







  [1]: https://github.com/AlbionsRefuge/bubbles-faq/blob/master/behind%20the%20scenes.md#how-does-alphabetjs-work

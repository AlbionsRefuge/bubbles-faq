Customization
===

### Can I make more colors?
There are many ways to define colors. In this project we are using **HSL** (**H**ue, **S**aturation, **L**ightness). You can read about HSL and other color models [here](http://en.wikibooks.org/wiki/Color_Models:_RGB,_HSV,_HSL).

Have a look at how the colors in this project are defined. You take an array with 3 numbers and assign it a name. Just to make it nice for humans to read, the color names we are familiar with have been used as our variable names but you are free to use any words. 

    var red = [0, 100, 63];
    var tomato = [0, 100, 63];
    var punchBuggy = [0, 100, 63];

In the case of **red**, **H**ue is 0, **S**aturation is 100% and **L**ightness is 63%. Don't include the % signs in your arrays.

There are many online tools to help you choose new colors. [here is one](http://hslpicker.com/), and [here is another](http://www.workwithcolor.com/cyan-blue-color-hue-range-01.htm)

You can make a new color like this:

    var tardis = [230, 58, 24];

Now you can use your new color in your `letterColors` array. If you want more than one letter of each color, in a row, then you can build up a pattern like this:

    letterColors = [tardis, tardis, tardis, punchBuggy];


### Can I have more shapes? 
[Maciej will prepare example with triangles, we will link course about drawing with JavaScript]

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

As you should know from [How does alphabet.js work?][1], third value (with index `2`, because we are counting from `0`) of every `point` object corresponds to the size of the dot. So we have to multiply or add desired value to `point[2]`. If you change the size of the font then you probably want to multiply it by `fontSizeMultiplier`, this is very good idea! You have only to change this parameter of `g.push` method:
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

###How to resize animation?

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



An example of more colors, bigger dots, and fading!

<img src="http://i.imgur.com/M05mwFn.png" title="Cotton Candy"/>

  [1]: https://github.com/AlbionsRefuge/bubbles-faq/blob/master/behind%20the%20scenes.md#how-does-alphabetjs-work

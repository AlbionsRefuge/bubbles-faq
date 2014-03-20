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

    letterColors = [tardis, tardis, tardis, red];


### Can I have more shapes? 
[Maciej will prepare example with triangles, we will link course about drawing with JavaScript]

### Can I change the font size?


### Can I change size of the dots?


### Any more tricks? Yes, color fading!

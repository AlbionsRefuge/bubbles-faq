Behind the Scenes
===

### How does alphabet.js work?

In alphabet.js is defined only one object called `document.alphabet`.

`document.alphabet` is collection of objects (representing single characters) with names coded in hexadecimal values (in pattern `A + hexValue`). Code of script is organized in this manner:
```
document.alphabet = {
    A79: {
        W: 75,
        P: [[64, 89, 9, -102], [57, 103, 9, -102], [5, 89, 9, -79], [16, 104, 8, -35], [51, 122, 8, -35], [23, 118, 8, -35], [31, 133, 8, 50], [46, 136, 8, 50], [34, 153, 8, 69], [28, 168, 7, 112], [21, 183, 7, 112]]
    },
    A78: {
        W: 85,
        P: [[10, 148, 8, -103], [21, 137, 8, -92], [33, 125, 7, -79], [50, 124, 7, -35], [58, 135, 7, -35], [68, 148, 7, -35], [40, 111, 7, 51], [33, 103, 7, 51], [21, 86, 7, 51], [56, 106, 7, 51], [67, 92, 7, 112]]
    },
    A77: {
        W: 98,
        P: [[24, 148, 10, -102], [67, 151, 10, -102], [34, 133, 9, -36], [61, 134, 9, -36], [76, 132, 8, -36], [16, 130, 8, -36], [14, 112, 7, 50], [40, 118, 7, 50], [58, 117, 7, 50], [82, 117, 7, 83], [86, 100, 7, 83], [51, 101, 7, 83], [11, 95, 7, 83]]
    },
    
    // more more more
    
    A3d: {
        W: 73,
        P: [[11, 91, 9, -50], [27, 90, 9, -50], [44, 90, 9, -50], [59, 90, 9, -50], [11, 127, 6, 69], [21, 128, 6, 69], [33, 129, 6, 69], [44, 129, 6, 69], [53, 129, 6, 69]]
    }
};
```

[Here you can find list with hexadecimal value of every printable character][1]

`A79` - character with hex code `79` -> `y`
`A78` - character with hex code `78` -> `x`
`A77` - character with hex code `77` -> `w`
`A3d` - character with hex code `3d` -> `=`

Every letter has two properties, `W` and `P`.

`W` stands for "width". Higher value of `W` -> character is broader. That is why `W` of `A3d` (`=`) is so small.

`P` is collection of points (single dots on your animation). Every point has 4 values, for example `[64, 89, 9, -102]`. First two values are coordinates (x = `64`, y = `89`), they have an impact on where dot is located. Third value (`9`) specifies size of the dot. Last value (`-102`) is not used in our project, but originally it was defining tone of selected by user color (hue).

### How does bounceBubbles() know what to do?



### What does drawName() really do?


  [1]: http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
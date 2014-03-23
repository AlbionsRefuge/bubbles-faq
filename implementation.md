Outside Implementation
===

### How can I make bouncing bubbles work away from Codecademy?

Our animation is based on external script files. You can use them outside Codecademy, but you should not claim that you wrote them or try to sell them. If you use them on a public website the right thing to do would be to give credit to the work done by others just as the people at Codecademy did. *We want to thank [Google](http://www.google.com/logos/particle.html), [Rob Hawkes](https://github.com/robhawkes/google-bouncing-balls), and [Mark Brenig-Jones & Emile Petrone](http://dotty-dots.appspot.com/). This course was inspired by and built on their work.*

It is very easy to accomplish. You should create files called `main.js` and `index.html`. Then you have to copy code from your Codecademy project (`index.html` and `main.js` tabs) and paste it inside corresponding newly created files.

You should remember that:

- you should not change the name of your script file (`main.js`) unless you also change the file's name in your `.html` file 
- you can change name of your `html` file (for example to `animation.html`)
- both files have to be in the same directory (for example `root`, `public_html` or `desktop`)

#### Bouncing bubbles does not work from my hard drive, what to do?

This problem is caused by external files, your browser can not use them in offline mode which is used when you are opening `html` file from your hard drive. To fix that you have to download all external files:

- //code.jquery.com/jquery-1.10.2.min.js
- http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/alphabet.js
- http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/bubbles.js

and put them in same directory as your `main.js` and `html` files are placed. You can call them: `jquery.js`, `alphabet.js` and `bubbles.js`.

Last step is changing links in your `html` file from absolute links to relational links in this way:

- `<script type="text/javascript" src="//code.jquery.com/jquery-1.10.2.min.js"></script>` into `<script type="text/javascript" src="jquery.js"></script>`
- `<script type="text/javascript" src="http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/alphabet.js"></script>` into `<script type="text/javascript" src="alphabet.js"></script>`
- `<script type="text/javascript" src="http://s3.amazonaws.com/codecademy-content/courses/hour-of-code/js/bubbles.js"></script>` into `<script type="text/javascript" src="bubbles.js"></script>`

### Can I have more than one line of text?

# JR Web Training

## Initialized

There [x] steps to initialized the whole environment.

- intstall npm, create package.json
  `npm init`

- install SASS
  `npm i node-sass --save-dev`

- add script in package.json

`"compile:sass": "node-sass sass/main.scss css/style.css -w"`

- watch mode is for continous compiling, live-server is for continous loading.

## Float

> CSS is written to allow floated elements to stick out of the bottom of their containing elements.

http://complexspiral.com/publications/containing-floats/

## Position

## Name

index.html

## Icon

Icon finder
Use SVG

PNG - liner caculation, Graphic design, small size
JPG - Scene design.

## Code review

- component design, use wrap to define it's position.

<div class="container"></div>

css no line break

repeat component use ul & li

no space in folder

## SVG

inline modified hover
create svg animation

## BEM

## RWD

Responsive web design

mixin 320px

iphone 414px

ipad 768
ipad pro 1024

apple watch

1. import scale
2. percentage, media screen

## Bootstrap 3 & 4

float & flexbox

consistency

no more than 4 fonts

animated css

## CSS

### Flex-box

- flex-basis: the basic width
- flex-grow: browser bigger, expand
- flex-shrunk: browser smaller, shrunk

when sets to 0, cannot expand or shrunk

- Too make a static block

```
  flex: 0 0 10%;
  min-width: 0;
  word-wrap: break-word;
  // Used for a long word....
```

## Quiz

1. What does the attribute maxlength do when added to a text input?
   Controls the physical length of the input element
   D

2.Which of the following elements is used to define multiple media resources for <video> and <audio>?

`<track>`<video>`<source>`<embed>``<audio>`

C `source`

3. What are the two types of global storage available via HTML5 Data storage?
   A.browserStorage and persistentStorage
   B. globalStorage and localdataStorage
   C. externalStorage and dataStorage
   D. sessionStorage and localStorage

D session for window, localStorage for global

4.Which would create a button that empties the form for the user to begin again?

A.<input type="clear"/>
B. <reset/>
C. <input type="reset"/>
D. <submit for="clear"/>
E. <submit>reset</submit>

C

5. Which element would you use in the <HEAD> to set the document character encoding to UTF-8?
   A.<meta type="charset" content="utf-8">
   B. <link rel="content-type" content="utf-8">
   C. <link rel="charset" content="utf-8">
   D. <meta charset="utf-8">

D

6.What does the <header> tag define?
A.Additional details that the user can view or hide
B. The head of an HTML document
C. The date and time
D. A representation of the progress of a task
E. A header for a document or section

E

7.HTML attribute values are usually enclosed in:
A.brackets.
B. quotation marks.
C. parentheses.
D. curly braces.

B

8.Which of the following is a correct pixel size for a website favicon?:
A.20 pixels x 20 pixels.
B. 30 pixels x 30 pixels
C. 16 pixels x 16 pixels.
D. 15 pixels x 15 pixels

C

9. Which attribute would you use on the element to open a link in a new window?
   A.target="\_new"
   B. target="open"
   C. target="\_self"
   D. target="\_blank"

D.

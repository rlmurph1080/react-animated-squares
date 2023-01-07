# react-animated-squares
A customizable, animated background featuring floating squares

[![react-animated-squares](https://github.com/yh54321/react-animated-squares/blob/main/example_img.png)](https://github.com/yh54321/react-animated-squares)

Adapted from design by [Mohammad Abdul Mohaiman](https://codepen.io/mohaiman) at https://codepen.io/mohaiman/pen/MQqMyo


[![npm version](https://img.shields.io/npm/v/react-pokerchip.svg?style=flat)](https://www.npmjs.com/package/react-pokerchip)

# Usage Example
```JavaScript
import SquaresBG from "react-animated-squares";

<div id="container">
  <SquaresBG count={20} speed={0.7} />
</div>
```
# Instructions
To install: `npm i react-animated-squares`

Place component as first child of parent element

# Props
All props are optional and can be `undefined`.

## count : number
#### Default value: `10`
Number of animated squares to render

## speed : number
#### Default value: `0.5`
Speed at which squares rise. A number between `0` and `1`, inclusive. Higher is faster

## minSize : number
#### Default value: `100`
Minimum size of squares, in pixels

## maxSize : number
#### Default value: `200`
Maximum size of squares, in pixels

## backgroundColor : string
#### Default value: `"#4E54C8"`
Color of background

## squareColor : string
#### Default value: `"#FFFFFF"`
Color of squares, with `0.2` alpha value by default. Must be 6 character `hex`, `rgb`, or `rgba`

## randomBGColor : boolean
#### Default value: `false`
Renders a random background color, overrides `backgroundColor`

## randomSquareColor : boolean
#### Default value: `false`
Renders a random square color for each square, overrides `squareColor`

# DanimaJS
Cursor based transform animations library for HTML Elements.

## Created By
David Fuentes (@davefellow)

## How to use
You have to add the CSS class "danima-elem" to an HTML element in order for it to be recognized by the library.

You can customize the transform effect by using any of the following data attributes:

### data-danima-translation-speed
Value format: number, number

This controls the translation speed, which also determines how far the element gets with cursor movements.

You can set it to "1, 1" and use it as a reference to adjust the desired value.

### data-danima-translation-limit
Value format: number

This sets a limit for how far the translation gets with mouse movement, if it's not present or set to "0", the element will translate as far as possible.

The value is currently only set in pixels.


### data-danima-rotation-speed
Value format: number, number

This controls the rotation speed, similar to `data-danima-translation-limit`.

You can set it to "1, 1" and use it as a reference to adjust the desired value.


### data-danima-rotation-limit
Value format: number

This sets a limit to the angle set while rotating the element, if it's not present or set to "0", the element will rotate as much as possible depending on mouse position.

The value must be set on degrees (0°-360°).

### data-danima-scale-speed
Value format: number, number

This controls the translation speed, which also determines how far the element gets with cursor movements.

You can set it to "1, 1" and use it as a reference to adjust the desired value.


### data-danima-scale-min
Value format: number

The minimum size the element will be scaled to.

The value is currently only set in pixels.


### data-danima-scale-max
Value format: number

The maximum size the element will be scaled to.

The value is currently only set in pixels.



/**
 * Created by nuintun on 2015/12/3.
 */

'use strict';

/**
 * textRepeat
 * @param text
 * @param n
 * @returns {string}
 */
function textRepeat(text, n){
  var str = '';

  for (var i = 0; i < n; i++) {
    str += text;
  }

  return str;
}

/**
 * iterator
 * @param from
 * @param iterator
 * @param context
 */
function iterator(from, iterator, context){
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      iterator.call(context, key, from[key]);
    }
  }
}

// default font
var FONT = {
  size: 13,
  color: '#fff',
  lineHeight: 20,
  family: 'Consolas'
};

/**
 * CanvasXTerm
 * @param font
 * @constructor
 */
function CanvasXTerm(font){
  font = font || {};
  
  // font setting
  this.font = {};

  // inherits
  iterator(FONT, function (key, value){
    if (font.hasOwnProperty(key)) {
      this.font[key] = font[key];
    } else {
      this.font[key] = value;
    }
  }, this);

  this.canvas = document.createElement('canvas');
  this.canvas.style.backgroundColor = 'transparent';
  this.brush = this.canvas.getContext('2d');
}

// CanvasXTerm prototype
CanvasXTerm.prototype = {
  /**
   * draw
   * @param screen
   */
  draw: function (screen){
    var text = '';
    var context = this;
    var rows = screen.rows;
    var cols = screen.cols;
    var attrCache = null;
    var stylesCache = null;
    var node, i, j, x, y;
    var line, width, height;

    if (!this.rows || !this.cols || this.rows !== rows || this.cols !== cols) {
      this.rows = rows;
      this.cols = cols;

      width = this.measureWidth(
        textRepeat('A', cols),
        'italic bold ' + this.font.size + 'px ' + this.font.family
      );

      height = rows * this.font.lineHeight;
    } else {
      width = this.canvas.width;
      height = this.canvas.height;
    }

    // clear canvas
    this.canvas.width = width;
    this.canvas.height = height;

    function reset(){
      text = '';
      attrCache = node.attr;
      stylesCache = context.getStyles(node);
    }

    for (i = 0; i < rows; i++) {
      x = 0;
      y = (i + 0.5) * this.font.lineHeight;
      line = screen.buffer[i];

      if (!line) {
        continue;
      }

      for (j = 0; j < cols; j++) {
        node = line[j];

        if (!node) {
          continue;
        }

        if (j === 0) {
          reset();
        }

        if (node.value) {
          if (node.attr !== attrCache) {
            x = this.drawText(text, x, y, stylesCache);

            reset();
          }

          text += node.value;
        }
      }

      this.drawText(text, x, y, stylesCache);
    }
  },
  /**
   * getStyles
   * @param node
   * @returns {{}}
   */
  getStyles: function (node){
    var styles = {};

    if (node.background) {
      styles.background = node.background;
    }

    if (node.foreground) {
      styles.foreground = node.foreground;
    } else {
      styles.foreground = this.font.color;
    }

    if (node.conceal) {
      styles.foreground = styles.background = 'transparent';
    }

    ['bold', 'italic', 'underline', 'blink'].forEach(function (key){
      styles[key] = node[key];
    });

    return styles;
  },
  /**
   * drawBackground
   * @param x
   * @param y
   * @param width
   * @param background
   */
  drawBackground: function (x, y, width, background){
    y = y - this.font.size / 2;

    this.brush.save();

    this.brush.fillStyle = background;

    this.brush.fillRect(x, y, width, this.font.size);
    this.brush.restore();
  },
  /**
   * drawUnderline
   * @param x
   * @param y
   * @param width
   * @param foreground
   */
  drawUnderline: function (x, y, width, foreground){
    y = y + this.font.size / 2;

    this.brush.save();
    this.brush.translate(0, parseInt(y) === y ? 0.5 : 0);

    this.brush.lineWidth = 1;
    this.brush.strokeStyle = foreground;

    this.brush.beginPath();
    this.brush.moveTo(x, y);
    this.brush.lineTo(x + width, y);
    this.brush.stroke();
    this.brush.restore();
  },
  /**
   * drawText
   * @param text
   * @param x
   * @param y
   * @param styles
   * @returns x
   */
  drawText: function (text, x, y, styles){
    var font = (styles.italic ? 'italic ' : 'normal ')
      + (styles.bold ? 'bold ' : 'normal ')
      + this.font.size + 'px '
      + this.font.family;

    var width = this.measureWidth(text, font);

    if (styles.background) {
      this.drawBackground(x, y, width, styles.background);
    }

    this.brush.save();

    this.brush.font = font;
    this.brush.fillStyle = styles.foreground;
    this.brush.textAlign = 'start';
    this.brush.textBaseline = 'middle';

    this.brush.fillText(text, x, y);
    this.brush.restore();

    if (styles.underline) {
      this.drawUnderline(x, y, width, styles.foreground);
    }

    return x + width;
  },
  /**
   * measureWidth
   * @param text
   * @param font
   * @returns {Number}
   */
  measureWidth: function (text, font){
    this.brush.save();

    this.brush.font = font;

    var width = this.brush.measureText(text).width;

    this.brush.restore();

    return width;
  }
};

// exports
if (typeof module === 'object') {
  module.exports = CanvasXTerm;
} else {
  this.CanvasXTerm = CanvasXTerm;
}

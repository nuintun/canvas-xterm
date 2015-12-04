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
 * CanvasXTerm
 * @param font
 * @constructor
 */
function CanvasXTerm(font){
  this.font = font || { family: 'Consolas', lineHeight: 20, size: 13, color: '#fff' };
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
   * drawText
   * @param text
   * @param x
   * @param y
   * @param styles
   * @returns {{x: *, y: *}}
   */
  drawText: function (text, x, y, styles){
    var font = (styles.italic ? 'italic ' : 'normal ')
      + (styles.bold ? 'bold ' : 'normal ')
      + this.font.size + 'px '
      + this.font.family;

    var width = this.measureWidth(text, font);

    if (styles.background) {
      this.brush.save();

      this.brush.fillStyle = styles.background;

      this.brush.fillRect(x, y - this.font.size / 2, width, this.font.size);
      this.brush.restore();
    }

    this.brush.save();

    this.brush.font = font;
    this.brush.fillStyle = styles.foreground;
    this.brush.textAlign = 'start';
    this.brush.textBaseline = 'middle';

    this.brush.fillText(text, x, y);
    this.brush.restore();

    if (styles.underline) {
      underline(this.brush, x, x + width, y + this.font.size / 2, styles.foreground);
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

/**
 * draw underline
 * @param brush
 * @param x1
 * @param x2
 * @param y
 * @param foreground
 */
function underline(brush, x1, x2, y, foreground){
  brush.save();
  brush.translate(0, parseInt(y) === y ? 0.5 : 0);
  brush.lineWidth = 1;
  brush.strokeStyle = foreground;
  brush.beginPath();
  brush.moveTo(x1, y);
  brush.lineTo(x2, y);
  brush.stroke();
  brush.restore();
}

// exports
module.exports = CanvasXTerm;

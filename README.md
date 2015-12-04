canvas-xterm
=========

>A tool to draw xterm screen

```js
var screen = {
  rows: 1,
  cols: 14,
  buffer: [
    [
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "红"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "底"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "下"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "划"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "线"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "绿"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      },
      {
        "wide": true,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": "字"
      },
      {
        "wide": false,
        "bold": false,
        "italic": false,
        "underline": true,
        "blink": false,
        "conceal": false,
        "foreground": "#00cd00",
        "background": "#cd0000",
        "attr": 84148737,
        "value": ""
      }
    ]
  ]
};

var xterm = new CanvasXTerm();

xterm.draw(screen);

document.body.appendChild(xterm.canvas);
```
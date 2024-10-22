# Protorians Widgets

Create your web user interfaces with widgets

## Syntax

```typescript
import {Widget, H1, H4, Paragraph, Component} from "@protorians/widgets"
import {IWidget} from "./widget";

/**
 * Define Type
 */
type MyType = {
  fullname: string;
}

/**
 * Create widget
 */
const myWidget = ({fullname}: MyType): IWidget<ICommonAttributes, HTMLElement> => Widget({
  classname: "my-widget",
  style: {
    padding: "1rem",
    width: "calc( 100% - 2rem )"
  },
  children: [
    H1('Protorians Widget'),
    Paragraph(`Welcome to the futur ${fullname}`)
  ],
  signal: {
    mount: (context) => console.log('My widget is mounted with context :', context)
  }
})


/**
 * Define component
 */
Component<MyType>('MyWidget', myWidget)

/**
 * Or Use in other widget
 */
const otherWidget = Widget({
  children:[
    H4('Home'),
    myWidget({fullname: 'Carter'})
  ]
})

```

### Use in HTML page
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Page</title>
</head>
<body>
...
    <my-widget fullanme="Ian"></my-widget>
...
</body>
</html>
```
## Coming Soon...
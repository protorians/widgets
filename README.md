# widgets

Create your web user interfaces with widgets

## Syntax

```typescript
import {Widget, H1, Paragraph} from "@protorians/widget"

const myWidget = () => Widget({
  classname: "my-widget",
  style: {
    padding: "1rem",
    width: "calc( 100% - 2rem )"
  },
  children: [
    H1('Protorians Widget'),
    Paragraph('Welcome to the futur')
  ],
  signal:{
    mount: (context)=> console.log('My widget is mounted with context :', context)
  }
})
```

## Coming Soon...
# Detect outside clicks

Detect clicks _outside_ of an element by listening to its `focusout` event.

## Installation

```sh
npm i @bounoable/on-click-outside
pnpm i @bounoable/on-click-outside
yarn add @bounoable/on-click-outside
```

## Usage

This package exports two functions: `onClickOutside()` and
`makeFocusOutHandler()`. The latter can be useful when working with a framework
like [Vue](https://github.com/vuejs/vue).

### Vanilla – onClickOutside()

```html
<p id="el">Click outside of me.</p>
```

```ts
import { onClickOutside } from '@bounoable/on-click-outside'

const el = document.querySelector('#el')

const removeListener = onClickOutside(el, (
  target: EventTarget,
  event: FocusEvent
) => {
  console.log(`${el} lost its focus to ${target}.`)
})

// Stop listening to outside clicks.
removeListener()
```

### Vue – makeFocusOutHandler()

Returns an event handler that calls the provided callback function when an event
is fired. The callback function is called only if the focus was lost to an
_outside_ element.

Note that the `tabindex` attribute of the element must be manually set,
otherwise it cannot be focused and therefore cannot lose its focus.

```html
<template>
  <p tabindex="-1" @focusout="handleFocusOut">
    Click me, then click outside of me.
  </p>
</template>

<script type="ts">
import { defineComponent } from 'vue'
import { makeFocusOutHandler } from '@bounoable/on-click-outside'

export default defineComponent({
  setup() {
    const handleFocusOut = makeFocusOutHandler((
      target: EventTarget,
      event: FocusEvent
    ) => {
      console.log(`${event.currentTarget} lost its focus to ${event.relatedTarget}.`)
    })

    return {
      handleFocusOut,
    }
  }
})
</script>
```

## License

[MIT](./LICENSE)

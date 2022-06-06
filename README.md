# Detect outside clicks

Detect clicks _outside_ of an element by listening to its `focusout` event.

## Installation

```sh
npm i @bounoable/on-click-outside
pnpm i @bounoable/on-click-outside
yarn add @bounoable/on-click-outside
```

## Usage

### onClickOutside()

```html
<p id="el">Click me, then click outside of me.</p>
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

### makeFocusOutHandler()

```html
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

<template>
  <p tabindex="-1" @focusout="handleFocusOut">
    Click me, then click outside of me.
  </p>
</template>
```

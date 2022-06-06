import { describe, expect, it } from 'vitest'
import { makeFocusOutHandler, onClickOutside } from '../src/onClickOutside'

describe('makeFocusOutHandler', () => {
  it('calls the provided function when the element loses its focus to an outside element', () => {
    const { el, outside } = makeDocument()

    let called = false
    const handler = makeFocusOutHandler(() => {
      called = true
    })

    el.addEventListener('focusout', handler)

    const evt = new FocusEvent('focusout', { relatedTarget: outside })
    el.dispatchEvent(evt)

    expect(called, 'callback function should have been called').toBe(true)
  })

  it(`doesn't call the provided function when the focus is lost to a child element`, () => {
    const { el, child } = makeDocument()

    let called = false
    const handler = makeFocusOutHandler(() => {
      called = true
    })

    el.addEventListener('focusout', handler)

    const evt = new FocusEvent('focusout', { relatedTarget: child })
    el.dispatchEvent(evt)

    expect(called, 'callback function should not have been called').toBe(false)
  })

  it(`doesn't call the provided function when the focus is lost to itself`, () => {
    const { el } = makeDocument()

    let called = false
    const handler = makeFocusOutHandler(() => {
      called = true
    })

    el.addEventListener('focusout', handler)

    const evt = new FocusEvent('focusout', { relatedTarget: el })
    el.dispatchEvent(evt)

    expect(called, 'callback function should not have been called').toBe(false)
  })
})

describe('onClickOutside', () => {
  it('calls the provided function when the element loses its focus to an outside element', () => {
    const { el, outside } = makeDocument()

    let called = false
    onClickOutside(el, () => {
      called = true
    })

    const evt = new FocusEvent('focusout', { relatedTarget: outside })
    el.dispatchEvent(evt)

    expect(called, 'callback function should have been called').toBe(true)
  })

  it(`doesn't call the provided function when the focus is lost to a child element`, () => {
    const { el, child } = makeDocument()

    let called = false
    onClickOutside(el, () => {
      called = true
    })

    const evt = new FocusEvent('focusout', { relatedTarget: child })
    el.dispatchEvent(evt)

    expect(called, 'callback function should not have been called').toBe(false)
  })

  it(`doesn't call the provided function when the focus is lost to itself`, () => {
    const { el } = makeDocument()

    let called = false
    onClickOutside(el, () => {
      called = true
    })

    const evt = new FocusEvent('focusout', { relatedTarget: el })
    el.dispatchEvent(evt)

    expect(called, 'callback function should not have been called').toBe(false)
  })

  it(`doesn't call the provided function after removing the event listener`, () => {
    const { el } = makeDocument()

    let called = false
    const unlisten = onClickOutside(el, () => {
      called = true
    })

    unlisten()

    const evt = new FocusEvent('focusout', { relatedTarget: el })
    el.dispatchEvent(evt)

    expect(called, 'callback function should not have been called').toBe(false)
  })

  it(`sets the tabindex to -1 if it wasn't manually set`, () => {
    const { el } = makeDocument()

    onClickOutside(el, () => {})

    expect(el.tabIndex, 'tabIndex should be -1').toBe(-1)
  })

  it(`does not set the tabindex to -1 if it was manually set`, () => {
    const indexes = [-1, 0, 1, 3, 10, 100]

    for (const index of indexes) {
      const { el } = makeDocument()

      el.tabIndex = index

      onClickOutside(el, () => {})

      expect(el.tabIndex, `tabIndex should be ${index}`).toBe(index)
    }
  })

  it(`focuses the element if the 'focus' option wasn't set to false`, () => {
    const { el } = makeDocument()

    expect(
      document.activeElement,
      'document.activeElement should not be the element'
    ).not.toBe(el)

    onClickOutside(el, () => {})

    expect(
      document.activeElement,
      'document.activeElement should be the element'
    ).toBe(el)
  })

  it(`does not focus the element if the 'focus' option was set to false`, () => {
    const { el } = makeDocument()

    expect(
      document.activeElement,
      'document.activeElement should not be the element'
    ).not.toBe(el)

    onClickOutside(el, () => {}, { focus: false })

    expect(
      document.activeElement,
      'document.activeElement should not be the element'
    ).not.toBe(el)
  })
})

function makeDocument() {
  const doc = document.createElement('div')
  const el = document.createElement('div')
  const outside = document.createElement('div')
  const child = document.createElement('div')

  el.appendChild(child)
  doc.appendChild(el)
  doc.appendChild(outside)
  document.body.appendChild(doc)

  return {
    doc,
    el,
    child,
    outside,
  }
}

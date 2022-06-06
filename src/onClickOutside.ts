/**
 * Removes the `focusout` event listener when called.
 */
export type RemoveListener = () => void

/**
 * Calls the provided `fn` when the the given element loses its focus to an
 * element outside of it. If the provided element has no `tabindex` value,
 * its `tabindex` will be set to `-1` before registering the event listener.
 * The element will be focused before registering the event listener; this can
 * be disabled by setting the `focus` option to `false`.
 */
export function onClickOutside(
  /**
   * The element to listen for `focusout` events on.
   */
  el: HTMLElement,

  /**
   * Callback function to be called when the element loses its focus to an
   * outside element.
   */
  fn: (lostTo: EventTarget, event: FocusEvent) => void,

  options?: {
    /**
     * If set to `false`, the element will not be immediately focused.
     * @default true
     */
    focus?: boolean
  }
): RemoveListener {
  ensureTabIndex(el)

  if (options?.focus !== false) {
    el.focus()
  }

  const handler = makeFocusOutHandler(fn)

  el.addEventListener('focusout', handler)

  return () => el.removeEventListener('focusout', handler)
}

/**
 * Returns an event listener function for the `focusout` event of an element.
 * When the element that this listener is attached to loses its focus to an
 * element that is outside that element, the provided callback `fn` is called.
 */
export function makeFocusOutHandler(
  fn: (lostTo: EventTarget, event: FocusEvent) => void
) {
  return (event: Event) => {
    const evt = event as FocusEvent

    if (!focusLost(evt)) {
      return
    }

    fn(evt.relatedTarget, evt)
  }
}

function ensureTabIndex(el: HTMLElement) {
  if (el.getAttribute('tabindex') === null) {
    el.tabIndex = -1
  }
}

function focusLost(
  event: FocusEvent
): event is FocusEvent & { relatedTarget: EventTarget } {
  const { currentTarget, relatedTarget } = event

  if (!currentTarget) {
    return false
  }

  if (!relatedTarget) {
    return true
  }

  return (
    currentTarget !== relatedTarget &&
    !(currentTarget as Node).contains(relatedTarget as Node)
  )
}

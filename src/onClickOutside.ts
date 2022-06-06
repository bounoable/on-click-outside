/**
 * Removes the `focusout` event listener when called.
 */
export type RemoveListener = () => void

/**
 * Calls the provided `fn` when the the given element loses its focus to an
 * element outside of it. If the provided element is an {@link HTMLElement} and
 * has no `tabindex` attribute, its `tabindex` will be set to `-1` before
 * registering the event listener.
 */
export function onClickOutside(
  el: Node,
  fn: (lostTo: EventTarget, event: FocusEvent) => void
): RemoveListener {
  ensureTabIndex(el)

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

function ensureTabIndex(el: Node) {
  if (el instanceof HTMLElement && el.getAttribute('tabindex') === null) {
    el.tabIndex = -1
  }
}

function focusLost(
  event: FocusEvent
): event is FocusEvent & { relatedTarget: EventTarget } {
  const { currentTarget, relatedTarget } = event

  if (!(currentTarget && relatedTarget)) {
    return false
  }

  if (!(relatedTarget instanceof Node)) {
    return false
  }

  return (
    currentTarget !== relatedTarget &&
    !(currentTarget as Node).contains(relatedTarget)
  )
}

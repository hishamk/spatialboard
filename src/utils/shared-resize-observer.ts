/**
 * One ResizeObserver per document, shared by every block that needs size
 * reporting — instead of each mounted text/rich-text node allocating its own
 * observer instance. Keyed by ownerDocument (WeakMap, so popped-out windows
 * clean up with their document) because an observer should live in the same
 * realm as the elements it watches.
 */
type ResizeCallback = (entry: ResizeObserverEntry) => void;

interface DocObserver {
  ro: ResizeObserver;
  callbacks: Map<Element, ResizeCallback>;
}

const perDocument = new WeakMap<Document, DocObserver>();

/** Observe `el`; returns an unsubscribe function (also unobserves). */
export function observeResize(el: Element, callback: ResizeCallback): () => void {
  const doc = el.ownerDocument;
  let entry = perDocument.get(doc);
  if (!entry) {
    const callbacks = new Map<Element, ResizeCallback>();
    const RO =
      (doc.defaultView as (Window & typeof globalThis) | null)?.ResizeObserver ??
      ResizeObserver;
    const ro = new RO((entries) => {
      for (const e of entries) callbacks.get(e.target)?.(e);
    });
    entry = { ro, callbacks };
    perDocument.set(doc, entry);
  }
  entry.callbacks.set(el, callback);
  entry.ro.observe(el);
  return () => {
    entry.callbacks.delete(el);
    entry.ro.unobserve(el);
  };
}

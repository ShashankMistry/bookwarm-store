import '@testing-library/jest-dom/vitest'

const createStorage = () => {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
  }
}

if (!globalThis.window) {
  globalThis.window = {}
}

if (!window.localStorage) {
  Object.defineProperty(window, 'localStorage', {
    value: createStorage(),
    configurable: true,
  })
}

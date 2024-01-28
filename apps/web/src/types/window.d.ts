/**
 * Extending global window
 */
interface Window extends Window {
  /**
   * Adding highlight.js to global scope to be able to use it in Rich Text Editor quill
   */
  hljs?: typeof hljs;
}

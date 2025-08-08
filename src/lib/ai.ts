/**
 * In-browser open-source LLM via WebLLM.
 * No server costs. Uses WebGPU if available.
 * We also constrain context to DOM-extracted content for grounded answers.
 */
export const AI_MODEL = 'Llama-3-8B-Instruct-q4f32_1-MLC';

// Extract visible text from the page to provide context.
export function extractPageContext(): string {
  if (typeof window === 'undefined') return '';
  const reject = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT']);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  const lines: string[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || reject.has(parent.tagName)) continue;
    const text = node.textContent?.trim();
    if (text) lines.push(text);
  }
  return lines.join('\n');
}

/** The header link and the page's suggested questions open the side panel through this one event. */
export const ASK_OPEN_EVENT = 'ask:open'

export function openAsk(id?: string) {
  window.dispatchEvent(new CustomEvent(ASK_OPEN_EVENT, { detail: { id } }))
}

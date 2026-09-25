// Studio sound pack cue mappings for portfolio interactions
// Reference: https://uisfx.com/uisfx-catalog.json

export const SOUND_CUES = {
  // Interaction feedback
  DRAG_START: 'drag',     // Loop while dragging
  DRAG_STOP: 'select',    // Play on release/drop
  CLICK: 'select',        // Generic button/click
  TOGGLE: 'toggle',       // Card flip, switch state

  // Navigation
  TAB_SWITCH: 'select',   // Tab switching
  OPEN_PANEL: 'open',     // Open Ask panel or modal
  CLOSE_PANEL: 'close',   // Close Ask panel or modal

  // Feedback
  SUCCESS: 'success',     // Answer found, action completed
  ERROR: 'error',         // No answer found

  // Game interactions
  DEAL_CARD: 'select',    // Deal card in blackjack
  HIT: 'select',          // Hit in blackjack
  STAND: 'toggle',        // Stand in blackjack

  // Text/Input
  TYPING: 'typing',       // Text input (throttled)
} as const

export type SoundCue = (typeof SOUND_CUES)[keyof typeof SOUND_CUES]

// Helper to get cue for interaction type
export function getCueForInteraction(
  interaction: 'drag' | 'drop' | 'click' | 'toggle' | 'tab' | 'open' | 'close' | 'success' | 'error'
): SoundCue {
  const map: Record<string, SoundCue> = {
    drag: SOUND_CUES.DRAG_START,
    drop: SOUND_CUES.DRAG_STOP,
    click: SOUND_CUES.CLICK,
    toggle: SOUND_CUES.TOGGLE,
    tab: SOUND_CUES.TAB_SWITCH,
    open: SOUND_CUES.OPEN_PANEL,
    close: SOUND_CUES.CLOSE_PANEL,
    success: SOUND_CUES.SUCCESS,
    error: SOUND_CUES.ERROR,
  }
  return map[interaction]
}

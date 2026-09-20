import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/** Permissive on purpose — these are CDN web components, not typed React components. */
type MdElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  [prop: string]: any
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Buttons
      'md-elevated-button': MdElementProps
      'md-filled-button': MdElementProps
      'md-filled-tonal-button': MdElementProps
      'md-outlined-button': MdElementProps
      'md-text-button': MdElementProps
      // Icon buttons + FAB
      'md-icon-button': MdElementProps
      'md-filled-icon-button': MdElementProps
      'md-filled-tonal-icon-button': MdElementProps
      'md-outlined-icon-button': MdElementProps
      'md-fab': MdElementProps
      'md-branded-fab': MdElementProps
      // Icon
      'md-icon': MdElementProps
      // Chips
      'md-chip-set': MdElementProps
      'md-assist-chip': MdElementProps
      'md-filter-chip': MdElementProps
      'md-input-chip': MdElementProps
      'md-suggestion-chip': MdElementProps
      // Selection controls
      'md-checkbox': MdElementProps
      'md-radio': MdElementProps
      'md-switch': MdElementProps
      'md-slider': MdElementProps
      // Progress
      'md-linear-progress': MdElementProps
      'md-circular-progress': MdElementProps
      // Text fields + select
      'md-filled-text-field': MdElementProps
      'md-outlined-text-field': MdElementProps
      'md-filled-select': MdElementProps
      'md-outlined-select': MdElementProps
      'md-select-option': MdElementProps
      // Tabs
      'md-tabs': MdElementProps
      'md-primary-tab': MdElementProps
      'md-secondary-tab': MdElementProps
      // List
      'md-list': MdElementProps
      'md-list-item': MdElementProps
      // Menu
      'md-menu': MdElementProps
      'md-menu-item': MdElementProps
      // Dialog
      'md-dialog': MdElementProps
      // Divider
      'md-divider': MdElementProps
      // Cards (labs)
      'md-elevated-card': MdElementProps
      'md-filled-card': MdElementProps
      'md-outlined-card': MdElementProps
    }
  }
}

export {}

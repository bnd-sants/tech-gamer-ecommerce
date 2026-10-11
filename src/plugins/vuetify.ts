import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const gamerDarkTheme = {
  dark: true,
  colors: {
    background: '#0B0E14',
    surface: '#131722',
    primary: '#0C38C5',
    secondary: '#0C38C5',
    accent: '#FF2A55',           // Urgent Red (Discounts / Flash Deals)
    error: '#FF1744',            // Error Red
    info: '#00B0FF',             // Info Blue
    success: '#00E676',          // Success Green
    warning: '#FF9100',          // Alert Amber / Orange
    'surface-variant': '#1B2232',
    'on-surface-variant': '#E2E8F0',
    'on-background': '#FFFFFF',
    'on-surface': '#FFFFFF',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'gamerDarkTheme',
    themes: {
      gamerDarkTheme,
    },
  },
  defaults: {
    VCard: {
      rounded: 'lg',
      elevation: 0,
    },
    VBtn: {
      rounded: 'md',
      elevation: 0,
    },
    VTextField: {
      rounded: 'md',
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      rounded: 'md',
      variant: 'outlined',
      density: 'comfortable',
    },
    VChip: {
      rounded: 'md',
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

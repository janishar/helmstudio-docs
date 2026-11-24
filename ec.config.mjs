import { defineEcConfig } from '@astrojs/starlight/expressive-code';

// Code blocks sit on the app's inset ground with the organic radius.
export default defineEcConfig({
  themes: ['github-dark-default', 'github-light-default'],
  styleOverrides: {
    borderRadius: '12px',
    borderColor: ({ theme }) => (theme.type === 'dark' ? '#3d5146' : '#cdbfa8'),
    codeBackground: ({ theme }) => (theme.type === 'dark' ? '#090e0c' : '#fbf7ef'),
    codeFontFamily: "'JetBrains Mono Variable', ui-monospace, monospace",
    frames: {
      editorTabBarBackground: ({ theme }) => (theme.type === 'dark' ? '#131c17' : '#efe7d9'),
      terminalTitlebarBackground: ({ theme }) => (theme.type === 'dark' ? '#131c17' : '#efe7d9'),
      terminalBackground: ({ theme }) => (theme.type === 'dark' ? '#090e0c' : '#fbf7ef'),
      shadowColor: 'transparent',
    },
  },
});

import GlobalStyle from "./GlobalStyle"

GlobalStyle
const cssVars = {
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary: 'var(--bg-tertiary)',
    border: 'var(--bg-border)',
    inset: 'var(--bg-inset)',
    input: 'var(--bg-input)',
    hover: 'var(--bg-hover)',
  },
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary: 'var(--text-tertiary)',
    quarternary: 'var(--text-quarternary)',
    placeholder: 'var(--text-placeholder)',
    onPrimary: 'var(--text-onPrimary)',
  },
  img: {
    filter: 'var(--img)'
  },
}

const defaultTheme = {
  fontSizes: [
    '14px', // 0
    '16px', // 1
    '18px', // 2
    '22px', // 3
    '26px', // 4
    '32px', // 5
    '40px', // 6
  ],
  fontWeights: {
    body: 400,
    subheading: 500,
    link: 600,
    bold: 700,
    heading: 800,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
    code: 1.6,
  },
  deviceSize: {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
  },
  // ...
}

export const lightTheme = { ...defaultTheme, ...cssVars }
export const darkTheme = { ...defaultTheme, ...cssVars }

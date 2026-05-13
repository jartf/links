import styled from 'styled-components'
import { useTheme } from 'next-themes'

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  function handleClick() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ToggleButton
      onClick={handleClick}
      aria-label="Toggle theme"
    >
      <IconImg src="/sun.svg" alt="Switch to light mode" className="theme-icon theme-icon--sun" />
      <IconImg src="/moon.svg" alt="Switch to dark mode" className="theme-icon theme-icon--moon" />
    </ToggleButton>
  )
}

export default function Layout({ children }) {
  return (
    <Main>
      {children}
      <ThemeToggle />
    </Main>
  )
}

const Main = styled.main`
  min-height: 100vh;
`;

const ToggleButton = styled.button`
    position: fixed;
    bottom: 24px;
    left: 24px;
    z-index: 1000;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg.tertiary};
    border: 1px solid ${({ theme }) => theme.bg.border};
    color: ${({ theme }) => theme.text.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

    &:hover {
        background: ${({ theme }) => theme.bg.input};
        transform: scale(1.08);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const IconImg = styled.img`
    width: 18px;
    height: 18px;
    display: block;
`;

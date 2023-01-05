import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import styled, { css } from 'styled-components'
import { Catpaw, Github, Sun, Moon, Hamburger } from './svg'

const Container = styled(motion.header)`
  z-index: 2;
  width: 100%;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
`

const flex = css`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 64rem;
  margin-inline: auto;
  padding: 0.5rem 0.625rem;
  gap: 0.75rem;
  ${flex}
`

const Logo = styled(motion.div)`
  svg {
    width: 2rem;
    height: 2rem;
  }
  a {
    padding: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.75;
    letter-spacing: -0.025em;
    ${flex}
  }
`

const Tabs = styled.ul`
  flex: 1;
  display: none;
  gap: 1.5rem;
  align-items: center;
  a {
    ${flex}
  }

  @media screen and (min-width: 48rem) {
    display: flex;
  }
`

const Tab = styled.li`
  position: relative;
  a {
    gap: 0.25rem;
    font-weight: 400;
    padding: 0.5rem;
    padding-bottom: 0.25rem;
    &:hover {
      color: ${props => props.theme.accent};
    }
  }
`

const Underline = styled(motion.div)`
  width: 80%;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: 2px;
  margin-inline: auto;
  background-color: #38b2ac;
`

const BtnWrapper = styled.div`
  padding: 1px;
  margin-left: auto;
  background-color: ${props => props.theme.btnWrapperBg};
  border-radius: 1.5rem;
  cursor: pointer;
  &,
  & > button {
    transition: all 0.15s ease-in-out;
  }
  ${flex}

  @media screen and (min-width: 48rem) {
    margin-right: 0.75rem;
  }
`

const Button = styled.button<{ isDark: boolean }>`
  padding: 0.5rem;
  color: ${props => (props.isDark ? '#000' : '#fff')};
  background-color: ${props => (props.isDark ? '#fff' : 'transparent')};
  border-radius: 1.5rem;
`

const Dropdown = styled(motion.div)`
  margin-right: 0.75rem;
  position: relative;
  button {
    padding: 0.5rem;
    background-color: transparent;
    border-radius: 0.25rem;
    border: 1px solid ${props => props.theme.borderColor};
    transition: background-color 0.25s ease-in-out;
    &:hover {
      background-color: ${props => props.theme.itemBg};
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  @media screen and (min-width: 48rem) {
    display: none;
  }
`

const Menu = styled(motion.div)`
  width: 14rem;
  position: absolute;
  right: 0;
  margin-top: 0.625rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  background-color: ${props => props.theme.menuBg};
  border-radius: 0.25rem;
  border: 1px solid rgb(63 63 70 / 0.43);
  transform-origin: right top;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`

const Item = styled(motion.div)`
  font-size: 1rem;
  line-height: 1.25;
  cursor: pointer;
  a {
    display: block;
    padding: 0.5rem 1rem;
    transition: background-color 0.25s ease-in-out;
    &:hover {
      background-color: ${props => props.theme.itemBg};
    }
  }
`

const Anchor = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})``

const logoVariants = {
  normal: { transform: 'rotate(-30deg)' },
  active: {
    transform: 'rotate(0deg)',
    transition: { type: 'tween', duration: 0.2 }
  }
}

const menuVariants = {
  expanded: {
    opacity: 1,
    scale: 1,
    display: 'block'
  },
  collapsed: {
    opacity: 0,
    scale: 0.9,
    transitionEnd: {
      display: 'none'
    }
  }
}

interface Props {
  isDark: boolean
  toggleTheme: () => void
}

const Navbar: React.FC<Props> = ({ isDark, toggleTheme }) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const bg = isDark ? '0 0 0' : '255 255 255'
  const backgroundColor = useTransform(
    scrollY,
    [0, 60],
    [`rgb(${bg} / 0)`, `rgb(${bg} / 0.67)`]
  )

  const toggleDropdown = () => {
    setOpenDropdown(prev => !prev)
  }

  useEffect(() => {
    if (!openDropdown) return
    scrollY.onChange(y => {
      y > 10 && setOpenDropdown(false)
    })
  }, [openDropdown, scrollY])

  return (
    <Container style={{ backgroundColor }}>
      <Wrapper>
        <Logo variants={{}} initial="normal" whileHover="active">
          <Link to="/">
            <Catpaw variants={logoVariants} />
            <span>Hotaroo</span>
          </Link>
        </Logo>

        <nav>
          <Tabs>
            <Tab>
              <Link to="/works">
                Works{' '}
                {pathname === '/works' && <Underline layoutId="underline" />}
              </Link>
            </Tab>
            <Tab>
              <Link to="/posts">
                Posts{' '}
                {pathname === '/posts' && <Underline layoutId="underline" />}
              </Link>
            </Tab>
            <Tab>
              <Anchor href="https://github.com/hotaroo-dev/hotaroo-homepage">
                <Github />
                <span>Source</span>
              </Anchor>
            </Tab>
          </Tabs>
        </nav>

        <BtnWrapper onClick={toggleTheme}>
          <Button isDark={!isDark}>
            <Sun />
          </Button>
          <Button isDark={isDark}>
            <Moon />
          </Button>
        </BtnWrapper>

        <Dropdown>
          <button onClick={toggleDropdown}>
            <Hamburger />
          </button>

          <Menu
            variants={menuVariants}
            initial={false}
            animate={openDropdown ? 'expanded' : 'collapsed'}
            transition={{ type: 'tween', duration: 0.15 }}
          >
            <Item>
              <Link to="/" onClick={toggleDropdown}>
                <span>About</span>
              </Link>
            </Item>
            <Item>
              <Link to="/works" onClick={toggleDropdown}>
                <span>Works</span>
              </Link>
            </Item>
            <Item>
              <Link to="/posts" onClick={toggleDropdown}>
                Posts
              </Link>
            </Item>
            <Item>
              <Anchor
                href="https://github.com/Rolo-coding/hotaroo-homepage"
                onClick={toggleDropdown}
              >
                Source
              </Anchor>
            </Item>
          </Menu>
        </Dropdown>
      </Wrapper>
    </Container>
  )
}

export default Navbar

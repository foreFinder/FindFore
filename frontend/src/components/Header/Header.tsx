import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Burger, Anchor, Group, Stack } from '@mantine/core';
import { GiGolfTee } from 'react-icons/gi';

interface HeaderProps {
  screenWidth: number;
}

const Header = ({ screenWidth }: HeaderProps) => {
  const [mobileNav, setMobileNav] = useState(false);
  const [selected, setSelected] = useState('');

  const handleMobileNav = () => {
    setMobileNav(!mobileNav);
  };

  const handleMenus = () => {
    setMobileNav(false);
  };

  return (
    <header
      style={{
        background: '#59a371',
        height: 80,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        marginBottom: '2em',
        boxShadow: '0px 1px 8px 0px #00000069',
      }}
    >
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          height: 80,
          width: '100%',
          maxWidth: 1600,
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingRight: screenWidth <= 991 ? 30 : 50,
          paddingLeft: screenWidth <= 991 ? 30 : 50,
          alignItems: 'center',
        }}
      >
        {screenWidth <= 1024 && (
          <Burger
            opened={mobileNav}
            onClick={handleMobileNav}
            color='white'
            data-cy='ham-menu'
          />
        )}

        <Anchor
          component={Link}
          to='/dashboard'
          onClick={handleMenus}
          underline='never'
          style={{
            color: '#fff',
            fontSize: screenWidth <= 489 ? '1.9rem' : screenWidth <= 960 ? '2.4rem' : '3rem',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            textShadow: '2px 3px 5px #00000050',
            textDecoration: 'none',
          }}
        >
          <GiGolfTee data-cy='logo' style={{ marginRight: '0.5rem', color: '#fff' }} />
          ForeFinder
        </Anchor>

        {screenWidth > 1024 ? (
          <Group gap='xl'>
            <Anchor
              component={Link}
              to='/dashboard'
              data-cy='dashboard-link'
              onClick={() => { setSelected('dashboard'); handleMenus(); }}
              underline='never'
              style={{
                color: '#fff',
                fontSize: '1.5rem',
                textShadow: '2px 3px 5px #00000052',
                borderBottom: selected === 'dashboard' ? '2px solid #4b59f7' : '2px solid transparent',
                height: 80,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              Dashboard
            </Anchor>
            <Anchor
              component={Link}
              to='/event-form'
              data-cy='form-link'
              onClick={() => { setSelected('eventForm'); handleMenus(); }}
              underline='never'
              style={{
                color: '#fff',
                fontSize: '1.5rem',
                textShadow: '2px 3px 5px #00000052',
                borderBottom: selected === 'eventForm' ? '2px solid #4b59f7' : '2px solid transparent',
                height: 80,
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              Create Tee Time
            </Anchor>
          </Group>
        ) : (
          mobileNav && (
            <Stack
              data-cy='nav-menu'
              onClick={handleMenus}
              style={{
                position: 'absolute',
                top: 80,
                left: 0,
                width: '100%',
                background: '#59a371',
                zIndex: 999,
                padding: '2rem 0',
              }}
              align='center'
              gap='xl'
            >
              <Anchor
                component={Link}
                to='/dashboard'
                data-cy='dashboard-link'
                onClick={() => setSelected('dashboard')}
                underline='never'
                style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  textShadow: '2px 3px 5px #00000052',
                  textDecoration: 'none',
                }}
              >
                Dashboard
              </Anchor>
              <Anchor
                component={Link}
                to='/event-form'
                data-cy='form-link'
                onClick={() => setSelected('eventForm')}
                underline='never'
                style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  textShadow: '2px 3px 5px #00000052',
                  textDecoration: 'none',
                }}
              >
                Create Tee Time
              </Anchor>
              {screenWidth <= 1024 && (
                <Anchor
                  component={Link}
                  to='/community'
                  data-cy='community-link'
                  underline='never'
                  style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    textShadow: '2px 3px 5px #00000052',
                    textDecoration: 'none',
                  }}
                >
                  My Community
                </Anchor>
              )}
            </Stack>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;

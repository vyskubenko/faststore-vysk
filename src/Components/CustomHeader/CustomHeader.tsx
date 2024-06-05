import React from "react";
import styles from './CustomHeader.module.scss'
import { NavbarLinks,
  NavbarLinksList,
  NavbarLinksListItem, SearchInputField, IconButton,Icon,Link, LinkButton, Navbar, NavbarHeader, NavbarRow, NavbarButtons, useUI, useScrollDirection, Icon as UIIcon } from '@faststore/ui'


import type { NavbarProps as OverrideNavigationProps } from '@faststore/core/src/components/sections/Navbar/Navbar'

export interface CustomHeaderProps {
  logoLink: {
    text: string;
    url: string;
  },
  logo: {
    alt: string
    src: string
    link: {
      url: string
      title: string
    }
  }
}



export default function CustomHeader(props: CustomHeaderProps) {

  const scrollDirection = useScrollDirection()
  const { openNavbar, navbar: displayNavbar } = useUI()

  console.log(props)

  const links = ['Office', 'Home Appliances', 'Computer and Software', 'Technology']


  return (
    <Navbar scrollDirection={scrollDirection}  className={`${styles.section} ${styles.customHeader} section-navbar`}>
      <div 
        className={styles.customHeader__wrapper}
        data-fs-content="navbar"
      >
        <Link
          data-fs-navbar-logo
          href={props.logo.link ? props.logo.link.url : '/'}
          title={props.logo.link.title }
          prefetch={false}
          className="customHeader__logo"
        >
          <img 
            src={props.logo.src}
            style={{ width: '100%', height: 'auto' }}
          />
        
        </Link>
   
        <NavbarLinks>
            <NavbarLinksList>
              {links.map((link) => (
                <NavbarLinksListItem key={link}>
                  <Link variant="display" href="#">
                    {link}
                  </Link>
                </NavbarLinksListItem>
              ))}
            </NavbarLinksList>
        </NavbarLinks>
        
        
        <SearchInputField onSubmit={() => {}} />

        <NavbarHeader>
          <NavbarRow>
            <IconButton
              data-fs-navbar-button-menu
              aria-label="Open Menu"
              icon={<Icon name="List" width={30} height={30} />}
              onClick={openNavbar}
            />
            <IconButton
              aria-label="Logo"
              icon={<Icon name="Storefront" width={30} height={30} />}
            />
            <NavbarButtons searchExpanded={false}>
              <LinkButton
                href="#"
                variant="tertiary"
                icon={<Icon name="User" width={18} height={18} weight="bold" />}
              >
                Login
              </LinkButton>
              <IconButton
                data-fs-cart-toggle
                aria-label="cart"
                icon={<Icon name="ShoppingCart" width={32} height={32} />}
              />
            </NavbarButtons>
          </NavbarRow>
        </NavbarHeader>
        </div>
      </Navbar>

  )
}



